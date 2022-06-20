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
                    <p class="m-0">{{ member.create_date }}</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">--:--</small>
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
                    @click="navigateTo('/member/list/99dev/' + member._id)"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <!-- <CTableRow color="success">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">1.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>273781</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success" shape="rounded-pill"> ปกติ </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100001</CTableDataCell>
                <CTableDataCell>นายสมชาย หลายใจ</CTableDataCell>
                <CTableDataCell>0614496192</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">02/05/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">20:49:11</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">100.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 0.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  lind.demo.xxx
                </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100001')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow> -->
              <!-- <CTableRow color="success">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">2.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>883711</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success" shape="rounded-pill"> ปกติ </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100002</CTableDataCell>
                <CTableDataCell>นางสมปอง ลองใจ</CTableDataCell>
                <CTableDataCell>0823345829</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">02/05/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">11:00:30</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">1.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 1.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  passdjs.licck
                </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100002')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="danger">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">3.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>9928377</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="danger" shape="rounded-pill">
                    โดนระงับ
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100009</CTableDataCell>
                <CTableDataCell>นางสาวสมหญิง จริงใจ</CTableDataCell>
                <CTableDataCell>0983888231</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">19/04/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">05:11:40</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">0.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 0.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end"> </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100009')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="success">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">4.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>1192873</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success" shape="rounded-pill"> ปกติ </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100004</CTableDataCell>
                <CTableDataCell>นายสมหมาย หมายใจ</CTableDataCell>
                <CTableDataCell>0567789832</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">30/01/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">01:06:59</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">50.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 0.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end"> ddllk1231</CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100004')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="warning">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">5.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>2299921</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="warning" shape="rounded-pill">
                    เฝ้าระวัง
                  </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100068</CTableDataCell>
                <CTableDataCell>นายตรอมใจ ใหทองคำ</CTableDataCell>
                <CTableDataCell>0778873881</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">01/01/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">00:01:44</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">5.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 5.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 900.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: -33.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end"> hacker99x</CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100068')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="dark">
                <CTableDataCell scope="row" class="text-center text-danger">
                  <CRow>
                    <p class="m-0">6.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>777728</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <CCol>
                      <CBadge color="dark" shape="rounded-pill">
                        แบลคลิส
                      </CBadge>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CBadge color="danger" shape="rounded-pill">
                        โดนระงับ
                      </CBadge>
                    </CCol>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-danger">99dev109928</CTableDataCell>
                <CTableDataCell class="text-danger">
                  นายงงใจ บรรลัยมาก
                </CTableDataCell>
                <CTableDataCell class="text-danger">099883991</CTableDataCell>
                <CTableDataCell class="text-danger">banpong888</CTableDataCell>
                <CTableDataCell class="text-danger">
                  <CRow>
                    <p class="m-0">29/12/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">09:00:29</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end text-danger">
                  <strong class="fst-italic">210.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end text-danger">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 999.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 1000000.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 1000.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end text-danger">
                  xxxkksj
                </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/109928')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="success">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">7.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>9983998</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success" shape="rounded-pill"> ปกติ </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100106</CTableDataCell>
                <CTableDataCell>นางสายไหม ขยันหรอ</CTableDataCell>
                <CTableDataCell>0987789876</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">09/10/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">19:57:12</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">450.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 450.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end"> iddemo551 </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100106')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
              <CTableRow color="success">
                <CTableDataCell scope="row" class="text-center">
                  <CRow>
                    <p class="m-0">8.</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0"><small>663521</small></small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell>
                  <CBadge color="success" shape="rounded-pill"> ปกติ </CBadge>
                </CTableDataCell>
                <CTableDataCell>99dev100099</CTableDataCell>
                <CTableDataCell>นายชาติชาย สมใจอยาก</CTableDataCell>
                <CTableDataCell>0624423981</CTableDataCell>
                <CTableDataCell>banpong888</CTableDataCell>
                <CTableDataCell>
                  <CRow>
                    <p class="m-0">01/05/2022</p>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">21:09:33</small>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <strong class="fst-italic">9.00</strong>
                </CTableDataCell>
                <CTableDataCell class="text-end">
                  <CRow>
                    <small class="fw-lighter m-0">ฝาก: 0.00</small>
                  </CRow>
                  <CRow>
                    <small class="fw-lighter m-0">ถอน: 0.00</small>
                  </CRow>
                  <hr class="m-0" />
                  <CRow>
                    <p class="m-0">ดุล: 0.00</p>
                  </CRow>
                </CTableDataCell>
                <CTableDataCell class="text-end"> sskkjd12s </CTableDataCell>
                <CTableDataCell class="text-end pe-2">
                  <CButton color="success" variant="ghost" size="sm">
                    <CIcon :icon="ic.cibLine" class="small" />
                  </CButton>
                  <CButton
                    color="primary"
                    variant="ghost"
                    size="sm"
                    @click="navigateTo('/member/list/99dev/100099')"
                  >
                    <CIcon :icon="ic.cilExternalLink" class="small" />
                  </CButton>
                </CTableDataCell>
              </CTableRow> -->
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
const apiUrl = require('./../../constants/api-url-list')
const headers = {
  Authorization: 'Bearer ' + apiUrl.token,
}

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
    navigateTo(route) {
      // this.$router.push(route)
      let _route = this.$router.resolve({ path: route })
      window.open(_route.href)
    },
    async getMemberList() {
      await this.$http
        .post(
          apiUrl.member.GetAllmember,
          {
            agent_id: '629e381cb4839cabb5622da1',
            domain_name: 'https://www.banpong888.com',
          },
          { headers },
        )
        .then((response) => {
          if (response.data.status == 200) {
            this.listOfMember = response.data.result.Member
            this.totalPage = Math.ceil(response.data.result.total / 10)
            console.log(this.totalPage)
            console.log(this.listOfMember)
          } else {
            console.log(
              'callAPI - ' +
                apiUrl.member.GetAllmember +
                ' >>> ' +
                response.data.status +
                ', ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log(
            'callAPI - ' + apiUrl.member.GetAllmember + ' >>> ' + error,
          )
        })
    },
    convertStatus(status) {
      const _status = status.toString().toLowerCase()
      if (_status == 'active') {
        return 'ปกติ'
      } else if (_status == 'inactive') {
        return 'ถูกระงับ'
      } else if (_status == 'blacklist') {
        return 'แบลคลิส'
      } else {
        return 'ไม่ระบุ'
      }
    },
    convertStatusColor(status) {
      const _status = status.toString().toLowerCase()
      if (_status == 'active') {
        return 'success'
      } else if (_status == 'inactive') {
        return 'danger'
      } else if (_status == 'blacklist') {
        return 'dark'
      } else {
        return 'secondary'
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
