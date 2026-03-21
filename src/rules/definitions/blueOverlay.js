import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'blueOverlay',
  name: '薄い青いフィルターがかかる',
  description: '青いかぶりが気になって仕方ない！',
  incompatibleWith: ['redOverlay'],
  apply(scene) {
    const rect = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x0044ff, 0.12).setDepth(2)
    return () => rect.destroy()
  },
}
