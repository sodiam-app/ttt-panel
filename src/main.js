import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
//createApp.prototype.$axios = axios

//import CoreuiVue from '@coreui/vue'
import CoreuiVuePro from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

//import image & icon
// import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
// import { iconsSet as ic } from '@/assets/icons'
// createApp.prototype.$http = imgBank
// createApp.prototype.$http = ic

const app = createApp(App)
app.use(store)
app.use(router)
//app.use(CoreuiVue)
app.use(CoreuiVuePro)
app.use(VueAxios, axios)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)

app.mount('#app')
