export default {
  id: 'hideRuleList',
  name: 'ルール一覧が見えない',
  description: '今どんなルールが発動中か不明！記憶で戦え！',
  incompatibleWith: ['noUI'],
  apply(scene) {
    scene.ruleList.setVisible(false)
    return () => { scene.ruleList.setVisible(true) }
  },
}
