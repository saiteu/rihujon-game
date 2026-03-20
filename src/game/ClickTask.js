import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'

export const CLICK_TARGET = 3
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
    this._ptrMove = (ptr) => this._handlePointerMove(ptr)
    scene.input.on('pointerdown', this._ptrDown)
    scene.input.on('pointermove', this._ptrMove)

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

    this.buttonGlow = this.scene.add.circle(x, y, 46, COLORS.neonCyan, 0.15)
    this.button = this.scene.add.circle(x, y, BUTTON_RADIUS, COLORS.dark)
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
    if (this.scene.transformPointerCoords) {
      return this.scene.transformPointerCoords(pointer.x, pointer.y)
    }
    return { x: pointer.x, y: pointer.y }
  }

  _handlePointerDown(pointer) {
    if (!this.button) return
    const { x, y } = this._transformCoords(pointer)
    const dist = Phaser.Math.Distance.Between(x, y, this.button.x, this.button.y)
    if (dist > BUTTON_RADIUS) return

    // Run validators
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
    const isHover = dist <= BUTTON_RADIUS
    this.button.setFillStyle(isHover
      ? (this.isDanger ? 0x220011 : 0x003333)
      : COLORS.dark
    )
  }

  _registerClick(x, y) {
    this.clickCount++
    this.scene.events.emit('task:clicked', { count: this.clickCount, task: this })
    this._spawnClickEffect(x, y)

    if (this.clickCount >= CLICK_TARGET) {
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

  getClickCount() { return this.clickCount }
  getTargetCount() { return CLICK_TARGET }

  destroy() {
    this._destroyButton()
    this.scene.input.off('pointerdown', this._ptrDown)
    this.scene.input.off('pointermove', this._ptrMove)
  }
}
