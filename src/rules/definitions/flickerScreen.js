import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'

export default {
  id: 'flickerScreen',
  name: '画面がちかちかする',
  description: '光が明滅する！暗い瞬間を見逃すな！',
  incompatibleWith: ['transparent', 'colorBan'],
  apply(scene, onViolation) {
    const overlay = scene.add.rectangle(
      GAME_WIDTH / 2, GAME_HEIGHT / 2,
      GAME_WIDTH, GAME_HEIGHT,
      0x000000, 0,
    ).setDepth(30)

    let active = true

    const flicker = () => {
      if (!active) return
      const darkDuration = Phaser.Math.Between(80, 350)
      const pauseDuration = Phaser.Math.Between(300, 1400)

      scene.tweens.add({
        targets: overlay,
        alpha: 0.88,
        duration: 40,
        onComplete: () => {
          if (!active) return
          scene.tweens.add({
            targets: overlay,
            alpha: 0,
            duration: 60,
            delay: darkDuration,
            onComplete: () => {
              if (!active) return
              scene.time.delayedCall(pauseDuration, flicker)
            },
          })
        },
      })
    }
    flicker()

    return () => {
      active = false
      scene.tweens.killTweensOf(overlay)
      overlay.destroy()
    }
  },
}
