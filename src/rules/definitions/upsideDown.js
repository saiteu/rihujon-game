export default {
  id: 'upsideDown',
  name: '画面が上下逆になる',
  description: '全てが逆さま！脳の向きを変えろ！',
  incompatibleWith: ['screenRotate'],
  apply(scene, onViolation) {
    scene.cameras.main.setRotation(Math.PI)
    return () => {
      scene.cameras.main.setRotation(0)
    }
  },
}
