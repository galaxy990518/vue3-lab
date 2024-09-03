import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ImageDownloader from '../views/ImageDownloader.vue';
import InfiniteScroll from '../views/InfiniteScroll.vue';
import Pop537 from '../views/Pop537.vue';

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
    },
    {
      path: '/Pop537',
      name: 'Pop537',
      component: Pop537
    }
  ]
});

router.beforeEach((to, from, next) => {
  const link = document.querySelector("link[rel~='icon']");
  if (to.path.toLowerCase().includes('/pop537')) {
    link.href = '/usagi.ico';
  } else {
    link.href = '/favicon.ico';
  }
  next();
});

export default router;
