import Phaser from 'phaser'
import { GAME_WIDTH } from '../../config.js'
const WORDS = ['CLICK', 'PUSH', 'NO', 'YES', 'NOPE', 'HERE', '!?', '???', 'RUN', 'STOP', 'GO', 'WAIT']
export default {
  id: 'confusionText',
  name: 'ランダムな文字が画面を飛び交う',
  description: '偽の指示だらけ！惑わされるな！',
  apply(scene) {
    let active = true
    const texts = []
    const COLORS_HEX = ['#ff2d78', '#00fff5', '#ffe600', '#39ff14', '#ffffff', '#ff7700']
    const spawn = () => {
      if (!active) return
      const x = Phaser.Math.Between(20, GAME_WIDTH - 20)
      const y = Phaser.Math.Between(200, 470)
      const word = WORDS[Phaser.Math.Between(0, WORDS.length - 1)]
      const color = COLORS_HEX[Phaser.Math.Between(0, COLORS_HEX.length - 1)]
      const t = scene.add.text(x, y, word, {
        fontFamily: 'monospace', fontSize: '18px', color,
      }).setAlpha(0).setDepth(30)
      texts.push(t)
      scene.tweens.add({
        targets: t, alpha: 0.8,
        x: x + Phaser.Math.Between(-50, 50),
        y: y - Phaser.Math.Between(40, 80),
        duration: 1200,
        onComplete: () => {
          scene.tweens.add({
            targets: t, alpha: 0, duration: 300,
            onComplete: () => { t.destroy(); const i = texts.indexOf(t); if (i >= 0) texts.splice(i, 1) },
          })
        },
      })
      if (active) scene.time.delayedCall(Phaser.Math.Between(300, 600), spawn)
    }
    scene.time.delayedCall(300, spawn)
    return () => { active = false; texts.forEach(t => t.destroy()); texts.length = 0 }
  },
}
