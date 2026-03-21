import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'scanlines',
  name: 'スキャンライン効果がかかる',
  description: '古いモニターみたい！見づらい！',
  apply(scene) {
    const g = scene.add.graphics().setDepth(50).setAlpha(0.25)
    g.lineStyle(1, 0x000000, 1)
    for (let y = 0; y < GAME_HEIGHT; y += 4) {
      g.lineBetween(0, y, GAME_WIDTH, y)
    }
    return () => g.destroy()
  },
}
