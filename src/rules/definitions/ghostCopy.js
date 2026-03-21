import { COLORS } from '../../config.js'
export default {
  id: 'ghostCopy',
  name: 'ボタンの幻影が表示される',
  description: '本物と偽物どっちだ！幻に惑わされるな！',
  incompatibleWith: ['fakeButtons', 'tripleDecoy', 'transparent'],
  apply(scene) {
    let ghost = null, ghostLabel = null, trackEv = null
    const onSpawned = ({ button }) => {
      if (ghost) ghost.destroy()
      if (ghostLabel) ghostLabel.destroy()
      if (trackEv) { scene.events.off('update', trackEv); trackEv = null }
      const ox = 90, oy = -30
      ghost = scene.add.circle(button.x + ox, button.y + oy, 36, 0x00fff5, 0.12).setStrokeStyle(2, 0x00fff5, 0.3).setDepth(0)
      ghostLabel = scene.add.text(button.x + ox, button.y + oy, 'CLICK', {
        fontFamily: 'monospace', fontSize: '12px', color: '#00fff5', alpha: 0.3,
      }).setOrigin(0.5).setAlpha(0.3).setDepth(0)
      trackEv = () => {
        if (button.active) {
          ghost.x = button.x + ox; ghost.y = button.y + oy
          ghostLabel.x = button.x + ox; ghostLabel.y = button.y + oy
        }
      }
      scene.events.on('update', trackEv)
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      if (ghost) ghost.destroy()
      if (ghostLabel) ghostLabel.destroy()
      if (trackEv) scene.events.off('update', trackEv)
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
