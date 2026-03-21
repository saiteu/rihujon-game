import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'redOverlay',
  name: '薄い赤いフィルターがかかる',
  description: '血の色！？落ち着け！',
  incompatibleWith: ['blueOverlay', 'colorBan'],
  apply(scene) {
    const rect = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xff0000, 0.1).setDepth(2)
    return () => rect.destroy()
  },
}
