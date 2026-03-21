import { GAME_WIDTH } from '../../config.js'

export const MANY_CLICKS_TARGET = 7

export default {
  id: 'manyClicks',
  name: '7回クリックしないと次に進めない',
  description: 'クリック必要回数が5→7に増加！',
  incompatibleWith: ['moreClicks'],
  apply(scene, onViolation) {
    scene.clickTargetOverride = MANY_CLICKS_TARGET

    const badge = scene.add.text(GAME_WIDTH / 2, 148, '必要クリック: 7回', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ffe600',
    }).setOrigin(0.5)

    return () => {
      scene.clickTargetOverride = null
      badge.destroy()
    }
  },
}
