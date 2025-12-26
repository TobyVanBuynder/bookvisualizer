<script lang="ts">
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    export let canOrbit = true;
</script>

<T.PerspectiveCamera
    position={[5, 5, 5]}
    oncreate={(camera) => {
        camera.lookAt(0,0,0)
    }}
    makeDefault
>
    {#if canOrbit}
    <OrbitControls />
    {/if}
</T.PerspectiveCamera>