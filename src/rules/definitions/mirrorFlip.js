import { GAME_WIDTH } from '../../config.js'

export default {
  id: 'mirrorFlip',
  name: '画面が左右反転する',
  description: '左右が逆！脳がバグる！',
  incompatibleWith: ['upsideDown', 'screenRotate', 'buttonFlees'],
  apply(scene, onViolation) {
    scene.sys.game.canvas.style.transform = 'scaleX(-1)'
    scene.transformPointerCoords = (x, y) => ({ x: GAME_WIDTH - x, y })

    return () => {
      scene.sys.game.canvas.style.transform = ''
      scene.transformPointerCoords = null
    }
  },
}
