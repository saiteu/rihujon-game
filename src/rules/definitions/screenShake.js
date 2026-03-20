export default {
  id: 'screenShake',
  name: '画面がずっと揺れている',
  description: '常時揺れ続ける！それでもクリックしろ！',
  apply(scene, onViolation) {
    let active = true

    const shake = () => {
      if (!active) return
      scene.cameras.main.shake(250, 0.007)
      scene.time.delayedCall(350, shake)
    }
    shake()

    return () => { active = false }
  },
}
