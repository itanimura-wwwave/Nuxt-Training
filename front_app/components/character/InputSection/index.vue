<script setup lang="ts">
import {
  useCreateAudioSynthesis,
  type allCamelCaseRequestParams,
} from '~/composables/useCreateSynthesisRequest'
import { useCreateAudioQuery } from '~/composables/useCreateAudioQueryRequest'
import type { requestParams } from '~/api/CreateAudioQueryRequest'
import type { ICreateAudioQueryResponse } from '~/core/voicevoxApiServer/responses/ICreateAudioQueryResponse'
import { USAGI_PHRASES } from '~/data/phrases'

const {
  isLoading: isLoadingSynthesis,
  audioSrc,
  errorMessage: _errorMessagefromSynthesis,
  generateAudioFile,
} = useCreateAudioSynthesis()

const {
  isLoading: isLoadingQuery,
  errorMessage: _errorMessageFromQuery,
  audioQuery,
  generateAudioQuery,
} = useCreateAudioQuery()

const audioPlayerElement = ref<HTMLAudioElement | null>(null)

const callGenarateAudioQuery = () => {
  const useText: string =
    USAGI_PHRASES[Math.floor(Math.random() * USAGI_PHRASES.length)]
  const requestParams: requestParams = {
    queryParams: {
      text: useText,
      speaker: 62,
    },
  }
  generateAudioQuery(requestParams)
}

const callGenarateAudioFile = (
  audioQuery: ICreateAudioQueryResponse | null
) => {
  if (audioQuery) {
    const requestParams: allCamelCaseRequestParams = {
      requestBody: audioQuery,
      queryParams: { speaker: 63 },
    }
    generateAudioFile(requestParams)
  }
}
const showLoadingView = computed(() => {
  return isLoadingQuery.value || isLoadingSynthesis.value
})

// コンポーネントがアンマウントされるときに、オブジェクトURLをクリーンアップする
onUnmounted(() => {
  if (audioSrc.value) {
    URL.revokeObjectURL(audioSrc.value)
  }
})
watch(audioQuery, (latestQuery) => {
  callGenarateAudioFile(latestQuery)
})

watch(audioSrc, async (newSrc) => {
  // 1. audioSrcに新しいURLがセットされたか確認
  if (newSrc) {
    // 2. DOMの更新を待つ (v-ifで<audio>要素が描画されるのを待つ)
    await nextTick()

    // 3. audio要素の.play()メソッドを呼び出して再生を開始
    // `?.` (オプショナルチェーン) を使って、要素がnullでない場合のみ実行する
    audioPlayerElement.value?.play()
  }
})
</script>

<template>
  <div class="bg-red-200 flex flex-col justify-center">
    <CommonLoadingOverlay v-if="showLoadingView" />
    <div>
      <audio v-if="audioSrc" ref="audioPlayerElement" :src="audioSrc" />
    </div>

    <div class="w-full h-[30%] flex justify-center items-center bg-sky-300">
      <button
        class="w-[30%] h-[50%] border-4 border-black rounded-lg"
        @click="callGenarateAudioQuery"
      >
        何か喋ってもらう
      </button>
    </div>

    <div class="w-full h-full flex items-center bg-blue-200">
      <div class="w-full flex justify-around">
        <button class="border-2 border-black rounded-full">←</button>
        <div class="flex items-center">□</div>
        <button class="border-2 border-black rounded-full">→</button>
      </div>
    </div>
  </div>
</template>
