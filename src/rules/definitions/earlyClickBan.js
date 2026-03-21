import { COLORS } from '../../config.js'

const WAIT_MS = 900

export default {
  id: 'earlyClickBan',
  name: '準備完了前に押すと失敗',
  description: 'ボタンが光るまで待て！焦ったら即失敗！',
  incompatibleWith: ['timeLimit5s'],
  apply(scene, onViolation) {
    let ready = false
    let readyTimer = null

    const onSpawned = ({ button, label }) => {
      ready = false
      if (readyTimer) readyTimer.remove()
      button.setStrokeStyle(3, COLORS.neonPink)
      label.setText('WAIT...')

      readyTimer = scene.time.delayedCall(WAIT_MS, () => {
        if (!button.active) return
        ready = true
        button.setStrokeStyle(3, COLORS.neonCyan)
        label.setText('NOW!')
      })
    }

    scene.events.on('task:buttonspawned', onSpawned)

    const validator = () => {
      if (!ready) return 'violation'
    }
    scene.clickValidators.push(validator)

    return () => {
      if (readyTimer) readyTimer.remove()
      scene.events.off('task:buttonspawned', onSpawned)
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
    }
  },
}
