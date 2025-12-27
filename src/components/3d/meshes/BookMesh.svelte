<script lang="ts">
    import { T } from '@threlte/core';
    import type { AsyncWritable } from '@threlte/core';
    import { Texture } from 'three';

    export let xPos = 0;
    export let texture: AsyncWritable<Texture<HTMLImageElement>>;
</script>

<T.Mesh position.x={xPos}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    {#if $texture}
    <T.MeshBasicMaterial map={$texture} />
    {/if}
</T.Mesh>
