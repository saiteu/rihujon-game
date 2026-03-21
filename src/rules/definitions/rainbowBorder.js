export default {
  id: 'rainbowBorder',
  name: 'ボタンの枠がレインボーに変わり続ける',
  description: 'カラフルすぎて目が痛い！',
  incompatibleWith: ['colorBan', 'pinkButton', 'goldenButton'],
  apply(scene) {
    const colors = [0xff0000, 0xff7700, 0xffff00, 0x00ff00, 0x00ffff, 0x0077ff, 0xff00ff]
    let idx = 0
    let currentButton = null
    const onSpawned = ({ button }) => { currentButton = button }
    scene.events.on('task:buttonspawned', onSpawned)
    const timer = scene.time.addEvent({
      delay: 180, loop: true,
      callback: () => {
        if (currentButton && currentButton.active) {
          currentButton.setStrokeStyle(3, colors[idx % colors.length])
          idx++
        }
      },
    })
    return () => {
      timer.remove()
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
