import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import Project from '@/views/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project
    }
    
  ]
})
