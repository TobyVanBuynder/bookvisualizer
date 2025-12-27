import books from '~/data/books.json';

export type BookData = {
  isbn: string;
  title: string;
  author: string;
  year: number;
  textureURL: string;
};

export const bookshelfData = books as BookData[];
