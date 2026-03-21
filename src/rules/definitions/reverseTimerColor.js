export default {
  id: 'reverseTimerColor',
  name: 'タイマーの色が逆になる',
  description: '残り時間が多いほど赤い！惑わすな！',
  apply(scene) {
    let active = true
    const tick = scene.time.addEvent({
      delay: 100, loop: true,
      callback: () => {
        if (!active || !scene.timer || !scene.timer.active) return
        const ratio = 1 - scene.timer._tickCount / scene.timer._totalTicks
        const isHigh = ratio > 0.6
        scene.timer.bar.setFillStyle(isHigh ? 0xff2d78 : 0x00fff5)
        scene.timer.text.setColor(isHigh ? '#ff2d78' : '#00fff5')
      },
    })
    return () => { active = false; tick.remove() }
  },
}
