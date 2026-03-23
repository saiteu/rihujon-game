import Phaser from 'phaser'

export default {
  id: 'chaosMode',
  name: 'カオスモード',
  description: '4秒ごとに予測不能なランダム演出が2秒間発動する！',
  incompatibleWith: ['spinCamera', 'cameraWander', 'strongBlur', 'doubleMirror', 'mirrorFlip', 'mirrorVertical'],
  apply(scene, _onViolation) {
    let active = true
    let effectCleanup = null

    const effects = [
      // Heavy shake
      () => {
        scene.cameras.main.shake(600, 0.04)
        return () => {}
      },
      // Invert colors
      () => {
        scene.cssFilters.set('chaosInvert', 'invert(1)')
        scene._updateCSSFilter()
        return () => { scene.cssFilters.delete('chaosInvert'); scene._updateCSSFilter() }
      },
      // Zoom out
      () => {
        scene.cameras.main.setZoom(0.65)
        return () => { scene.cameras.main.setZoom(1) }
      },
      // Strong blur
      () => {
        scene.cssFilters.set('chaosBlur', 'blur(10px)')
        scene._updateCSSFilter()
        return () => { scene.cssFilters.delete('chaosBlur'); scene._updateCSSFilter() }
      },
      // Tint red
      () => {
        scene.cssFilters.set('chaosTint', 'sepia(1) saturate(5) hue-rotate(300deg)')
        scene._updateCSSFilter()
        return () => { scene.cssFilters.delete('chaosTint'); scene._updateCSSFilter() }
      },
    ]

    const runEffect = () => {
      if (!active) return
      if (effectCleanup) { effectCleanup(); effectCleanup = null }

      const fn = Phaser.Utils.Array.GetRandom(effects)
      effectCleanup = fn()

      scene.time.delayedCall(2000, () => {
        if (effectCleanup) { effectCleanup(); effectCleanup = null }
        if (active) scene.time.delayedCall(2000, runEffect)
      })
    }

    scene.time.delayedCall(3000, runEffect)

    return () => {
      active = false
      if (effectCleanup) { effectCleanup(); effectCleanup = null }
    }
  },
}
