export default {
  id: 'bounceButton',
  name: 'ボタンが上下に跳ねる',
  description: '揺れてて押しにくい！狙いを定めろ！',
  apply(scene) {
    const tweens = []
    const onSpawned = ({ button, glow, label }) => {
      tweens.forEach(t => t.stop())
      tweens.length = 0
      const baseY = button.y
      tweens.push(scene.tweens.add({
        targets: [button, glow, label],
        y: baseY + 28,
        duration: 500,
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
