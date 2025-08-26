import { createRouter, createWebHistory } from 'vue-router'
import SearchPage from '../views/SearchPage.vue'
import AddList from '../views/AddList.vue'
import ListDetail from '../views/ListDetail.vue'

const routes = [
  { path: '/', name: 'Search', component: SearchPage },
  { path: '/lists/new', name: 'AddList', component: AddList },
  { path: '/lists/:id', name: 'ListDetail', component: ListDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
