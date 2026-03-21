export default {
  id: 'sinkingButton',
  name: 'ボタンが時間とともに消える',
  description: '透明になる前に押せ！消えたら失敗！',
  incompatibleWith: ['ghostButton', 'transparent', 'blinkButton'],
  apply(scene, onViolation) {
    let active = true
    let sinkTween = null
    const onSpawned = ({ button, glow, label }) => {
      if (sinkTween) sinkTween.stop()
      sinkTween = scene.tweens.add({
        targets: [button, glow, label],
        alpha: 0,
        duration: 3200,
        onComplete: () => { if (active) onViolation() },
      })
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      active = false
      if (sinkTween) sinkTween.stop()
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
