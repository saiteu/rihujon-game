import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from './config.js'
import StartScene from './scenes/StartScene.js'
import GameScene from './scenes/GameScene.js'
import ResultScene from './scenes/ResultScene.js'

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: COLORS.bg,
  parent: 'game-container',
  scene: [StartScene, GameScene, ResultScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}

new Phaser.Game(config)
