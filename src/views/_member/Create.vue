<template>
  <div>
    <CCard>
      <CCardHeader component="h5">
        <CRow class="my-2">
          <CCol>
            <strong class="align-middle">
              <CIcon :icon="ic.cilUserPlus" size="lg" />
              สร้างลูกค้าใหม่
            </strong>
          </CCol>
          <CCol class="text-end">
            <CButton
              color="success"
              class="ms-1 text-light"
              size="sm"
              @click="addMember"
            >
              <CIcon :icon="ic.cilSave" />
              สร้าง
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol xl="6">
              <CCard class="border-secondary mb-1">
                <CCardHeader> ข้อมูลพื้นฐาน </CCardHeader>
                <CCardBody>
                  <CCardText class="small">
                    <CRow>
                      <CCol>
                        <div class="d-inline-flex align-items-center mb-2">
                          <span class="me-2 small fw-semibold">
                            * เปิดใช้งาน
                          </span>
                          <CFormSwitch
                            id="formSwitchCheckChecked"
                            v-model="dataMember.status"
                            @change="onchgStatusSwich"
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2" v-show="optWebAgent.length > 1">
                      <CCol md="6">
                        <div>
                          <label for="cPrefix" class="form-label mb-0">
                            Prefix *
                          </label>
                          <CFormSelect
                            id="cPrefix"
                            size="sm"
                            v-model="dataMember.agent_id"
                            @change="onchangeWebAgent($event.target.value)"
                          >
                            <option value="">กรุณาเลือก</option>
                            <option
                              v-for="option in optWebAgent"
                              :key="option._id"
                              :value="option._id"
                            >
                              {{ option.name }}
                            </option>
                          </CFormSelect>
                        </div>
                      </CCol>
                      <!-- <CCol md="6">
                        <div>
                          <label for="cUsername" class="form-label mb-0">
                            Username
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cUsername">
                              <CIcon :icon="ic.cilShieldAlt" />
                            </CInputGroupText>
                            <CFormInput
                              id="cUsername"
                              placeholder="ได้รับเมื่อสร้างลูกค้าเรียบร้อย"
                              disabled
                              v-model="dataMember.username"
                            />
                          </CInputGroup>
                        </div>
                      </CCol> -->
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            ชื่อ *
                          </label>
                          <CFormInput
                            type="text"
                            id="cFName"
                            v-model="dataMember.name"
                            feedbackInvalid="กรุณากรอกข้อมูลชื่อลูกค้า"
                            :invalid="v$.dataMember.name.$error"
                            @input="v$.dataMember.name.$touch()"
                            @blur="v$.dataMember.name.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.name.$error,
                              'is-valid':
                                !v$.dataMember.name.$error && validatedLogin,
                            }"
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            นามสกุล
                          </label>
                          <CFormInput
                            type="text"
                            id="cLName"
                            v-model="dataMember.surename"
                            feedbackInvalid="กรุณากรอกข้อมูลนามสกุลลูกค้า"
                            :invalid="v$.dataMember.surename.$error"
                            @input="v$.dataMember.surename.$touch()"
                            @blur="v$.dataMember.surename.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.surename.$error,
                              'is-valid':
                                !v$.dataMember.surename.$error &&
                                validatedLogin,
                            }"
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cBirthday" class="form-label mb-0">
                            วันเกิดลูกค้า
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cBirthday">
                              <CIcon :icon="ic.cilBirthdayCake" />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              id="cBirthday"
                              aria-label="วันเกิดลูกค้า"
                              aria-describedby="basic-cBirthday"
                              :value="dataMember.birthday"
                            />
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cStatus" class="form-label mb-0">
                            สถานะลูกค้า
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cStatus" class="px-2">
                              <CImage
                                fluid
                                :src="dataMember.status_img"
                                width="22"
                              />
                            </CInputGroupText>
                            <CFormSelect
                              size="sm"
                              v-model="dataMember.status_id"
                              @change="onchgStatus($event.target.value)"
                              feedbackInvalid="กรุณาเลือกสถานะลูกค้า"
                              :invalid="v$.dataMember.status_id.$error"
                              @input="v$.dataMember.status_id.$touch()"
                              @blur="v$.dataMember.status_id.$touch()"
                              :class="{
                                'is-invalid': v$.dataMember.status_id.$error,
                                'is-valid':
                                  !v$.dataMember.status_id.$error &&
                                  validatedLogin,
                              }"
                            >
                              <option
                                v-for="option in optStatus"
                                :key="option._id"
                                :value="option.status"
                              >
                                {{ option.status_th }}
                              </option>
                            </CFormSelect>
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cApplyMethod" class="form-label mb-0">
                            ช่องทางการสมัคร
                          </label>
                          <CFormSelect
                            size="sm"
                            v-model="dataMember.channel"
                            feedbackInvalid="กรุณาเลือกช่องทางการสมัครให้ถูกต้อง"
                            :invalid="v$.dataMember.channel.$error"
                            @input="v$.dataMember.channel.$touch()"
                            @blur="v$.dataMember.channel.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.channel.$error,
                              'is-valid':
                                !v$.dataMember.channel.$error && validatedLogin,
                            }"
                          >
                            <option value="">สามารถเลือกได้</option>
                            <option
                              v-for="option in optChannel"
                              :key="option._id"
                              :value="option.channel_id"
                            >
                              {{ option.channel }}
                            </option>
                          </CFormSelect>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cSpecial" class="form-label mb-0">
                            สิทธิพิเศษ
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cStatus" class="px-2">
                              <CImage
                                fluid
                                :src="dataMember.privilege_img"
                                width="22"
                              />
                            </CInputGroupText>
                            <CFormSelect
                              size="sm"
                              v-model="dataMember.privilege_id"
                              @change="onchgPrivilege($event.target.value)"
                              feedbackInvalid="กรุณาเลือกสิทธิพิเศษ"
                              :invalid="v$.dataMember.privilege_id.$error"
                              @input="v$.dataMember.privilege_id.$touch()"
                              @blur="v$.dataMember.privilege_id.$touch()"
                              :class="{
                                'is-invalid': v$.dataMember.privilege_id.$error,
                                'is-valid':
                                  !v$.dataMember.privilege_id.$error &&
                                  validatedLogin,
                              }"
                            >
                              <!-- <option value="">สามารถเลือกได้</option> -->
                              <option
                                v-for="option in optPrivilege"
                                :key="option._id"
                                :value="option.privilege_id"
                              >
                                {{ option.privilege_name }}
                              </option>
                            </CFormSelect>
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cRegisIP" class="form-label mb-0">
                            ยูสเซอร์แนะนำ
                          </label>
                          <CFormInput
                            type="text"
                            id="cRegisIP"
                            v-model="dataMember.user_reference"
                            feedbackInvalid="กรุณากรอกยูสเซอร์แนะนำให้ถูกต้อง"
                            :invalid="v$.dataMember.user_reference.$error"
                            @input="v$.dataMember.user_reference.$touch()"
                            @blur="v$.dataMember.user_reference.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.user_reference.$error,
                              'is-valid':
                                !v$.dataMember.user_reference.$error &&
                                validatedLogin,
                            }"
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cPartner" class="form-label mb-0">
                            พาร์ทเนอร์
                          </label>
                          <select
                            id="cPartner"
                            class="form-select text-muted"
                            aria-label="พาร์ทเนอร์"
                            disabled
                          >
                            <option selected>ยังไม่พร้อมใช้งาน</option>
                          </select>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cPhone" class="form-label mb-0">
                            เบอร์โทร *
                            <small>
                              <small class="text-muted">
                                (สำหรับเข้าสู่ระบบ)
                              </small>
                            </small>
                          </label>
                          <CInputGroup class="has-validation">
                            <CInputGroupText>
                              <CIcon :icon="ic.cilPhone" />
                            </CInputGroupText>
                            <CFormInput
                              id="cPhone"
                              placeholder="0612345xxx"
                              v-model="dataMember.tel"
                              feedbackInvalid="กรุณากรอกข้อมูลเบอร์โทรลูกค้าให้ถูกต้อง"
                              :invalid="v$.dataMember.tel.$error"
                              @input="v$.dataMember.tel.$touch()"
                              @blur="v$.dataMember.tel.$touch()"
                              :class="{
                                'is-invalid': v$.dataMember.tel.$error,
                                'is-valid':
                                  !v$.dataMember.tel.$error && validatedLogin,
                              }"
                            />
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cRegisterIP" class="form-label mb-0">
                            Register IP
                          </label>
                          <CFormInput
                            type="text"
                            id="cRegisterIP"
                            placeholder="IP Address"
                            v-model="dataMember.register_ip"
                            readonly
                            feedbackInvalid="ไม่สามารถระบุ IP Address ได้"
                            :invalid="v$.dataMember.register_ip.$error"
                            @input="v$.dataMember.register_ip.$touch()"
                            @blur="v$.dataMember.register_ip.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.register_ip.$error,
                              'is-valid':
                                !v$.dataMember.register_ip.$error &&
                                validatedLogin,
                            }"
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol>
                        <div>
                          <label for="cNote" class="form-label mb-0">
                            หมายเหตุ
                          </label>
                          <CFormTextarea
                            id="cNote"
                            rows="2"
                            text="สามารถกรอกข้อมูลที่มีความจำเป็นต่อการตรวจสอบลูกค้าได้"
                            v-model="dataMember.remark"
                            feedbackInvalid=""
                            :invalid="v$.dataMember.remark.$error"
                            @input="v$.dataMember.remark.$touch()"
                            @blur="v$.dataMember.remark.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.remark.$error,
                              'is-valid':
                                !v$.dataMember.remark.$error && validatedLogin,
                            }"
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cPin" class="form-label mb-0">
                            PIN *
                          </label>
                          <CInputGroup class="has-validation">
                            <CButton
                              tabindex="-1"
                              type="button"
                              color="secondary"
                              variant="outline"
                              @click="showPwd"
                            >
                              <CIcon :icon="ic.cilLockLocked" />
                            </CButton>
                            <CFormInput
                              :type="dataMember.pinType"
                              id="cPin"
                              aria-label="PIN"
                              v-model="dataMember.pin"
                              feedbackInvalid="กรุณากรอกข้อมูล PIN จำนวน 4 หลัก"
                              :invalid="v$.dataMember.pin.$error"
                              @input="v$.dataMember.pin.$touch()"
                              @blur="v$.dataMember.pin.$touch()"
                              :class="{
                                'is-invalid': v$.dataMember.pin.$error,
                                'is-valid':
                                  !v$.dataMember.pin.$error && validatedLogin,
                              }"
                            />
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label
                            for="cPromotion"
                            class="form-label mb-0"
                          ></label>
                          <CFormSwitch
                            size="lg"
                            label="เปิด/ปิดโปรฯ"
                            id="cPromotion"
                            disabled
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xl="6">
              <CCard class="border-secondary p-0 mb-1">
                <CCardHeader>บัญชีและการเงิน</CCardHeader>
                <CCardBody>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBanking" class="form-label mb-0">
                          ธนาคาร *
                        </label>
                        <CInputGroup class="has-validation">
                          <CInputGroupText id="basic-cBanking" class="p-2">
                            <CImage
                              fluid
                              :src="dataMember.bank_img"
                              width="22"
                            />
                          </CInputGroupText>
                          <CFormSelect
                            v-model="dataMember.bank_id"
                            @change="onchgBanking($event.target.value)"
                            feedbackInvalid="กรุณาเลือกข้อมูลธนาคาร"
                            :invalid="v$.dataMember.bank_id.$error"
                            @input="v$.dataMember.bank_id.$touch()"
                            @blur="v$.dataMember.bank_id.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.bank_id.$error,
                              'is-valid':
                                !v$.dataMember.bank_id.$error && validatedLogin,
                            }"
                          >
                            <option value="">กรุณาเลือกข้อมูลธนาคาร</option>
                            <option
                              v-for="option in optAllBank"
                              :key="option._id"
                              :value="option._id"
                            >
                              {{ option.banknameth }}
                            </option>
                          </CFormSelect>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBankAcct" class="form-label mb-0">
                          เลขที่บัญชี *
                        </label>
                        <CInputGroup class="has-validation">
                          <CInputGroupText id="basic-cBankAcct">
                            <CIcon :icon="ic.cilCreditCard" />
                          </CInputGroupText>
                          <CFormInput
                            id="cBankAcct"
                            placeholder="011-1-11111-1"
                            v-model="dataMember.bank_acct"
                            feedbackInvalid="กรุณากรอกข้อมูลเลขที่บัญชีลูกค้า"
                            :invalid="v$.dataMember.bank_acct.$error"
                            @input="v$.dataMember.bank_acct.$touch()"
                            @blur="v$.dataMember.bank_acct.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.bank_acct.$error,
                              'is-valid':
                                !v$.dataMember.bank_acct.$error &&
                                validatedLogin,
                            }"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <!-- <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBankAcct" class="form-label mb-0">
                          แสดงเฉพาะบัญชี
                        </label>
                        <CMultiSelect
                          :options="optShownBankAcct"
                          placeholder="ทั้งหมด"
                          select-all-label=""
                          search-no-results-label="ไม่มีข้อมูล"
                          select-all
                        />
                      </div>
                    </CCol>
                  </CRow> -->
                  <hr class="mt-3" />
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cSkipCheckName" class="form-label mb-0">
                          เมื่อถอน
                        </label>
                        <CFormSwitch
                          size="lg"
                          label="ข้ามการตรวจสอบชื่อจากธนาคาร"
                          id="cSkipCheckName"
                          disabled
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard class="border-secondary p-0 mb-1">
                <CCardHeader>ช่องทางการติดต่อ</CCardHeader>
                <CCardBody>
                  <CRow class="mb-2">
                    <CCol md="6">
                      <div>
                        <label for="cPhone" class="form-label mb-0">
                          เบอร์ติดต่อ
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cPhone">
                            <CIcon :icon="ic.cilPhone" />
                          </CInputGroupText>
                          <CFormInput
                            id="cPhone"
                            aria-label="เบอร์โทรลูกค้า"
                            aria-describedby="basic-cPhone"
                            v-model="dataMember.mobile_number"
                            feedbackInvalid="กรุณากรอกข้อมูลเบอร์ให้ถูกต้อง"
                            :invalid="v$.dataMember.mobile_number.$error"
                            @input="v$.dataMember.mobile_number.$touch()"
                            @blur="v$.dataMember.mobile_number.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.mobile_number.$error,
                              'is-valid':
                                !v$.dataMember.mobile_number.$error &&
                                validatedLogin,
                            }"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                    <CCol md="6">
                      <div>
                        <label for="cLineID" class="form-label mb-0">
                          ไลน์ไอดี
                          <small>
                            <small class="text-muted"> (Line ID) </small>
                          </small>
                        </label>
                        <CInputGroup>
                          <CInputGroupText>
                            <CIcon :icon="ic.cibLine" />
                          </CInputGroupText>
                          <CFormInput
                            id="cLineID"
                            placeholder="cus.id.xxx"
                            aria-label="cus.id.xxx"
                            v-model="dataMember.line_id"
                          />
                          <!-- <CInputGroupText id="basic-LinkLineID">
                              <CIcon :icon="ic.cilLink" />
                            </CInputGroupText> -->
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cEmail" class="form-label mb-0">
                          Email
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cEmail">
                            <CIcon :icon="ic.cilEnvelopeOpen" />
                          </CInputGroupText>
                          <CFormInput
                            id="cEmail"
                            placeholder="email@tttAIP.com"
                            aria-label="อีเมลลูกค้า"
                            aria-describedby="basic-cEmail"
                            v-model="dataMember.email"
                            feedbackInvalid="กรุณากรอกข้อมูลอีเมลให้ถูกต้อง ตัวอย่าง: panel@tttmail.com"
                            :invalid="v$.dataMember.email.$error"
                            @input="v$.dataMember.email.$touch()"
                            @blur="v$.dataMember.email.$touch()"
                            :class="{
                              'is-invalid': v$.dataMember.email.$error,
                              'is-valid':
                                !v$.dataMember.email.$error && validatedLogin,
                            }"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
      <CCardFooter class="d-xl-none">
        <CCol class="text-end">
          <CButton
            color="success"
            class="ms-1 text-light"
            size="sm"
            @click="addMember"
          >
            <CIcon :icon="ic.cilSave" />
            สร้าง
          </CButton>
        </CCol>
      </CCardFooter>
    </CCard>
  </div>

  <!-- Toaster popup -->
  <CToaster placement="top-end">
    <CToast
      v-for="toast in toasts"
      :key="toast._id"
      :delay="10000"
      :class="'bg-' + toast.color + ' border-' + toast.color"
    >
      <CToastHeader closeButton>
        <span class="me-auto fw-bolder fs-5 lh-sm text-dark">
          <CIcon
            size="lg"
            :icon="toast.color == 'success' ? ic.cilThumbUp : ic.cilThumbDown"
            class="me-1 text-black"
          />
          {{ toast.title }}
        </span>
        <!-- <small>7 min ago</small> -->
      </CToastHeader>
      <CToastBody>
        {{ toast.content }}
      </CToastBody>
    </CToast>
  </CToaster>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'
import { mapActions, mapGetters } from 'vuex'
import useVuelidate from '@vuelidate/core'
import {
  required,
  numeric,
  ipAddress,
  email,
  minLength,
  maxLength,
} from '@vuelidate/validators'
import { validateAlphabet } from '../../validations/validation'

export default {
  name: 'CreateMember',
  comments: {},
  data() {
    return {
      toasts: [],

      dataMember: {
        status: true,
        status_id: 'active',
        status_img: '',
        agent_id: '',
        username: '',
        password: '',
        tel: '',
        pinType: 'text',
        pin: '',
        line_id: '',
        name: '',
        surename: '',
        birthday: new Date(),
        privilege_id: '',
        privilege_img: '',
        channel: '',
        remark: '',
        register_ip: '',
        user_reference: '',
        mobile_number: '',
        email: '',
        // promotion_status: '',
        bank_id: '',
        bank_acct: '',
        bank_img: '',
        // domain_name: 'https://www.banpong888.com',
        // captchaID: '62b6277dfbbb2fbadb52cc38',
        request: 'panel',
      },
      optWebAgent: [],
      optPrivilege: [],
      optChannel: [],
      optStatus: [],
      optShownBankAcct: [],
      optAllBank: [],

      // validations
      validatedLogin: false,
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
    navigateTo(route) {
      // navigateToNewTab('/member/list/99dev/' + member._id)
      this.$router.push(route)
    },
    navigateToNewTab(route) {
      // this.$router.push(route)
      let _route = this.$router.resolve({ path: route })
      window.open(_route.href)
    },
    createToast(_color, _title, _content) {
      this.toasts.push({
        title: _title,
        content: _content,
        color: _color,
      })
    },

    // api
    async getWebPrefixList() {
      await this.$http
        .post('panel/getprefix', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optWebAgent = response.data.result_perfix
            this.dataMember.agent_id = this.optWebAgent[0]._id
            // this.getWebDeposit(this.dataMember.agent_id)
            console.log(this.optWebAgent)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getprefix : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getprefix : error' + error)
        })
    },
    async getConfPrivilege() {
      await this.$http
        .post('panel/getprivilege', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optPrivilege = response.data.privilege
            this.dataMember.privilege_id = this.optPrivilege[0].privilege_id
            this.onchgPrivilege(this.optPrivilege[0].privilege_id)
            console.log(this.optPrivilege)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getprivilege : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getprivilege : error' + error)
        })
    },
    async getConfChannel() {
      await this.$http
        .post('panel/getchannel', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optChannel = response.data.channel
            console.log(this.optChannel)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getchannel : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getchannel : error' + error)
        })
    },
    async getConfStatus() {
      await this.$http
        .post('panel/getstatus', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optStatus = response.data.result_status
            console.log(this.optStatus)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getstatus : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getstatus : error' + error)
        })
    },
    async getAllBank() {
      await this.$http
        .post('panel/getbanking', {
          status: 'active',
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optAllBank = response.data.result.banking
            console.log(this.optAllBank)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getbanking : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getbanking : error' + error)
        })
    },
    async getWebDeposit(webID) {
      await this.$http
        .post('panel/getbanktrnsaction', {
          agent_id: webID,
          type: 'deposit',
        })
        .then((response) => {
          if (response.data.status == 200) {
            // this.optShownBankAcct = response.data.result
            for (let i = 0; i < response.data.result.length; i++) {
              var item = {
                value: response.data.result[i]._id,
                text:
                  '[' +
                  response.data.result[i].bank_code +
                  '] ' +
                  response.data.result[i].bank_account +
                  ' (' +
                  response.data.result[i].account_name +
                  ')',
                selected: false,
                bank_code: response.data.result[i].bank_code,
              }
              this.optShownBankAcct.push(item)
            }
            console.log(this.optShownBankAcct)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getbanktrnsaction : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getbanktrnsaction : error' + error)
        })
    },
    async addMember() {
      console.log(this.v$)
      this.v$.$validate()
      if (!this.v$.$error) {
        await this.$http
          .post('panel/createuser', {
            body: {
              agent_id: this.dataMember.agent_id,
              username: this.dataMember.username,
              password: this.dataMember.password,
              tel: this.dataMember.tel,
              mobile_number: this.dataMember.mobile_number,
              pin: this.dataMember.pin,
              line_id: this.dataMember.line_id,
              name: this.dataMember.name,
              email: this.dataMember.email,
              surename: this.dataMember.surename,
              birthday: this.dataMember.birthday,
              channel: this.dataMember.channel,
              privilege: this.dataMember.privilege,
              remark: this.dataMember.remark,
              register_ip: this.ipinfo,
              user_reference: this.dataMember.user_reference,
              bank_id: this.dataMember.bank_id,
              bank_acct: this.dataMember.bank_acct,
              status: this.dataMember.status_id,
            },
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.navigateTo(
                '/member/list/' +
                  response.data.result.web_name +
                  '/' +
                  response.data.result._id,
              )
            } else if (
              response.data.status == 502 ||
              response.data.status == 503
            ) {
              this.tokenExpired().then(() => {
                this.navigateTo('/pages/login')
              })
            } else {
              this.createToast(
                'danger',
                'การดำเนินการ',
                'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + response.data.message,
              )
              console.log(
                'call api - panel/createuser : status = ' +
                  response.data.status +
                  ', message = ' +
                  response.data.message,
              )
            }
          })
          .catch((error) => {
            this.createToast(
              'danger',
              'การดำเนินการ',
              'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + error,
            )
            console.log('call api - panel/createuser : error' + error)
          })
      }
    },

    // functions
    onchangeWebAgent(_value) {
      this.optShownBankAcct = []
      if (_value) {
        this.getWebDeposit(_value)
      }
    },
    onchgBanking(_id) {
      this.dataMember.bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code) {
        try {
          this.dataMember.bank_img = require('../../assets/images/banking/th/smooth-corner/' +
            bank_code +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgPrivilege(_id) {
      this.dataMember.privilege_img = ''
      let privilege = null
      for (let i = 0; i < this.optPrivilege.length; i++) {
        if (this.optPrivilege[i].privilege_id == _id) {
          privilege = this.optPrivilege[i].privilege_name
          break
        }
      }
      if (privilege) {
        try {
          this.dataMember.privilege_img = require('../../assets/images/privilege/' +
            privilege +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgStatus(_status) {
      this.dataMember.status_img = ''
      if (_status) {
        try {
          this.dataMember.status_img = require('../../assets/images/status/' +
            _status +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
      // suspend >> close switch status
      if (_status == 'suspend') {
        this.dataMember.status = false
      }
    },
    onchgStatusSwich() {
      this.dataMember.status = !this.dataMember.status
      if (this.dataMember.status == false) {
        this.dataMember.status_id = 'suspend'
        this.onchgStatus('suspend')
      }
    },
    showPwd() {
      if (this.dataMember.pinType == 'password') {
        this.dataMember.pinType = 'text'
      } else {
        this.dataMember.pinType = 'password'
      }
    },

    // validations
    // validateAlphabet(_val) {
    //   return /^[\u0E00-\u0E7Fa-zA-Z']+$/.test(_val) ? true : false
    // },
  },
  mounted() {
    this.getWebPrefixList().then(() => {
      this.getWebDeposit(this.dataMember.agent_id)
    })
    this.getConfPrivilege()
    this.getConfChannel()
    this.getConfStatus().then(() => {
      this.onchgStatus(this.dataMember.status_id)
    })
    this.getAllBank()
    this.dataMember.pin = Math.floor(1000 + Math.random() * 9000) + ''
    this.dataMember.register_ip = this.ipinfo?.ip

    // console.log(this.validateAlphabet('&&&&&'))
  },
  computed: {
    ...mapGetters({
      ipinfo: 'auth/ip_info',
    }),
  },
  setup() {
    return {
      v$: useVuelidate(),
      imgBank,
      ic,
    }
  },
  validations() {
    return {
      dataMember: {
        // username: {},
        // password: {},
        status_id: { required },
        tel: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        pin: {
          required,
          numeric,
          minLength: minLength(4),
          maxLength: maxLength(4),
        },
        line_id: {},
        name: { required, validateAlphabet },
        surename: { required, validateAlphabet },
        birthday: {},
        privilege_id: {},
        channel: {},
        remark: {},
        register_ip: { ipAddress },
        user_reference: {},
        mobile_number: {
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        email: { email },
        bank_id: { required },
        bank_acct: {
          required,
          minLength: minLength(9),
          maxLength: maxLength(13),
        },
      },
    }
  },
}
</script>
