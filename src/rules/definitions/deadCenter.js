export default {
  id: 'deadCenter',
  name: 'ボタンの中心ピンポイントのみ有効',
  description: '外側を押すと即死！正確に中心を狙え！',
  incompatibleWith: ['outerRingOnly', 'tinyButton'],
  apply(scene, onViolation) {
    scene.clickValidators.push(({ x, y }, task) => {
      const dist = Math.hypot(x - task.button.x, y - task.button.y)
      if (dist > task._radius * 0.48) return 'violation'
    })
    return () => {}
  },
}
