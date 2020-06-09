import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Home from '@/components/Home'
import Support from '@/components/Support'
import Thankyou from '@/components/Thankyou'
import Admin from '@/components/Admin'
import Reset from '@/components/Reset'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/accounts',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dash',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/boss',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/cr/:username',
      name: 'Support',
      component: Support,
      meta: {
        reload: false,
      }
    },
    {
      path: '/thanks',
      name: 'Thankyou',
      component: Thankyou
    },
    {
      path: '/resetpassword',
      name: 'Reset',
      component: Reset
    }
  ]
})
