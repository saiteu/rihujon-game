import Phaser from 'phaser'
import { GAME_WIDTH, GAME_HEIGHT, COLORS } from '../config.js'
import { sfx } from '../audio/SoundManager.js'

// Particle burst at position
export function burstParticles(scene, x, y, color = COLORS.neonCyan, count = 10) {
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const speed = Phaser.Math.Between(40, 120)
    const size = Phaser.Math.Between(3, 7)

    const dot = scene.add.circle(x, y, size, color).setDepth(50)
    scene.tweens.add({
      targets: dot,
      x: x + Math.cos(angle) * speed,
      y: y + Math.sin(angle) * speed,
      alpha: 0,
      scale: 0,
      duration: Phaser.Math.Between(300, 600),
      ease: 'Power2',
      onComplete: () => dot.destroy(),
    })
  }
}

// Violation flash + text
export function showViolation(scene, onDone) {
  sfx.violation()
  // Red flash
  scene.cameras.main.flash(400, 255, 0, 30)
  scene.cameras.main.shake(300, 0.018)

  const cx = GAME_WIDTH / 2
  const cy = GAME_HEIGHT / 2

  const text = scene.add.text(cx, cy - 60, 'VIOLATION!', {
    fontFamily: 'monospace',
    fontSize: '36px',
    color: '#ff2d78',
    fontStyle: 'bold',
    stroke: '#000000',
    strokeThickness: 6,
  }).setOrigin(0.5).setDepth(150).setScale(0)

  scene.tweens.add({
    targets: text,
    scale: 1.1,
    duration: 200,
    ease: 'Back.easeOut',
    onComplete: () => {
      scene.time.delayedCall(500, () => {
        scene.tweens.add({
          targets: text,
          alpha: 0,
          y: cy - 100,
          duration: 300,
          onComplete: () => {
            text.destroy()
            if (onDone) onDone()
          },
        })
      })
    },
  })
}

// "GO!" round start banner
export function showGo(scene, onDone) {
  const cx = GAME_WIDTH / 2
  const cy = GAME_HEIGHT / 2

  const text = scene.add.text(cx, cy, 'GO!', {
    fontFamily: 'monospace',
    fontSize: '72px',
    color: '#39ff14',
    fontStyle: 'bold',
    stroke: '#003300',
    strokeThickness: 8,
  }).setOrigin(0.5).setDepth(150).setAlpha(0).setScale(1.5)

  sfx.go()
  scene.tweens.add({
    targets: text,
    alpha: 1,
    scale: 1,
    duration: 200,
    ease: 'Power2',
    onComplete: () => {
      scene.time.delayedCall(400, () => {
        scene.tweens.add({
          targets: text,
          alpha: 0,
          scale: 2,
          duration: 300,
          onComplete: () => {
            text.destroy()
            if (onDone) onDone()
          },
        })
      })
    },
  })
}

// Star burst for CLEAR
export function burstStars(scene) {
  const cx = GAME_WIDTH / 2
  const cy = GAME_HEIGHT / 2
  const starColors = [COLORS.neonCyan, COLORS.neonYellow, COLORS.neonGreen, COLORS.neonPink]

  for (let i = 0; i < 28; i++) {
    const angle = Math.random() * Math.PI * 2
    const dist = Phaser.Math.Between(60, 260)
    const color = starColors[i % starColors.length]
    const size = Phaser.Math.Between(4, 10)

    const star = scene.add.circle(cx, cy, size, color).setDepth(50)
    scene.tweens.add({
      targets: star,
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      alpha: 0,
      scale: 0,
      duration: Phaser.Math.Between(400, 900),
      ease: 'Power2',
      delay: Phaser.Math.Between(0, 150),
      onComplete: () => star.destroy(),
    })
  }
}
