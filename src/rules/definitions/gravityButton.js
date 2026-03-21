import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

const TOP_Y = 196
const BOTTOM_Y = 444

export default {
  id: 'gravityButton',
  name: 'ボタンが落下する',
  description: '重力に従って落ちる！落ちる前に押せ！',
  incompatibleWith: ['movingButton', 'buttonFlees', 'teleportButton', 'windDrift'],
  apply(scene, onViolation) {
    let refs = null
    const onSpawned = (data) => { refs = data }
    scene.events.on('task:buttonspawned', onSpawned)

    const onUpdate = () => {
      if (!refs || !refs.button || !refs.button.active) return
      const { button, glow, label } = refs
      const speed = 0.8
      button.y = Math.min(button.y + speed, BOTTOM_Y)
      if (button.y >= BOTTOM_Y) {
        // Reset to top at random x
        button.x = Phaser.Math.Between(56, GAME_WIDTH - 56)
        button.y = TOP_Y
      }
      glow.x = button.x; glow.y = button.y
      label.x = button.x; label.y = button.y
    }

    scene.events.on('update', onUpdate)
    return () => {
      scene.events.off('task:buttonspawned', onSpawned)
      scene.events.off('update', onUpdate)
    }
  },
}
