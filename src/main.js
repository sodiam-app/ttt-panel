import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

require('@/store/subscriber')

// import axios from 'axios'
import VueAxios from 'vue-axios'
import { mainAxios } from '@/_conf'

// axios.defaults.baseURL = 'http://192.168.1.131:10000'

//import CoreuiVue from '@coreui/vue'
import CoreuiVuePro from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import timeago from 'vue-timeago3'
const timeagoOptions = {
  converterOptions: {
    includeSeconds: false,
    locale: 'th',
  },
}

// import useVuelidate from '@vuelidate/core'

// store.dispatch('auth/attempt', {
//   user: JSON.parse(localStorage.getItem('user')),
//   role: localStorage.getItem('role'),
//   status: localStorage.getItem('status'),
// })

store.dispatch('auth/atttoken', localStorage.getItem('token')).then(() => {
  const app = createApp(App)
  app.use(store)
  app.use(router)
  app.use(CoreuiVuePro)
  app.use(VueAxios, mainAxios)
  app.use(timeago, timeagoOptions)
  // app.use(useVuelidate)
  app.provide('icons', icons)
  app.component('CIcon', CIcon)
  app.component('DocsCallout', DocsCallout)
  app.component('DocsExample', DocsExample)
  // app.component('TimeAgo', TimeAgo)

  app.mount('#app')
})
