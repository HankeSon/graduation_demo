import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue';
import Main from '../views/Main.vue';
import ResourceCrud from '../views/ResourceCrud.vue';

// 注册路由的组件
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      {
        name: 'Home',
        path: '/',
        component: Home
      },
      {
        name: 'course-crud',
        path: '/:resource/list',
        component: ResourceCrud,
        props: true
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
