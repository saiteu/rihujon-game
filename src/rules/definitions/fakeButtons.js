import Phaser from 'phaser'
import { GAME_WIDTH, COLORS } from '../../config.js'

const BOUNDS = { x1: 60, y1: 200, x2: GAME_WIDTH - 60, y2: 440 }
const R = 36

export default {
  id: 'fakeButtons',
  name: '偽ボタンが出現する',
  description: '偽物を押したら即失敗！本物だけ押せ！',
  incompatibleWith: ['transparent'],
  apply(scene, onViolation) {
    let fakes = []

    const spawnFakes = () => {
      fakes.forEach(f => { f.circle.destroy(); f.label.destroy() })
      fakes = []

      for (let i = 0; i < 2; i++) {
        const x = Phaser.Math.Between(BOUNDS.x1, BOUNDS.x2)
        const y = Phaser.Math.Between(BOUNDS.y1, BOUNDS.y2)

        const circle = scene.add.circle(x, y, R, COLORS.dark)
        circle.setStrokeStyle(3, COLORS.neonPink)
        const label = scene.add.text(x, y, 'CLICK', {
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#ff2d78',
          fontStyle: 'bold',
        }).setOrigin(0.5)

        fakes.push({ circle, label, x, y })
      }
    }

    const ptrHandler = (pointer) => {
      const world = scene.cameras.main.getWorldPoint(pointer.x, pointer.y)
      const coords = scene.transformPointerCoords
        ? scene.transformPointerCoords(world.x, world.y)
        : { x: world.x, y: world.y }

      for (const f of fakes) {
        const dist = Phaser.Math.Distance.Between(coords.x, coords.y, f.x, f.y)
        if (dist <= R) { onViolation(); return }
      }
    }

    scene.events.on('task:buttonspawned', spawnFakes)
    scene.input.on('pointerdown', ptrHandler)

    return () => {
      fakes.forEach(f => { f.circle.destroy(); f.label.destroy() })
      fakes = []
      scene.events.off('task:buttonspawned', spawnFakes)
      scene.input.off('pointerdown', ptrHandler)
    }
  },
}
