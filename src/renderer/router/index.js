import Vue from 'vue'
import Router from 'vue-router'

import Tasks from '@/components/Home/Tasks'
import Habits from '@/components/Home/Habits'
import Store from '@/components/Home/Store'
import Settings from '@/components/Home/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default,
      redirect: '/tasks',
      children: [
        {
          path: 'tasks',
          name: 'Tasks',
          component: Tasks
        },
        {
          path: 'habits',
          name: 'Habits',
          component: Habits
        },
        {
          path: 'store',
          name: 'Store',
          component: Store
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
