export default {
  id: 'hideWave',
  name: 'WAVEカウンターが消える',
  description: '今何WAVEか分からない！',
  incompatibleWith: ['noUI'],
  apply(scene) {
    scene.waveText.setVisible(false)
    return () => { scene.waveText.setVisible(true) }
  },
}
