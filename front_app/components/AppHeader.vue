<script setup lang="ts">

import { NuxtLink } from '#components';
let intervalId: ReturnType<typeof setInterval> | null = null;


  const pathIndex = ref<string[]>( [
    "home",
    "character",
  ])

  const currentTimeRef = ref<string>('Now mouting...')
  const setCurrentTime = () =>{
    console.log('a')
    const dateObject = new Date()
    currentTimeRef.value = dateObject.toLocaleTimeString()
  }


  onMounted(()=>{
    intervalId = setInterval(() => {
      setCurrentTime()
    }, 1000);
  })

  onUnmounted(()=>{
    if(intervalId) {
      clearInterval(intervalId)
    }
  })

</script>

<template>
  <!-- headerに付与するクラスは上位階層で指定するため、何も指定しないこと -->
  <header>
    <div class="bg-[#c3bbee] w-full h-full flex flex-col">
      <div
        class="bg-[#aa55aa] flex justify-between w-full h-[30%] pl-3 pr-3"
      >
        画面遷移先一覧
        <p>
          {{ currentTimeRef }}
        </p>
    </div>
      <div class="bg-[#44aaaa] flex w-full h-[70%] justify-start items-end pl-3 pb-2 text-l font-semibold">



        <div
          v-for="(title, index) in pathIndex" :key="index"
          class="flex"
        >
          <div
            v-if="index !== 0"
            class="flex justify-center items-center pl-1 pr-1 w-4 h-full text-white"
          >
            
          </div>
          <NuxtLink
            :to="`/${title}`"
            class="border-2 rounded-md border-black p-1 bg-[#ddff88]"
          >
            {{title}}
          </NuxtLink>
        </div>

    </div>

    </div>
  </header>
</template>
