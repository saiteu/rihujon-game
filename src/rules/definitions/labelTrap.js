import { COLORS } from '../../config.js'

export default {
  id: 'labelTrap',
  name: 'ボタンが「押すな！」と言っている',
  description: '書いてあることを無視して押せ！罠だ！',
  incompatibleWith: ['earlyClickBan', 'colorBan'],
  apply(scene, onViolation) {
    const onSpawned = ({ button, label }) => {
      label.setText('押すな！').setColor('#ff2d78').setFontSize('10px')
      button.setStrokeStyle(3, COLORS.neonPink)
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
