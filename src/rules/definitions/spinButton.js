export default {
  id: 'spinButton',
  name: 'ボタンのラベルが回転する',
  description: 'テキストがグルグル回って読めない！',
  apply(scene) {
    const tweens = []
    const onSpawned = ({ label, glow }) => {
      tweens.forEach(t => t.stop())
      tweens.length = 0
      tweens.push(scene.tweens.add({
        targets: label,
        rotation: Math.PI * 2,
        duration: 1200,
        repeat: -1,
        ease: 'Linear',
      }))
      tweens.push(scene.tweens.add({
        targets: glow,
        scaleX: 1.2, scaleY: 0.85,
        duration: 400,
        yoyo: true,
        repeat: -1,
      }))
    }
    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      tweens.forEach(t => t.stop())
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
