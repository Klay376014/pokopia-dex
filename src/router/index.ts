import { createRouter, createWebHistory } from 'vue-router'
import DexView from '../views/DexView.vue'
import MapsView from '../views/MapsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DexView },
    { path: '/maps', component: MapsView },
  ],
})

export default router
