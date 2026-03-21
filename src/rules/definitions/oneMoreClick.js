import { GAME_WIDTH } from '../../config.js'
export default {
  id: 'oneMoreClick',
  name: 'クリック回数が1回増える（6回）',
  description: 'あと1回多く押さないといけない！',
  incompatibleWith: ['oneLessClick', 'manyClicks', 'moreClicks', 'nineClicks'],
  apply(scene) {
    scene.clickTargetOverride = 6
    const badge = scene.add.text(GAME_WIDTH / 2, 160, '必要クリック: 6回', {
      fontFamily: 'monospace', fontSize: '13px', color: '#ffe600',
    }).setOrigin(0.5)
    return () => { scene.clickTargetOverride = null; badge.destroy() }
  },
}
