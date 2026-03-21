import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

export default {
  id: 'dangerZone',
  name: '画面の端にデンジャーゾーンが出現',
  description: 'ゾーン内をクリックしたら即死！赤い端には近づくな！',
  apply(scene, onViolation) {
    const ZONE_SIZE = 60
    const zones = [
      { x: ZONE_SIZE / 2, y: GAME_WIDTH / 2 + 60, w: ZONE_SIZE, h: 280 },
      { x: GAME_WIDTH - ZONE_SIZE / 2, y: GAME_WIDTH / 2 + 60, w: ZONE_SIZE, h: 280 },
    ]
    const rects = zones.map(z => {
      const r = scene.add.rectangle(z.x, z.y, z.w, z.h, 0xff0000, 0.13)
      r.setStrokeStyle(2, 0xff2d78, 0.5)
      return r
    })
    const labels = zones.map(z =>
      scene.add.text(z.x, z.y, '⚠', {
        fontFamily: 'monospace', fontSize: '18px', color: '#ff2d78', alpha: 0.7,
      }).setOrigin(0.5).setAlpha(0.6)
    )

    let active = true
    const ptrHandler = (pointer) => {
      if (!active || scene.isFailed || scene.isTransitioning) return
      const world = scene.cameras.main.getWorldPoint(pointer.x, pointer.y)
      let { x, y } = world
      if (scene.transformPointerCoords) ({ x, y } = scene.transformPointerCoords(x, y))
      for (const z of zones) {
        if (x >= z.x - z.w / 2 && x <= z.x + z.w / 2 &&
            y >= z.y - z.h / 2 && y <= z.y + z.h / 2) {
          onViolation()
          return
        }
      }
    }
    scene.input.on('pointerdown', ptrHandler)

    return () => {
      active = false
      rects.forEach(r => r.destroy())
      labels.forEach(l => l.destroy())
      scene.input.off('pointerdown', ptrHandler)
    }
  },
}
