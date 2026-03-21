export default {
  id: 'noUI',
  name: 'UIが全部消える',
  description: 'タイマーも進捗もWAVEも全部消えた！感で生きろ！',
  incompatibleWith: ['hideProgress', 'hideWave', 'hideTimer', 'hideRuleList', 'fakeCounter', 'reverseProgress', 'reverseTimerColor'],
  apply(scene) {
    scene.progressText.setVisible(false)
    scene.waveText.setVisible(false)
    scene.ruleList.setVisible(false)
    const hide = (timer) => {
      timer.bar.setVisible(false)
      timer.text.setVisible(false)
      timer.barBg.setVisible(false)
    }
    scene.events.on('timer:created', hide)
    return () => {
      scene.progressText.setVisible(true)
      scene.waveText.setVisible(true)
      scene.ruleList.setVisible(true)
      scene.events.off('timer:created', hide)
    }
  },
}
