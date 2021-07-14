import { createRouter, createWebHashHistory, RouteRecordRaw, RouterView } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue';
import Screens from '../routes/screens/screens.vue';
import Screen from '../routes/screen/screen.vue';
import Navigations from '../routes/navigations/navigations.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/navigations',
    name: 'Navigations',
    component: Navigations,
    meta: {
      withBar: true,
      title: 'Navigation History'
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/screens',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Screens',
        component: Screens,
        meta: {
          withBar: true,
          title: 'Screenshots'
        },
      },
      {
        path: ':order',
        name: 'Screen',
        component: Screen,
        props: true,
        meta: {
          withBar: true,
          title: 'Rendered Element'
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router
