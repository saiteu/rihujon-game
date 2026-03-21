export default {
  id: 'cameraWander',
  name: 'カメラがゆっくり流れ続ける',
  description: '画面がふわふわ漂う！追いかけろ！',
  apply(scene) {
    let t = 0
    const ev = scene.time.addEvent({
      delay: 16, loop: true,
      callback: () => {
        t += 0.018
        scene.cameras.main.setScroll(Math.sin(t) * 45, Math.cos(t * 0.7) * 35)
      },
    })
    return () => { ev.remove(); scene.cameras.main.setScroll(0, 0) }
  },
}
