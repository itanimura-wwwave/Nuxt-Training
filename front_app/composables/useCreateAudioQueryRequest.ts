import { ref } from 'vue'
import {
  CreateAudioQueryRequest,
  type requestParams,
} from '~/api/CreateAudioQueryRequest'
import type { ICreateAudioQueryResponse } from '~/core/voicevoxApiServer/responses/ICreateAudioQueryResponse'

// コンポーザブル関数を定義してエクスポートする
export function useCreateAudioQuery() {
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)
  const audioQuery = ref<ICreateAudioQueryResponse | null>(null)

  const generateAudioQuery = async (requestParams: requestParams) => {
    isLoading.value = true
    errorMessage.value = null

    try {
      const query: ICreateAudioQueryResponse =
        await CreateAudioQueryRequest(requestParams)
      audioQuery.value = query
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('音声クエリの取得に失敗しました:', err)
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
    errorMessage,
    audioQuery,
    generateAudioQuery,
  }
}
