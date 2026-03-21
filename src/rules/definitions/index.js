import timeLimit5s from './timeLimit5s.js'
import screenRotate from './screenRotate.js'
import colorBan from './colorBan.js'
import noDoubleClick from './noDoubleClick.js'
import clickInterval from './clickInterval.js'
import screenShake from './screenShake.js'
import transparent from './transparent.js'
import movingButton from './movingButton.js'
import shrinkButton from './shrinkButton.js'
import fakeButtons from './fakeButtons.js'
import flickerScreen from './flickerScreen.js'
import buttonFlees from './buttonFlees.js'
import manyClicks from './manyClicks.js'
// New rules
import tinyButton from './tinyButton.js'
import ghostButton from './ghostButton.js'
import teleportButton from './teleportButton.js'
import gravityButton from './gravityButton.js'
import earlyClickBan from './earlyClickBan.js'
import zoomWave from './zoomWave.js'
import blindFlash from './blindFlash.js'
import upsideDown from './upsideDown.js'
import noClickEdge from './noClickEdge.js'
import colorShift from './colorShift.js'
import labelTrap from './labelTrap.js'
import windDrift from './windDrift.js'
import moreClicks from './moreClicks.js'

function easy(rule)  { return { ...rule, tier: 'easy' } }
function hard(rule)  { return { ...rule, tier: 'hard' } }

export const RULES = [
  // ── Easy ──────────────────────────────
  easy(screenShake),
  easy(ghostButton),
  easy(labelTrap),
  easy(shrinkButton),
  easy(colorShift),
  // ── Medium (easy tier) ────────────────
  easy(movingButton),
  easy(windDrift),
  easy(gravityButton),
  easy(clickInterval),
  easy(noDoubleClick),
  easy(earlyClickBan),
  easy(zoomWave),
  easy(tinyButton),
  // ── Hard ──────────────────────────────
  hard(teleportButton),
  hard(timeLimit5s),
  hard(manyClicks),
  hard(moreClicks),
  hard(fakeButtons),
  hard(colorBan),
  hard(flickerScreen),
  hard(noClickEdge),
  hard(buttonFlees),
  hard(blindFlash),
  // ── Chaos (hard tier) ─────────────────
  hard(transparent),
  hard(screenRotate),
  hard(upsideDown),
]
