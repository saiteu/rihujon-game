export default {
  id: 'speedButton',
  name: 'ボタンが超高速で動き続ける',
  description: '速すぎて目で追えない！反射神経で押せ！',
  incompatibleWith: ['movingButton', 'buttonFlees', 'teleportButton', 'fastTeleport'],
  apply(scene) {
    const BOUNDS = { x1: 70, y1: 210, x2: 410, y2: 434 }
    const SPEED = 260
    let vx = SPEED * (Math.random() > 0.5 ? 1 : -1)
    let vy = SPEED * (Math.random() > 0.5 ? 1 : -1)
    let active = true
    const update = (time, delta) => {
      if (!active || !scene.task || !scene.task.button) return
      const dt = delta / 1000
      const b = scene.task.button
      let nx = b.x + vx * dt, ny = b.y + vy * dt
      if (nx < BOUNDS.x1 || nx > BOUNDS.x2) { vx = -vx; nx = Math.max(BOUNDS.x1, Math.min(BOUNDS.x2, nx)) }
      if (ny < BOUNDS.y1 || ny > BOUNDS.y2) { vy = -vy; ny = Math.max(BOUNDS.y1, Math.min(BOUNDS.y2, ny)) }
      ;[scene.task.button, scene.task.buttonGlow, scene.task.label].forEach(o => { if (o && o.active) { o.x = nx; o.y = ny } })
    }
    scene.events.on('update', update)
    return () => { active = false; scene.events.off('update', update) }
  },
}
