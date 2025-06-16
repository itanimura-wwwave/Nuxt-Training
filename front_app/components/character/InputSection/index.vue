<script setup lang="ts">
import {
  useCreateAudioSynthesis,
  type allCamelCaseRequestParams,
} from '~/composables/useCreateSynthesisRequest'
import { useCreateAudioQuery } from '~/composables/useCreateAudioQueryRequest'
import type { requestParams } from '~/api/CreateAudioQueryRequest'
import type { ICreateAudioQueryResponse } from '~/core/voicevoxApiServer/responses/ICreateAudioQueryResponse'

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
  const requestParams: requestParams = {
    queryParams: {
      text: 'えーぴーあいてすと',
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
</script>

<template>
  <div class="bg-red-200 flex flex-col justify-center">
    <CommonLoadingOverlay v-if="showLoadingView" />
    <div>
      <audio
        v-if="audioSrc"
        ref="audioPlayerElement"
        :src="audioSrc"
        controls
      />
      {{ isLoadingQuery }}
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
