<script lang="ts">
    import { T } from '@threlte/core';
    import {Texture} from 'three';

    export let xPos = 0;
    export let color = "white";
    export let texture: Texture<unknown>;
</script>

<T.Mesh position.x={xPos}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color={color} map={texture} />
</T.Mesh>