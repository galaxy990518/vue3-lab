<template>
  <div class="min-h-[calc(100dvh)] bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-100 text-center mb-8">
        <span class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 sm:h-12 sm:w-12 inline-block mr-2 text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <span class="break-words">Vue 3 Exercise Collection</span>
        </span>
      </h1>

      <div
        class="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl"
      >
        <div class="px-4 sm:px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-100 mb-4">Available Exercises</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-700 bg-opacity-60">
              <tr>
                <th
                  v-for="header in exerciseHeaders"
                  :key="header.key"
                  class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  :class="{
                    'w-3/10': header.key === 'name',
                    'w-6/10': header.key === 'desc',
                    'w-1/10': header.key === 'operation'
                  }"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-gray-800 divide-y divide-gray-700">
              <tr
                v-for="item in exerciseList"
                :key="item.name"
                class="hover:bg-gray-700 transition-colors duration-200"
              >
                <td class="px-4 sm:px-6 py-4 whitespace-normal">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-100">{{ item.name }}</div>
                  </div>
                </td>
                <td class="px-4 sm:px-6 py-4">
                  <div class="text-sm text-gray-300">{{ item.desc }}</div>
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-center">
                  <router-link
                    :to="{ name: item.name }"
                    target="_blank"
                    class="text-indigo-400 hover:text-indigo-500 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const exerciseHeaders = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'desc' },
  { title: 'Demo', key: 'operation' }
];

const exerciseList = ref([
  {
    name: 'ImageDownloader',
    desc: 'Use JSZip to download selected images as zip'
  },
  {
    name: 'InfiniteScroll',
    desc: 'Infinite Scrolling with Random Posts'
  },
  {
    name: 'Pop537',
    desc: 'Popusagi game inspired by the Popcat game'
  }
]);
</script>
