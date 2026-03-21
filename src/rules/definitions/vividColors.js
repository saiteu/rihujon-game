export default {
  id: 'vividColors',
  name: '色が異常に鮮やかになる',
  description: '目がチカチカする彩度MAX！',
  incompatibleWith: ['grayscale'],
  apply(scene) {
    scene.cssFilters.set('vividColors', 'saturate(4)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('vividColors'); scene._updateCSSFilter() }
  },
}
