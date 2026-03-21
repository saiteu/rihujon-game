export default {
  id: 'spinCamera',
  name: 'カメラがゆっくり回り続ける',
  description: 'ぐるぐる回る！酔いそう！',
  incompatibleWith: ['screenRotate', 'upsideDown', 'mirrorFlip', 'mirrorVertical', 'doubleMirror', 'tiltLeft', 'tiltRight'],
  apply(scene) {
    let angle = 0
    const ev = scene.time.addEvent({
      delay: 16, loop: true,
      callback: () => { angle += 0.007; scene.cameras.main.setRotation(angle) },
    })
    return () => {
      ev.remove()
      scene.tweens.add({ targets: scene.cameras.main, rotation: 0, duration: 300 })
    }
  },
}
