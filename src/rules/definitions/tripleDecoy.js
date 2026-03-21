import Phaser from 'phaser'
import { COLORS } from '../../config.js'
export default {
  id: 'tripleDecoy',
  name: '偽ボタンが3個出現する',
  description: '3つの罠！本物はどれだ！？',
  incompatibleWith: ['fakeButtons'],
  apply(scene, onViolation) {
    const BOUNDS = { x1: 60, y1: 200, x2: 420, y2: 444 }
    const R = 34
    let fakes = []
    const spawnFakes = () => {
      fakes.forEach(f => { f.circle.destroy(); f.label.destroy() })
      fakes = []
      for (let i = 0; i < 3; i++) {
        const x = Phaser.Math.Between(BOUNDS.x1, BOUNDS.x2)
        const y = Phaser.Math.Between(BOUNDS.y1, BOUNDS.y2)
        const circle = scene.add.circle(x, y, R, COLORS.dark).setStrokeStyle(3, COLORS.neonPink)
        const label = scene.add.text(x, y, 'CLICK', {
          fontFamily: 'monospace', fontSize: '12px', color: '#ff2d78', fontStyle: 'bold',
        }).setOrigin(0.5)
        fakes.push({ circle, label, x, y })
      }
    }
    const ptrHandler = (pointer) => {
      if (scene.isFailed || scene.isTransitioning) return
      const world = scene.cameras.main.getWorldPoint(pointer.x, pointer.y)
      let { x, y } = world
      if (scene.transformPointerCoords) ({ x, y } = scene.transformPointerCoords(x, y))
      for (const f of fakes) {
        if (Math.hypot(x - f.x, y - f.y) <= R) { onViolation(); return }
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
