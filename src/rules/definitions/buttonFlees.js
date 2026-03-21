import Phaser from 'phaser'
import { GAME_WIDTH, COLORS } from '../../config.js'

const BOUNDS = { x1: 56, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

export default {
  id: 'buttonFlees',
  name: 'ボタンが逃げる',
  description: 'ボタンがカーソルを避けて逃げる！追い詰めろ！',
  incompatibleWith: ['movingButton'],
  apply(scene, onViolation) {
    let refs = null

    const onSpawned = (data) => { refs = data }
    scene.events.on('task:buttonspawned', onSpawned)

    const onUpdate = () => {
      if (!refs || !refs.button || !refs.button.active) return

      const ptr = scene.input.activePointer
      const world = scene.cameras.main.getWorldPoint(ptr.x, ptr.y)
      const { x: px, y: py } = scene.transformPointerCoords
        ? scene.transformPointerCoords(world.x, world.y)
        : { x: world.x, y: world.y }

      const { button, glow, label } = refs
      const dx = button.x - px
      const dy = button.y - py
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 110 && dist > 0) {
        const speed = (110 - dist) * 0.09
        const nx = dx / dist
        const ny = dy / dist
        button.x = Phaser.Math.Clamp(button.x + nx * speed, BOUNDS.x1, BOUNDS.x2)
        button.y = Phaser.Math.Clamp(button.y + ny * speed, BOUNDS.y1, BOUNDS.y2)
        glow.x = button.x; glow.y = button.y
        label.x = button.x; label.y = button.y
      }
    }

    scene.events.on('update', onUpdate)
    return () => {
      scene.events.off('task:buttonspawned', onSpawned)
      scene.events.off('update', onUpdate)
    }
  },
}
