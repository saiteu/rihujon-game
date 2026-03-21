import Phaser from 'phaser'
export default {
  id: 'fastTeleport',
  name: 'ボタンが高速でワープし続ける',
  description: '0.7秒ごとにワープ！目が回る！',
  incompatibleWith: ['teleportButton'],
  apply(scene) {
    let active = true
    const doTeleport = () => {
      if (!active || !scene.task || !scene.task.button) return
      const bias = scene.spawnBias || { x1: 60, y1: 200, x2: 420, y2: 444 }
      const nx = Phaser.Math.Between(bias.x1, bias.x2)
      const ny = Phaser.Math.Between(bias.y1, bias.y2)
      ;[scene.task.button, scene.task.buttonGlow, scene.task.label].forEach(o => {
        if (o && o.active) { o.x = nx; o.y = ny }
      })
      if (active) scene.time.delayedCall(700, doTeleport)
    }
    scene.time.delayedCall(700, doTeleport)
    return () => { active = false }
  },
}
