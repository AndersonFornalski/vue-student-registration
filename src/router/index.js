import Vue from 'vue';
import VueRouter from 'vue-router';
import ListStudent from '../views/student/ListStudent.vue'
import RegisterStudent from '../views/student/RegisterStudent.vue'
import list from '../views/student/ListStudents.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'List', component: ListStudent },
  { path: '/alunos', name: 'ListStudent', component: ListStudent },
  { path: '/registro', name: 'RegisterStudent', component: RegisterStudent },
  { path: '/list', name: 'list', component: list }
]
const router = new VueRouter({
  routes
})

export default router
