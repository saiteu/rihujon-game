export default {
  id: 'tiltRight',
  name: '画面が右に傾く',
  description: '逆斜め！頭を傾けるな！',
  incompatibleWith: ['tiltLeft', 'screenRotate', 'upsideDown', 'spinCamera'],
  apply(scene) {
    scene.cameras.main.setRotation(0.14)
    return () => { scene.cameras.main.setRotation(0) }
  },
}
