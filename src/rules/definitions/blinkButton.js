export default {
  id: 'blinkButton',
  name: 'ボタンがゆっくり点滅する',
  description: '消えてる間は押せないぞ！',
  apply(scene) {
    const tweens = []
    const onSpawned = ({ button, glow, label }) => {
      tweens.forEach(t => t.stop())
      tweens.length = 0
      tweens.push(scene.tweens.add({
        targets: [button, glow, label],
        alpha: 0.1,
        duration: 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      }))
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      tweens.forEach(t => t.stop())
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
