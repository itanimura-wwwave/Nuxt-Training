export interface Mora {
  text: string
  consonant: string | null // 子音の音素
  consonant_length: number | null // 子音の長さ
  vowel: string // 母音の音素
  vowel_length: number // 母音の長さ
  pitch: number // 音高
}
