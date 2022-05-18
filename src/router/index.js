import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
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
            path: '/banking/transaction',
            name: 'Transaction',
            component: () => import('@/views/_banking/Transaction.vue'),
          },
          {
            path: '/banking/transfer',
            name: 'Transfer',
            component: () => import('@/views/_banking/Transfer.vue'),
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
          },
          {
            path: '/member/list',
            name: 'Lists of member',
            component: () => import('@/views/_member/Lists.vue'),
          },
          {
            path: '/member/list/:webSite/:memberID',
            name: 'Member ID',
            component: () => import('@/views/_member/ManageMember.vue'),
          },
          {
            path: '/member/list-new',
            name: 'Lists of new member',
            component: () => import('@/views/_member/New.vue'),
          },
          {
            path: '/member/blacklist',
            name: 'Black List',
            component: () => import('@/views/_member/BlackList.vue'),
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
          },
          {
            path: '/setting/banking-acct',
            name: 'Bank Account',
            component: () => import('@/views/_setting/system/BankingAcc.vue'),
          },
          {
            path: '/setting/front-end',
            name: 'Front-end',
            component: () => import('@/views/_setting/system/FrontEnd.vue'),
          },
          {
            path: '/setting/security',
            name: 'Security',
            component: () => import('@/views/_setting/system/Security.vue'),
          },
          {
            path: '/setting/agent',
            name: 'Agent',
            component: () => import('@/views/_setting/system/Agent.vue'),
          },
          {
            path: '/setting/balck-list',
            name: 'Balck list',
            component: () => import('@/views/_setting/system/BalckList.vue'),
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
          },
          {
            path: '/promotion/joined',
            name: 'Joined',
            component: () => import('@/views/_setting/promotion/Joined.vue'),
          },
        ],
      },
      {
        path: '/setting/employee',
        name: 'Employees',
        component: () => import('@/views/_setting/employee/Employee.vue'),
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
          },
          {
            path: '/report/overall-stat',
            name: 'Overall Stat',
            component: () => import('@/views/_report/OverallStat.vue'),
          },
          {
            path: '/report/overall-members',
            name: 'Overall Members',
            component: () => import('@/views/_report/OverallMembers.vue'),
          },
          {
            path: '/report/monthly-summary',
            name: 'Monthly Summary',
            component: () => import('@/views/_report/MonthlySummary.vue'),
          },
          {
            path: '/report/action-event',
            name: 'Action Event',
            component: () => import('@/views/_report/ActionEvent.vue'),
          },
          {
            path: '/report/export',
            name: 'Export',
            component: () => import('@/views/_report/ExportDocument.vue'),
          },
        ],
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
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

export default router
