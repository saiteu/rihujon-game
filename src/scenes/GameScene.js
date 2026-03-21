import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'
import ClickTask from '../game/ClickTask.js'
import Timer from '../ui/Timer.js'
import RuleList from '../ui/RuleList.js'
import RuleManager from '../rules/RuleManager.js'
import RuleAnnouncer from '../rules/RuleAnnouncer.js'
import { showViolation, showGo, burstStars } from '../ui/Effects.js'
import { sfx } from '../audio/SoundManager.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  init() {
    this.ruleCount = 0
    this.waveNumber = 0
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
    this._createDangerOverlay()
    this._createHeader()
    this._createTaskAreaFrame()
    this._createProgressText()

    this.ruleList = new RuleList(this)
    this.ruleManager = new RuleManager(this)
    this.announcer = new RuleAnnouncer(this)

    this.ruleList.setRules([])
    this._createMuteButton()
    this._startRound()
  }

  _createMuteButton() {
    const btn = this.add.text(GAME_WIDTH - 12, 12, '🔊', {
      fontFamily: 'monospace',
      fontSize: '18px',
    }).setOrigin(1, 0).setInteractive({ useHandCursor: true }).setDepth(300)

    btn.on('pointerdown', () => {
      const muted = sfx.toggleMute()
      btn.setText(muted ? '🔇' : '🔊')
    })
  }

  _createBg() {
    const g = this.add.graphics()
    g.lineStyle(1, COLORS.neonCyan, 0.04)
    for (let x = 0; x < GAME_WIDTH; x += 40) g.lineBetween(x, 0, x, GAME_HEIGHT)
    for (let y = 0; y < GAME_HEIGHT; y += 40) g.lineBetween(0, y, GAME_WIDTH, y)
  }

  _createDangerOverlay() {
    // Red tint that intensifies as rules accumulate
    this.dangerOverlay = this.add.rectangle(
      GAME_WIDTH / 2, GAME_HEIGHT / 2,
      GAME_WIDTH, GAME_HEIGHT,
      0xff0000, 0
    ).setDepth(1)
  }

  _updateDangerOverlay() {
    // 0 rules=0, 14+ rules=0.35
    const alpha = Math.min(0.35, this.ruleCount * 0.025)
    this.tweens.add({
      targets: this.dangerOverlay,
      alpha,
      duration: 600,
      ease: 'Sine.easeOut',
    })
  }

  _createHeader() {
    const cx = GAME_WIDTH / 2
    this.add.rectangle(cx, 36, GAME_WIDTH, 72, COLORS.dark)
    this.add.rectangle(cx, 72, GAME_WIDTH, 1, COLORS.neonCyan, 0.3)

    this.add.text(cx, 18, 'CLICK HELL', {
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

    this.waveText = this.add.text(12, 40, 'WAVE 1', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#555577',
    }).setOrigin(0, 0.5).setDepth(2)
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
    this.isTransitioning = true  // Stay true during GO! to block spurious violations

    // Reset camera
    this.cameras.main.setRotation(0)

    // Destroy previous
    if (this.timer) { this.timer.destroy(); this.timer = null }
    if (this.task) { this.task.destroy(); this.task = null }

    // Apply all active rules (resets clickValidators, transformPointerCoords, spawnBias)
    this.ruleManager.applyAll(() => this._onFail())

    // Update wave display
    this.waveText.setText(`WAVE ${this.ruleCount + 1}`)

    // Timer duration: starts at 10s, -0.5s every 2 rules cleared, minimum 5s
    const timerDuration = Math.max(5, 10 - Math.floor(this.ruleCount / 2) * 0.5)

    // Show GO! then start task & timer (isTransitioning=false only after GO!)
    showGo(this, () => {
      if (this.isFailed) return  // Already failed during GO! animation
      this.isTransitioning = false
      this.task = new ClickTask(this, () => this._onRoundClear(), () => this._onFail())
      this.timer = new Timer(this, timerDuration, () => this._onFail())
      this._updateProgress()
    })
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

    sfx.clear()
    this.cameras.main.flash(200, 0, 255, 180)
    burstStars(this)
    this._updateDangerOverlay()
    this._showBanner('CLEAR!', '#39ff14', () => {
      this.waveNumber++
      const isHardWave = this.waveNumber % 5 === 0
      const { added, removed } = this.ruleManager.addRandomRule(this.waveNumber)
      this.ruleList.setRules(this.ruleManager.getActiveRules())

      if (!added) {
        this._startRound()
        return
      }

      const announce = () => {
        if (removed) {
          this.announcer.announceSwap(removed, added, () => this._startRound())
        } else {
          this.announcer.announce(added, () => this._startRound())
        }
      }

      if (isHardWave) {
        this._showHardWarning(announce)
      } else {
        announce()
      }
    })
  }

  _onFail() {
    if (this.isFailed) return
    this.isFailed = true
    this.isTransitioning = true

    if (this.task) { this.task.destroy(); this.task = null }
    if (this.timer) { this.timer.stop() }
    this.ruleManager.cleanup()

    // Restore cursor and reset camera rotation immediately
    this.sys.game.canvas.style.cursor = 'default'
    this.tweens.killTweensOf(this.cameras.main)
    this.cameras.main.setRotation(0)

    let transitioned = false
    const goToResult = () => {
      if (transitioned) return
      transitioned = true
      this.scene.start('ResultScene', { score: this.ruleCount })
    }

    showViolation(this, () => {
      sfx.gameOver()
      this._showBanner('FAILED...', '#ff2d78', goToResult)
    })

    // Safety fallback: ensure transition even if tween callbacks fail
    this.time.delayedCall(3500, goToResult)
  }

  _showHardWarning(onDone) {
    const cx = GAME_WIDTH / 2
    const cy = GAME_HEIGHT / 2

    const overlay = this.add.rectangle(cx, cy, GAME_WIDTH * 3, GAME_HEIGHT * 3, 0x220000, 0.8).setDepth(100)
    const label = this.add.text(cx, cy - 24, '⚠ HARD RULE ⚠', {
      fontFamily: 'monospace',
      fontSize: '32px',
      color: '#ff2d78',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5).setScale(0).setDepth(101)

    const sub = this.add.text(cx, cy + 24, '難易度上昇中...', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#ffe600',
    }).setOrigin(0.5).setAlpha(0).setDepth(101)

    this.tweens.add({
      targets: label,
      scale: 1,
      duration: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({ targets: sub, alpha: 1, duration: 200 })
        this.time.delayedCall(1000, () => {
          this.tweens.add({
            targets: [overlay, label, sub],
            alpha: 0,
            duration: 200,
            onComplete: () => {
              overlay.destroy(); label.destroy(); sub.destroy()
              if (onDone) onDone()
            },
          })
        })
      },
    })
  }

  _showBanner(text, color, onDone) {
    const cx = GAME_WIDTH / 2
    const cy = GAME_HEIGHT / 2

    // Oversized to cover screen even during camera rotation
    const overlay = this.add.rectangle(cx, cy, GAME_WIDTH * 3, GAME_HEIGHT * 3, 0x000000, 0.72).setDepth(100)
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
    if (this.task) this._updateProgress()
  }
}
