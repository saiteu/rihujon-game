export default {
  id: 'brightScreen',
  name: '画面がまぶしくなる',
  description: '眩しすぎて見えない！',
  incompatibleWith: ['dimScreen'],
  apply(scene) {
    scene.cssFilters.set('brightScreen', 'brightness(1.9)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('brightScreen'); scene._updateCSSFilter() }
  },
}
