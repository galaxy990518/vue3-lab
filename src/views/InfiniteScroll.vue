<template>
  <div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-100 text-center mb-10">
        Infinite Scroll with Random Posts using Intersection Observer
      </h1>

      <div
        v-for="(post, index) in posts"
        :key="index"
        class="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg"
      >
        <div class="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/40"
            alt="User avatar"
            class="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 class="text-gray-200 font-bold">User {{ index + 1 }}</h2>
            <span class="text-gray-400 text-sm">Posted {{ getRandomTime() }} ago</span>
          </div>
        </div>
        <p class="text-gray-300 mb-4">{{ post.content }}</p>
        <div class="relative overflow-hidden rounded-lg shadow-lg">
          <img
            :src="post.imageSrc"
            :alt="`Post image ${index}`"
            class="w-full h-64 object-cover transition duration-300 ease-in-out transform hover:scale-105"
            @error="handleImageError(index)"
          />
        </div>
      </div>

      <div ref="loadMoreTrigger" class="h-1"></div>

      <div v-if="loading" class="flex justify-center mt-6">
        <svg
          class="animate-spin h-10 w-10 text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const getRandomContent = () => {
  const contents = [
    'Just saw a beautiful sunset!',
    'Had an amazing lunch today!',
    'Exploring the city and found this gem.',
    'Can’t believe how much I’ve accomplished today!',
    'Feeling blessed and grateful.'
  ];
  return contents[Math.floor(Math.random() * contents.length)];
};

const getRandomTime = () => {
  const times = ['5 mins', '1 hour', '3 hours', '1 day', '2 days'];
  return times[Math.floor(Math.random() * times.length)];
};

const posts = ref([]);
const loading = ref(false);
const loadMoreTrigger = ref(null);
let observer = null;

const loadPosts = () => {
  if (loading.value) return;

  loading.value = true;

  setTimeout(() => {
    const startIndex = posts.value.length;
    const newPosts = [...Array(5).keys()].map((_, i) => ({
      content: getRandomContent(),
      imageSrc: `https://picsum.photos/500/300?image=${(startIndex + i + 1) * 8 + 10}`
    }));
    posts.value.push(...newPosts);
    loading.value = false;
  }, 1000);
};

const handleImageError = (index) => {
  const newImage = `https://picsum.photos/500/300?image=${Math.floor(Math.random() * 1000)}`;
  posts.value[index].imageSrc = newImage;
};

const setupObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadPosts();
        }
      });
    },
    {
      root: null,
      threshold: 0.1
    }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
};

onMounted(() => {
  loadPosts();
  setupObserver();
});

onBeforeUnmount(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>

<style scoped>
</style>
