import Vue from 'vue';
import VueRouter from 'vue-router';
import ListStudent from '../views/student/ListStudent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'List', component: ListStudent },
  { path: '/students', name: 'ListStudent', component: ListStudent }
]

const router = new VueRouter({
  routes
})

export default router
