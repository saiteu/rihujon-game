import { GAME_WIDTH } from '../../config.js'

export default {
  id: 'clickInterval',
  name: '1秒間隔を空けないと無効',
  description: '前のクリックから1秒待たないと無効！焦るな！',
  apply(scene, onViolation) {
    let lastClickTime = -Infinity

    const waitText = scene.add.text(GAME_WIDTH / 2, 480, '', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ffe600',
    }).setOrigin(0.5).setDepth(50)

    const validator = (_, task) => {
      const now = scene.time.now
      const delta = now - lastClickTime
      if (delta < 1000) {
        const remaining = ((1000 - delta) / 1000).toFixed(1)
        waitText.setText(`⏳ あと ${remaining}s`).setAlpha(1)
        scene.tweens.killTweensOf(waitText)
        scene.tweens.add({ targets: waitText, alpha: 0, duration: 600, delay: 300 })
        return 'block'
      }
      lastClickTime = now
    }

    scene.clickValidators.push(validator)
    return () => {
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
      waitText.destroy()
    }
  },
}
