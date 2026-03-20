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
    // サブタイトル
    this.add.text(GAME_WIDTH / 2, 180, '★ RULE CHAOS ★', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ff2d78',
      letterSpacing: 4,
    }).setOrigin(0.5)

    // メインタイトル（2行）
    const title1 = this.add.text(GAME_WIDTH / 2, 230, '理不尽', {
      fontFamily: 'monospace',
      fontSize: '56px',
      color: '#00fff5',
      fontStyle: 'bold',
      stroke: '#005566',
      strokeThickness: 6,
    }).setOrigin(0.5)

    const title2 = this.add.text(GAME_WIDTH / 2, 295, 'ルール追加系', {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    // タイトルの点滅アニメ
    this.tweens.add({
      targets: title1,
      alpha: 0.7,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // タイトル2のY揺れ
    this.tweens.add({
      targets: title2,
      y: 300,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  _createDescription() {
    const lines = [
      'クリアするたびに',
      '理不尽なルールが追加される！',
      '',
      'どこまで耐えられるか？',
    ]

    lines.forEach((line, i) => {
      this.add.text(GAME_WIDTH / 2, 370 + i * 26, line, {
        fontFamily: 'monospace',
        fontSize: '15px',
        color: i === 1 ? '#ffe600' : '#aaaacc',
      }).setOrigin(0.5)
    })
  }

  _createStartButton() {
    const cx = GAME_WIDTH / 2
    const cy = 540

    // ボタン背景
    const bg = this.add.rectangle(cx, cy, 220, 56, COLORS.neonPink, 0.15)
    const border = this.add.rectangle(cx, cy, 220, 56)
    border.setStrokeStyle(2, COLORS.neonPink, 1)

    const label = this.add.text(cx, cy, 'START', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ff2d78',
      fontStyle: 'bold',
      letterSpacing: 6,
    }).setOrigin(0.5)

    // 点滅
    this.tweens.add({
      targets: [border, label],
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // インタラクション
    const hitArea = this.add.rectangle(cx, cy, 220, 56).setInteractive({ useHandCursor: true })

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
      this.time.delayedCall(300, () => {
        this.scene.start('GameScene')
      })
    })

    // 下の補足テキスト
    this.add.text(cx, cy + 50, 'タップ / クリックでスタート', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#666688',
    }).setOrigin(0.5)
  }
}
