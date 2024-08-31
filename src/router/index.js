import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ImageDownloader from '../views/ImageDownloader.vue';
import InfiniteScroll from '../views/InfiniteScroll.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ImageDownloader',
      name: 'ImageDownloader',
      component: ImageDownloader
    },
    {
      path: '/InfiniteScroll',
      name: 'InfiniteScroll',
      component: InfiniteScroll
    }
  ]
});

export default router;
