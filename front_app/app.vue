<script></script>
<template>
  <div class="app-container">
    <CommonAppHeader class="w-screen h-[10vh]" />
    <main>
      <NuxtPage class="w-screen h-[80vh]" />
    </main>
    <CommonAppFooter class="w-screen h-[10vh]" />
  </div>
</template>

<style>
.app-container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
