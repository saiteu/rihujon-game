export default {
  id: 'dimScreen',
  name: '画面が薄暗くなる',
  description: '暗くて見づらい！でも押せる！',
  incompatibleWith: ['brightScreen'],
  apply(scene) {
    scene.cssFilters.set('dimScreen', 'brightness(0.55)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('dimScreen'); scene._updateCSSFilter() }
  },
}
