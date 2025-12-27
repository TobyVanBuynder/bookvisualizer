<script lang="ts">
    import { T } from '@threlte/core';
    import { SheetObject } from '@threlte/theatre';
    import type { AsyncWritable } from '@threlte/core';
    import { Texture } from 'three';

    export let keyName = "book";
    export let xPos = 0;
    export let texture: AsyncWritable<Texture<HTMLImageElement>>;
</script>

<SheetObject key={keyName}>
    {#snippet children({ Transform, Sync })}
        <Transform>
            <T.Mesh position={[xPos, 0, 0]}>
                <Sync />
                <T.BoxGeometry args={[0.2, 1.5, 1]} />
                {#if $texture}
                <T.MeshBasicMaterial map={$texture} />
                {/if}
            </T.Mesh>
        </Transform>
    {/snippet}
</SheetObject>
