import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskListView from '../views/TaskList.vue'
import TaskNoneSelected from '../views/TaskList/TaskNoneSelected.vue'
import TaskAdd from '../views/TaskList/TaskAdd.vue'
import TaskEdit from '../views/TaskList/TaskEdit.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: TaskListView,
    children: [
      { path: '', name: 'TaskNoneSelected', component: TaskNoneSelected },
      { path: 'add', name: 'TaskAdd', component: TaskAdd },
      { path: 'edit/:uuid', name: 'TaskEdit', component: TaskEdit }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
