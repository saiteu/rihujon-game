import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultScene' })
  }

  init(data) {
    this.score = data.score ?? 0
  }

  create() {
    const cx = GAME_WIDTH / 2

    this.add.text(cx, 240, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: '40px',
      color: '#ff2d78',
      fontStyle: 'bold',
    }).setOrigin(0.5)

    this.add.text(cx, 320, `耐えたルール数: ${this.score}個`, {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#ffe600',
    }).setOrigin(0.5)

    this.add.text(cx, 400, '（リザルト画面は実装予定）', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#666688',
    }).setOrigin(0.5)

    // リトライ
    const btn = this.add.text(cx, 480, '[ RETRY ]', {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#00fff5',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true })

    btn.on('pointerover', () => btn.setColor('#ffffff'))
    btn.on('pointerout', () => btn.setColor('#00fff5'))
    btn.on('pointerdown', () => this.scene.start('StartScene'))
  }
}
