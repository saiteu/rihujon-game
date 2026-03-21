export default {
  id: 'goldenButton',
  name: 'ボタンが金色になる',
  description: '黄金のボタン！なぜかテンション上がる！',
  incompatibleWith: ['pinkButton', 'colorBan'],
  apply(scene) {
    const onSpawned = ({ button, glow, label }) => {
      button.setStrokeStyle(3, 0xffe600)
      glow.setFillStyle(0xffe600, 0.15)
      label.setColor('#ffe600')
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
