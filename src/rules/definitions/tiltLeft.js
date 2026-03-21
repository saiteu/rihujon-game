export default {
  id: 'tiltLeft',
  name: '画面が左に傾く',
  description: '斜め！慣れると大丈夫なはず！',
  incompatibleWith: ['tiltRight', 'screenRotate', 'upsideDown', 'spinCamera'],
  apply(scene) {
    scene.cameras.main.setRotation(-0.14)
    return () => { scene.cameras.main.setRotation(0) }
  },
}
