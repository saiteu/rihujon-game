import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS, FONT } from '../config.js'

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  create() {
    this._createBackground()
    this._createTitle()
    this._createDescription()
    this._createStartButton()
  }

  _createBackground() {
    // グリッド線（ネオン感）
    const graphics = this.add.graphics()
    graphics.lineStyle(1, COLORS.neonCyan, 0.08)

    for (let x = 0; x < GAME_WIDTH; x += 40) {
      graphics.lineBetween(x, 0, x, GAME_HEIGHT)
    }
    for (let y = 0; y < GAME_HEIGHT; y += 40) {
      graphics.lineBetween(0, y, GAME_WIDTH, y)
    }

    // 中央の光
    const glow = this.add.graphics()
    glow.fillStyle(COLORS.neonCyan, 0.04)
    glow.fillCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 200)
  }

  _createTitle() {
    const cx = GAME_WIDTH / 2

    // Tagline above
    this.add.text(cx, 175, '— INSANE RULE STACKING —', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#ff2d78',
      letterSpacing: 3,
    }).setOrigin(0.5)

    // Main title
    const title = this.add.text(cx, 235, 'CLICK HELL', {
      fontFamily: 'monospace',
      fontSize: '52px',
      color: '#00fff5',
      fontStyle: 'bold',
      stroke: '#003344',
      strokeThickness: 8,
    }).setOrigin(0.5)

    // Subtitle
    const sub = this.add.text(cx, 295, '理不尽ルール追加系', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5)

    this.tweens.add({
      targets: title,
      alpha: 0.75,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    this.tweens.add({
      targets: sub,
      y: 300,
      duration: 2200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  _createDescription() {
    const lines = [
      'クリアするたびに',
      '理不尽なルールが追加されていく！',
      '',
      'ルールに耐え続けろ。限界まで。',
    ]

    lines.forEach((line, i) => {
      this.add.text(GAME_WIDTH / 2, 365 + i * 26, line, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: i === 1 ? '#ffe600' : i === 3 ? '#ff2d78' : '#aaaacc',
      }).setOrigin(0.5)
    })
  }

  _createStartButton() {
    const cx = GAME_WIDTH / 2
    const cy = 535

    const bg = this.add.rectangle(cx, cy, 240, 58, COLORS.neonPink, 0.15)
    const border = this.add.rectangle(cx, cy, 240, 58)
    border.setStrokeStyle(2, COLORS.neonPink, 1)

    const label = this.add.text(cx, cy, 'PLAY', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#ff2d78',
      fontStyle: 'bold',
      letterSpacing: 8,
    }).setOrigin(0.5)

    this.tweens.add({
      targets: [border, label],
      alpha: 0.3,
      duration: 750,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    const hitArea = this.add.rectangle(cx, cy, 240, 58).setInteractive({ useHandCursor: true })

    hitArea.on('pointerover', () => {
      bg.setFillStyle(COLORS.neonPink, 0.35)
      label.setColor('#ffffff')
    })

    hitArea.on('pointerout', () => {
      bg.setFillStyle(COLORS.neonPink, 0.15)
      label.setColor('#ff2d78')
    })

    hitArea.on('pointerdown', () => {
      this.cameras.main.flash(300, 255, 45, 120)
      this.time.delayedCall(300, () => this.scene.start('GameScene'))
    })

    this.add.text(cx, cy + 48, 'TAP TO START', {
      fontFamily: 'monospace',
      fontSize: '11px',
      color: '#555577',
      letterSpacing: 3,
    }).setOrigin(0.5)
  }
}
