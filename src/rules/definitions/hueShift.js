export default {
  id: 'hueShift',
  name: '色相が90度ずれる',
  description: 'シアンが赤に！全部の色が別物に！',
  incompatibleWith: ['colorShift', 'colorInvert'],
  apply(scene) {
    scene.cssFilters.set('hueShift', 'hue-rotate(90deg)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('hueShift'); scene._updateCSSFilter() }
  },
}
