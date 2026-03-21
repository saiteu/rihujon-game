export default {
  id: 'outerRingOnly',
  name: 'ボタンの中心を押すと失敗',
  description: '外側のリング部分のみ有効！中心はNG！',
  incompatibleWith: ['deadCenter', 'tinyButton'],
  apply(scene, onViolation) {
    scene.clickValidators.push(({ x, y }, task) => {
      const dist = Math.hypot(x - task.button.x, y - task.button.y)
      if (dist < task._radius * 0.38) return 'violation'
    })
    return () => {}
  },
}
