import { ref } from 'vue'
import {
  CreateSynthesisRequest,
  type requestParams,
} from '~/api/CreateSynthesisRequest'
import type { ICreateSynthesisRequest } from '~/core/voicevoxApiServer/requests/ICreateSynthesisRequest'
import type { ICreateSynthesisResponse } from '~/core/voicevoxApiServer/responses/ICreateSynthesisResponse'
import type { AccentPhrase } from '~/models/IAccentPhrase'

// コンポーザブル関数を定義してエクスポートする
export function useAudioSynthesis() {
  const isLoading = ref(false)
  const audioSrc = ref<string | null>(null)
  const errorMessage = ref<string | null>(null)

  type CamelCaseRequestBody = Omit<
    ICreateSynthesisRequest,
    'accent_phrases'
  > & {
    accentPhrases: AccentPhrase[]
  }

  // accent_phrase: AccentPhrases[]のキーをキャメルケースに置換した型
  type allCamelCaseRequestParams = Omit<requestParams, 'requestBody'> & {
    requestBody: CamelCaseRequestBody
  }

  const generateAudioFile = async (
    requestParams: allCamelCaseRequestParams
  ) => {
    isLoading.value = true
    errorMessage.value = null

    // 以前のオブジェクトURLを解放
    if (audioSrc.value) {
      URL.revokeObjectURL(audioSrc.value)
      audioSrc.value = null
    }

    const { requestBody, ...queryParams } = requestParams
    const { accentPhrases, ...otherRequestBodyParams } = requestBody

    const fixedRequestParams: requestParams = {
      requestBody: {
        accent_phrases: keysToSnake(accentPhrases),
        ...otherRequestBodyParams,
      },
      ...queryParams,
    }
    try {
      const blob: ICreateSynthesisResponse =
        await CreateSynthesisRequest(fixedRequestParams)
      audioSrc.value = URL.createObjectURL(blob)
    } catch (err: any) {
      console.error('音声の取得に失敗しました:', err)
      errorMessage.value =
        err.data?.detail?.[0]?.msg ||
        err.message ||
        '不明なエラーが発生しました'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    audioSrc,
    errorMessage,
    generateAudioFile,
  }
}
