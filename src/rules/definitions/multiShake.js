export default {
  id: 'multiShake',
  name: 'クリックするたびに揺れが強くなる',
  description: 'だんだん揺れが激しくなる！手が震える！',
  incompatibleWith: ['screenShake'],
  apply(scene) {
    let intensity = 0
    const onClicked = () => {
      intensity = Math.min(0.03, intensity + 0.005)
      scene.cameras.main.shake(350, intensity)
    }
    scene.events.on('task:clicked', onClicked)
    return () => scene.events.off('task:clicked', onClicked)
  },
}
