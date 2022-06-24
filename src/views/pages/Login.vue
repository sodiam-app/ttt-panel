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
                  <p class="text-medium-emphasis">ระบบฝากถอนอัตโนมัติ</p>
                  <CAlert color="danger" class="py-1" :visible="isErrorVisible">
                    <CIcon :icon="cilWarning" />
                    {{ isErrorMessages }}
                  </CAlert>
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
                      :type="pwdType"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="form.password"
                    />
                    <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      @mousedown="showPwd"
                      @mouseup="showPwd"
                    >
                      <CIcon :icon="cilLowVision" />
                    </CButton>
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CLoadingButton
                        innerType="grow"
                        type="submit"
                        color="primary"
                        class="px-4 rounded-pill"
                        :loading="loadingLoginBtn"
                      >
                        <CIcon
                          v-if="!loadingLoginBtn"
                          :icon="cilRoom"
                          class="me-2"
                        />
                        Login
                      </CLoadingButton>
                    </CCol>
                    <!-- <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-secondary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <!-- <h2>เข้าสู่ระบบด้วย QR-Code</h2> -->
                  <!-- <hr /> -->
                  <CImage rounded :src="imgLogin" class="img-fluid" alt="" />
                </div>
                <hr />
                <h4>
                  <CBadge color="dark" shape="rounded-pill">
                    <CIcon :icon="cilSmile" />
                    บริการด้วยใจ ห่วงใยทุกคน
                  </CBadge>
                </h4>
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
import { cilRoom, cilSmile, cilLowVision, cilWarning } from '@coreui/icons'
import imgLogin from '@/assets/images/login-logo.jpg'

import { mapActions } from 'vuex'

export default {
  name: 'Login',
  comments: {
    CIcon,
  },
  data() {
    return {
      imgLogin: imgLogin,
      form: {
        username: '',
        password: '',
      },
      pwdType: 'password',
      loadingLoginBtn: false,
      isErrorVisible: false,
      isErrorMessages: '',
    }
  },
  methods: {
    ...mapActions({
      singIn: 'auth/signIn',
    }),
    submit() {
      this.loadingLoginBtn = true
      this.singIn(this.form).then(
        (response) => {
          if (response.data.status == 200) {
            this.$router.replace({
              name: 'Dashboard',
            })
          } else {
            this.isErrorVisible = true
            this.isErrorMessages = response.data.message
            this.loadingLoginBtn = false
          }
        },
        (error) => {
          console.error(error)
          this.isErrorVisible = true
          this.isErrorMessages = error
          this.loadingLoginBtn = false
        },
      )
    },
    showPwd() {
      if (this.pwdType == 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
  },
  setup() {
    return {
      // icon
      cilRoom,
      cilSmile,
      cilLowVision,
      cilWarning,
    }
  },
  created() {
    localStorage.clear()
  },
}
</script>
