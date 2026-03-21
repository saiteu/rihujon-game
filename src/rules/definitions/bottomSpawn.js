import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'bottomSpawn',
  name: 'ボタンが下側にしか出ない',
  description: '下だけ！上を見ても無駄！',
  incompatibleWith: ['topSpawn', 'leftSpawn', 'rightSpawn', 'centerSpawn'],
  apply(scene) {
    scene.spawnBias = { x1: 60, y1: 370, x2: GAME_WIDTH - 60, y2: 444 }
    return () => { scene.spawnBias = null }
  },
}
