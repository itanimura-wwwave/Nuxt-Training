<script setup lang="ts">
import type { ICreateSynthesisRequest } from '~/core/voicevoxApiServer/requests/ICreateSynthesisRequest'
import { useAudioSynthesis } from '~/composables/useCreateSynthesisRequest'
import type { requestParams as createSynthesisParams } from '~/api/CreateSynthesisRequest'

export type setIsLoading = (loadStatus: boolean) => {}
export type setError = (errorContents: any) => {}

const requestBody: ICreateSynthesisRequest = {
  accent_phrases: [
    {
      moras: [
        {
          text: 'ビ',
          consonant: 'b',
          consonant_length: 0.10580708086490631,
          vowel: 'i',
          vowel_length: 0.1485876441001892,
          pitch: 5.702807903289795,
        },
      ],
      accent: 1,
      pause_mora: null,
      is_interrogative: false,
    },
    {
      moras: [
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.20204754173755646,
          pitch: 5.952576637268066,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.19438926875591278,
          pitch: 6.004641056060791,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.17606088519096375,
          pitch: 5.682002067565918,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.1788504421710968,
          pitch: 5.351046562194824,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.1783885806798935,
          pitch: 5.3109002113342285,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.17938631772994995,
          pitch: 5.605174541473389,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.18464025855064392,
          pitch: 5.829262733459473,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.18879643082618713,
          pitch: 5.926448345184326,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.21440726518630981,
          pitch: 5.979483127593994,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.2496039718389511,
          pitch: 6.023807525634766,
        },
        {
          text: 'エ',
          consonant: null,
          consonant_length: null,
          vowel: 'e',
          vowel_length: 0.21439281105995178,
          pitch: 6.025508403778076,
        },
        {
          text: 'ン',
          consonant: null,
          consonant_length: null,
          vowel: 'N',
          vowel_length: 0.19420605897903442,
          pitch: 5.904623985290527,
        },
      ],
      accent: 1,
      pause_mora: null,
      is_interrogative: false,
    },
  ],
  speedScale: 1.0,
  pitchScale: 0.0,
  intonationScale: 1.0,
  volumeScale: 1.0,
  prePhonemeLength: 0.1,
  postPhonemeLength: 0.1,
  pauseLength: null,
  pauseLengthScale: 1.0,
  outputSamplingRate: 24000,
  outputStereo: false,
  kana: "ビ'/エ'エエエエエエエエエエン",
}

const { isLoading, audioSrc, errorMessage, generateAudioFile } =
  useAudioSynthesis()

const audioPlayerElement = ref<HTMLAudioElement | null>(null)

const setIsLoading = (loadStatus: boolean) => {
  isLoading.value = loadStatus
}
const callGenarateAudioFile = () => {
  const requestParams: createSynthesisParams = {
    requestBody: requestBody,
    queryParams: { speaker: 63 },
  }
  generateAudioFile(requestParams)
}

// コンポーネントがアンマウントされるときに、オブジェクトURLをクリーンアップする
onUnmounted(() => {
  if (audioSrc.value) {
    URL.revokeObjectURL(audioSrc.value)
  }
})
</script>

<template>
  <div class="bg-red-200 flex flex-col justify-center">
    <CommonLoadingOverlay v-if="isLoading" />
    <div>
      <audio
        v-if="audioSrc"
        ref="audioPlayerElement"
        :src="audioSrc"
        controls
      ></audio>
    </div>

    <div class="w-full h-[30%] flex justify-center items-center bg-sky-300">
      <button
        class="w-[30%] h-[50%] border-4 border-black rounded-lg"
        @click="callGenarateAudioFile"
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
