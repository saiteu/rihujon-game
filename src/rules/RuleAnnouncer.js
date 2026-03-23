import { GAME_WIDTH, GAME_HEIGHT } from '../config.js'
import { sfx } from '../audio/SoundManager.js'
import { t, tRule } from '../i18n/index.js'

export default class RuleAnnouncer {
  constructor(scene) {
    this.scene = scene
  }

  announce(rule, onDone) {
    const cx = GAME_WIDTH / 2
    const cy = GAME_HEIGHT / 2

    const overlay = this.scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.88).setDepth(200)

    const tag = this.scene.add.text(cx, cy - 100, t('announce.newRule'), {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffe600',
      letterSpacing: 3,
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const name = this.scene.add.text(cx, cy - 30, tRule(rule).name, {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#ff2d78',
      fontStyle: 'bold',
      wordWrap: { width: 420 },
      align: 'center',
    }).setOrigin(0.5).setScale(0).setDepth(201)

    const desc = this.scene.add.text(cx, cy + 50, tRule(rule).description, {
      fontFamily: 'monospace',
      fontSize: '15px',
      color: '#aaaacc',
      wordWrap: { width: 380 },
      align: 'center',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const tap = this.scene.add.text(cx, cy + 120, t('announce.tap'), {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#444466',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    // Animate in
    sfx.ruleAdd()
    this.scene.tweens.add({ targets: tag, alpha: 1, duration: 300 })
    this.scene.tweens.add({ targets: name, scale: 1, duration: 400, ease: 'Back.easeOut', delay: 150 })
    this.scene.tweens.add({ targets: [desc, tap], alpha: 1, duration: 300, delay: 500 })

    // Dismiss on tap or after 3s
    let dismissed = false
    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      this.scene.tweens.add({
        targets: [overlay, tag, name, desc, tap],
        alpha: 0,
        duration: 250,
        onComplete: () => {
          ;[overlay, tag, name, desc, tap].forEach(o => o.destroy())
          if (onDone) onDone()
        },
      })
    }

    this.scene.time.delayedCall(3000, dismiss)
    overlay.setInteractive().once('pointerdown', dismiss)
  }

  // Rule swap: show removed → added
  announceSwap(removed, added, onDone) {
    const cx = GAME_WIDTH / 2
    const cy = GAME_HEIGHT / 2

    const overlay = this.scene.add.rectangle(cx, cy, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.88).setDepth(200)

    const tag = this.scene.add.text(cx, cy - 120, t('announce.swap'), {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffe600',
      letterSpacing: 3,
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const removedLabel = this.scene.add.text(cx, cy - 70, `❌ ${tRule(removed).name}`, {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#666688',
      fontStyle: 'bold',
      wordWrap: { width: 420 },
      align: 'center',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const arrow = this.scene.add.text(cx, cy - 20, '▼', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#444466',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const addedLabel = this.scene.add.text(cx, cy + 30, `⚡ ${tRule(added).name}`, {
      fontFamily: 'monospace',
      fontSize: '22px',
      color: '#ff2d78',
      fontStyle: 'bold',
      wordWrap: { width: 420 },
      align: 'center',
    }).setOrigin(0.5).setScale(0).setDepth(201)

    const desc = this.scene.add.text(cx, cy + 90, tRule(added).description, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#aaaacc',
      wordWrap: { width: 380 },
      align: 'center',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const tap = this.scene.add.text(cx, cy + 140, t('announce.tap'), {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#444466',
    }).setOrigin(0.5).setAlpha(0).setDepth(201)

    const all = [overlay, tag, removedLabel, arrow, addedLabel, desc, tap]

    sfx.ruleSwap()
    this.scene.tweens.add({ targets: tag, alpha: 1, duration: 300 })
    this.scene.tweens.add({ targets: [removedLabel, arrow], alpha: 1, duration: 300, delay: 200 })
    this.scene.tweens.add({ targets: addedLabel, scale: 1, duration: 400, ease: 'Back.easeOut', delay: 500 })
    this.scene.tweens.add({ targets: [desc, tap], alpha: 1, duration: 300, delay: 800 })

    let dismissed = false
    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      this.scene.tweens.add({
        targets: all,
        alpha: 0,
        duration: 250,
        onComplete: () => {
          all.forEach(o => o.destroy())
          if (onDone) onDone()
        },
      })
    }

    this.scene.time.delayedCall(3500, dismiss)
    overlay.setInteractive().once('pointerdown', dismiss)
  }
}
