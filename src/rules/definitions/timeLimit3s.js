import { GAME_WIDTH, COLORS } from '../../config.js'
export default {
  id: 'timeLimit3s',
  name: '3秒以内にクリックしないと失敗',
  description: 'クリックするたびに3秒リセット！速攻で押せ！',
  incompatibleWith: ['timeLimit5s', 'clickTimeout'],
  apply(scene, onViolation) {
    const LIMIT = 3
    let remaining = LIMIT, violated = false, ticker = null
    const countText = scene.add.text(GAME_WIDTH - 16, 150, `${LIMIT}.0s`, {
      fontFamily: 'monospace', fontSize: '26px', color: '#ff2d78', fontStyle: 'bold',
    }).setOrigin(1, 0)
    const startTicker = () => {
      if (ticker) ticker.remove()
      remaining = LIMIT
      countText.setText(`${LIMIT}.0s`).setColor('#ff2d78')
      ticker = scene.time.addEvent({
        delay: 100, repeat: LIMIT * 10 - 1,
        callback: () => {
          if (violated) return
          remaining = Math.max(0, remaining - 0.1)
          countText.setText(`${remaining.toFixed(1)}s`)
          if (remaining <= 0.05) { violated = true; onViolation() }
        },
      })
    }
    startTicker()
    scene.events.on('task:clicked', startTicker)
    scene.events.on('task:buttonspawned', startTicker)
    return () => {
      violated = true
      if (ticker) ticker.remove()
      countText.destroy()
      scene.events.off('task:clicked', startTicker)
      scene.events.off('task:buttonspawned', startTicker)
    }
  },
}
