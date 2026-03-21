import Phaser from 'phaser'

export default {
  id: 'colorShift',
  name: 'ボタンが虹色に変化し続ける',
  description: '色が変わり続ける…見失うな！',
  incompatibleWith: ['colorBan'],
  apply(scene, onViolation) {
    let hue = 0
    let refs = null
    const onSpawned = (data) => { refs = data }
    scene.events.on('task:buttonspawned', onSpawned)

    const onUpdate = () => {
      if (!refs || !refs.button || !refs.button.active) return
      hue = (hue + 1.2) % 360
      const color = Phaser.Display.Color.HSLToColor(hue / 360, 1, 0.6).color
      refs.button.setStrokeStyle(3, color)
      refs.glow.setFillStyle(color, 0.15)
    }

    scene.events.on('update', onUpdate)
    return () => {
      scene.events.off('task:buttonspawned', onSpawned)
      scene.events.off('update', onUpdate)
    }
  },
}
