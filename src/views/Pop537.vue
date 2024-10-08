<template>
  <div
    class="min-h-[calc(100dvh)] bg-gray-700 flex items-center justify-center overflow-hidden select-none"
  >
    <div class="text-center">
      <h1 class="text-6xl font-bold text-white mb-4">USAGI</h1>
      <div
        class="text-6xl text-white mb-8 transition-all duration-200 transform origin-bottom select-none"
        :class="{
          'scale-110 rotate-3': isScoreWobblingRight,
          'scale-110 -rotate-3': isScoreWobblingLeft
        }"
      >
        {{ score }}
      </div>
      <div class="relative">
        <img
          :src="usagiImage"
          alt="Usagi"
          class="w-48 h-48 md:w-80 md:h-80 cursor-pointer mx-auto select-none"
          @click="incrementScore"
          @keydown="incrementScore"
          tabindex="0"
          :class="{ 'pointer-events-none': isAudioPlaying }"
        />
        <transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-50"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-500 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-50"
          appear
          v-for="(text, index) in textList"
          :key="index"
        >
          <div
            v-if="showTextStates[index]"
            class="absolute text-white text-4xl font-bold select-none"
            :class="textPositionClass(index)"
          >
            {{ text }}
          </div>
        </transition>

        <transition enter-active-class="transition-none" leave-active-class="transition-none">
          <div
            v-if="showSpecialText"
            class="absolute text-white text-5xl font-bold whitespace-nowrap special-text select-none"
          >
            噗嚕嚕嚕嚕嚕嚕嚕嚕嚕嗚嗚嗚～～～～～～～
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSound } from '@vueuse/sound';
import wu from '@/assets/sounds/pop537/wu.mp3';
import ya from '@/assets/sounds/pop537/ya.mp3';
import yee from '@/assets/sounds/pop537/yee.mp3';
import ha from '@/assets/sounds/pop537/ha.mp3';
import plur from '@/assets/sounds/pop537/plur.mp3';

const wuSound = useSound(wu);
const yaSound = useSound(ya);
const yeeSound = useSound(yee);
const haSound = useSound(ha);

const score = ref(0);
const isMouthOpen = ref(false);
const textList = ['嗚', '呀', '咿', '哈'];
const showTextStates = ref([false, false, false, false]);
const currentTextIndex = ref(0);
const isScoreWobblingRight = ref(false);
const isScoreWobblingLeft = ref(false);
const isAudioPlaying = ref(false);
const showSpecialText = ref(false);

const usagiImage = computed(() =>
  isMouthOpen.value
    ? new URL('@/assets/images/pop537/usagi-open.png', import.meta.url).href
    : new URL('@/assets/images/pop537/usagi-closed.png', import.meta.url).href
);

const textPositionClass = (index) => {
  const positions = [
    '-left-16 top-0',
    '-right-16 top-0',
    '-left-16 bottom-0',
    '-right-16 bottom-0'
  ];
  return positions[index];
};

const sounds = [wuSound, yaSound, yeeSound, haSound];
const specialSound = useSound(plur, {
  onend: () => {
    isAudioPlaying.value = false;
    showSpecialText.value = false;
  }
});

onMounted(() => {
  window.addEventListener('keydown', incrementScore);
});

onUnmounted(() => {
  window.removeEventListener('keydown', incrementScore);
});

const playSpecialSound = () => {
  isAudioPlaying.value = true;
  specialSound.play();
};

const showTextAnimation = (index) => {
  showTextStates.value[index] = true;
  setTimeout(() => {
    showTextStates.value[index] = false;
  }, 500);
};

const wobbleScore = () => {
  const isEven = score.value % 2 === 0;
  isScoreWobblingRight.value = isEven;
  isScoreWobblingLeft.value = !isEven;
  setTimeout(() => {
    isScoreWobblingRight.value = false;
    isScoreWobblingLeft.value = false;
  }, 200);
};

const incrementScore = () => {
  if (isAudioPlaying.value) return;
  score.value++;
  isMouthOpen.value = true;

  sounds[currentTextIndex.value].play();
  showTextAnimation(currentTextIndex.value);
  wobbleScore();

  if (score.value % 10 === 0) {
    showSpecialText.value = true;
    playSpecialSound();
  }

  currentTextIndex.value = (currentTextIndex.value + 1) % textList.length;

  setTimeout(() => {
    isMouthOpen.value = false;
  }, 100);
};
</script>

<style scoped>
@keyframes moveLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.special-text {
  position: absolute;
  top: 50%;
  right: 0;
  white-space: nowrap;
  transform: translate(100%, -50%);
  animation: moveLeft 1.2s linear forwards;
}

* {
  touch-action: manipulation;
}
</style>
