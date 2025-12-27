<script lang="ts">
    import { useLoader } from '@threlte/core'
    import { useTexture } from '@threlte/extras';
    import { SheetObject } from '@threlte/theatre';

    import Camera from '../camera/Camera.svelte';
    import BookMesh from '../meshes/BookMesh.svelte'

    // https://openlibrary.org/api/books?bibkeys=ISBN:9780765389220&format=json&jscmd=data
    const textureURL = 'https://ia800505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_43.zip&file=0014432013-L.jpg';

    const books = [
        { textureURL: textureURL },
        { textureURL: textureURL },
        { textureURL: textureURL },
        { textureURL: textureURL },
    ];

    const canOrbit = import.meta.env.DEV;

    const padding = 0.1;
</script>

<Camera canOrbit={canOrbit}/>

<!-- Book 1 -->
<SheetObject key="books">
    {#snippet children({ Transform })}
        <Transform>
            {#each books as book, index}
            <BookMesh
                xPos={0.2 * index + padding * index}
                texture={useTexture(book.textureURL)}
            />
            {/each}
        </Transform>
    {/snippet}
</SheetObject>
