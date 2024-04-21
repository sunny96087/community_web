<template>
  <main class="h-screen w-full">
    <!-- <slot name="header" /> -->
    <div class="page-wrapper">
      <slot />
    </div>
    <!-- <slot name="footer" /> -->
  </main>
</template>
<style scoped>
main {
  background: url('~/assets/images/bg.png') no-repeat center center fixed;
  /* -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover; */
  background-size: cover;
  font-family: 'Azeret Mono';
}

.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
