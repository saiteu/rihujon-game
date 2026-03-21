export default {
  id: 'timerDrain',
  name: 'クリックするたびに残り時間が減る',
  description: '押せば押すほど時間が削られる！ジレンマ！',
  apply(scene) {
    const onClicked = () => {
      if (scene.timer && scene.timer.active) scene.timer.drain(0.9)
    }
    scene.events.on('task:clicked', onClicked)
    return () => scene.events.off('task:clicked', onClicked)
  },
}
