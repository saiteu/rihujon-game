import { GAME_WIDTH, COLORS } from '../config.js'
import { t, tRule } from '../i18n/index.js'

const PANEL_Y = 565
const PANEL_H = 150

export default class RuleList {
  constructor(scene) {
    this.scene = scene
    this.textItems = []

    this.panel = scene.add.rectangle(GAME_WIDTH / 2, PANEL_Y, GAME_WIDTH - 10, PANEL_H, COLORS.dark, 0.95)
    this.panel.setStrokeStyle(1, COLORS.neonPink, 0.35)

    this.titleText = scene.add.text(16, PANEL_Y - PANEL_H / 2 + 6, t('rulelist.title'), {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#444466',
    })
  }

  setRules(rules) {
    this.textItems.forEach(item => item.destroy())
    this.textItems = []

    if (rules.length === 0) {
      const item = this.scene.add.text(GAME_WIDTH / 2, PANEL_Y + 10, t('rulelist.empty'), {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#333355',
      }).setOrigin(0.5)
      this.textItems.push(item)
      return
    }

    const startY = PANEL_Y - PANEL_H / 2 + 22
    const maxShow = 8
    const show = rules.slice(0, maxShow)

    show.forEach((rule, i) => {
      const item = this.scene.add.text(16, startY + i * 16, `▸ ${tRule(rule).name}`, {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#ff2d78',
      })
      this.textItems.push(item)
    })

    if (rules.length > maxShow) {
      const item = this.scene.add.text(16, startY + maxShow * 16, `  ...他${rules.length - maxShow}個`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#663344',
      })
      this.textItems.push(item)
    }
  }

  setVisible(v) {
    this.panel.setVisible(v)
    this.titleText.setVisible(v)
    this.textItems.forEach(item => item.setVisible(v))
  }

  destroy() {
    this.textItems.forEach(item => item.destroy())
    this.panel.destroy()
    this.titleText.destroy()
  }
}
