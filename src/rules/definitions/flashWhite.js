import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'flashWhite',
  name: '定期的に画面が真っ白になる',
  description: '眩しっ！何も見えない！',
  incompatibleWith: ['blindFlash', 'flickerScreen'],
  apply(scene) {
    let active = true
    const overlay = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff, 0).setDepth(90)
    const flash = () => {
      if (!active) return
      scene.tweens.add({
        targets: overlay, alpha: 1, duration: 50,
        onComplete: () => {
          if (!active) return
          scene.tweens.add({
            targets: overlay, alpha: 0, duration: 100,
            delay: Phaser.Math.Between(400, 700),
            onComplete: () => {
              if (active) scene.time.delayedCall(Phaser.Math.Between(2000, 3500), flash)
            },
          })
        },
      })
    }
    scene.time.delayedCall(800, flash)
    return () => { active = false; scene.tweens.killTweensOf(overlay); overlay.destroy() }
  },
}
