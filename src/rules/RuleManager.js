import Phaser from 'phaser'
import { RULES } from './definitions/index.js'

export default class RuleManager {
  constructor(scene) {
    this.scene = scene
    this.activeRules = []
    this.availableRules = [...RULES]
    this._cleanups = []
  }

  addRandomRule() {
    if (this.availableRules.length === 0) return null
    const idx = Phaser.Math.Between(0, this.availableRules.length - 1)
    const rule = this.availableRules.splice(idx, 1)[0]
    this.activeRules.push(rule)
    return rule
  }

  applyAll(onViolation) {
    this._runCleanups()
    // Reset scene-level rule state
    this.scene.clickValidators = []
    this.scene.transformPointerCoords = null
    this.scene.spawnBias = null

    this._cleanups = this.activeRules.map(rule => {
      const cleanup = rule.apply(this.scene, onViolation)
      return cleanup || (() => {})
    })
  }

  cleanup() {
    this._runCleanups()
    this.scene.clickValidators = []
    this.scene.transformPointerCoords = null
    this.scene.spawnBias = null
  }

  _runCleanups() {
    this._cleanups.forEach(fn => fn())
    this._cleanups = []
  }

  getActiveRules() {
    return this.activeRules
  }
}
