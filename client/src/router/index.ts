import { createRouter, createWebHashHistory, RouteRecordRaw, RouterView } from 'vue-router'
import Home from '../views/Home.vue'
import Screens from '../routes/screens/screens.vue';
import Screen from '../routes/screen/screen.vue';
import Navigations from '../routes/navigations/navigations.vue';
import ApiHistory from '../routes/api-history/api-history.vue';
import Request from '../routes/api-history/request.vue';

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
      title: 'Navigation History',
      back: { path: '/' }
    },
  },
  {
    path: '/api-history',
    component: RouterView,
    children: [
      {
        path: '',
        name: 'Api History',
        meta: {
          withBar: true,
          title: 'Api History',
          back: { path: '/' }
        },
        component: ApiHistory
      },
      {
        path: ':requestId',
        name: 'Request',
        component: Request,
        props: true,
        meta: {
          withBar: true,
          title: 'Request',
          back: { path: '/api-history' }
        }
      }
    ]
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
          title: 'Screenshots',
          back: { path: '/' }
        },
      },
      {
        path: ':order',
        name: 'Screen',
        component: Screen,
        props: true,
        meta: {
          withBar: true,
          title: 'Rendered Element',
          back: { path: '/screens' }
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
