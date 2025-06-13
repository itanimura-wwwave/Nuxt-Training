<script setup lang="ts">
import type { ICreateSynthesisRequest } from '~/core/voicevoxApiServer/requests/ICreateSynthesisRequest'

const requestBody: ICreateSynthesisRequest = {
    "accent_phrases": [
        {
            "moras": [
                {
                    "text": "ビ",
                    "consonant": "b",
                    "consonant_length": 0.10580708086490631,
                    "vowel": "i",
                    "vowel_length": 0.1485876441001892,
                    "pitch": 5.702807903289795
                }
            ],
            "accent": 1,
            "pause_mora": null,
            "is_interrogative": false
        },
        {
            "moras": [
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.20204754173755646,
                    "pitch": 5.952576637268066
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.19438926875591278,
                    "pitch": 6.004641056060791
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.17606088519096375,
                    "pitch": 5.682002067565918
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.1788504421710968,
                    "pitch": 5.351046562194824
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.1783885806798935,
                    "pitch": 5.3109002113342285
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.17938631772994995,
                    "pitch": 5.605174541473389
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.18464025855064392,
                    "pitch": 5.829262733459473
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.18879643082618713,
                    "pitch": 5.926448345184326
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.21440726518630981,
                    "pitch": 5.979483127593994
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.2496039718389511,
                    "pitch": 6.023807525634766
                },
                {
                    "text": "エ",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "e",
                    "vowel_length": 0.21439281105995178,
                    "pitch": 6.025508403778076
                },
                {
                    "text": "ン",
                    "consonant": null,
                    "consonant_length": null,
                    "vowel": "N",
                    "vowel_length": 0.19420605897903442,
                    "pitch": 5.904623985290527
                }
            ],
            "accent": 1,
            "pause_mora": null,
            "is_interrogative": false
        }
    ],
    "speedScale": 1.0,
    "pitchScale": 0.0,
    "intonationScale": 1.0,
    "volumeScale": 1.0,
    "prePhonemeLength": 0.1,
    "postPhonemeLength": 0.1,
    "pauseLength": null,
    "pauseLengthScale": 1.0,
    "outputSamplingRate": 24000,
    "outputStereo": false,
    "kana": "ビ'/エ'エエエエエエエエエエン"
}

const isLoading = ref(false)
const error = ref<Error | null>(null)

const audioPlayerElement = ref<HTMLAudioElement | null>(null)
const audioSrc = ref<string | null>(null)

// 音声データを取得して再生する非同期関数
async function fetchAndPlayAudio() {
  isLoading.value = true
  error.value = null

  if (audioSrc.value) {
    URL.revokeObjectURL(audioSrc.value)
    audioSrc.value = null
  }

  // 61~64
  // 76 ずんだ
  try {
    console.log('rrrrrrrrrrrr')

    // APIを呼び出す
    const audioBlob: Blob = await $fetch('http://localhost:50021/synthesis?speaker=76', {
      method: 'POST',
      body: requestBody,
      responseType: 'blob',
    })

    // Blobから再生用のURLを生成し、refにセットする
    audioSrc.value = URL.createObjectURL(audioBlob)

    // ★★★ ここからが追加部分 ★★★
    // DOMの更新を待機してから再生を実行する
    await nextTick()

    // ref経由でaudio要素を取得し、再生する
    // `?.` (オプショナルチェーン) を使って、要素がnullでない場合のみ実行
    audioPlayerElement.value?.play()
  } catch (err: any) {
    console.error('音声の取得に失敗しました:', err)
    error.value = err
  } finally {
    isLoading.value = false
  }
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
        @click="fetchAndPlayAudio"
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
