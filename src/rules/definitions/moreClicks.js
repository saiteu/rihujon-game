import { GAME_WIDTH } from '../../config.js'

export default {
  id: 'moreClicks',
  name: '10回クリックしないと次に進めない',
  description: 'クリック必要回数が10回に増加！狂ってる！',
  incompatibleWith: ['manyClicks'],
  apply(scene, onViolation) {
    scene.clickTargetOverride = 10

    const badge = scene.add.text(GAME_WIDTH / 2, 160, '必要クリック: 10回', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ff2d78',
    }).setOrigin(0.5)

    return () => {
      scene.clickTargetOverride = null
      badge.destroy()
    }
  },
}
