export default {
  id: 'chaosInput',
  name: 'タップ位置がランダムにずれる',
  description: 'どこを押しても予測不能！完全カオス！',
  incompatibleWith: ['mirrorFlip', 'mirrorVertical', 'doubleMirror', 'driftInput'],
  apply(scene) {
    scene.transformPointerCoords = (x, y) => ({
      x: x + (Math.random() - 0.5) * 90,
      y: y + (Math.random() - 0.5) * 90,
    })
    return () => { scene.transformPointerCoords = null }
  },
}
