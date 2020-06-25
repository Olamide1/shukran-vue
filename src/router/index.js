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
import Pricing from '@/components/Pricing'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Homepage - Shukran'
      }
    },
    {
      path: '/accounts',
      name: 'Hello',
      component: Hello,
      meta: {
        title: 'Register - Shukran'
      }
    },
    {
      path: '/pricing',
      name: 'Pricing',
      component: Pricing,
      meta: {
        title: 'Pricing - Shukran'
      }
    },
    {
      path: '/dash',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard - Shukran'
      }
    },
    {
      path: '/boss',
      name: 'Admin',
      component: Admin,
      meta: {
        title: 'Admin - Shukran'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        title: 'Profile - Shukran'
      }
    },
    {
      path: '/cr/:username',
      name: 'Support',
      component: Support,
      meta: {
        reload: false,
        title: 'User -'
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
      component: Reset,
      meta: {
        title: 'Reset - Shukran'
      }
    }
  ]
})
