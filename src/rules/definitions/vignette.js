import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'vignette',
  name: '画面の端が暗くなる',
  description: 'トンネルビジョン！中央しか見えない！',
  apply(scene) {
    const g = scene.add.graphics().setDepth(50)
    const alpha = 0.55
    g.fillStyle(0x000000, alpha)
    g.fillRect(0, 0, GAME_WIDTH, 90)
    g.fillRect(0, GAME_HEIGHT - 90, GAME_WIDTH, 90)
    g.fillRect(0, 0, 70, GAME_HEIGHT)
    g.fillRect(GAME_WIDTH - 70, 0, 70, GAME_HEIGHT)
    return () => g.destroy()
  },
}
