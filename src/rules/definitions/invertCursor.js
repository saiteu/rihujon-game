import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../../config.js'

export default {
  id: 'invertCursor',
  name: 'カーソルが逆方向に動く',
  description: 'マウスと逆にカーソルが動く！脳を逆転させろ！',
  apply(scene, onViolation) {
    scene.sys.game.canvas.style.cursor = 'none'

    // Fake cursor (arrow shape via triangle)
    const cur = scene.add.graphics().setDepth(1000)
    const drawCursor = (x, y) => {
      cur.clear()
      cur.fillStyle(COLORS.neonYellow, 1)
      cur.fillTriangle(x, y, x + 14, y + 18, x, y + 22)
      cur.fillStyle(COLORS.dark, 1)
      cur.fillTriangle(x + 2, y + 4, x + 11, y + 17, x + 2, y + 19)
    }

    // Mirror both axes around center
    scene.transformPointerCoords = (x, y) => ({
      x: GAME_WIDTH - x,
      y: GAME_HEIGHT - y,
    })

    const onUpdate = () => {
      const ptr = scene.input.activePointer
      const fx = GAME_WIDTH - ptr.x
      const fy = GAME_HEIGHT - ptr.y
      drawCursor(fx, fy)
    }

    scene.events.on('update', onUpdate)

    return () => {
      scene.sys.game.canvas.style.cursor = 'default'
      cur.destroy()
      scene.transformPointerCoords = null
      scene.events.off('update', onUpdate)
    }
  },
}
