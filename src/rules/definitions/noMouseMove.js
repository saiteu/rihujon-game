export default {
  id: 'noMouseMove',
  name: 'マウスを動かしてはいけない',
  description: '動いたら即死！1秒後から監視開始。',
  apply(scene, onViolation) {
    let violated = false
    let tracking = false
    let startX = 0, startY = 0

    const grace = scene.time.delayedCall(1000, () => {
      tracking = true
      startX = scene.input.activePointer.x
      startY = scene.input.activePointer.y
    })

    const handler = (pointer) => {
      if (!tracking || violated) return
      if (Math.abs(pointer.x - startX) > 8 || Math.abs(pointer.y - startY) > 8) {
        violated = true
        onViolation()
      }
    }

    scene.input.on('pointermove', handler)
    return () => {
      grace.remove()
      scene.input.off('pointermove', handler)
    }
  },
}
