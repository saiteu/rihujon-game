import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'leftSpawn',
  name: 'ボタンが左側にしか出ない',
  description: '左だけ！右は関係ない！',
  incompatibleWith: ['topSpawn', 'bottomSpawn', 'rightSpawn', 'centerSpawn'],
  apply(scene) {
    scene.spawnBias = { x1: 60, y1: 200, x2: GAME_WIDTH / 2 - 20, y2: 444 }
    return () => { scene.spawnBias = null }
  },
}
