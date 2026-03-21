import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

const BOUNDS = { x1: 56, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

export default {
  id: 'windDrift',
  name: '風でボタンが流される',
  description: '風向きが変わり続ける！流されるボタンを追え！',
  incompatibleWith: ['movingButton', 'buttonFlees', 'teleportButton', 'gravityButton'],
  apply(scene, onViolation) {
    let refs = null
    let windAngle = Math.random() * Math.PI * 2
    let windTimer = null

    const onSpawned = (data) => {
      refs = data
      windAngle = Math.random() * Math.PI * 2
      if (windTimer) windTimer.remove()
      windTimer = scene.time.addEvent({
        delay: 2500,
        loop: true,
        callback: () => { windAngle = Math.random() * Math.PI * 2 },
      })
    }
    scene.events.on('task:buttonspawned', onSpawned)

    const onUpdate = () => {
      if (!refs || !refs.button || !refs.button.active) return
      const { button, glow, label } = refs
      const speed = 0.6
      button.x = Phaser.Math.Clamp(button.x + Math.cos(windAngle) * speed, BOUNDS.x1, BOUNDS.x2)
      button.y = Phaser.Math.Clamp(button.y + Math.sin(windAngle) * speed, BOUNDS.y1, BOUNDS.y2)
      glow.x = button.x; glow.y = button.y
      label.x = button.x; label.y = button.y
    }

    scene.events.on('update', onUpdate)
    return () => {
      if (windTimer) windTimer.remove()
      scene.events.off('task:buttonspawned', onSpawned)
      scene.events.off('update', onUpdate)
    }
  },
}
