export default {
  id: 'invertPulse',
  name: '2秒ごとに色が反転する',
  description: 'いきなり色が反転！目が追いつかない！',
  incompatibleWith: ['colorInvert', 'flickerScreen'],
  apply(scene) {
    let active = true
    let inverted = false
    const toggle = () => {
      if (!active) return
      inverted = !inverted
      if (inverted) {
        scene.cssFilters.set('invertPulse', 'invert(1)')
      } else {
        scene.cssFilters.delete('invertPulse')
      }
      scene._updateCSSFilter()
      scene.time.delayedCall(1800, toggle)
    }
    scene.time.delayedCall(1200, toggle)
    return () => {
      active = false
      scene.cssFilters.delete('invertPulse')
      scene._updateCSSFilter()
    }
  },
}
