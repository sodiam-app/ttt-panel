import axios from 'axios'

const authAxios = axios.create({
  baseURL: 'http://taetrueteam.fun:21001',
})

const mainAxios = axios.create({
  baseURL: 'http://taetrueteam.fun:10000',
})

export { mainAxios, authAxios }
