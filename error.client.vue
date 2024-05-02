<!-- error.vue -->
<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-blue-100 h-screen flex flex-col justify-center items-center px-5">
    <!-- <h2 class="text-[60px] font-bold">{{ error.statusCode }}</h2> -->
    <div class="container">
      <div title="404" class="text-[120px]">404</div>
      <!-- <p>{{ error.message }}</p> -->
      <!-- <p>糟糕！ 你跑進了未開發地區，讓我們帶你離開！</p> -->
    </div>
    <div class="container">
      <!-- <div title="404">{{ error.statusCode }}</div> -->
      <!-- <p>{{ error.message }}</p> -->
      <p class="text-[24px] md:text-[40px] tracking-wider">糟糕！ 你跑進了未開發地區，讓我們帶你離開！</p>
    </div>
    
    <NuxtLink to="/" class="custom-btn-primary rounded-lg mt-8">這是什麼奇怪的地方，快帶我回首頁</NuxtLink>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

.container{ 
  display: flex;
  /* width: 200px; */
  /* height: 100vh; */
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  /* background: #131313; */
  color: #000;
  /* font-size: 96px; */
  font-family: 'Fira Mono', monospace;
  letter-spacing: -7px;
}

.container{
  animation: glitch 1s linear infinite;
}

@keyframes glitch{
  2%,64%{
    transform: translate(2px,0) skew(0deg);
  }
  4%,60%{
    transform: translate(-2px,0) skew(0deg);
  }
  62%{
    transform: translate(0,0) skew(5deg); 
  }
}

div:before,
div:after{
  content: attr(title);
  position: absolute;
  left: 0;
}

div:before{
  animation: glitchTop 1s linear infinite;
  clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
}

@keyframes glitchTop{
  2%,64%{
    transform: translate(2px,-2px);
  }
  4%,60%{
    transform: translate(-2px,2px);
  }
  62%{
    transform: translate(13px,-1px) skew(-13deg); 
  }
}

div:after{
  animation: glitchBotom 1.5s linear infinite;
  clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
  -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
}

@keyframes glitchBotom{
  2%,64%{
    transform: translate(-2px,0);
  }
  4%,60%{
    transform: translate(-2px,0);
  }
  62%{
    transform: translate(-22px,5px) skew(21deg); 
  }
}
</style>

