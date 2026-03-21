export default {
  id: 'zoomOut',
  name: '画面が引いて表示される',
  description: 'ボタンが遠い！小さく見える！',
  incompatibleWith: ['zoomIn', 'zoomWave', 'zoomChaos', 'rapidZoomPulse'],
  apply(scene) {
    scene.cameras.main.setZoom(0.75)
    return () => { scene.cameras.main.setZoom(1) }
  },
}
