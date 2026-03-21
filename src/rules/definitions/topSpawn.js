import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'topSpawn',
  name: 'ボタンが上側にしか出ない',
  description: '上だけ！下を見ても無駄！',
  incompatibleWith: ['bottomSpawn', 'leftSpawn', 'rightSpawn', 'centerSpawn'],
  apply(scene) {
    scene.spawnBias = { x1: 60, y1: 200, x2: GAME_WIDTH - 60, y2: 290 }
    return () => { scene.spawnBias = null }
  },
}
