<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit.prevent="submit" novalidate>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">ระบบฝากถอนอัตโนมัติ</p>
                  <CAlert color="danger" class="py-1" :visible="isErrorVisible">
                    <CIcon :icon="cilWarning" />
                    {{ isErrorMessages }}
                  </CAlert>
                  <CInputGroup class="mb-3 has-validation">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      v-model="form.username"
                      feedbackInvalid="กรุณากรอกข้อมูลยูสเซอร์"
                      :invalid="v$.form.username.$error"
                      @input="v$.form.username.$touch()"
                      @blur="v$.form.username.$touch()"
                      :class="{
                        'is-invalid': v$.form.username.$error,
                        'is-valid': !v$.form.username.$error && validatedLogin,
                      }"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4 has-validation">
                    <!-- <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText> -->
                    <CButton
                      tabindex="-1"
                      type="button"
                      color="secondary"
                      variant="outline"
                      @mousedown="showPwd"
                      @mouseup="showPwd"
                    >
                      <CIcon :icon="cilLowVision" />
                    </CButton>
                    <CFormInput
                      :type="pwdType"
                      placeholder="Password"
                      v-model="form.password"
                      feedbackInvalid="กรุณากรอกข้อมูลรหัสผ่าน"
                      :invalid="v$.form.password.$error"
                      @input="v$.form.password.$touch()"
                      @blur="v$.form.password.$touch()"
                      :class="{
                        'is-invalid': v$.form.password.$error,
                        'is-valid': !v$.form.username.$error && validatedLogin,
                      }"
                    />
                    <!-- <CButton
                      type="button"
                      color="secondary"
                      variant="outline"
                      class="border-start-0"
                      @mousedown="showPwd"
                      @mouseup="showPwd"
                    >
                      <CIcon :icon="cilLowVision" />
                    </CButton> -->
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CLoadingButton
                        innerType="grow"
                        type="submit"
                        color="primary"
                        class="px-4 rounded-pill"
                        :loading="loadingLoginBtn"
                        @click="validatedLogin = true"
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
            <CCard
              class="text-white bg-secondary py-5 d-none d-lg-block d-xl-block d-xxl-block"
            >
              <CCardBody class="text-center">
                <div>
                  <!-- <h2>เข้าสู่ระบบด้วย QR-Code</h2> -->
                  <!-- <hr /> -->
                  <CImage rounded :src="imgLogin" class="img-fluid" alt="" />
                </div>
                <hr />
                <h5>
                  <CBadge color="dark" shape="rounded-pill">
                    <CIcon :icon="cilSmile" />
                    บริการด้วยใจ ห่วงใยทุกคน
                  </CBadge>
                </h5>
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
import { mapActions } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import imgLogin from '@/assets/images/login-logo.jpg'

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

      // validations
      validatedLogin: false,
      // username: '',
    }
  },
  methods: {
    ...mapActions({
      singIn: 'auth/signIn',
    }),

    submit() {
      this.v$.$validate()
      if (!this.v$.$error) {
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
      }
    },
    showPwd() {
      if (this.pwdType == 'password') {
        this.pwdType = 'text'
      } else {
        this.pwdType = 'password'
      }
    },
  },
  created() {
    localStorage.clear()
  },
  setup() {
    return {
      v$: useVuelidate(),
      // icon
      cilRoom,
      cilSmile,
      cilLowVision,
      cilWarning,
    }
  },
  validations() {
    return {
      form: {
        username: { required, minLength: minLength(4) },
        password: { required, minLength: minLength(4) },
      },
    }
  },
}
</script>
