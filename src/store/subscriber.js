import store from '@/store'
// import axios from 'axios'
import { mainAxios } from '@/_conf'

store.subscribe((mutations) => {
  switch (mutations.type) {
    case 'auth/SET_TOKEN':
      if (mutations.payload) {
        mainAxios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${mutations.payload}`
        localStorage.setItem('token', mutations.payload)
      } else {
        mainAxios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('token')
      }
      break
    case 'auth/SET_USER':
      if (mutations.payload) {
        localStorage.setItem('user', JSON.stringify(mutations.payload))
      } else {
        localStorage.removeItem('user')
      }
      break
    case 'auth/SET_ROLE':
      if (mutations.payload) {
        localStorage.setItem('role', mutations.payload)
      } else {
        localStorage.removeItem('role')
      }
      break
    case 'auth/SET_STATUS':
      if (mutations.payload) {
        localStorage.setItem('status', mutations.payload)
      } else {
        localStorage.removeItem('status')
      }
      break
  }
})
