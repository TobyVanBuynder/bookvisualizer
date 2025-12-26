<script>
    import { T } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import { SheetObject, Project, Sheet } from '@threlte/theatre';
</script>

<Project name="project" makeDefault>
<Sheet name="sheet" makeDefault>

<T.PerspectiveCamera
    position={[5, 5, 5]}
    oncreate={(camera) => {
        camera.lookAt(0,0,0)
    }}
    makeDefault
>
    <OrbitControls />
</T.PerspectiveCamera>

<!-- Book 1 -->
<SheetObject key="twobooks">
    {#snippet children({ Transform })}
        <Transform>
            <T.Mesh position.x={0}>
                <T.BoxGeometry args={[0.2, 1.5, 1]} />
                <T.MeshBasicMaterial color="red" />
            </T.Mesh>
            <T.Mesh position.x={0.2}>
                <T.BoxGeometry args={[0.2, 1.5, 1]} />
                <T.MeshBasicMaterial color="orange" />
            </T.Mesh>
        </Transform>
    {/snippet}
</SheetObject>

<!-- Book 2 -->
<SheetObject key="book2">
</SheetObject>

<!-- Book 3 -->
<SheetObject key="book3">
<T.Mesh position.x={0.4}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color="yellow" />
</T.Mesh>
</SheetObject>

<!-- Book 4 -->
<SheetObject key="book4">
<T.Mesh position.x={0.6}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color="green" />
</T.Mesh>
</SheetObject>

<!-- Book 5 -->
<SheetObject key="book5">
<T.Mesh position.x={0.8}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color="cyan" />
</T.Mesh>
</SheetObject>

<!-- Book 6 -->
<SheetObject key="book6">
<T.Mesh position.x={1.0}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color="blue" />
</T.Mesh>
</SheetObject>

<!-- Book 7 -->
<SheetObject key="book7">
<T.Mesh position.x={1.2}>
    <T.BoxGeometry args={[0.2, 1.5, 1]} />
    <T.MeshBasicMaterial color="magenta" />
</T.Mesh>
</SheetObject>

</Sheet>
</Project>