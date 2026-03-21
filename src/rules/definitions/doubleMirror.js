import { GAME_WIDTH, GAME_HEIGHT } from '../../config.js'
export default {
  id: 'doubleMirror',
  name: '上下左右すべて反転する',
  description: 'もう何も信じられない！全部逆！',
  incompatibleWith: ['upsideDown', 'mirrorFlip', 'mirrorVertical', 'screenRotate', 'spinCamera', 'driftInput', 'chaosInput'],
  apply(scene) {
    scene.sys.game.canvas.style.transform = 'scale(-1,-1)'
    scene.transformPointerCoords = (x, y) => ({ x: GAME_WIDTH - x, y: GAME_HEIGHT - y })
    return () => {
      scene.sys.game.canvas.style.transform = ''
      scene.transformPointerCoords = null
    }
  },
}
