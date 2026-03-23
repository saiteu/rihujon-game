import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

const BUTTON_RADIUS = 36
const MAX_MISSES = 3

export default {
  id: 'rageMode',
  name: 'レイジモード',
  description: `ボタン以外を${MAX_MISSES}回クリックしたらアウト！慎重に`,
  incompatibleWith: ['dangerZone'],
  apply(scene, onViolation) {
    let misses = 0
    let active = true

    const lifeText = scene.add.text(GAME_WIDTH / 2, 172, '❤️'.repeat(MAX_MISSES), {
      fontFamily: 'monospace',
      fontSize: '18px',
    }).setOrigin(0.5).setDepth(50)

    const handler = (pointer) => {
      if (!active) return
      if (scene.isFailed || scene.isTransitioning) return
      if (!scene.task || !scene.task.button) return

      const world = scene.cameras.main.getWorldPoint(pointer.x, pointer.y)
      let { x, y } = world
      if (scene.transformPointerCoords) ({ x, y } = scene.transformPointerCoords(x, y))

      const dist = Phaser.Math.Distance.Between(x, y, scene.task.button.x, scene.task.button.y)
      const radius = scene.buttonRadiusOverride || BUTTON_RADIUS

      if (dist > radius) {
        misses++
        const remaining = MAX_MISSES - misses
        lifeText.setText('❤️'.repeat(Math.max(0, remaining)))
        scene.cameras.main.flash(120, 255, 0, 0)
        if (misses >= MAX_MISSES) onViolation()
      }
    }

    scene.input.on('pointerdown', handler)

    return () => {
      active = false
      scene.input.off('pointerdown', handler)
      lifeText.destroy()
    }
  },
}
