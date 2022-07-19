import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/Demo.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/banking',
        name: 'Banking',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/banking/transaction',
        children: [
          {
            path: '/banking/transaction/:tab?',
            name: 'Transaction',
            component: () => import('@/views/_banking/Transaction.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/banking/transfer',
            name: 'Transfer',
            component: () => import('@/views/_banking/Transfer.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/banking/return-credit',
            name: 'Return Credit',
            component: () => import('@/views/_banking/ReturnCredit.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/member',
        name: 'Member',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/member/list',
        children: [
          {
            path: '/member/create',
            name: 'Create',
            component: () => import('@/views/_member/Create.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/member/list',
            name: 'Lists of member',
            component: () => import('@/views/_member/Lists.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/member/list/:webSite/:memberID',
            name: 'Member ID',
            component: () => import('@/views/_member/ManageMember.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/member/list-new',
            name: 'Lists of new member',
            component: () => import('@/views/_member/New.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/member/blacklist',
            name: 'Black List',
            component: () => import('@/views/_member/BlackList.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/setting',
        name: 'Setting',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/setting/general',
        children: [
          {
            path: '/setting/general',
            name: 'General',
            component: () => import('@/views/_setting/system/General.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/setting/banking-acct',
            name: 'Bank Account',
            component: () => import('@/views/_setting/system/BankingAcc.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/setting/front-end',
            name: 'Front-end',
            component: () => import('@/views/_setting/system/FrontEnd.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/setting/security',
            name: 'Security',
            component: () => import('@/views/_setting/system/Security.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/setting/agent',
            name: 'Agent',
            component: () => import('@/views/_setting/system/Agent.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/setting/balck-list',
            name: 'Balck list',
            component: () => import('@/views/_setting/system/BalckList.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/promotion',
        name: 'Promotion',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/promotion/setting',
        children: [
          {
            path: '/promotion/setting',
            name: 'Promotion',
            component: () => import('@/views/_setting/promotion/Setting.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/promotion/joined',
            name: 'Joined',
            component: () => import('@/views/_setting/promotion/Joined.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/setting/employee',
        name: 'Employees',
        component: () => import('@/views/_setting/employee/Employee.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/report',
        name: 'Report',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/report/overall-stat',
        children: [
          {
            path: '/report/bill-cycle',
            name: 'Bill Cycle',
            component: () => import('@/views/_report/BillCycle.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/report/overall-stat',
            name: 'Overall Stat',
            component: () => import('@/views/_report/OverallStat.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/report/overall-members',
            name: 'Overall Members',
            component: () => import('@/views/_report/OverallMembers.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/report/monthly-summary',
            name: 'Monthly Summary',
            component: () => import('@/views/_report/MonthlySummary.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/report/action-event',
            name: 'Action Event',
            component: () => import('@/views/_report/ActionEvent.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: '/report/export',
            name: 'Export',
            component: () => import('@/views/_report/ExportDocument.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: { guest: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters['auth/authenticated'] != null) {
      next()
      return
    }
    next('/pages/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters['auth/authenticated'] != null) {
      next('/')
      return
    }
    next()
  } else {
    next()
  }
})

export default router
