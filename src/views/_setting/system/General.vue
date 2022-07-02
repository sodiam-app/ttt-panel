<template>
  <div>
    <CCard>
      <CCardHeader>
        <div class="d-flex justify-content-between">
          <div class="fs-5">
            <CIcon size="lg" :icon="ic.cilTerminal" />
            การตั้งค่าระบบ
          </div>
          <div>
            <CButton
              color="warning"
              class="ms-1 text-light"
              size="sm"
              v-if="isEdit == false"
              @click="isEdit = true"
            >
              <CIcon :icon="ic.cilColorBorder" />
              แก้ไข
            </CButton>
            <CButton
              color="success"
              class="ms-1 text-light"
              size="sm"
              v-if="isEdit == true"
              @click="updateWebConfig"
            >
              <CIcon :icon="ic.cilSave" />
              บันทึก
            </CButton>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol>
              <CRow :xs="{ cols: 1, gutterY: 2 }" :md="{ cols: 2, gutterY: 2 }">
                <CCol>
                  <div>
                    <label for="cPrefix" class="form-label mb-1">
                      * Prefix
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cPrefix">
                        <CIcon :icon="ic.cilShieldAlt" />
                      </CInputGroupText>
                      <CFormInput
                        id="cPrefix"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.prefix"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cLoginUrl" class="form-label mb-1">
                      * Login Url
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cLoginUrl">
                        <CIcon :icon="ic.cilLink" />
                      </CInputGroupText>
                      <CFormInput
                        id="cLoginUrl"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.url_login"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cPartnerUrl" class="form-label mb-1">
                      * Partner Url
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cPartnerUrl">
                        <CIcon :icon="ic.cilPeople" />
                      </CInputGroupText>
                      <CFormInput
                        id="cPartnerUrl"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.partner_url"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cMaxIPPerDay" class="form-label mb-1">
                      * จำกัดการสมัครต่อวัน / IP
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cMaxIPPerDay">
                        <CIcon :icon="ic.cilEthernet" />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="cMaxIPPerDay"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.limit_ip"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cUserTemplate" class="form-label mb-1">
                      * User Template
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cUserTemplate">
                        <CIcon :icon="ic.cilLibrary" />
                      </CInputGroupText>
                      <CFormInput
                        id="cUserTemplate"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.user_template"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cLastUser" class="form-label mb-1">
                      * Last User
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cLastUser">
                        <CIcon :icon="ic.cilMediaStepForward" />
                      </CInputGroupText>
                      <CFormInput
                        type="number"
                        id="cLastUser"
                        :disabled="isEdit == false ? true : false"
                        v-model="dataConf.lastuser"
                      />
                    </CInputGroup>
                  </div>
                </CCol>
              </CRow>
              <!-- <hr /> -->
              <!-- <CRow :xs="{ cols: 1, gutterY: 2 }" :md="{ cols: 2, gutterY: 2 }">
                <CCol>
                  <div>
                    <label for="cLineDeposit" class="form-label">
                      Line Token (ฝาก)
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cLineDeposit">
                        <CIcon :icon="ic.cibLine" />
                      </CInputGroupText>
                      <CFormInput
                        id="cLineDeposit"
                        value="ยังไม่พร้อมใช้งาน"
                        disabled
                      />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol>
                  <div>
                    <label for="cLineWithdraw" class="form-label">
                      Line Token (ถอน)
                    </label>
                    <CInputGroup>
                      <CInputGroupText id="basic-cLineWithdraw">
                        <CIcon :icon="ic.cibLine" />
                      </CInputGroupText>
                      <CFormInput
                        id="cLineWithdraw"
                        value="ยังไม่พร้อมใช้งาน"
                        disabled
                      />
                    </CInputGroup>
                  </div>
                </CCol>
              </CRow> -->
            </CCol>
          </CRow>
          <hr />
          <CRow :xs="{ cols: 1, gutterY: 2 }" :lg="{ cols: 2 }">
            <CCol>
              <CCard class="border-success">
                <CCardHeader class="fs-5 text-center text-success">
                  ฝาก
                  <CIcon size="lg" :icon="ic.cilCash" />
                </CCardHeader>
                <CCardBody>
                  <CRow
                    :xs="{ cols: 1, gutterY: 2 }"
                    :md="{ cols: 2, gutterY: 2 }"
                  >
                    <CCol>
                      <div>
                        <label for="cDepositMin" class="form-label mb-1">
                          * ฝากขั้นต่ำ
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cLineWithdraw">
                            <CIcon :icon="ic.cilArrowThickToBottom" />
                          </CInputGroupText>
                          <CFormInput
                            type="number"
                            id="cLineWithdraw"
                            :disabled="isEdit == false ? true : false"
                            v-model="dataConf.deposit_min"
                          />
                          <CInputGroupText> ฿ </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                    <CCol>
                      <div>
                        <label for="cDepositMax" class="form-label mb-1">
                          * ฝากสูงสุด
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cDepositMax">
                            <CIcon :icon="ic.cilArrowThickToTop" />
                          </CInputGroupText>
                          <CFormInput
                            type="number"
                            id="cDepositMax"
                            :disabled="isEdit == false ? true : false"
                            v-model="dataConf.deposit_max"
                          />
                          <CInputGroupText> ฿ </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <div class="d-block">
                <CCard class="border-danger">
                  <CCardHeader class="fs-5 text-center text-danger">
                    ถอน
                    <CIcon size="lg" :icon="ic.cilCash" />
                  </CCardHeader>
                  <CCardBody>
                    <CRow
                      :xs="{ cols: 1, gutterY: 2 }"
                      :md="{ cols: 2, gutterY: 2 }"
                    >
                      <CCol>
                        <div>
                          <label for="cWithdrawMin" class="form-label mb-1">
                            * ถอนเงินสดขึ้นต่ำ
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cWithdrawMin">
                              <CIcon :icon="ic.cilArrowThickToBottom" />
                            </CInputGroupText>
                            <CFormInput
                              type="number"
                              id="cWithdrawMin"
                              :disabled="isEdit == false ? true : false"
                              v-model="dataConf.withdraw_min"
                            />
                            <CInputGroupText> ฿ </CInputGroupText>
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol>
                        <div>
                          <label for="cWithdrawMax" class="form-label mb-1">
                            * ถอนเงินสดสูงสุด
                          </label>
                          <CInputGroup>
                            <CInputGroupText>
                              <CIcon :icon="ic.cilArrowThickToTop" />
                            </CInputGroupText>
                            <CFormInput
                              type="number"
                              id="cWithdrawMax"
                              :disabled="isEdit == false ? true : false"
                              v-model="dataConf.withdraw_max"
                            />
                            <CInputGroupText> ฿ </CInputGroupText>
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol>
                        <div>
                          <label for="cWithdrawCount" class="form-label mb-1">
                            * จำนวนการถอนเงินสด
                          </label>
                          <CInputGroup>
                            <CInputGroupText>
                              <CIcon :icon="ic.cilLoopCircular" />
                            </CInputGroupText>
                            <CFormInput
                              type="number"
                              id="cWithdrawCount"
                              :disabled="isEdit == false ? true : false"
                              v-model="dataConf.withdraw_limit_round"
                            />
                            <CInputGroupText> ครั้ง / วัน </CInputGroupText>
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <hr />
                    <div>
                      <label for="cWithdrawAutoAmount" class="form-label">
                        * ปุ่มบวกเงินอัตโนมัติ
                        <span class="small"> (สำหรับแสดงที่เว็บหน้าบ้าน) </span>
                      </label>
                      <div class="mb-2 fs-5">
                        <CRow :xs="{ cols: 'auto', gutterX: 1 }">
                          <CCol
                            v-for="(
                              amount, index
                            ) in dataConf.withdraw_amount_select"
                            :key="amount._id"
                          >
                            <CBadge color="info">
                              <div class="align-text-bottom">
                                {{ amount }}
                                <CButton
                                  color="link"
                                  variant="ghost"
                                  class="p-0 m-0 ms-1"
                                  size="sm"
                                  :disabled="isEdit == false ? true : false"
                                  @click="removeAmount(index)"
                                >
                                  <CIcon :icon="ic.cilXCircle" />
                                </CButton>
                              </div>
                            </CBadge>
                          </CCol>
                        </CRow>
                      </div>
                      <div class="d-flex flex-row-reverse">
                        <CInputGroup class="d-flex">
                          <CInputGroupText>
                            <CIcon :icon="ic.cilListRich" />
                          </CInputGroupText>
                          <CFormInput
                            type="number"
                            id="cWithdrawAutoAmount"
                            :disabled="isEdit == false ? true : false"
                            v-model="withdraw_amount_select"
                          />
                          <CButton
                            type="button"
                            color="success"
                            :disabled="isEdit == false ? true : false"
                            @click="addAmount()"
                          >
                            <CIcon
                              :icon="ic.cilPlaylistAdd"
                              class="me-2"
                            />เพิ่ม
                          </CButton>
                        </CInputGroup>
                      </div>
                    </div>
                    <hr />
                    <label class="mb-2">อื่น ๆ</label>
                    <CRow :xs="{ cols: 2, gutterY: 2 }">
                      <CCol>
                        <div>
                          <CFormCheck
                            label="ให้รายการค้าง หากถอนไม่สำเร็จ"
                            checked
                            disabled
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </div>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
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
import { CIcon } from '@coreui/icons-vue'
import {
  cilShieldAlt,
  cilLink,
  cilPeople,
  cilEthernet,
  cilLibrary,
  cilMediaStepForward,
  cibLine,
  cilCash,
  cilArrowThickToBottom,
  cilArrowThickToTop,
  cilTerminal,
  cilLoopCircular,
  cilSave,
  cilColorBorder,
  cilXCircle,
  cilListRich,
  cilPlaylistAdd,
  cilThumbUp,
  cilThumbDown,
} from '@coreui/icons'
import { mapActions } from 'vuex'

export default {
  components: {},
  name: 'Setting General',
  comments: {
    CIcon,
  },
  data() {
    return {
      toasts: [],

      dataConf: {
        _id: '',
        prefix: '',
        url_login: '',
        partner_url: '',
        limit_ip: '',
        user_template: '',
        lastuser: '',
        deposit_min: '',
        deposit_max: '',
        withdraw_min: '',
        withdraw_max: '',
        withdraw_limit_round: '',
        withdraw_amount_select: [],
      },
      withdraw_amount_select: '0',
      current_web_agent_id: '',

      // Controls
      isEdit: false,

      // Data
      optWebAgent: [],

      // icons
      ic: {
        cilShieldAlt,
        cilLink,
        cilPeople,
        cilEthernet,
        cilLibrary,
        cilMediaStepForward,
        cibLine,
        cilCash,
        cilArrowThickToBottom,
        cilArrowThickToTop,
        cilTerminal,
        cilLoopCircular,
        cilSave,
        cilColorBorder,
        cilXCircle,
        cilListRich,
        cilPlaylistAdd,
        cilThumbUp,
        cilThumbDown,
      },
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
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
    async getWebConfig() {
      if (this.optWebAgent.length != 0) {
        if (!this.current_web_agent_id) {
          this.current_web_agent_id = this.optWebAgent[0]._id
        }
        await this.$http
          .post('panel/getconfiggeneral', {
            agent_id: this.current_web_agent_id,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.dataConf._id = response.data.result_config._id
              this.dataConf.prefix = response.data.result_config.prefix
              this.dataConf.url_login = response.data.result_config.url_login
              this.dataConf.partner_url =
                response.data.result_config.partner_url
              this.dataConf.limit_ip = response.data.result_config.limit_ip + ''
              this.dataConf.user_template =
                response.data.result_config.user_template
              this.dataConf.lastuser = response.data.result_config.lastuser + ''
              this.dataConf.deposit_min =
                response.data.result_config.deposit_min + ''
              this.dataConf.deposit_max =
                response.data.result_config.deposit_max + ''
              this.dataConf.withdraw_min =
                response.data.result_config.withdraw_min + ''
              this.dataConf.withdraw_max =
                response.data.result_config.withdraw_max + ''
              this.dataConf.withdraw_limit_round =
                response.data.result_config.withdraw_limit_round + ''
              this.dataConf.withdraw_amount_select =
                response.data.result_config.withdraw_amount_select
              console.log(this.dataConf)
            } else if (
              response.data.status == 502 ||
              response.data.status == 503
            ) {
              this.tokenExpired().then(() => {
                this.navigateTo('/pages/login')
              })
            } else {
              console.log(
                'call api - panel/getconfiggeneral : status = ' +
                  response.data.status +
                  ', message = ' +
                  response.data.message,
              )
            }
          })
          .catch((error) => {
            console.log('call api - panel/getconfiggeneral : error' + error)
          })
      }
    },
    async updateWebConfig() {
      await this.$http
        .post('panel/updateconfgenneral', {
          agent_id: this.dataConf._id,
          prefix: this.dataConf.prefix,
          url_login: this.dataConf.url_login,
          partner_url: this.dataConf.partner_url,
          limit_ip: Number(this.dataConf.limit_ip),
          user_template: this.dataConf.user_template,
          lastuser: Number(this.dataConf.lastuser),
          deposit_min: Number(this.dataConf.deposit_min),
          deposit_max: Number(this.dataConf.deposit_max),
          withdraw_min: Number(this.dataConf.withdraw_min),
          withdraw_max: Number(this.dataConf.withdraw_max),
          withdraw_limit_round: Number(this.dataConf.withdraw_limit_round),
          withdraw_amount_select: this.dataConf.withdraw_amount_select,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.createToast(
              'success',
              'การดำเนินการ',
              'ดำเนินการปรับปรุงข้อมูลเรียบร้อยแล้ว',
            )
            this.isEdit = false
            console.log(response)
          } else if (response.data.status == 202) {
            this.createToast('warning', 'การดำเนินการ', response.data.message)
            this.isEdit = false
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
              'call api - panel/updateconfgenneral : status = ' +
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
          console.log('call api - panel/updateconfgenneral : error' + error)
        })
    },

    // functions
    async startupGetConfig() {
      await this.getWebPrefixList()
      await this.getWebConfig()
    },
    addAmount() {
      if (this.withdraw_amount_select != '0') {
        this.dataConf.withdraw_amount_select.push(
          Number(this.withdraw_amount_select),
        )
        this.dataConf.withdraw_amount_select = [
          ...new Set(this.dataConf.withdraw_amount_select),
        ]
      }
      this.dataConf.withdraw_amount_select.sort((a, b) => a - b)
      this.withdraw_amount_select = '0'
    },
    removeAmount(_index) {
      this.dataConf.withdraw_amount_select.splice(_index, 1)
      this.dataConf.withdraw_amount_select.sort()
    },
  },
  mounted() {
    this.startupGetConfig()
  },
  setup() {
    return {
      imgBank,
    }
  },
}
</script>
