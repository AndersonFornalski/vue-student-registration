import Vue from 'vue';
import VueRouter from 'vue-router';
import ListStudent from '../views/student/ListStudent.vue'
import RegisterStudent from '../views/student/RegisterStudent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'List', component: ListStudent },
  { path: '/students', name: 'ListStudent', component: ListStudent },
  { path: '/register', name: 'RegisterStudent', component: RegisterStudent }
]
const router = new VueRouter({
  routes
})

export default router
