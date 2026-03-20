import { GAME_WIDTH, COLORS } from '../../config.js'

const LIMIT = 5

export default {
  id: 'timeLimit5s',
  name: '5秒以内にクリックしないと失敗',
  description: 'クリックするたびに5秒リセット！時間切れで即死！',
  apply(scene, onViolation) {
    let remaining = LIMIT
    let violated = false
    let ticker = null

    const countText = scene.add.text(GAME_WIDTH - 16, 150, `5.0s`, {
      fontFamily: 'monospace',
      fontSize: '26px',
      color: '#ffe600',
      fontStyle: 'bold',
    }).setOrigin(1, 0)

    const startTicker = () => {
      if (ticker) ticker.remove()
      remaining = LIMIT
      countText.setText(`${LIMIT}.0s`).setColor('#ffe600')
      ticker = scene.time.addEvent({
        delay: 100,
        repeat: LIMIT * 10 - 1,
        callback: () => {
          if (violated) return
          remaining = Math.max(0, remaining - 0.1)
          countText.setText(`${remaining.toFixed(1)}s`)
          if (remaining <= 2) countText.setColor('#ff2d78')
          if (remaining <= 0.05) {
            violated = true
            onViolation()
          }
        },
      })
    }

    startTicker()

    const onClicked = () => startTicker()
    scene.events.on('task:clicked', onClicked)

    return () => {
      violated = true
      if (ticker) ticker.remove()
      countText.destroy()
      scene.events.off('task:clicked', onClicked)
    }
  },
}
