<script setup lang="ts">
const CHARACTER_NAMES = ['usagi', 'zunda', 'kasukabe']
const CHARACTER_NAMES_JA = ['中国うさぎ', 'ずんだもん', '春日部つむぎ']

const props = defineProps({
  // v-model は 'modelValue' という名前のプロップスになる
  modelValue: {
    type: Number,
    required: true,
  },
})

const showCharacterName = computed(() => {
  return CHARACTER_NAMES[props.modelValue] || 'unknown'
})
const showCharacterNameJP = computed(() => {
  return CHARACTER_NAMES_JA[props.modelValue] || 'unknown'
})
</script>
<template>
  <div class="bg-green-200">
    <div class="flex flex-col w-full h-full justify-center items-center">
      <img
        :src="`/${showCharacterName}.png`"
        alt="キャラ画像"
        class="object-fill border-4 border-black rounded-lg h-[75%] bg-gray-500"
      />
      <div class="h-[5%]" />
      <p class="flex justify-center font-sans text-xl md:text-3xl">
        {{ showCharacterNameJP }}
      </p>
    </div>
  </div>
</template>
