export default {
  id: 'warmFilter',
  name: '画面がオレンジがかる',
  description: '夕焼け色！なんか眠くなる！',
  incompatibleWith: ['grayscale'],
  apply(scene) {
    scene.cssFilters.set('warmFilter', 'sepia(0.5) hue-rotate(-20deg)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('warmFilter'); scene._updateCSSFilter() }
  },
}
