export default {
  id: 'transparent',
  name: 'ボタンがほぼ透明になる',
  description: 'ボタンが見えない！感を頼れ！',
  incompatibleWith: ['colorBan', 'fakeButtons', 'flickerScreen'],
  apply(scene, onViolation) {
    const onSpawned = ({ button, glow, label }) => {
      button.setAlpha(0.1)
      glow.setAlpha(0.06)
      label.setAlpha(0.12)
    }

    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
