export default {
  id: 'fakeCounter',
  name: 'クリック進捗の数字が嘘をつく',
  description: '表示が全部でたらめ！信じるな！',
  incompatibleWith: ['hideProgress', 'reverseProgress', 'noUI'],
  apply(scene) {
    scene.progressOverride = (c, t) => {
      const fake = Math.floor(Math.random() * t)
      return `${fake} / ${t} クリック`
    }
    return () => { scene.progressOverride = null }
  },
}
