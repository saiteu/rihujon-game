export default {
  id: 'highContrast',
  name: 'コントラストが強くなる',
  description: '白と黒しかない！色の境界が消えた！',
  incompatibleWith: ['lowContrast'],
  apply(scene) {
    scene.cssFilters.set('highContrast', 'contrast(2.5)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('highContrast'); scene._updateCSSFilter() }
  },
}
