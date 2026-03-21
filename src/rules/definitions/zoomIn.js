export default {
  id: 'zoomIn',
  name: '画面が1.3倍ズームになる',
  description: '大きく見えるけど視野が狭い！',
  incompatibleWith: ['zoomOut', 'zoomWave', 'zoomChaos', 'rapidZoomPulse'],
  apply(scene) {
    scene.cameras.main.setZoom(1.3)
    return () => { scene.cameras.main.setZoom(1) }
  },
}
