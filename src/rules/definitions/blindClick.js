export default {
  id: 'blindClick',
  name: 'ブラインドクリック',
  description: 'ボタンは出現後0.4秒で消える。位置を覚えてクリックしろ！',
  incompatibleWith: ['teleportButton', 'fastTeleport', 'buttonFlees', 'speedButton'],
  apply(scene, _onViolation) {
    const onSpawn = ({ button, glow, label }) => {
      scene.time.delayedCall(400, () => {
        if (!button.active) return
        scene.tweens.add({
          targets: [button, glow, label],
          alpha: 0,
          duration: 150,
        })
      })
    }
    scene.events.on('task:buttonspawned', onSpawn)

    return () => {
      scene.events.off('task:buttonspawned', onSpawn)
    }
  },
}
