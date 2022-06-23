<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="submit">
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">ระบบ ฝากถอน ttt-API</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="form.username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="form.password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        type="submit"
                        color="primary"
                        class="px-4 rounded-pill"
                      >
                        <CIcon :icon="cilRoom" class="me-2" />
                        Login
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>เข้าสู่ระบบด้วย QR-Code</h2>
                  <hr />
                  <img
                    src="../../assets/images/qr-demo-001.png"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <span>ttt-API System</span>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue'
import { cilRoom } from '@coreui/icons'

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  comments: {
    CIcon,
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions({
      singIn: 'auth/signIn',
    }),
    submit() {
      this.singIn(this.form).then(
        (response) => {
          if (response.data.status == 200) {
            this.$router.replace({
              name: 'Dashboard',
            })
          } else {
            console.log(response)
          }
        },
        (error) => {
          console.error(error)
        },
      )
    },
  },
  setup() {
    return {
      // icon
      cilRoom,
    }
  },
}
</script>
