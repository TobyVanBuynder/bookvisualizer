<script lang="ts">
  import { useLoader } from '@threlte/core'
  import { TextureLoader } from 'three'

    import { SheetObject } from '@threlte/theatre';
    import Camera from '../camera/Camera.svelte';
    import BookMesh from '../meshes/BookMesh.svelte'

    // https://openlibrary.org/api/books?bibkeys=ISBN:9780765389220&format=json&jscmd=data
    const textureURL = 'https://ia800505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_43.zip&file=0014432013-L.jpg';

    const books = [
        { xPos: 0, textureURL: textureURL },
        /*{ xPos: 0.2, color: "orange", texture: texture },
        { xPos: 0.4, color: "yellow", texture: texture },
        { xPos: 0.6, color: "green", texture: texture },
        { xPos: 0.8, color: "cyan", texture: texture },
        { xPos: 1, color: "blue", texture: texture },
        { xPos: 1.2, color: "magenta", texture: texture },*/
    ];
    
    const loader = useLoader(TextureLoader);

    const canOrbit = import.meta.env.DEV;

</script>

<Camera canOrbit={canOrbit}/>

<!-- Book 1 -->
<SheetObject key="books">
    {#snippet children({ Transform })}
        <Transform>
            {#each books as book}
            {#await loader.load(book.textureURL).then((texture) => texture) then texture}
            <BookMesh
                xPos={book.xPos}
                texture={texture}
            />
            {/await}
            {/each}
        </Transform>
    {/snippet}
</SheetObject>
