import { COLORS } from '../config.js'
import { sfx } from '../audio/SoundManager.js'

export default class Timer {
  constructor(scene, duration, onTimeUp) {
    this.scene = scene
    this.duration = duration   // seconds
    this.onTimeUp = onTimeUp
    this.active = true
    this._totalTicks = Math.round(duration * 10)
    this._tickCount = 0

    const cx = scene.scale.width / 2

    // バー背景
    this.barBg = scene.add.rectangle(cx, 120, 340, 12, COLORS.dark)
    this.barBg.setStrokeStyle(1, COLORS.gray, 0.5)

    // バー本体
    this.bar = scene.add.rectangle(cx - 170, 120, 340, 12, COLORS.neonCyan)
    this.bar.setOrigin(0, 0.5)

    // 残り秒数テキスト
    this.text = scene.add.text(cx, 102, `${duration.toFixed(1)}s`, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#00fff5',
    }).setOrigin(0.5)

    // タイマーイベント（100ms刻み、+1で浮動小数点ドリフトのセーフティネット）
    this._event = scene.time.addEvent({
      delay: 100,
      repeat: this._totalTicks,
      callback: () => this._tick(),
    })
  }

  _tick() {
    if (!this.active) return
    this._tickCount++

    // ティックカウントベースで残り時間を計算（累積浮動小数点誤差を回避）
    const remaining = Math.max(0, this.duration - this._tickCount * 0.1)

    const ratio = remaining / this.duration
    this.bar.width = 340 * ratio

    // 残り3秒以下で赤 + tick SE（1秒刻みのみ）
    const color = remaining <= 3 ? COLORS.neonPink : COLORS.neonCyan
    this.bar.setFillStyle(color)
    this.text.setColor(remaining <= 3 ? '#ff2d78' : '#00fff5')
    this.text.setText(`${remaining.toFixed(1)}s`)
    if (remaining <= 3 && remaining > 0) {
      const prevRemaining = Math.max(0, this.duration - (this._tickCount - 1) * 0.1)
      if (Math.ceil(remaining) < Math.ceil(prevRemaining)) sfx.tick()
    }

    // 整数ティック比較で確実に発火（浮動小数点に依存しない）
    if (this._tickCount >= this._totalTicks) {
      this.active = false
      this.onTimeUp()
    }
  }

  reset() {
    this._tickCount = 0
    this.active = true
    this.bar.width = 340
    this.bar.setFillStyle(COLORS.neonCyan)
    this.text.setColor('#00fff5')
    this.text.setText(`${this.duration.toFixed(1)}s`)
    this._event.reset({ delay: 100, repeat: this._totalTicks, callback: () => this._tick() })
  }

  // Drain seconds from remaining time (e.g. penalty per click)
  drain(seconds) {
    this._tickCount = Math.min(this._totalTicks, this._tickCount + Math.round(seconds * 10))
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
