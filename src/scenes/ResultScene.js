import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'

const MESSAGES = [
  { min: 0,  text: '即死…\nCLICK HELLの洗礼を受けた', color: '#666688' },
  { min: 1,  text: 'まだまだ甘い\n地獄はここから始まる', color: '#aaaacc' },
  { min: 3,  text: '悪くない\n理不尽に慣れてきたか？', color: '#00fff5' },
  { min: 5,  text: 'なかなかやる\n地獄の住人に片足突っ込んだ', color: '#ffe600' },
  { min: 8,  text: '化け物か？\nCLICK HELLマスター認定！', color: '#39ff14' },
  { min: 10, text: '全ルール制覇！！\n地獄を支配した王者👑', color: '#ff2d78' },
]

function getMessage(score) {
  for (let i = MESSAGES.length - 1; i >= 0; i--) {
    if (score >= MESSAGES[i].min) return MESSAGES[i]
  }
  return MESSAGES[0]
}

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' })
  }

  init(data) {
    this.score = data.score ?? 0
  }

  create() {
    this._createBg()
    this._createHeader()
    this._createScore()
    this._createMessage()
    this._createButtons()
  }

  _createBg() {
    const g = this.add.graphics()
    g.lineStyle(1, COLORS.neonPink, 0.05)
    for (let x = 0; x < GAME_WIDTH; x += 40) g.lineBetween(x, 0, x, GAME_HEIGHT)
    for (let y = 0; y < GAME_HEIGHT; y += 40) g.lineBetween(0, y, GAME_WIDTH, y)

    // Center glow
    const glow = this.add.graphics()
    glow.fillStyle(COLORS.neonPink, 0.04)
    glow.fillCircle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 220)
  }

  _createHeader() {
    const cx = GAME_WIDTH / 2

    const title = this.add.text(cx, 110, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: '44px',
      color: '#ff2d78',
      fontStyle: 'bold',
      stroke: '#330011',
      strokeThickness: 6,
    }).setOrigin(0.5).setAlpha(0)

    this.tweens.add({ targets: title, alpha: 1, y: 120, duration: 400, ease: 'Power2' })
  }

  _createScore() {
    const cx = GAME_WIDTH / 2

    // Score panel
    const panel = this.add.rectangle(cx, 240, 320, 110, COLORS.dark).setAlpha(0)
    panel.setStrokeStyle(2, COLORS.neonCyan, 0.6)

    this.add.text(cx, 205, 'RULES SURVIVED', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#666688',
    }).setOrigin(0.5).setAlpha(0)

    const scoreText = this.add.text(cx, 250, '0', {
      fontFamily: 'monospace',
      fontSize: '72px',
      color: '#00fff5',
      fontStyle: 'bold',
    }).setOrigin(0.5).setAlpha(0)

    this.add.text(cx, 285, '個', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#aaaacc',
    }).setOrigin(0.5).setAlpha(0)

    // Animate in
    this.tweens.add({
      targets: [panel, scoreText],
      alpha: 1,
      duration: 500,
      delay: 300,
      onUpdate: (tween) => {
        const v = Math.floor(tween.progress * this.score)
        scoreText.setText(String(v))
      },
      onComplete: () => scoreText.setText(String(this.score)),
    })

    // Make all children visible
    this.time.delayedCall(300, () => {
      this.children.list
        .filter(c => c.type === 'Text' && c.alpha === 0)
        .forEach(c => this.tweens.add({ targets: c, alpha: 1, duration: 400 }))
    })
  }

  _createMessage() {
    const cx = GAME_WIDTH / 2
    const msg = getMessage(this.score)

    const text = this.add.text(cx, 370, msg.text, {
      fontFamily: 'monospace',
      fontSize: '18px',
      color: msg.color,
      align: 'center',
      lineSpacing: 8,
    }).setOrigin(0.5).setAlpha(0)

    this.tweens.add({ targets: text, alpha: 1, duration: 400, delay: 700 })
  }

  _createButtons() {
    const cx = GAME_WIDTH / 2

    // Share button
    this._makeButton(cx, 470, 'X(Twitter)でシェア', '#ffe600', '#332200', () => this._share())

    // Retry button
    this._makeButton(cx, 550, 'RETRY', '#00fff5', '#003333', () => {
      this.cameras.main.flash(200, 0, 255, 200)
      this.time.delayedCall(200, () => this.scene.start('StartScene'))
    })
  }

  _makeButton(x, y, label, color, bgColor, onClick) {
    const bg = this.add.rectangle(x, y, 280, 52, 0x000000, 0).setAlpha(0)
    bg.setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(color).color, 1)

    const text = this.add.text(x, y, label, {
      fontFamily: 'monospace',
      fontSize: '16px',
      color,
      fontStyle: 'bold',
    }).setOrigin(0.5).setAlpha(0)

    this.tweens.add({ targets: [bg, text], alpha: 1, duration: 400, delay: 900 })

    // Pulse
    this.tweens.add({
      targets: bg,
      alpha: { from: 1, to: 0.4 },
      duration: 900,
      yoyo: true,
      repeat: -1,
      delay: 1200,
    })

    const hit = this.add.rectangle(x, y, 280, 52).setInteractive({ useHandCursor: true })
    hit.on('pointerover', () => text.setStyle({ color: '#ffffff' }))
    hit.on('pointerout', () => text.setStyle({ color }))
    hit.on('pointerdown', onClick)
  }

  _share() {
    const score = this.score
    const lines = [
      `【CLICK HELL】${score}個のルールに耐えた！`,
      '',
      score === 0 ? '即死でした…地獄の洗礼😇' :
      score < 3  ? 'まだまだ地獄には早すぎた…' :
      score < 6  ? '理不尽耐性、悪くない！' :
      score < 10 ? 'CLICK HELLマスター級！' :
                   '全ルール制覇！地獄の王者👑',
      '',
      '#CLICKHELL #ブラウザゲーム',
    ]
    const tweetText = encodeURIComponent(lines.join('\n'))
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`
    window.open(url, '_blank', 'noopener')
  }
}
