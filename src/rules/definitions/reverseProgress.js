export default {
  id: 'reverseProgress',
  name: 'クリック進捗が「残りX回」表示になる',
  description: '残り何回かしか分からない！',
  incompatibleWith: ['hideProgress', 'fakeCounter', 'noUI'],
  apply(scene) {
    scene.progressOverride = (c, t) => `残り ${t - c} 回`
    return () => { scene.progressOverride = null }
  },
}
