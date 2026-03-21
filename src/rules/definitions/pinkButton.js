export default {
  id: 'pinkButton',
  name: 'ボタンがピンク色になる',
  description: 'なぜかピンク！でも押せる！',
  incompatibleWith: ['goldenButton', 'colorBan'],
  apply(scene) {
    const onSpawned = ({ button, glow, label }) => {
      button.setStrokeStyle(3, 0xff2d78)
      glow.setFillStyle(0xff2d78, 0.15)
      label.setColor('#ff2d78')
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
