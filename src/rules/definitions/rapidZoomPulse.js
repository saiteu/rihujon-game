export default {
  id: 'rapidZoomPulse',
  name: '激しくズームイン・アウトを繰り返す',
  description: '拡大縮小が止まらない！眩暈がする！',
  incompatibleWith: ['zoomWave', 'zoomChaos', 'zoomIn', 'zoomOut'],
  apply(scene) {
    const tween = scene.tweens.add({
      targets: scene.cameras.main,
      zoom: 1.7,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
    return () => { tween.stop(); scene.cameras.main.setZoom(1) }
  },
}
