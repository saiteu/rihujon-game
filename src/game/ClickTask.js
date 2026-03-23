import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'
import { burstParticles } from '../ui/Effects.js'
import { sfx } from '../audio/SoundManager.js'

export const CLICK_TARGET = 5
const BUTTON_RADIUS = 36

// Default spawn area (task frame: center y=310, h=340 → 140 to 480)
const DEFAULT_SPAWN = { x1: 56, y1: 196, x2: GAME_WIDTH - 56, y2: 444 }

export default class ClickTask {
  constructor(scene, onComplete, onFail) {
    this.scene = scene
    this.onComplete = onComplete
    this.onFail = onFail
    this.clickCount = 0
    this.isDanger = false
    this.button = null
    this.buttonGlow = null
    this.label = null
    this._pulse = null

    this._ptrDown = (ptr) => this._handlePointerDown(ptr)
    this._ptrUp   = (ptr) => this._handlePointerUp(ptr)
    this._ptrMove = (ptr) => this._handlePointerMove(ptr)
    scene.input.on('pointerdown', this._ptrDown)
    scene.input.on('pointerup', this._ptrUp)
    scene.input.on('pointermove', this._ptrMove)
    this._holdStart = null

    this._spawnButton()
  }

  _randomPos() {
    const area = this.scene.spawnBias || DEFAULT_SPAWN
    return {
      x: Phaser.Math.Between(area.x1, area.x2),
      y: Phaser.Math.Between(area.y1, area.y2),
    }
  }

  _spawnButton() {
    this._destroyButton()
    this.isDanger = false

    const { x, y } = this._randomPos()

    const r = this._radius
    this.buttonGlow = this.scene.add.circle(x, y, r + 10, COLORS.neonCyan, 0.15)
    this.button = this.scene.add.circle(x, y, r, COLORS.dark)
    this.button.setStrokeStyle(3, COLORS.neonCyan)
    this.label = this.scene.add.text(x, y, 'CLICK', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#00fff5',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    // Appear
    ;[this.button, this.buttonGlow, this.label].forEach(o => o.setScale(0))
    this.scene.tweens.add({
      targets: [this.button, this.buttonGlow, this.label],
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut',
    })

    // Pulse
    this._pulse = this.scene.tweens.add({
      targets: this.buttonGlow,
      scale: 1.3,
      alpha: 0,
      duration: 900,
      repeat: -1,
    })

    this.scene.events.emit('task:buttonspawned', {
      button: this.button,
      glow: this.buttonGlow,
      label: this.label,
      task: this,
    })
  }

  _transformCoords(pointer) {
    // Convert screen coords → world coords (fixes camera rotation breaking hit detection)
    const world = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y)
    let { x, y } = world
    if (this.scene.transformPointerCoords) {
      ({ x, y } = this.scene.transformPointerCoords(x, y))
    }
    return { x, y }
  }

  _handlePointerDown(pointer) {
    if (!this.button) return
    const { x, y } = this._transformCoords(pointer)
    const dist = Phaser.Math.Distance.Between(x, y, this.button.x, this.button.y)

    // Hold mode: track press start, defer click to pointerup
    if (this.scene.holdMode) {
      if (dist > this._radius) { this._holdStart = null; return }
      this._holdStart = { x, y, t: this.scene.time.now }
      this.button.setFillStyle(0x003322) // visual feedback: "pressing"
      return
    }

    if (dist > this._radius) return

    // Normal mode: run validators and register immediately
    for (const validator of (this.scene.clickValidators || [])) {
      const result = validator({ x, y }, this)
      if (result === 'violation') { this.onFail(); return }
      if (result === 'block') return
    }

    this._registerClick(x, y)
  }

  _handlePointerUp(_pointer) {
    if (!this.scene.holdMode || !this._holdStart || !this.button) {
      this._holdStart = null
      return
    }
    const held = this.scene.time.now - this._holdStart.t
    const { x, y } = this._holdStart
    this._holdStart = null
    this.button.setFillStyle(COLORS.dark)

    if (held < 800) return // Released too early — no violation, just miss

    for (const validator of (this.scene.clickValidators || [])) {
      const result = validator({ x, y }, this)
      if (result === 'violation') { this.onFail(); return }
      if (result === 'block') return
    }
    this._registerClick(x, y)
  }

  _handlePointerMove(pointer) {
    if (!this.button) return
    const { x, y } = this._transformCoords(pointer)
    const dist = Phaser.Math.Distance.Between(x, y, this.button.x, this.button.y)
    const isHover = dist <= this._radius
    this.button.setFillStyle(isHover
      ? (this.isDanger ? 0x220011 : 0x003333)
      : COLORS.dark
    )
  }

  _registerClick(x, y) {
    this.clickCount++
    sfx.click()
    this.scene.events.emit('task:clicked', { count: this.clickCount, task: this })
    this._spawnClickEffect(x, y)
    burstParticles(this.scene, x, y, COLORS.neonCyan, 10)

    if (this.clickCount >= this._clickTarget) {
      this._destroyButton()
      this.onComplete()
    } else {
      this._spawnButton()
    }
  }

  _spawnClickEffect(x, y) {
    const ring = this.scene.add.circle(x, y, BUTTON_RADIUS, 0, 0)
    ring.setStrokeStyle(3, COLORS.neonCyan)
    this.scene.tweens.add({
      targets: ring,
      scale: 2.5,
      alpha: 0,
      duration: 400,
      onComplete: () => ring.destroy(),
    })
  }

  _destroyButton() {
    if (this._pulse) { this._pulse.stop(); this._pulse = null }
    ;[this.button, this.buttonGlow, this.label].forEach(o => { if (o) o.destroy() })
    this.button = null
    this.buttonGlow = null
    this.label = null
  }

  get _radius() {
    return this.scene.buttonRadiusOverride || BUTTON_RADIUS
  }

  get _clickTarget() {
    return this.scene.clickTargetOverride || CLICK_TARGET
  }

  getClickCount() { return this.clickCount }
  getTargetCount() { return this._clickTarget }

  destroy() {
    this._destroyButton()
    this.scene.input.off('pointerdown', this._ptrDown)
    this.scene.input.off('pointerup', this._ptrUp)
    this.scene.input.off('pointermove', this._ptrMove)
  }
}
