import { GAME_HEIGHT } from '../../config.js'
export default {
  id: 'mirrorVertical',
  name: '画面が上下反転する',
  description: '上下逆！天地がひっくり返った！',
  incompatibleWith: ['upsideDown', 'mirrorFlip', 'doubleMirror', 'screenRotate', 'spinCamera', 'driftInput', 'chaosInput'],
  apply(scene) {
    scene.sys.game.canvas.style.transform = 'scaleY(-1)'
    scene.transformPointerCoords = (x, y) => ({ x, y: GAME_HEIGHT - y })
    return () => {
      scene.sys.game.canvas.style.transform = ''
      scene.transformPointerCoords = null
    }
  },
}
