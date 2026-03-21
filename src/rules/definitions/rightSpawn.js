import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'rightSpawn',
  name: 'ボタンが右側にしか出ない',
  description: '右だけ！左は関係ない！',
  incompatibleWith: ['topSpawn', 'bottomSpawn', 'leftSpawn', 'centerSpawn'],
  apply(scene) {
    scene.spawnBias = { x1: GAME_WIDTH / 2 + 20, y1: 200, x2: GAME_WIDTH - 60, y2: 444 }
    return () => { scene.spawnBias = null }
  },
}
