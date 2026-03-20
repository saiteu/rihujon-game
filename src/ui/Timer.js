import { COLORS } from '../config.js'

const TIME_LIMIT = 10

export default class Timer {
  constructor(scene, onTimeUp) {
    this.scene = scene
    this.onTimeUp = onTimeUp
    this.remaining = TIME_LIMIT
    this.active = true

    const cx = scene.scale.width / 2

    // バー背景
    this.barBg = scene.add.rectangle(cx, 120, 340, 12, COLORS.dark)
    this.barBg.setStrokeStyle(1, COLORS.gray, 0.5)

    // バー本体
    this.bar = scene.add.rectangle(cx - 170, 120, 340, 12, COLORS.neonCyan)
    this.bar.setOrigin(0, 0.5)

    // 残り秒数テキスト
    this.text = scene.add.text(cx, 102, `${TIME_LIMIT}.0s`, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#00fff5',
    }).setOrigin(0.5)

    // タイマーイベント（100ms刻み）
    this._event = scene.time.addEvent({
      delay: 100,
      repeat: TIME_LIMIT * 10 - 1,
      callback: () => this._tick(),
    })
  }

  _tick() {
    if (!this.active) return
    this.remaining = Math.max(0, this.remaining - 0.1)

    const ratio = this.remaining / TIME_LIMIT
    this.bar.width = 340 * ratio

    // 残り3秒以下で赤
    const color = this.remaining <= 3 ? COLORS.neonPink : COLORS.neonCyan
    this.bar.setFillStyle(color)
    this.text.setColor(this.remaining <= 3 ? '#ff2d78' : '#00fff5')
    this.text.setText(`${this.remaining.toFixed(1)}s`)

    if (this.remaining <= 0) {
      this.active = false
      this.onTimeUp()
    }
  }

  reset() {
    this.remaining = TIME_LIMIT
    this.active = true
    this.bar.width = 340
    this.bar.setFillStyle(COLORS.neonCyan)
    this.text.setColor('#00fff5')
    this.text.setText(`${TIME_LIMIT}.0s`)
    this._event.reset({ delay: 100, repeat: TIME_LIMIT * 10 - 1, callback: () => this._tick() })
  }

  stop() {
    this.active = false
    this._event.remove()
  }

  destroy() {
    this.stop()
    ;[this.barBg, this.bar, this.text].forEach(o => o.destroy())
  }
}
