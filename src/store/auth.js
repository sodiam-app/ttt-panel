// import axios from 'axios'
import { authAxios, mainAxios } from '@/_conf'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    role: null,
    user_status: null,
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
      }
      if (!state.token) {
        return
      }
    },
    async attempt({ commit }, payload) {
      commit('SET_USER', payload.user)
      commit('SET_ROLE', payload.role)
      commit('SET_STATUS', payload.status)
      // if (payload.uer) {
      //   commit('SET_USER', payload.user)
      // }
      // if (payload.role) {
      //   commit('SET_ROLE', payload.role)
      // }
      // if (payload.state) {
      //   commit('SET_STATUS', payload.status)
      // }
    },
  },
}
