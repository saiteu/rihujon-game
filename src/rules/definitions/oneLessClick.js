import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'oneLessClick',
  name: 'クリック回数が1回減る（4回）',
  description: '少ない！でもこれで得してる？本当に？',
  incompatibleWith: ['oneMoreClick', 'manyClicks', 'moreClicks', 'nineClicks'],
  apply(scene) {
    scene.clickTargetOverride = 4
    const badge = scene.add.text(GAME_WIDTH / 2, 160, '必要クリック: 4回', {
      fontFamily: 'monospace', fontSize: '13px', color: '#39ff14',
    }).setOrigin(0.5)
    return () => { scene.clickTargetOverride = null; badge.destroy() }
  },
}
