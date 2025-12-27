import fs from 'fs-extra';
import path from 'path';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { parse } from 'csv-parse/sync';


const INPUT_FILE = './.goodreads/goodreads_library_export.csv';
const OUTPUT_JSON = './src/assets/data/books.json';
const IMAGE_DIR = './src/assets/images/books';
const WEBSITE_SHELF = 'favorites';
const FETCH_COVERS = false;


await fs.ensureDir(IMAGE_DIR);

const csv = await fs.readFile(INPUT_FILE, 'utf8');
const records = parse(csv, { columns: true, skip_empty_lines: true });

// Filter shelf
const websiteBooks = records.filter(r =>
  r.Bookshelves?.split(',').includes(WEBSITE_SHELF)
);

const cleanISBN = (isbn) => isbn.replace(/^="(.*)"$/, '$1');
const cleanWhitespaces = (author) => author.replace(/\s+/g, ' ').trim()
const attachAuthors = (author, additionalAuthors) => {
    return (additionalAuthors && additionalAuthors.length > 0)
        ? `${author}, ${additionalAuthors}`
        : author;
}

// Extract ISBNs
const books = websiteBooks
  .map(r => ({
    isbn: cleanISBN(r.ISBN13 || r.ISBN),
    author: cleanWhitespaces(attachAuthors(r.Author, r["Additional Authors"])),
    title: r.Title,
    year: parseInt(r["Original Publication Year"] || r["Year Published"]),
  }))
  .filter(b => b.isbn);

const results = [];

for (const book of books) {
    let imagePath = null;

    const imageUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

    try {
        const filename = `${book.isbn}.jpg`;
        const fullPath = path.join(IMAGE_DIR, filename);

        if (fs.pathExists(fullPath)) {
            imagePath = filename;
            throw new Error("File already downloaded for ISBN: " + book.isbn)
        }
        
        console.log("Doanloading file " + filename + "...");

        if (FETCH_COVERS) {
            const imgRes = await fetch(imageUrl);

            if (imgRes.ok) {
                const buffer = await imgRes.arrayBuffer();

                imagePath = filename;

                await sharp(Buffer.from(buffer)).toFile(fullPath);
            }
        }
    } catch (err) {
        console.warn(`Failed for ISBN ${book.isbn}:`, err.message);
    }

    results.push({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      year: book.year,
      textureURL: imagePath
    });
     // infoLink: `https://openlibrary.org/isbn/${book.isbn}`,

}

await fs.writeJson(OUTPUT_JSON, results, { spaces: 2 });

console.log(`Processed ${results.length} books`);
