import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'

export default {
  id: 'randomRadiusPerClick',
  name: 'クリックのたびにボタンサイズが変わる',
  description: 'ボタンが毎回バラバラのサイズになる！大きい時に押せ！',
  incompatibleWith: ['tinyButton', 'bigButton', 'shrinkButton', 'shrinkingButton'],
  apply(scene) {
    const sizes = [18, 24, 28, 36, 44, 52, 60]
    const onSpawned = () => {
      scene.buttonRadiusOverride = sizes[Phaser.Math.Between(0, sizes.length - 1)]
    }
    onSpawned() // set initial
    scene.events.on('task:buttonspawned', onSpawned)
    return () => {
      scene.buttonRadiusOverride = null
      scene.events.off('task:buttonspawned', onSpawned)
    }
  },
}
