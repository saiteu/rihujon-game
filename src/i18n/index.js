// Language store
let _lang = localStorage.getItem('clickhell-lang') || 'ja'

export function setLang(l) {
  _lang = l
  localStorage.setItem('clickhell-lang', l)
}

export function getLang() { return _lang }

// UI string tables
const JA = {
  // StartScene
  'start.tagline': '— INSANE RULE STACKING —',
  'start.subtitle': '理不尽ルール追加系',
  'start.desc1': 'クリアするたびに',
  'start.desc2': '理不尽なルールが追加されていく！',
  'start.desc3': '',
  'start.desc4': 'ルールに耐え続けろ。限界まで。',
  'start.play': 'PLAY',
  'start.tap': 'TAP TO START',
  'start.lang': 'EN→',

  // GameScene
  'game.rules': (n) => `ルール: ${n}個`,
  'game.progress': (c, t) => `${c} / ${t} クリック`,
  'game.hardWarningDesc': '難易度上昇中...',

  // RuleAnnouncer
  'announce.newRule': '⚡ NEW RULE ADDED ⚡',
  'announce.tap': 'タップで続ける',
  'announce.swap': '🔄 RULE ROTATION',

  // RuleList
  'rulelist.title': 'ACTIVE RULES:',
  'rulelist.empty': 'ルールなし（まだ余裕あり）',

  // ResultScene
  'result.rulesLabel': 'RULES SURVIVED',
  'result.rulesUnit': '個',
  'result.share': 'X(Twitter)でシェア',
  'result.retry': 'RETRY',
  'result.msg0': '即死…\nCLICK HELLの洗礼を受けた',
  'result.msg1': 'まだまだ甘い\n地獄はここから始まる',
  'result.msg3': '悪くない\n理不尽に慣れてきたか？',
  'result.msg5': 'なかなかやる\n地獄の住人に片足突っ込んだ',
  'result.msg8': '化け物か？\nCLICK HELLマスター認定！',
  'result.msg10': '全ルール制覇！！\n地獄を支配した王者👑',
}

const EN = {
  // StartScene
  'start.tagline': '— INSANE RULE STACKING —',
  'start.subtitle': 'Unfair Rule Stacking',
  'start.desc1': 'Every clear adds',
  'start.desc2': 'one more unfair rule!',
  'start.desc3': '',
  'start.desc4': 'Survive the rules. Until you can\'t.',
  'start.play': 'PLAY',
  'start.tap': 'TAP TO START',
  'start.lang': 'JA→',

  // GameScene
  'game.rules': (n) => `RULES: ${n}`,
  'game.progress': (c, t) => `${c} / ${t} CLICKS`,
  'game.hardWarningDesc': 'Difficulty rising...',

  // RuleAnnouncer
  'announce.newRule': '⚡ NEW RULE ADDED ⚡',
  'announce.tap': 'TAP TO CONTINUE',
  'announce.swap': '🔄 RULE ROTATION',

  // RuleList
  'rulelist.title': 'ACTIVE RULES:',
  'rulelist.empty': 'No rules yet (still easy)',

  // ResultScene
  'result.rulesLabel': 'RULES SURVIVED',
  'result.rulesUnit': '',
  'result.share': 'Share on X',
  'result.retry': 'RETRY',
  'result.msg0': 'Instant death...\nWelcome to CLICK HELL',
  'result.msg1': 'Not even close.\nThe hell has just begun',
  'result.msg3': 'Not bad.\nGetting used to the madness?',
  'result.msg5': 'Impressive!\nOne foot in the door of hell',
  'result.msg8': 'A monster?\nCLICK HELL Master certified!',
  'result.msg10': 'ALL RULES CLEARED!!\nYou are the ruler of hell 👑',
}

export function t(key, ...args) {
  const dict = _lang === 'en' ? EN : JA
  const val = dict[key]
  if (typeof val === 'function') return val(...args)
  return val ?? key
}

// Returns { name, description } for a rule in current language
import { RULES_EN } from './rules.en.js'

export function tRule(rule) {
  if (!rule) return { name: '', description: '' }
  if (_lang === 'en') {
    const en = RULES_EN[rule.id]
    if (en) return en
  }
  return { name: rule.name, description: rule.description }
}
