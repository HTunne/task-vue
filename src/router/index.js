import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js";
import LoginView from '../views/Login.vue'
import TaskListView from '../views/TaskList.vue'
import TaskNoneSelected from '../views/TaskList/TaskNoneSelected.vue'
import TaskAdd from '../views/TaskList/TaskAdd.vue'
import TaskInfo from '../views/TaskList/TaskInfo.vue'
import TaskEdit from '../views/TaskList/TaskEdit.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
    },
    {
        path: '/',
        component: TaskListView,
        meta: { recurPage: false },
        children: [
            { path: '', name: 'TaskNoneSelected', component: TaskNoneSelected, meta: { recurPage: false, noneSelected: true } },
            { path: 'add', name: 'TaskAdd', component: TaskAdd, meta: { recurPage: false } },
            { path: 'info/:uuid', name: 'TaskInfo', component: TaskInfo, meta: { recurPage: false } },
            { path: 'edit/:uuid', name: 'TaskEdit', component: TaskEdit, meta: { recurPage: false } }
        ]
    },
    {
        path: '/recur',
        component: TaskListView,
        meta: { recurPage: true },
        children: [
            { path: '', name: 'TaskRecurNoneSelected', component: TaskNoneSelected, meta: { recurPage: true, noneSelected: true } },
            { path: 'add', name: 'TaskRecurAdd', component: TaskAdd, meta: { recurPage: true } },
            { path: ':uuid', name: 'TaskRecurInfo', component: TaskInfo, meta: { recurPage: true } },
            { path: 'edit/:uuid', name: 'TaskRecurEdit', component: TaskEdit, meta: { recurPage: true } }
        ]
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import(/* webpackChunkName: "calendar" */ '../views/Calendar.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.getHasToken) {
      const loginpath = window.location.pathname;
      console.log(loginpath)
      next({ name: 'Login', query: { from: loginpath } });
  } else next()
})

export default router
