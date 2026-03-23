import Phaser from 'phaser'
import { RULES } from './definitions/index.js'

export const MAX_ACTIVE_RULES = 5

export default class RuleManager {
  constructor(scene) {
    this.scene = scene
    this.activeRules = []
    this.availableRules = [...RULES]
    this._cleanups = []
  }

  // Returns { added, removed } — removed is null if no rotation happened
  addRandomRule(waveNumber = 1) {
    const allCandidates = this._getCandidates()

    if (allCandidates.length === 0) return { added: null, removed: null }

    // Every 5th wave: force a hard rule; otherwise pick from non-hard pool
    const wantsHard = waveNumber % 5 === 0
    let candidates = wantsHard
      ? allCandidates.filter(r => r.tier === 'hard')
      : allCandidates.filter(r => r.tier !== 'hard')
    if (candidates.length === 0) candidates = allCandidates

    const idx = Phaser.Math.Between(0, candidates.length - 1)
    const added = candidates[idx]

    // Remove from available pool
    const avIdx = this.availableRules.indexOf(added)
    if (avIdx !== -1) this.availableRules.splice(avIdx, 1)

    let removed = null

    if (this.activeRules.length >= MAX_ACTIVE_RULES) {
      // Rotate: remove a random active rule that won't conflict with incoming
      const removable = this.activeRules.filter(r => r.id !== added.id)
      const rmIdx = Phaser.Math.Between(0, removable.length - 1)
      removed = removable[rmIdx]

      const acIdx = this.activeRules.indexOf(removed)
      this.activeRules.splice(acIdx, 1)
      this.availableRules.push(removed) // return to pool
    }

    this.activeRules.push(added)
    return { added, removed }
  }

  // Returns candidates from available pool that won't cause deadlock
  _getCandidates() {
    const activeIds = new Set(this.activeRules.map(r => r.id))

    return this.availableRules.filter(rule => {
      // Check rule's own incompatibilities
      if (rule.incompatibleWith?.some(id => activeIds.has(id))) return false

      // Check if any active rule lists this rule as incompatible
      if (this.activeRules.some(r => r.incompatibleWith?.includes(rule.id))) return false

      return true
    })
  }

  applyAll(onViolation) {
    this._runCleanups()
    this._resetSceneState()

    this._cleanups = this.activeRules.map(rule => {
      const cleanup = rule.apply(this.scene, onViolation)
      return cleanup || (() => {})
    })
  }

  cleanup() {
    this._runCleanups()
    this._resetSceneState()
  }

  _resetSceneState() {
    const s = this.scene
    s.clickValidators = []
    s.transformPointerCoords = null
    s.spawnBias = null
    s.holdMode = false
    s.clickTargetOverride = null
    s.buttonRadiusOverride = null
    s.progressOverride = null
    s.cssFilters = new Map()
    if (s._updateCSSFilter) s._updateCSSFilter()
    // Reset canvas CSS transforms (safety net on top of individual rule cleanups)
    s.sys.game.canvas.style.transform = ''
    // Restore UI visibility in case hide-rules were active
    if (s.progressText) s.progressText.setVisible(true)
    if (s.waveText) s.waveText.setVisible(true)
    if (s.ruleList) s.ruleList.setVisible(true)
  }

  _runCleanups() {
    this._cleanups.forEach(fn => fn())
    this._cleanups = []
  }

  getActiveRules() { return this.activeRules }
}
