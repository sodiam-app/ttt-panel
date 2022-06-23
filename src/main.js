import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('@/store/subscriber')

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://192.168.1.44:10000'
//createApp.prototype.$axios = axios

//import CoreuiVue from '@coreui/vue'
import CoreuiVuePro from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

store.dispatch('auth/attempt', {
  user: JSON.parse(localStorage.getItem('user')),
  role: localStorage.getItem('role'),
  status: localStorage.getItem('status'),
})
store.dispatch('auth/atttoken', localStorage.getItem('token')).then(() => {
  const app = createApp(App)
  app.use(store)
  app.use(router)
  app.use(CoreuiVuePro)
  app.use(VueAxios, axios)
  app.provide('icons', icons)
  app.component('CIcon', CIcon)
  app.component('DocsCallout', DocsCallout)
  app.component('DocsExample', DocsExample)

  app.mount('#app')
})
