<script setup lang="ts">
const currentCharacter = ref<0 | 1 | 2>(0)
</script>

<template>
  <div class="flex items-center justify-center">
    <CharacterInputSection v-model="currentCharacter" class="w-1/2 h-full" />
    <CharacterPictureSection v-model="currentCharacter" class="w-1/2 h-full" />
  </div>
</template>
