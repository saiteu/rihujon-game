export default {
  id: 'ghostButton',
  name: 'ボタンが点滅して消える',
  description: '見えない間も位置を覚えて押せ！',
  incompatibleWith: ['transparent'],
  apply(scene, onViolation) {
    const onSpawned = ({ button, glow, label }) => {
      scene.tweens.add({
        targets: [button, glow, label],
        alpha: 0.05,
        duration: 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: 1200,
      })
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => scene.events.off('task:buttonspawned', onSpawned)
  },
}
