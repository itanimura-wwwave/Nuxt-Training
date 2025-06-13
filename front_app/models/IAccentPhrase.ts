import type { Mora } from './IMora'

export interface AccentPhrase {
  moras: Mora[]
  accent: number // アクセント核の位置（モーラ単位）
  pause_mora: Mora | null // 後続の無音モーラ
  is_interrogative: boolean // 疑問文かどうか
}
