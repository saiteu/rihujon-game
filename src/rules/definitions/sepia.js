export default {
  id: 'sepia',
  name: '画面がセピアになる',
  description: 'レトロな色合いに！違和感しかない！',
  incompatibleWith: ['grayscale'],
  apply(scene) {
    scene.cssFilters.set('sepia', 'sepia(1)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('sepia'); scene._updateCSSFilter() }
  },
}
