<script lang="ts">
  import { Canvas } from '@threlte/core';
  import BookshelfScene from './3d/scenes/BookshelfScene.svelte';
  import { Theatre, } from '@threlte/theatre';
  import state from './3d/states/default.theatre-project-state.json';

  const enableStudio = import.meta.env.DEV;
</script>

<Canvas shadows={false}>
  <Theatre studio={{enabled: enableStudio }} config={{ state: state }}>
    <BookshelfScene />
  </Theatre>
</Canvas>