import axios from 'axios'

const authAxios = axios.create({
  baseURL: 'http://taetrueteam.fun:21001',
})

const mainAxios = axios.create({
  baseURL: 'http://taetrueteam.fun:10000',
})

const ipInfo = axios.create({
  baseURL: 'https://ipinfo.io/json?token=203c6230ece96c',
})

export { mainAxios, authAxios, ipInfo }
