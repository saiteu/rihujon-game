export default {
  id: 'bigButton',
  name: 'ボタンが大きくなる',
  description: '押しやすくなった！でも本当にそれだけ？',
  incompatibleWith: ['tinyButton', 'shrinkButton', 'shrinkingButton'],
  apply(scene) {
    scene.buttonRadiusOverride = 60
    return () => { scene.buttonRadiusOverride = null }
  },
}
