import noMouseMove from './noMouseMove.js'
import rightHalfOnly from './rightHalfOnly.js'
import timeLimit5s from './timeLimit5s.js'
import screenRotate from './screenRotate.js'
import colorBan from './colorBan.js'
import noDoubleClick from './noDoubleClick.js'
import clickInterval from './clickInterval.js'
import screenShake from './screenShake.js'
import transparent from './transparent.js'
import invertCursor from './invertCursor.js'

// Order: roughly easy → hard (added randomly anyway)
export const RULES = [
  screenShake,
  rightHalfOnly,
  clickInterval,
  noDoubleClick,
  timeLimit5s,
  colorBan,
  transparent,
  screenRotate,
  noMouseMove,
  invertCursor,
]
