import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'
import ClickTask from '../game/ClickTask.js'
import Timer from '../ui/Timer.js'
import RuleList from '../ui/RuleList.js'
import RuleManager from '../rules/RuleManager.js'
import RuleAnnouncer from '../rules/RuleAnnouncer.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  init() {
    this.ruleCount = 0
    this.task = null
    this.timer = null
    this.isFailed = false
    this.isTransitioning = false
    // Rule system state (reset each round by RuleManager)
    this.clickValidators = []
    this.transformPointerCoords = null
    this.spawnBias = null
  }

  create() {
    this._createBg()
    this._createHeader()
    this._createTaskAreaFrame()
    this._createProgressText()

    this.ruleList = new RuleList(this)
    this.ruleManager = new RuleManager(this)
    this.announcer = new RuleAnnouncer(this)

    this.ruleList.setRules([])
    this._startRound()
  }

  _createBg() {
    const g = this.add.graphics()
    g.lineStyle(1, COLORS.neonCyan, 0.04)
    for (let x = 0; x < GAME_WIDTH; x += 40) g.lineBetween(x, 0, x, GAME_HEIGHT)
    for (let y = 0; y < GAME_HEIGHT; y += 40) g.lineBetween(0, y, GAME_WIDTH, y)
  }

  _createHeader() {
    const cx = GAME_WIDTH / 2
    this.add.rectangle(cx, 36, GAME_WIDTH, 72, COLORS.dark)
    this.add.rectangle(cx, 72, GAME_WIDTH, 1, COLORS.neonCyan, 0.3)

    this.add.text(cx, 18, '理不尽ルール追加系ゲーム', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#444466',
    }).setOrigin(0.5)

    this.ruleBadge = this.add.text(cx, 48, 'ルール: 0個', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#00fff5',
      fontStyle: 'bold',
    }).setOrigin(0.5)
  }

  _createTaskAreaFrame() {
    // Frame: center y=310, h=340 → y: 140 to 480
    this.add.rectangle(GAME_WIDTH / 2, 310, GAME_WIDTH - 10, 340, COLORS.dark)
      .setStrokeStyle(1, COLORS.neonCyan, 0.12)
  }

  _createProgressText() {
    this.progressText = this.add.text(GAME_WIDTH / 2, 148, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#555577',
    }).setOrigin(0.5)
  }

  _startRound() {
    this.isFailed = false
    this.isTransitioning = false

    // Reset camera
    this.cameras.main.setRotation(0)

    // Destroy previous
    if (this.timer) { this.timer.destroy(); this.timer = null }
    if (this.task) { this.task.destroy(); this.task = null }

    // Apply all active rules (resets clickValidators, transformPointerCoords, spawnBias)
    this.ruleManager.applyAll(() => this._onFail())

    // Create task & timer
    this.task = new ClickTask(this, () => this._onRoundClear(), () => this._onFail())
    this.timer = new Timer(this, () => this._onFail())

    this._updateProgress()
  }

  _updateProgress() {
    if (!this.task) return
    const c = this.task.getClickCount()
    const t = this.task.getTargetCount()
    this.progressText.setText(`${c} / ${t} クリック`)
  }

  _onRoundClear() {
    if (this.isTransitioning) return
    this.isTransitioning = true

    this.timer.stop()
    this.ruleManager.cleanup()
    this.ruleCount++
    this.ruleBadge.setText(`ルール: ${this.ruleCount}個`)

    this.cameras.main.flash(200, 0, 255, 180)
    this._showBanner('CLEAR!', '#39ff14', () => {
      const newRule = this.ruleManager.addRandomRule()
      this.ruleList.setRules(this.ruleManager.getActiveRules())

      if (!newRule) {
        // All rules used up — keep going
        this._startRound()
        return
      }

      this.announcer.announce(newRule, () => this._startRound())
    })
  }

  _onFail() {
    if (this.isFailed || this.isTransitioning) return
    this.isFailed = true
    this.isTransitioning = true

    if (this.task) { this.task.destroy(); this.task = null }
    if (this.timer) { this.timer.stop() }
    this.ruleManager.cleanup()

    // Restore cursor in case invertCursor was active
    this.sys.game.canvas.style.cursor = 'default'

    this.cameras.main.shake(400, 0.02)
    this._showBanner('FAILED...', '#ff2d78', () => {
      this.scene.start('ResultScene', { score: this.ruleCount })
    })
  }

  _showBanner(text, color, onDone) {
    const cx = GAME_WIDTH / 2
    const cy = GAME_HEIGHT / 2

    const overlay = this.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.72).setDepth(100)
    const label = this.add.text(cx, cy, text, {
      fontFamily: 'monospace',
      fontSize: '48px',
      color,
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 8,
    }).setOrigin(0.5).setScale(0).setDepth(101)

    this.tweens.add({
      targets: label,
      scale: 1,
      duration: 250,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.time.delayedCall(900, () => {
          this.tweens.add({
            targets: [overlay, label],
            alpha: 0,
            duration: 200,
            onComplete: () => {
              overlay.destroy()
              label.destroy()
              if (onDone) onDone()
            },
          })
        })
      },
    })
  }

  update() {
    this._updateProgress()
  }
}
