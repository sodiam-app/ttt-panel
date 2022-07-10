// import axios from 'axios'
import { authAxios, mainAxios, ipInfo } from '@/_conf'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    role: null,
    user_status: null,
    ip_info: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user
    },
    role(state) {
      return state.role
    },
    user_status(state) {
      return state.user_status
    },
    ip_info(state) {
      return state.ip_info
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, data) {
      state.user = data
    },
    SET_ROLE(state, role) {
      state.role = role
    },
    SET_STATUS(state, status) {
      state.user_status = status
    },
    SET_IP_INFO(state, ipInfo) {
      state.ip_info = ipInfo
    },
  },
  actions: {
    async signIn({ dispatch }, credentials) {
      return new Promise((resolve, reject) => {
        authAxios.post('login', credentials).then(
          (response) => {
            if (response.data.status == 200) {
              dispatch('atttoken', response.data.result.token)
              dispatch('attempt', {
                user: response.data.result.profile_employee,
                role: response.data.result.profile_employee.role,
                status: response.data.result.profile_employee.status,
              })
            } else {
              dispatch('atttoken', null)
              dispatch('attempt', {
                user: null,
                role: null,
                status: null,
              })
            }
            resolve(response)
          },
          (error) => {
            dispatch('atttoken', null)
            dispatch('attempt', {
              user: null,
              role: null,
              status: null,
            })
            reject(error)
          },
        )
      })
    },
    signOut({ commit }) {
      return mainAxios
        .post('panel/logoff', {})
        .then(() => {
          commit('SET_TOKEN', null)
          // commit('SET_USER', null)
          // commit('SET_ROLE', null)
          // commit('SET_STATUS', null)
        })
        .catch((error) => {
          console.log('call api - panel/logoff : error' + error)
        })
    },
    tokenExpired({ commit }) {
      commit('SET_TOKEN', null)
      // commit('SET_USER', null)
      // commit('SET_ROLE', null)
      // commit('SET_STATUS', null)
    },
    async atttoken({ commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
        try {
          // get member profile
          await mainAxios
            .post('panel/getmyprofile', {})
            .then((response) => {
              if (response.data.status == 200) {
                //
                commit('SET_USER', response.data.result.profile_employee)
                commit('SET_ROLE', response.data.result.profile_employee.role)
                commit(
                  'SET_STATUS',
                  response.data.result.profile_employee.status,
                )
              } else if (
                response.data.status == 502 ||
                response.data.status == 503
              ) {
                this.tokenExpired().then(() => {
                  this.$router.push('/pages/login')
                })
              } else {
                commit('SET_TOKEN', null)
                console.log(
                  'call api - panel/getmyprofile : status = ' +
                    response.data.status +
                    ', message = ' +
                    response.data.message,
                )
              }
            })
            .catch((error) => {
              commit('SET_TOKEN', null)
              console.log('call api - panel/getmyprofile : error' + error)
            })
        } catch (err) {
          commit('SET_TOKEN', null)
          console.log(err)
        }

        // Get IP info
        try {
          await ipInfo.get().then((response) => {
            commit('SET_IP_INFO', response.data)
          })
        } catch (err) {
          console.log(err)
        }
      }
      if (!state.token) {
        return
      }
    },
    async attempt({ commit }, payload) {
      commit('SET_USER', payload.user)
      commit('SET_ROLE', payload.role)
      commit('SET_STATUS', payload.status)
      commit('SET_IP_INFO', payload.ipinfo)
    },
  },
}
