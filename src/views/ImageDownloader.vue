<template>
  <div class="min-h-[calc(100dvh)] bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-extrabold text-gray-100 text-center mb-10">
        Use JSZip to compress and download selected images
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(image, index) in allImages" :key="index" class="relative group">
          <div
            class="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out"
            :class="{ 'ring-4 ring-indigo-500': image.selected }"
          >
            <input
              type="checkbox"
              :id="`image-${index}`"
              :checked="image.selected"
              @change="toggleImage(index)"
              class="sr-only peer"
            />
            <label :for="`image-${index}`" class="cursor-pointer block">
              <img
                :src="image.src"
                :alt="`Image ${index}`"
                class="w-full h-64 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-black transition duration-300 ease-in-out"
                :class="{ 'bg-opacity-50': !image.selected, 'bg-opacity-25': image.selected }"
              >
                <div
                  class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </label>
            <div
              v-if="!image.loaded"
              class="absolute inset-0 flex items-center justify-center bg-gray-800"
            >
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
          <div class="absolute top-2 left-2 z-10">
            <div
              class="w-6 h-6 rounded-full shadow-md flex items-center justify-center transition duration-300 ease-in-out"
              :class="{ 'bg-indigo-500': image.selected, 'bg-white': !image.selected }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition duration-300 ease-in-out"
                :class="{ 'text-white': image.selected, 'text-indigo-500': !image.selected }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        class="fixed right-8 bottom-8 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="downloadSelectedImages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
    </div>
  </div>

  <div
    v-if="loadingDialog"
    class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full">
      <h3 class="text-lg font-medium text-gray-100 mb-4">Preparing Download</h3>
      <p class="text-sm text-gray-400 mb-4">Please wait while we package your selected images.</p>
      <div class="w-full h-2 bg-gray-700 rounded-full">
        <div class="w-full h-full bg-indigo-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import JSZip from 'jszip';

const loadingDialog = ref(false);
const allImages = ref(
  [...Array(9).keys()].map((x, i) => ({
    src: `https://picsum.photos/500/300?random=${i}`,
    name: `image_${i}.png`,
    selected: false,
    loaded: false
  }))
);

const toggleImage = (index) => {
  allImages.value[index].selected = !allImages.value[index].selected;
};

const downloadSelectedImages = async () => {
  loadingDialog.value = true;

  const zip = new JSZip();
  for (const image of allImages.value) {
    if (image.selected) {
      const response = await fetch(image.src);
      const blob = await response.blob();

      zip.file(image.name, blob);
    }
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    const blobUrl = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'images.zip';
    link.click();
    loadingDialog.value = false;
  });
};

onMounted(() => {
  allImages.value.forEach((image, index) => {
    const img = new Image();
    img.onload = () => {
      allImages.value[index].loaded = true;
    };
    img.src = image.src;
  });
});
</script>
