export default {
  id: 'strongBlur',
  name: '画面がひどくぼける',
  description: 'ぼやけて見えない！なんとなく押せ！',
  apply(scene) {
    scene.cssFilters.set('strongBlur', 'blur(5px)')
    scene._updateCSSFilter()
    return () => { scene.cssFilters.delete('strongBlur'); scene._updateCSSFilter() }
  },
}
