import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'nineClicks',
  name: '9回クリックしないと次に進めない',
  description: 'クリック必要回数が9回に増加！気が遠くなる！',
  incompatibleWith: ['manyClicks', 'moreClicks', 'oneMoreClick', 'oneLessClick'],
  apply(scene) {
    scene.clickTargetOverride = 9
    const badge = scene.add.text(GAME_WIDTH / 2, 172, '必要クリック: 9回', {
      fontFamily: 'monospace', fontSize: '13px', color: '#ff2d78',
    }).setOrigin(0.5)
    return () => { scene.clickTargetOverride = null; badge.destroy() }
  },
}
