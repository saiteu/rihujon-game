export default {
  id: 'tinyButton',
  name: 'ボタンが極小になる',
  description: '超小さいボタンを押せ！精密さが試される！',
  incompatibleWith: ['transparent'],
  apply(scene, onViolation) {
    scene.buttonRadiusOverride = 14
    return () => { scene.buttonRadiusOverride = null }
  },
}
