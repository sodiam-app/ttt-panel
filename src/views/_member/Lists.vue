<template>
  <div>
    <CCard>
      <CCardHeader component="h5" class="py-0">
        <CRow class="my-2">
          <CCol class="mt-1">
            <strong class="align-middle">
              <CIcon :icon="ic.cilGroup" size="lg" />
              รายชื่อลูกค้า
            </strong>
          </CCol>
          <CCol sm="2" v-show="optWebAgent.length > 1">
            <CFormSelect @change="onchgPrefix($event.target.value)">
              <option
                v-for="option in optWebAgent"
                :key="option._id"
                :value="option._id"
              >
                {{ option.name }}
              </option>
            </CFormSelect>
          </CCol>
          <CCol sm="3" class="text-end">
            <CInputGroup class="flex-nowrap">
              <CFormInput
                placeholder="ค้นหา: ยูส, เบอร์โทร, ชื่อ"
                aria-describedby="addon-lSearchMember"
                @input="searchMember(currentWebAgent, $event.target.value)"
              />
              <CButton
                type="button"
                color="secondary"
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
                      navigateToNewTab(
                        '/member/list/' + member.prefix + '/' + member._id,
                      )
                    "
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
            <CTableCaption
              class="text-center text-reset"
              v-show="listOfMember.length == 0"
            >
              ไม่พบข้อมูลลูกค้าในระบบ
            </CTableCaption>
          </CTable>
        </div>
        <div class="text-center">
          <CSmartPagination
            :activePage="activePage"
            :pages="totalPage"
            size="sm"
            align="center"
            v-show="!listOfMember.length == 0"
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
      currentWebAgent: '',

      listOfMember: [],
      totalPage: 1,
      activePage: 1,
      runNumber: 1,

      optWebAgent: [],
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
    async getWebPrefixList() {
      await this.$http
        .post('panel/getprefix', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optWebAgent = response.data.result_perfix
            this.currentWebAgent = this.optWebAgent[0]._id
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
    async getMemberList(_agent_id) {
      await this.$http
        .post('panel/getallmember', {
          agent_id: _agent_id,
          domain_name: '',
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
    onchgPrefix(_id) {
      this.currentWebAgent = _id
      this.getMemberList(_id)
    },

    // Search
    async searchMember(_agentId, _val) {
      if (_val.length >= 3 || _val.length == 0) {
        await this.$http
          .post('search/searchmember', {
            agent_id: _agentId,
            text: _val,
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
              this.listOfMember = []
              console.log(
                'call api - search/searchmember : status = ' +
                  response.data.status +
                  ', message = ' +
                  response.data.message,
              )
            }
          })
          .catch((error) => {
            console.log('call api - search/searchmember : error' + error)
          })
      }
    },
  },
  mounted() {
    this.getWebPrefixList().then(() => {
      this.getMemberList(this.currentWebAgent)
    })
  },
}
</script>
