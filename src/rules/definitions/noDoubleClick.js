export default {
  id: 'noDoubleClick',
  name: 'ダブルクリック禁止',
  description: '素早く2回クリックしたら即失敗！落ち着いて！',
  apply(scene, onViolation) {
    let lastClickTime = -Infinity

    const validator = (_, task) => {
      const now = scene.time.now
      const delta = now - lastClickTime
      lastClickTime = now
      if (delta < 400) return 'violation'
    }

    scene.clickValidators.push(validator)
    return () => {
      const idx = scene.clickValidators.indexOf(validator)
      if (idx !== -1) scene.clickValidators.splice(idx, 1)
    }
  },
}
