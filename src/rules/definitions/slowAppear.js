export default {
  id: 'slowAppear',
  name: 'ボタンの出現がゆっくり',
  description: '待て待て待て！なかなか出てこない！',
  apply(scene) {
    const onSpawned = ({ button, glow, label }) => {
      ;[button, glow, label].forEach(o => o.setAlpha(0))
      scene.tweens.add({
        targets: [button, glow, label],
        alpha: 1,
        duration: 800,
        delay: 200,
        ease: 'Sine.easeOut',
      })
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
