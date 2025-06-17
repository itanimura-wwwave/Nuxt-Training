<script setup lang="ts">
import {
  useCreateAudioSynthesis,
  type allCamelCaseRequestParams,
} from '~/composables/useCreateSynthesisRequest'
import { useCreateAudioQuery } from '~/composables/useCreateAudioQueryRequest'
import type { requestParams } from '~/api/CreateAudioQueryRequest'
import type { ICreateAudioQueryResponse } from '~/core/voicevoxApiServer/responses/ICreateAudioQueryResponse'
import {
  KASUKABE_PHRASES,
  USAGI_PHRASES,
  ZUNDAMON_PHRASES,
} from '~/data/phrases'

const USAGI_IDs = [61, 62, 63, 64]
const ZUNDA_IDs = [1, 3, 5, 7, 22, 38, 75, 76]
const KASUKABE_IDs = [8]

const props = defineProps({
  // v-model は 'modelValue' という名前のプロップスになる
  modelValue: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const currentCharacter = computed({
  // 親の値を読み取る
  get() {
    return props.modelValue
  },
  // 子コンポーネント内で値が変更されたときに実行される
  set(nextCharacter) {
    // 'update:modelValue' イベントをemitして、親に変更を通知
    emit('update:modelValue', nextCharacter)
  },
})

let speakerId = 0
let speakerText = '初期値です'
const setSpeaker = () => {
  switch (currentCharacter.value) {
    case 0:
      speakerId = USAGI_IDs[Math.floor(Math.random() * USAGI_IDs.length)]
      speakerText =
        USAGI_PHRASES[Math.floor(Math.random() * USAGI_PHRASES.length)]
      return

    case 1:
      speakerText =
        ZUNDAMON_PHRASES[Math.floor(Math.random() * ZUNDAMON_PHRASES.length)]
      speakerId = ZUNDA_IDs[Math.floor(Math.random() * ZUNDA_IDs.length)]
      return
    case 2:
      speakerId = KASUKABE_IDs[0]
      speakerText =
        KASUKABE_PHRASES[Math.floor(Math.random() * KASUKABE_PHRASES.length)]
      return
    default:
      speakerId = 0
  }
}

const changeSelectCharacter = (isMoveNext: boolean) => {
  const CHARACTER_COUNT = 3
  // 加算処理: 3になった場合0へループさせる
  if (isMoveNext) {
    currentCharacter.value = (currentCharacter.value + 1) % CHARACTER_COUNT
    return
  }
  // 減算処理: 0だった場合2へループさせる
  currentCharacter.value =
    (currentCharacter.value - 1 + CHARACTER_COUNT) % CHARACTER_COUNT
}

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
  // 誰が、どんなテキストを喋るのかを設定する
  setSpeaker()

  const requestParams: requestParams = {
    queryParams: {
      text: speakerText,
      speaker: speakerId,
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
      queryParams: { speaker: speakerId },
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
        <button
          class="border-2 border-black rounded-full"
          @click="changeSelectCharacter(false)"
        >
          ←
        </button>
        <div class="flex items-center">{{ currentCharacter }}</div>
        <button
          class="border-2 border-black rounded-full"
          @click="changeSelectCharacter(true)"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>
