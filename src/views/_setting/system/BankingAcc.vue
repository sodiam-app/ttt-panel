<template>
  <div>
    <CAccordion :active-item-key="2" always-open>
      <CAccordionItem :item-key="1">
        <CAccordionHeader>
          <CIcon :icon="ic.cilBank" class="me-1" /> บัญชีธนาคาร
        </CAccordionHeader>
        <CAccordionBody>
          <div class="table-responsive">
            <CTable small hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" class="text-center">
                    #
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    สถานะ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">ประเภท</CTableHeaderCell>
                  <CTableHeaderCell scope="col">เลขที่บัญชี</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ชื่อบัญชี</CTableHeaderCell>
                  <!-- <CTableHeaderCell scope="col">Tag</CTableHeaderCell> -->
                  <CTableHeaderCell scope="col" class="text-center">
                    Bank Auto
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    SMS Auto
                  </CTableHeaderCell>
                  <!-- <CTableHeaderCell scope="col" class="text-center">
                    สำหรับลูกค้า
                  </CTableHeaderCell> -->
                  <CTableHeaderCell scope="col">
                    ธนาคารลูกค้า
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" width="15%">
                    คลาส
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">จัดการ</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow
                  v-for="(bank, index) in dataAllBankSetting"
                  :key="bank._id"
                >
                  <CTableHeaderCell scope="row" class="text-center">
                    {{ index + 1 }}.
                  </CTableHeaderCell>
                  <CTableDataCell class="text-center">
                    <CIcon
                      :icon="
                        bank.bank_status == 'active'
                          ? ic.cilPowerStandby
                          : ic.cilBan
                      "
                      :class="
                        'text-' + convertBankStatusColor(bank.bank_status)
                      "
                    />
                  </CTableDataCell>
                  <CTableDataCell class="text-success">
                    <CBadge
                      :color="convertBankTypeColor(bank.type)"
                      shape="rounded-pill"
                    >
                      {{ convertBankType(bank.type) }}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow
                      :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }"
                      class="align-bottom"
                    >
                      <CCol xs>
                        <CImage
                          fluid
                          :src="getBankIMG(bank.bank_code)"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol>
                        <div class="fw-bolder">
                          {{ bank.bank_account }}
                        </div>
                        <div class="small lh-1 fw-light">
                          {{ bank.bank_name_th }}
                        </div>
                      </CCol>
                    </CRow>
                    <!-- <CRow>
                      <CCol lg="2" class="p-0 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol lg="10" class="ps-1">
                        <div class="small">ไทยพาณิชย์</div>
                        <strong> 0019203948 </strong>
                      </CCol>
                    </CRow> -->
                  </CTableDataCell>
                  <CTableDataCell>{{ bank.account_name }}</CTableDataCell>
                  <!-- <CTableDataCell>bp-scb-01</CTableDataCell> -->
                  <CTableDataCell class="text-center">
                    <CIcon
                      :icon="
                        bank.bank_auto_status == 'active'
                          ? ic.cilSun
                          : ic.cilMoon
                      "
                      :class="
                        'text-' + convertAutoStatusColor(bank.sms_auto_status)
                      "
                    />
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon
                      :icon="
                        bank.sms_auto_status == 'active'
                          ? ic.cilSun
                          : ic.cilMoon
                      "
                      :class="
                        'text-' + convertAutoStatusColor(bank.sms_auto_status)
                      "
                    />
                  </CTableDataCell>
                  <!-- <CTableDataCell class="text-center">
                    <CIcon :icon="ic.cilPowerStandby" class="text-success" />
                  </CTableDataCell> -->
                  <CTableDataCell>
                    <!-- <div class="d-block">
                      <CImage fluid :src="imgBank.all" width="20" />
                      <span class="small ms-1">ทั้งหมด</span>
                    </div> -->
                    <div class="d-block">
                      <CImage
                        fluid
                        :src="getBankCustomerIMG(bank.memb_bank)"
                        width="30"
                      />
                      <span class="small ms-1">
                        {{ getBankCustomerName(bank.memb_bank) }}
                      </span>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow :xs="{ cols: 3, gutterX: 1, gutterY: 0 }">
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/vvip2.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/vvip1.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/vip3.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/vip2.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/vip1.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/platinum.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/silver.png')
                          "
                          width="30"
                        />
                      </CCol>
                      <CCol md="auto">
                        <CImage
                          fluid
                          :src="
                            require('../../../assets/images/privilege/normal.png')
                          "
                          width="30"
                        />
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      variant="outline"
                      size="sm"
                      class="me-1"
                    >
                      <CIcon :icon="ic.cilColorBorder" class="small" />
                      แก้ไข
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem :item-key="2">
        <CAccordionHeader>
          <CIcon :icon="ic.cilLayers" class="me-1" /> Bank Auto Transfer
        </CAccordionHeader>
        <CAccordionBody>
          <CRow>
            <CCol xl="6">
              <CCard class="mb-1">
                <CCardBody class="py-2 bg-success text-center">
                  <span class="fw-bolder">การฝาก</span>
                  <span class="small text-muted" style="font-size: 0.69em">
                    (1/3 บัญชี)
                  </span>
                  <CButton
                    color="light"
                    size="sm"
                    variant="outline"
                    shape="rounded-pill"
                    class="float-end"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <CCard class="mb-1 border-success">
                <CCardHeader>
                  <div class="d-flex justify-content-between">
                    <span>บัญชีที่ 1</span>
                    <CButton size="sm" color="light">
                      <CIcon size="sm" :icon="ic.cilZoomOut" />
                    </CButton>
                  </div>
                </CCardHeader>
                <CListGroup flush>
                  <CListGroupItem>Cras justo odio</CListGroupItem>
                  <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
                  <CListGroupItem>Vestibulum at eros</CListGroupItem>
                </CListGroup>
              </CCard>
            </CCol>
            <CCol xl="6">
              <CCard>
                <CCardBody class="py-2 bg-danger text-center">
                  <span class="fw-bolder">การถอน</span>
                  <span class="small text-muted" style="font-size: 0.69em">
                    (1/1 บัญชี)
                  </span>
                  <CButton
                    color="light"
                    size="sm"
                    variant="outline"
                    shape="rounded-pill"
                    class="float-end"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <CCallout color="danger" class="my-1">
                New to or unfamiliar with flexbox? Read this CSS Tricks flexbox
                guide for background, terminology, guidelines, and code
                snippets.
              </CCallout>
            </CCol>
          </CRow>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
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
  cilAsteriskCircle,
  cilBank,
  cilBan,
  cilColorBorder,
  cilPowerStandby,
  cilMediaRecord,
  cilLayers,
  cilMoon,
  cilSun,
  cilPlus,
  cilZoomOut,
  cilZoomIn,
  cilCaretTop,
  cilCaretBottom,
} from '@coreui/icons'

import avatar from '@/assets/images/avatars/owner/02.png'
import { mapActions } from 'vuex'

export default {
  components: {},
  name: 'Setting Bank Account',
  comments: {
    CIcon,
  },
  data() {
    return {
      toasts: [],

      currentWebAgent: '',
      dataAllBankSetting: [],

      optWebAgent: [],

      avatar: avatar,
      ic: {
        cilAsteriskCircle,
        cilBank,
        cilBan,
        cilColorBorder,
        cilPowerStandby,
        cilMediaRecord,
        cilLayers,
        cilMoon,
        cilSun,
        cilPlus,
        cilZoomOut,
        cilZoomIn,
        cilCaretTop,
        cilCaretBottom,
      },
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
    createToast(_color, _title, _content) {
      this.toasts.push({
        title: _title,
        content: _content,
        color: _color,
      })
    },
    //api
    async getWebPrefixList() {
      await this.$http
        .post('panel/getprefix', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optWebAgent = response.data.result_perfix
            this.currentWebAgent = this.optWebAgent[0]._id
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
    async getAllBankSetting() {
      await this.$http
        .post('panel/getallbanksetting', { agent_id: this.currentWebAgent })
        .then((response) => {
          if (response.data.status == 200) {
            this.dataAllBankSetting = response.data.result
            console.log(this.dataAllBankSetting)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getallbanksetting : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getallbanksetting : error' + error)
        })
    },

    // functions
    startupGetConfig() {
      this.getWebPrefixList().then(() => {
        this.getAllBankSetting()
      })
    },
    convertBankType(_type) {
      let type = _type.toString().toLowerCase()
      if (type == 'deposit') {
        return 'ฝาก'
      } else if (type == 'withdraw') {
        return 'ถอน'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertBankTypeColor(_type) {
      let type = _type.toString().toLowerCase()
      if (type == 'deposit') {
        return 'success'
      } else if (type == 'withdraw') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertBankStatusColor(_status) {
      let status = _status.toString().toLowerCase()
      if (status == 'active') {
        return 'success'
      } else if (status == 'inactive') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertAutoStatusColor(_status) {
      let status = _status.toString().toLowerCase()
      if (status == 'active') {
        return 'success'
      } else if (status == 'inactive') {
        return 'secondary'
      } else {
        return 'dark'
      }
    },
    getBankIMG(_bankCode) {
      try {
        return require('../../../assets/images/banking/th/smooth-corner/' +
          _bankCode +
          '.png')
      } catch (error) {
        return require('../../../assets/images/error-404-01.png')
      }
    },
    getBankCustomerIMG(_memb_bank) {
      try {
        if (_memb_bank) {
          return require('../../../assets/images/banking/th/smooth-corner/' +
            _memb_bank.memb_bank_code +
            '.png')
        } else {
          return require('../../../assets/images/banking/th/smooth-corner/all.png')
        }
      } catch (error) {
        return require('../../../assets/images/error-404-01.png')
      }
    },
    getBankCustomerName(_memb_bank) {
      if (_memb_bank) {
        return _memb_bank.memb_bank_nameth
      } else {
        return 'ทั้งหมด'
      }
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
