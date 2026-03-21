import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

const BOUNDS = { x1: 56, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

export default {
  id: 'teleportButton',
  name: 'ボタンが突然ワープする',
  description: '2秒ごとにどこかへ消える！目で追え！',
  incompatibleWith: ['movingButton', 'buttonFlees', 'gravityButton', 'windDrift'],
  apply(scene, onViolation) {
    let teleportTimer = null

    const onSpawned = ({ button, glow, label }) => {
      if (teleportTimer) teleportTimer.remove()
      teleportTimer = scene.time.addEvent({
        delay: 2000,
        loop: true,
        callback: () => {
          if (!button.active) return
          const tx = Phaser.Math.Between(BOUNDS.x1, BOUNDS.x2)
          const ty = Phaser.Math.Between(BOUNDS.y1, BOUNDS.y2)
          // Flash out
          scene.tweens.add({
            targets: [button, glow, label],
            alpha: 0,
            duration: 100,
            onComplete: () => {
              if (!button.active) return
              button.x = tx; button.y = ty
              glow.x = tx; glow.y = ty
              label.x = tx; label.y = ty
              scene.tweens.add({ targets: [button, glow, label], alpha: 1, duration: 100 })
            },
          })
        },
      })
    }

    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      if (teleportTimer) teleportTimer.remove()
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
