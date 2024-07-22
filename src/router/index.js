import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'mapView',
      component:()=>import('../views/MapView/MapView.vue')
    },
    {
      path: '/city',
      name:'cityView',
      component:()=>import('../views/CityView/CityView.vue')
    }
  ]
})

export default router
