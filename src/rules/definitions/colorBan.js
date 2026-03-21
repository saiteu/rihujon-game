import { COLORS } from '../../config.js'

export default {
  id: 'colorBan',
  name: '赤いボタンは押してはいけない',
  description: 'ボタンが赤くなったら押すな！押したら即失敗！',
  incompatibleWith: ['transparent', 'flickerScreen'],
  apply(scene, onViolation) {
    let dangerTimer = null
    let currentRefs = null

    const onSpawned = ({ button, glow, label, task }) => {
      if (dangerTimer) dangerTimer.remove()
      task.isDanger = false
      currentRefs = { button, glow, label, task }

      dangerTimer = scene.time.addEvent({
        delay: 1500,
        loop: true,
        callback: () => {
          if (!currentRefs) return
          task.isDanger = !task.isDanger
          if (task.isDanger) {
            button.setStrokeStyle(3, COLORS.neonPink)
            glow.setFillStyle(COLORS.neonPink, 0.2)
            label.setColor('#ff2d78').setText('DANGER')
          } else {
            button.setStrokeStyle(3, COLORS.neonCyan)
            glow.setFillStyle(COLORS.neonCyan, 0.15)
            label.setColor('#00fff5').setText('CLICK')
          }
        },
      })
    }

    scene.events.on('task:buttonspawned', onSpawned)

    const validator = (_, task) => {
      if (task.isDanger) return 'violation'
    }
    scene.clickValidators.push(validator)

    return () => {
      if (dangerTimer) dangerTimer.remove()
      currentRefs = null
      scene.events.off('task:buttonspawned', onSpawned)
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
    }
  },
}
