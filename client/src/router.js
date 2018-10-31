import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Profile from '@/views/Profile'
import ProjectTabs from '@/components/ProjectTabs'

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
      path: '/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/:name',
      name: 'projectTabs',
      component: ProjectTabs
    },
    
  ]
})
