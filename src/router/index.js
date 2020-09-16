import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskListView from '../views/TaskList.vue'
import TaskRecurListView from '../views/TaskRecurList.vue'
import TaskNoneSelected from '../views/TaskList/TaskNoneSelected.vue'
import TaskAdd from '../views/TaskList/TaskAdd.vue'
import TaskInfo from '../views/TaskList/TaskInfo.vue'
import TaskEdit from '../views/TaskList/TaskEdit.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: TaskListView,
    children: [
      { path: '', name: 'TaskNoneSelected', component: TaskNoneSelected },
      { path: 'add', name: 'TaskAdd', component: TaskAdd },
      { path: 'info/:uuid', name: 'TaskInfo', component: TaskInfo },
      { path: 'edit/:uuid', name: 'TaskEdit', component: TaskEdit }
    ]
  },
  {
    path: '/recur',
    component: TaskRecurListView,
    children: [
      { path: '', name: 'TaskRecurNoneSelected', component: TaskNoneSelected },
      { path: 'add', name: 'TaskRecurAdd', component: TaskAdd },
      { path: ':uuid', name: 'TaskRecurInfo', component: TaskInfo },
      { path: 'edit/:uuid', name: 'TaskRecurEdit', component: TaskEdit }
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
