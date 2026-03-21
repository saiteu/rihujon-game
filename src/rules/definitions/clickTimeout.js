export default {
  id: 'clickTimeout',
  name: '2秒以内に次のクリックをしないと失敗',
  description: 'のんびり構えたら即死！常に急げ！',
  incompatibleWith: ['timeLimit5s', 'timeLimit3s'],
  apply(scene, onViolation) {
    let active = true, ev = null
    const TIMEOUT = 2000
    const reset = () => {
      if (ev) ev.remove()
      ev = scene.time.delayedCall(TIMEOUT, () => { if (active) onViolation() })
    }
    reset()
    scene.events.on('task:clicked', reset)
    scene.events.on('task:buttonspawned', reset)
    return () => {
      active = false
      if (ev) ev.remove()
      scene.events.off('task:clicked', reset)
      scene.events.off('task:buttonspawned', reset)
    }
  },
}
