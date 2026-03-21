export default {
  id: 'hideTimer',
  name: 'タイマーバーが見えない',
  description: '時間が見えない！感覚で生き延びろ！',
  incompatibleWith: ['reverseTimerColor', 'noUI'],
  apply(scene) {
    const hide = (timer) => {
      timer.bar.setVisible(false)
      timer.text.setVisible(false)
      timer.barBg.setVisible(false)
    }
    scene.events.on('timer:created', hide)
    return () => scene.events.off('timer:created', hide)
  },
}
