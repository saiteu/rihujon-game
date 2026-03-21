export default {
  id: 'zoomWave',
  name: 'ズームが揺れ続ける',
  description: '画面が常にズームイン/アウトを繰り返す！',
  incompatibleWith: [],
  apply(scene, onViolation) {
    const tween = scene.tweens.add({
      targets: scene.cameras.main,
      zoom: 1.35,
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
    scene.cameras.main.setZoom(0.75)

    return () => {
      tween.stop()
      scene.cameras.main.setZoom(1)
    }
  },
}
