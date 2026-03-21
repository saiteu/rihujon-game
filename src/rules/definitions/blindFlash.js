import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'

export default {
  id: 'blindFlash',
  name: '定期的に画面が真っ暗になる',
  description: 'いきなり真っ暗！消えてる間も位置を覚えとけ！',
  incompatibleWith: ['flickerScreen', 'transparent'],
  apply(scene, onViolation) {
    const overlay = scene.add.rectangle(
      GAME_WIDTH / 2, GAME_HEIGHT / 2,
      GAME_WIDTH, GAME_HEIGHT,
      0x000000, 0,
    ).setDepth(90)

    let active = true

    const blackout = () => {
      if (!active) return
      scene.tweens.add({
        targets: overlay,
        alpha: 1,
        duration: 60,
        onComplete: () => {
          if (!active) return
          scene.tweens.add({
            targets: overlay,
            alpha: 0,
            duration: 80,
            delay: Phaser.Math.Between(600, 1000),
            onComplete: () => {
              if (!active) return
              scene.time.delayedCall(Phaser.Math.Between(2000, 4000), blackout)
            },
          })
        },
      })
    }

    scene.time.delayedCall(500, blackout)

    return () => {
      active = false
      scene.tweens.killTweensOf(overlay)
      overlay.destroy()
    }
  },
}
