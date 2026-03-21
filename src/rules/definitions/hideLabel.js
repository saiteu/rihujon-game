export default {
  id: 'hideLabel',
  name: 'ボタンのラベルが消える',
  description: '何も書いてない！でも押せるはず！',
  incompatibleWith: ['questionMark'],
  apply(scene) {
    const onSpawned = ({ label }) => { label.setAlpha(0) }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
