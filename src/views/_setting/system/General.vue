<template>
  <div>
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <CIcon :icon="ic.cilTerminal" />
            การตั้งค่าระบบ
          </CCol>
          <CCol class="text-end">
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
              @click="isEdit = false"
            >
              <CIcon :icon="ic.cilSave" />
              บันทึก
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol>
              <CRow :xs="{ cols: 1, gutterY: 2 }" :md="{ cols: 2, gutterY: 2 }">
                <CCol>
                  <div>
                    <label for="cPrefix" class="form-label"> * Prefix </label>
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
                    <label for="cLoginUrl" class="form-label">
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
                    <label for="cPartnerUrl" class="form-label">
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
                    <label for="cMaxIPPerDay" class="form-label">
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
                    <label for="cUserTemplate" class="form-label">
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
                    <label for="cLastUser" class="form-label">
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
              <CCard>
                <CCardHeader class="text-center text-success">
                  ฝาก
                  <CIcon :icon="ic.cilCash" />
                </CCardHeader>
                <CCardBody>
                  <CRow
                    :xs="{ cols: 1, gutterY: 2 }"
                    :md="{ cols: 2, gutterY: 2 }"
                  >
                    <CCol>
                      <div>
                        <label for="cDepositMin" class="form-label">
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
                        <label for="cDepositMax" class="form-label">
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
              <CCard>
                <CCardHeader class="text-center text-danger">
                  ถอน
                  <CIcon :icon="ic.cilCash" />
                </CCardHeader>
                <CCardBody>
                  <CRow
                    :xs="{ cols: 1, gutterY: 2 }"
                    :md="{ cols: 2, gutterY: 2 }"
                  >
                    <CCol>
                      <div>
                        <label for="cWithdrawMin" class="form-label">
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
                        <label for="cWithdrawMax" class="form-label">
                          * ถอนเงินสดสูงสุด
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cWithdrawMax">
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
                        <label for="cWithdrawMax" class="form-label">
                          * จำนวนการถอนเงินสด
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cWithdrawMax">
                            <CIcon :icon="ic.cilLoopCircular" />
                          </CInputGroupText>
                          <CFormInput
                            type="number"
                            id="cWithdrawMax"
                            :disabled="isEdit == false ? true : false"
                            v-model="dataConf.withdraw_limit_round"
                          />
                          <CInputGroupText> ครั้ง / วัน </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <hr />
                  <label class="mb-2">อื่น ๆ</label>
                  <CRow :xs="{ cols: 2, gutterY: 2 }">
                    <CCol>
                      <div>
                        <CFormCheck
                          label="ให้รายการค้าง หากถอนไม่สำเร็จ"
                          checked
                          :disabled="isEdit == false ? true : false"
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  </div>
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
} from '@coreui/icons'

export default {
  components: {},
  name: 'Setting General',
  comments: {
    CIcon,
  },
  data() {
    return {
      dataConf: {
        _id: '629e381cb4839cabb5622da1',
        prefix: '99dev',
        url_login: 'https://www.banpong888.com/login',
        partner_url: 'https://www.banpong888.com/register',
        limit_ip: 2 + '',
        user_template: 'bp888',
        lastuser: 100236 + '',
        deposit_min: 1 + '',
        deposit_max: 10 + '',
        withdraw_min: 5 + '',
        withdraw_max: 300 + '',
        withdraw_limit_round: 9 + '',
        withdraw_amount_select: {
          1: 50,
          2: 100,
          3: 200,
          4: 300,
          5: 400,
          6: 2000,
          7: 2500,
        },
      },

      isEdit: false,
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
      },
    }
  },
  setup() {
    return {
      imgBank,
    }
  },
}
</script>
