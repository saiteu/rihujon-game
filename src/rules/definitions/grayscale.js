export default {
  id: 'grayscale',
  name: '画面がモノクロになる',
  description: '色が全部消えた！でもクリックはできる！',
  incompatibleWith: ['sepia', 'vividColors'],
  apply(scene) {
    scene.cssFilters.set('grayscale', 'grayscale(1)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('grayscale'); scene._updateCSSFilter() }
  },
}
