class SoundManager {
  constructor() {
    this._ctx = null
    this.muted = false
  }

  _getCtx() {
    if (this.muted) return null
    try {
      if (!this._ctx) {
        this._ctx = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (this._ctx.state === 'suspended') this._ctx.resume()
      return this._ctx
    } catch {
      return null
    }
  }

  // Core: play a single note (uses Web Audio scheduler for precise timing)
  _note(freq, duration, type = 'sine', volume = 0.25, delay = 0) {
    const ctx = this._getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + delay
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(0.001, t)
    gain.gain.linearRampToValueAtTime(volume, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
    osc.start(t)
    osc.stop(t + duration + 0.05)
  }

  // Core: frequency sweep
  _sweep(freqStart, freqEnd, duration, type = 'sawtooth', volume = 0.2, delay = 0) {
    const ctx = this._getCtx()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t = ctx.currentTime + delay
    osc.type = type
    osc.frequency.setValueAtTime(freqStart, t)
    osc.frequency.exponentialRampToValueAtTime(freqEnd, t + duration)
    gain.gain.setValueAtTime(volume, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration)
    osc.start(t)
    osc.stop(t + duration + 0.05)
  }

  // ── SE definitions ─────────────────────────────────────────

  click() {
    this._note(900, 0.07, 'square', 0.15)
    this._note(1200, 0.05, 'square', 0.08, 0.03)
  }

  go() {
    // Quick ascending blip
    this._note(660, 0.1, 'sine', 0.25)
    this._note(880, 0.15, 'sine', 0.3, 0.1)
  }

  clear() {
    // Ascending arpeggio (C major chord)
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => this._note(freq, 0.18, 'sine', 0.22, i * 0.09))
  }

  ruleAdd() {
    // Dramatic two-hit sting
    this._note(440, 0.08, 'square', 0.25)
    this._note(880, 0.25, 'square', 0.3, 0.12)
    this._note(660, 0.3, 'sine', 0.2, 0.18)
  }

  ruleSwap() {
    // Ascending sweep + hit
    this._sweep(150, 1200, 0.3, 'sine', 0.2)
    this._note(1000, 0.2, 'square', 0.25, 0.28)
  }

  tick() {
    // Sharp warning beep
    this._note(1400, 0.06, 'square', 0.18)
  }

  violation() {
    // Descending buzz
    this._sweep(400, 60, 0.45, 'sawtooth', 0.3)
    this._note(120, 0.4, 'square', 0.15, 0.05)
  }

  gameOver() {
    // Descending tones
    const notes = [440, 370, 294, 220, 147]
    notes.forEach((freq, i) => this._note(freq, 0.3, 'sawtooth', 0.2, i * 0.13))
  }

  toggleMute() {
    this.muted = !this.muted
    return this.muted
  }
}

// Singleton
export const sfx = new SoundManager()
