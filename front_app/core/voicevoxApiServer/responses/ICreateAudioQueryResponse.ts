import type { AccentPhrase } from '~/models/IAccentPhrase'

export interface ICreateAudioQueryResponse {
  accent_phrases: AccentPhrase[]
  speedScale: number
  pitchScale: number
  intonationScale: number
  volumeScale: number
  prePhonemeLength: number
  postPhonemeLength: number
  pauseLength: number | null
  pauseLengthScale: number
  outputSamplingRate: number
  outputStereo: boolean
  kana: string
}
