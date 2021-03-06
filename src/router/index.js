import Vue from 'vue';
import VueRouter from 'vue-router';
import ListStudent from '../views/student/ListStudent.vue'
import RegisterStudent from '../views/student/RegisterStudent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect:"/alunos" },
  { path: '/alunos', name: 'ListStudent', component: ListStudent },
  { path: '/registro', name: 'RegisterStudent', component: RegisterStudent }
]
const router = new VueRouter({
  routes
})

export default router
