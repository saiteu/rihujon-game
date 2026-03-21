export default {
  id: 'colorInvert',
  name: '画面の色が反転する',
  description: '全ての色が逆転！目がおかしくなる！',
  apply(scene, onViolation) {
    scene.cssFilters.set('colorInvert', 'invert(1)')
    scene._updateCSSFilter()
    return () => {
      scene.cssFilters.delete('colorInvert')
      scene._updateCSSFilter()
    }
  },
}
