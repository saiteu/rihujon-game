export default {
  id: 'noBorder',
  name: 'ボタンの枠線が消える',
  description: 'どこが境界線？分からない！',
  incompatibleWith: ['noFill'],
  apply(scene) {
    const onSpawned = ({ button }) => { button.setStrokeStyle(0) }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
