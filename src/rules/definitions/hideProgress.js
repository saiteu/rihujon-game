export default {
  id: 'hideProgress',
  name: 'クリック進捗が見えない',
  description: 'あと何回かわからない！感でやれ！',
  incompatibleWith: ['fakeCounter', 'reverseProgress', 'noUI'],
  apply(scene) {
    scene.progressText.setVisible(false)
    return () => { scene.progressText.setVisible(true) }
  },
}
