import type { Mora } from './IMora'

export interface AccentPhrase {
  moras: Mora[]
  accent: number // アクセント核の位置（モーラ単位）
  pauseMora: Mora | null // 後続の無音モーラ
  isInterrogative: boolean // 疑問文かどうか
}
