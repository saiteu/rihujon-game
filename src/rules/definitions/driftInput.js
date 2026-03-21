export default {
  id: 'driftInput',
  name: 'タップ位置が右に80pxずれる',
  description: '実際より右を押さないと当たらない！',
  incompatibleWith: ['mirrorFlip', 'mirrorVertical', 'doubleMirror', 'chaosInput'],
  apply(scene) {
    scene.transformPointerCoords = (x, y) => ({ x: x - 80, y })
    return () => { scene.transformPointerCoords = null }
  },
}
