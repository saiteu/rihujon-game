export default {
  id: 'questionMark',
  name: 'ラベルが「?」になる',
  description: 'CLICKじゃなくて？何を押せばいいんだ！',
  incompatibleWith: ['hideLabel'],
  apply(scene) {
    const onSpawned = ({ label }) => { label.setText('?').setFontSize('22px') }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
