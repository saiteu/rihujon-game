export default {
  id: 'lowContrast',
  name: 'コントラストが弱くなる',
  description: '全部同じ色に見える！',
  incompatibleWith: ['highContrast'],
  apply(scene) {
    scene.cssFilters.set('lowContrast', 'contrast(0.4)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('lowContrast'); scene._updateCSSFilter() }
  },
}
