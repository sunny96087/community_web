<template>
  <main class="h-screen w-full">
    <navbar />
    <div class="page-wrapper">
      <div class="grow">
        <NuxtPage />
      </div>
      <Slidebar />
    </div>
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
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 28px;
  padding: 0 24px;
  padding-top: 40px;
  align-items: start;
}
</style>
