import Phaser from 'phaser'
import { GAME_WIDTH, COLORS } from '../../config.js'

const BOUNDS = { x1: 56, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

export default {
  id: 'movingButton',
  name: 'ボタンが動き回る',
  description: 'ボタンがふらふら動く！タイミングを見極めろ！',
  incompatibleWith: ['buttonFlees'],
  apply(scene, onViolation) {
    const onSpawned = ({ button, glow, label }) => {
      const move = () => {
        if (!button.active) return
        const tx = Phaser.Math.Between(BOUNDS.x1, BOUNDS.x2)
        const ty = Phaser.Math.Between(BOUNDS.y1, BOUNDS.y2)
        scene.tweens.add({
          targets: [button, glow, label],
          x: tx,
          y: ty,
          duration: Phaser.Math.Between(1000, 2000),
          ease: 'Sine.easeInOut',
          onComplete: move,
        })
      }
      scene.time.delayedCall(300, move)
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
