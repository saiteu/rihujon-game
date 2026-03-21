// ── Original rules ────────────────────────────
import screenShake from './screenShake.js'
import ghostButton from './ghostButton.js'
import shrinkButton from './shrinkButton.js'
import colorShift from './colorShift.js'
import movingButton from './movingButton.js'
import windDrift from './windDrift.js'
import gravityButton from './gravityButton.js'
import clickInterval from './clickInterval.js'
import noDoubleClick from './noDoubleClick.js'
import earlyClickBan from './earlyClickBan.js'
import zoomWave from './zoomWave.js'
import tinyButton from './tinyButton.js'
import teleportButton from './teleportButton.js'
import timeLimit5s from './timeLimit5s.js'
import manyClicks from './manyClicks.js'
import moreClicks from './moreClicks.js'
import fakeButtons from './fakeButtons.js'
import colorBan from './colorBan.js'
import flickerScreen from './flickerScreen.js'
import noClickEdge from './noClickEdge.js'
import buttonFlees from './buttonFlees.js'
import blindFlash from './blindFlash.js'
import transparent from './transparent.js'
import screenRotate from './screenRotate.js'
import upsideDown from './upsideDown.js'
import zoomChaos from './zoomChaos.js'
import colorInvert from './colorInvert.js'
import mirrorFlip from './mirrorFlip.js'

// ── New easy rules ─────────────────────────────
import grayscale from './grayscale.js'
import sepia from './sepia.js'
import vividColors from './vividColors.js'
import dimScreen from './dimScreen.js'
import brightScreen from './brightScreen.js'
import highContrast from './highContrast.js'
import lowContrast from './lowContrast.js'
import hueShift from './hueShift.js'
import bigButton from './bigButton.js'
import spinButton from './spinButton.js'
import bounceButton from './bounceButton.js'
import blinkButton from './blinkButton.js'
import hideLabel from './hideLabel.js'
import questionMark from './questionMark.js'
import noBorder from './noBorder.js'
import noFill from './noFill.js'
import pinkButton from './pinkButton.js'
import goldenButton from './goldenButton.js'
import topSpawn from './topSpawn.js'
import bottomSpawn from './bottomSpawn.js'
import leftSpawn from './leftSpawn.js'
import rightSpawn from './rightSpawn.js'
import centerSpawn from './centerSpawn.js'
import zoomIn from './zoomIn.js'
import zoomOut from './zoomOut.js'
import tiltLeft from './tiltLeft.js'
import tiltRight from './tiltRight.js'
import hideProgress from './hideProgress.js'
import hideWave from './hideWave.js'
import hideRuleList from './hideRuleList.js'
import scanlines from './scanlines.js'
import vignette from './vignette.js'
import blueOverlay from './blueOverlay.js'
import redOverlay from './redOverlay.js'
import warmFilter from './warmFilter.js'
import oneMoreClick from './oneMoreClick.js'
import oneLessClick from './oneLessClick.js'
import slowAppear from './slowAppear.js'
import rainbowBorder from './rainbowBorder.js'
import reverseTimerColor from './reverseTimerColor.js'

// ── New hard rules ─────────────────────────────
import spinCamera from './spinCamera.js'
import strongBlur from './strongBlur.js'
import cameraWander from './cameraWander.js'
import rapidZoomPulse from './rapidZoomPulse.js'
import invertPulse from './invertPulse.js'
import flashWhite from './flashWhite.js'
import mirrorVertical from './mirrorVertical.js'
import doubleMirror from './doubleMirror.js'
import driftInput from './driftInput.js'
import chaosInput from './chaosInput.js'
import outerRingOnly from './outerRingOnly.js'
import deadCenter from './deadCenter.js'
import fastTeleport from './fastTeleport.js'
import shrinkingButton from './shrinkingButton.js'
import sinkingButton from './sinkingButton.js'
import tripleDecoy from './tripleDecoy.js'
import ghostCopy from './ghostCopy.js'
import speedButton from './speedButton.js'
import timeLimit3s from './timeLimit3s.js'
import clickTimeout from './clickTimeout.js'
import timerDrain from './timerDrain.js'
import hideTimer from './hideTimer.js'
import fakeCounter from './fakeCounter.js'
import noUI from './noUI.js'
import confusionText from './confusionText.js'
import multiShake from './multiShake.js'
import reverseProgress from './reverseProgress.js'
import nineClicks from './nineClicks.js'
import randomRadiusPerClick from './randomRadiusPerClick.js'
import dangerZone from './dangerZone.js'

function easy(rule) { return { ...rule, tier: 'easy' } }
function hard(rule) { return { ...rule, tier: 'hard' } }

export const RULES = [
  // ── Easy (52 total) ───────────────────────────
  easy(screenShake),
  easy(ghostButton),
  easy(shrinkButton),
  easy(colorShift),
  easy(movingButton),
  easy(windDrift),
  easy(gravityButton),
  easy(clickInterval),
  easy(noDoubleClick),
  easy(earlyClickBan),
  easy(zoomWave),
  easy(tinyButton),
  easy(grayscale),
  easy(sepia),
  easy(vividColors),
  easy(dimScreen),
  easy(brightScreen),
  easy(highContrast),
  easy(lowContrast),
  easy(hueShift),
  easy(bigButton),
  easy(spinButton),
  easy(bounceButton),
  easy(blinkButton),
  easy(hideLabel),
  easy(questionMark),
  easy(noBorder),
  easy(noFill),
  easy(pinkButton),
  easy(goldenButton),
  easy(topSpawn),
  easy(bottomSpawn),
  easy(leftSpawn),
  easy(rightSpawn),
  easy(centerSpawn),
  easy(zoomIn),
  easy(zoomOut),
  easy(tiltLeft),
  easy(tiltRight),
  easy(hideProgress),
  easy(hideWave),
  easy(hideRuleList),
  easy(scanlines),
  easy(vignette),
  easy(blueOverlay),
  easy(redOverlay),
  easy(warmFilter),
  easy(oneMoreClick),
  easy(oneLessClick),
  easy(slowAppear),
  easy(rainbowBorder),
  easy(reverseTimerColor),
  // ── Hard (46 total) ───────────────────────────
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
  hard(transparent),
  hard(screenRotate),
  hard(upsideDown),
  hard(zoomChaos),
  hard(colorInvert),
  hard(mirrorFlip),
  hard(spinCamera),
  hard(strongBlur),
  hard(cameraWander),
  hard(rapidZoomPulse),
  hard(invertPulse),
  hard(flashWhite),
  hard(mirrorVertical),
  hard(doubleMirror),
  hard(driftInput),
  hard(chaosInput),
  hard(outerRingOnly),
  hard(deadCenter),
  hard(fastTeleport),
  hard(shrinkingButton),
  hard(sinkingButton),
  hard(tripleDecoy),
  hard(ghostCopy),
  hard(speedButton),
  hard(timeLimit3s),
  hard(clickTimeout),
  hard(timerDrain),
  hard(hideTimer),
  hard(fakeCounter),
  hard(noUI),
  hard(confusionText),
  hard(multiShake),
  hard(reverseProgress),
  hard(nineClicks),
  hard(randomRadiusPerClick),
  hard(dangerZone),
]
