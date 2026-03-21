import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'centerSpawn',
  name: 'ボタンが中央付近にしか出ない',
  description: '中央に集中！でも狭い！',
  incompatibleWith: ['topSpawn', 'bottomSpawn', 'leftSpawn', 'rightSpawn'],
  apply(scene) {
    scene.spawnBias = { x1: GAME_WIDTH / 2 - 70, y1: 260, x2: GAME_WIDTH / 2 + 70, y2: 360 }
    return () => { scene.spawnBias = null }
  },
}
