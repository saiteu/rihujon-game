import { GAME_WIDTH, COLORS } from '../../config.js'

export default {
  id: 'rightHalfOnly',
  name: '右半分しかクリックできない',
  description: '左半分をクリックしたら即失敗！',
  apply(scene, onViolation) {
    // Bias button spawn to right half
    scene.spawnBias = { x1: GAME_WIDTH / 2 + 46, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

    const validator = ({ x }) => {
      if (x < GAME_WIDTH / 2) return 'violation'
    }
    scene.clickValidators.push(validator)

    // Visual divider
    const line = scene.add.rectangle(GAME_WIDTH / 2, 310, 2, 340, COLORS.neonPink, 0.6)
    const banText = scene.add.text(GAME_WIDTH / 4, 310, '✕\nNG', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#ff2d78',
      align: 'center',
    }).setOrigin(0.5).setAlpha(0.3)

    return () => {
      scene.spawnBias = null
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
      line.destroy()
      banText.destroy()
    }
  },
}
