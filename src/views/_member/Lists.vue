<template>
  <div>
    <CCard>
      <CCardHeader component="h5">
        <CRow class="my-2">
          <CCol class="mt-1">
            <strong class="align-middle">
              <CIcon :icon="ic.cilGroup" size="lg" />
              รายชื่อลูกค้า
            </strong>
          </CCol>
          <CCol sm="3" class="text-end mt-1">
            <CInputGroup class="flex-nowrap" size="sm">
              <CFormInput
                placeholder="ค้นหา: ยูส, เบอร์โทร, ชื่อ"
                aria-describedby="addon-lSearchMember"
                class="border-dark"
              />
              <CButton
                type="button"
                color="dark"
                variant="outline"
                id="button-lSearchMember"
              >
                <CIcon :icon="ic.cilSearch" />
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <div class="table-responsive">
          <CTable hover small>
            <CTableHead color="dark" class="fw-bold">
              <CTableRow>
                <CTableHeaderCell scope="col" class="text-center">
                  #
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                <CTableHeaderCell scope="col">ยูส</CTableHeaderCell>
                <CTableHeaderCell scope="col">ชื่อ-นามสกุล</CTableHeaderCell>
                <CTableHeaderCell scope="col">เบอร์โทร</CTableHeaderCell>
                <CTableHeaderCell scope="col">เว็บไซต์</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  วันที่เริ่มใช้งาน
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" class="text-end">
                  ฝากครั้งแรก
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" class="text-center">
                  ดุล
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" class="text-end">
                  ไลน์ไอดี
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" class="text-end pe-3">
                  จัดการ
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody class="small">
              <CTableRow
                v-for="(member, index) in listOfMember"
                :key="member._id"
                :color="convertStatusRowColor(member.status)"
              >
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">{{ index + 1 }}.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>....</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge
                    :color="convertStatusColor(member.status)"
                    shape="rounded-pill"
                  >
                    {{ convertStatus(member.status) }}
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>{{ member.username }}</CTableDataCell>
                <CTableDataCell>
                  {{ member.profile.name + ' ' + member.profile.surename }}
                </CTableDataCell>
                <CTableDataCell>{{ member.profile.tel }}</CTableDataCell>
                <CTableDataCell>{{ member.prefix }}</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <!-- <p class="m-0">{{ member.create_date }}</p> -->
                    <p class="m-0">{{ convertDate(member.create_date) }}</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">
                      {{ convertTime(member.create_date) }}
                    </small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">
                    {{ member.financial.deposit_first_time_amount }}
                  </strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">
                      ฝาก: {{ member.financial.deposit_total_amount }}
                    </small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">
                      ถอน: {{ member.financial.withdraw_total_amount }}
                    </small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: -.--</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  {{ member.line_id }}
                </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton
                    v-if="member.line_id"
                    color="success"
                    variant="ghost"
                    size="sm"
                    component="a"
                    :href="'line://ti/p/~' + member.line_id"
                    target="_blank"
                  >
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="
                      navigateToNewTab('/member/list/99dev/' + member._id)
                    "
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
        <div class="text-center">
          <CSmartPagination
            :activePage="activePage"
            :pages="totalPage"
            size="sm"
            align="center"
          />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'Lists',
  comments: {},
  data() {
    return {
      listOfMember: [],
      totalPage: 1,
      activePage: 1,
      runNumber: 1,
    }
  },
  setup() {
    return {
      imgBank,
      ic,
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
    navigateTo(route) {
      this.$router.push(route)
    },
    navigateToNewTab(route) {
      // this.$router.push(route)
      let _route = this.$router.resolve({ path: route })
      window.open(_route.href)
    },
    // api
    async getMemberList() {
      await this.$http
        .post('member/getallmember', {
          agent_id: '629e381cb4839cabb5622da1',
          domain_name: 'https://www.banpong888.com',
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.listOfMember = response.data.result.Member
            this.totalPage = Math.ceil(response.data.result.total / 10)
            console.log(this.totalPage)
            console.log(this.listOfMember)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - member/getallmember : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - member/getallmember : error' + error)
        })
    },
    // functions
    convertDate(value) {
      var myDate = new Date(value)
      return moment(myDate).format('DD/MM/YYYY')
    },
    convertTime(value) {
      var myDate = new Date(value)
      return moment(myDate).format('HH:mm')
    },
    convertStatus(status) {
      const _val = status.toString().toLowerCase()
      if (_val == 'active') {
        return 'ปกติ'
      } else if (_val == 'suspend') {
        return 'ถูกระงับ'
      } else if (_val == 'inactive') {
        return 'ไม่เคลื่อนไหว'
      } else if (_val == 'watchout') {
        return 'เฝ้าระวัง'
      } else if (_val == 'blacklist') {
        return 'แบลคลิส'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertStatusColor(status) {
      const _val = status.toString().toLowerCase()
      if (_val == 'active') {
        // ปกติ
        return 'success'
      } else if (_val == 'suspend') {
        // ถูกระงับ
        return 'danger'
      } else if (_val == 'inactive') {
        // ไม่เคลื่อนไหว
        return 'secondary'
      } else if (_val == 'watchout') {
        // เฝ้าระวัง
        return 'warning'
      } else if (_val == 'blacklist') {
        // แบลคลิส
        return 'dark'
      } else {
        // ระบุไม่ได้
        return 'light'
      }
    },
    convertStatusRowColor(status) {
      const _status = status.toString().toLowerCase()
      if (_status == 'active') {
        return 'light'
      } else if (_status == 'inactive') {
        return 'warning'
      } else if (_status == 'blacklist') {
        return 'dark'
      } else {
        return 'secondary'
      }
    },
  },
  mounted() {
    this.getMemberList()
  },
}
</script>
