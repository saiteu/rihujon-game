export default {
  id: 'noFill',
  name: 'ボタンの中が透明になる',
  description: '枠しかない！それだけ！',
  incompatibleWith: ['noBorder'],
  apply(scene) {
    const onSpawned = ({ button }) => { button.setFillStyle(0x000000, 0) }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
