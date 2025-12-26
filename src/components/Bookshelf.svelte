<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './3d/Scene.svelte';
  import { Studio, Theatre } from '@threlte/theatre';
</script>

<Studio enabled={true} />

<Canvas shadows={false}>
  <Theatre>
    <Scene />
  </Theatre>
</Canvas>