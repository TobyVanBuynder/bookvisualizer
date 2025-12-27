<script lang="ts">
    import { useTexture } from '@threlte/extras';

    import Camera from '~/components/3d/camera/Camera.svelte';
    import BookMesh from '~/components/3d/meshes/BookMesh.svelte'

    import { bookshelfData } from '~/utils/books';

    // https://openlibrary.org/api/books?bibkeys=ISBN:9780765389220&format=json&jscmd=data

    const books = bookshelfData;
    const bookAssetBaseUrl = "/images/books/compressed/";
    books.forEach((book) => console.log((`${bookAssetBaseUrl}${book.textureURL}`)));

    const canOrbit = import.meta.env.DEV;
    const padding = 0.1;
</script>

<Camera canOrbit={canOrbit}/>

{#each books as book, bookIndex}
    <BookMesh
        keyName={`book${bookIndex}`}
        texture={useTexture(`${bookAssetBaseUrl}${book.textureURL}`)}
    />
{/each}
