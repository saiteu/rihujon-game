export default {
  id: 'shrinkButton',
  name: 'クリックするたびボタンが縮む',
  description: '押すたびに小さくなる！最後は極小！',
  incompatibleWith: [],
  apply(scene, onViolation) {
    let clicksDone = 0

    const onSpawned = ({ button, glow, label }) => {
      const scale = Math.max(0.25, 1 - clicksDone * 0.28)
      scene.time.delayedCall(220, () => {
        if (!button.active) return
        scene.tweens.add({
          targets: [button, glow, label],
          scale,
          duration: 180,
          ease: 'Power2',
        })
      })
    }

    const onClicked = () => { clicksDone++ }

    scene.events.on('task:buttonspawned', onSpawned)
    scene.events.on('task:clicked', onClicked)
    return () => {
      scene.events.off('task:buttonspawned', onSpawned)
      scene.events.off('task:clicked', onClicked)
    }
  },
}
