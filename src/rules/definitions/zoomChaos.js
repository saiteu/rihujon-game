export default {
  id: 'zoomChaos',
  name: 'クリックするたびに画面がズームされる',
  description: 'クリックのたびにどんどんズームイン！視界が狭くなる！',
  incompatibleWith: ['zoomWave'],
  apply(scene, onViolation) {
    let zoom = 1.0

    const onClicked = () => {
      zoom = Math.min(1.8, zoom + 0.15)
      scene.tweens.add({
        targets: scene.cameras.main,
        zoom,
        duration: 250,
        ease: 'Power2',
      })
    }

    scene.events.on('task:clicked', onClicked)

    return () => {
      scene.events.off('task:clicked', onClicked)
      scene.tweens.add({
        targets: scene.cameras.main,
        zoom: 1,
        duration: 400,
        ease: 'Power2',
      })
    }
  },
}
