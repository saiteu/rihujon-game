import Phaser from 'phaser'

export default {
  id: 'screenRotate',
  name: 'クリックするたびに画面が回転する',
  description: 'クリックのたびに15度ずつ傾いていく！',
  incompatibleWith: ['upsideDown'],
  apply(scene, onViolation) {
    let totalDeg = 0

    const onClicked = () => {
      totalDeg += 15
      scene.tweens.add({
        targets: scene.cameras.main,
        rotation: Phaser.Math.DegToRad(totalDeg),
        duration: 300,
        ease: 'Power2',
      })
    }

    scene.events.on('task:clicked', onClicked)

    return () => {
      scene.events.off('task:clicked', onClicked)
      scene.tweens.add({
        targets: scene.cameras.main,
        rotation: 0,
        duration: 300,
      })
    }
  },
}
