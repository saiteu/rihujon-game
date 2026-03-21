export default {
  id: 'shrinkingButton',
  name: 'ボタンが時間とともに縮む',
  description: 'だんだん小さくなる！消える前に押せ！',
  incompatibleWith: ['tinyButton', 'bigButton', 'randomRadiusPerClick'],
  apply(scene, onViolation) {
    let active = true
    const START = 52, MIN = 5, STEP = 2.5, INTERVAL = 220
    const startShrink = () => {
      if (!active) return
      scene.buttonRadiusOverride = START
      const ev = scene.time.addEvent({
        delay: INTERVAL,
        repeat: Math.ceil((START - MIN) / STEP),
        callback: () => {
          if (!active) { ev.remove(); return }
          scene.buttonRadiusOverride = Math.max(MIN, (scene.buttonRadiusOverride || START) - STEP)
          if (scene.buttonRadiusOverride <= MIN) {
            ev.remove()
            if (active) onViolation()
          }
        },
      })
    }
    scene.events.on('task:buttonspawned', startShrink)
    startShrink()
    return () => {
      active = false
      scene.buttonRadiusOverride = null
      scene.events.off('task:buttonspawned', startShrink)
    }
  },
}
