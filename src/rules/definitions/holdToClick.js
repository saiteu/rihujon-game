export default {
  id: 'holdToClick',
  name: '長押しクリック',
  description: '素早く押してもダメ！800ms長押しでのみカウントされる',
  incompatibleWith: [],
  apply(scene, _onViolation) {
    scene.holdMode = true

    const onSpawn = ({ button, label }) => {
      label.setText('HOLD')
      label.setStyle({ color: '#ffe600', fontSize: '11px' })
      button.setStrokeStyle(3, 0xffe600)
    }
    scene.events.on('task:buttonspawned', onSpawn)

    return () => {
      scene.holdMode = false
      scene.events.off('task:buttonspawned', onSpawn)
    }
  },
}
