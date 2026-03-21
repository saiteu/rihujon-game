import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../../config.js'

const MARGIN = 65

export default {
  id: 'noClickEdge',
  name: '画面の端をクリックすると失敗',
  description: `端から${MARGIN}px以内をクリックしたら失敗！`,
  incompatibleWith: [],
  apply(scene, onViolation) {
    const g = scene.add.graphics()
    g.lineStyle(2, COLORS.neonPink, 0.5)
    g.strokeRect(MARGIN, MARGIN, GAME_WIDTH - MARGIN * 2, GAME_HEIGHT - MARGIN * 2)
    // X marks in corners
    const cornerAlpha = 0.25
    ;[
      [MARGIN / 2, MARGIN / 2],
      [GAME_WIDTH - MARGIN / 2, MARGIN / 2],
      [MARGIN / 2, GAME_HEIGHT - MARGIN / 2],
      [GAME_WIDTH - MARGIN / 2, GAME_HEIGHT - MARGIN / 2],
    ].forEach(([cx, cy]) => {
      scene.add.text(cx, cy, '✕', {
        fontFamily: 'monospace', fontSize: '22px', color: '#ff2d78',
      }).setOrigin(0.5).setAlpha(cornerAlpha)
    })

    const validator = ({ x, y }) => {
      if (x < MARGIN || x > GAME_WIDTH - MARGIN || y < MARGIN || y > GAME_HEIGHT - MARGIN) {
        return 'violation'
      }
    }
    scene.clickValidators.push(validator)

    // Also bias button spawning away from edges
    scene.spawnBias = {
      x1: MARGIN + 46, y1: Math.max(196, MARGIN + 46),
      x2: GAME_WIDTH - MARGIN - 46, y2: Math.min(444, GAME_HEIGHT - MARGIN - 46),
    }

    return () => {
      g.destroy()
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
      scene.spawnBias = null
    }
  },
}
