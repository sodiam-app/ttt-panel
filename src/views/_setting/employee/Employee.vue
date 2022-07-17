<template>
  <CCard class="mb-2">
    <CCardHeader>
      <CIcon :icon="ic.cilPowerStandby" />
      กำลังออนไลน์
    </CCardHeader>
    <CCardBody class="small">
      <CContainer fluid>
        <CRow :xs="{ cols: 'auto' }">
          <CCol class="text-center">
            <CAvatar
              :src="avatar1"
              color="secondary"
              status="success"
              shape="rounded"
            />
            <br />
            <CBadge color="dark" shape="rounded-pill" size="sm">
              staff-mockup-1
            </CBadge>
          </CCol>
          <CCol class="text-center">
            <CAvatar
              :src="avatar2"
              color="secondary"
              status="success"
              shape="rounded"
            />
            <br />
            <CBadge color="dark" shape="rounded-pill" size="sm">
              staff-mockup-2
            </CBadge>
          </CCol>
          <CCol class="text-center">
            <CAvatar
              :src="avatar3"
              color="secondary"
              status="success"
              shape="rounded"
            />
            <br />
            <CBadge color="dark" shape="rounded-pill" size="sm">
              staff-mockup-3
            </CBadge>
          </CCol>
          <CCol class="text-center">
            <CAvatar
              :src="avatar4"
              color="secondary"
              status="success"
              shape="rounded"
            />
            <br />
            <CBadge color="dark" shape="rounded-pill" size="sm">
              staff-mockup-4
            </CBadge>
          </CCol>
        </CRow>
      </CContainer>
    </CCardBody>
  </CCard>
  <CCard class="mb-2">
    <CCardHeader>
      <CRow class="align-items-center">
        <CCol>
          <CIcon :icon="ic.cilBadge" />
          ผู้ดูแลระบบ
        </CCol>
        <CCol class="text-end">
          <CButton color="dark" class="ms-1" size="sm" @click="addEmpShown">
            <CIcon :icon="ic.cilSmilePlus" />
            เพิ่มแอดมิน
          </CButton>
        </CCol>
      </CRow>
    </CCardHeader>
    <CCardBody class="small">
      <div class="table-responsive">
        <CTable hover small class="mb-3">
          <CTableHead color="dark" class="fw-bold">
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
              <CTableHeaderCell scope="col">ยูสเซอร์</CTableHeaderCell>
              <CTableHeaderCell scope="col">ชื่อ</CTableHeaderCell>
              <CTableHeaderCell scope="col">ประเภท</CTableHeaderCell>
              <CTableHeaderCell scope="col">ออนไลน์ล่าสุด</CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-center">
                จัดการ
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow
              color="light"
              v-for="(emp, index) in employees.listOfEmp"
              :key="emp._id"
            >
              <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
              <CTableDataCell>
                <CBadge
                  :color="convertStatusColor(emp.status)"
                  shape="rounded-pill"
                  >{{ convertStatus(emp.status) }}</CBadge
                >
              </CTableDataCell>
              <CTableDataCell>
                <div class="d-inline-flex align-items-center">
                  <CAvatar
                    :src="getImgAvatar(emp.role, emp.avatar)"
                    size="sm"
                    status="success"
                  />
                  <span class="ms-1">{{ emp.username }}</span>
                </div>
              </CTableDataCell>
              <CTableDataCell>{{ emp.name }}</CTableDataCell>
              <CTableDataCell>
                <strong>{{ emp.role_description }}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <span class="fst-italic text-black-50">ไม่ระบุ</span>
              </CTableDataCell>
              <CTableDataCell class="text-end">
                <CButton
                  color="warning"
                  variant="outline"
                  size="sm"
                  class="me-1"
                  @click="editEmpShown(emp._id)"
                  v-if="compareRole(tmpRoleMyself, emp.role)"
                >
                  <CIcon :icon="ic.cilColorBorder" class="small" />
                  แก้ไข
                </CButton>
                <CButton
                  color="info"
                  variant="outline"
                  size="sm"
                  class="me-1"
                  @click="mdViewProfile = !mdViewProfile"
                >
                  <CIcon :icon="ic.cilUser" class="small" />
                  <span class="small">โปรไฟล์</span>
                </CButton>
                <CButtonGroup role="group" size="sm"> </CButtonGroup>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
      <div class="text-center">
        <CSmartPagination
          :activePage="employees.activePage"
          :pages="employees.totalPage"
          size="sm"
          align="center"
        />
      </div>
    </CCardBody>
  </CCard>

  <!-- ----- -->
  <!-- เพิ่มแอดมิน -->
  <!-- ----- -->
  <CModal
    backdrop="static"
    :visible="mdCreate"
    @close="
      () => {
        mdCreate = false
      }
    "
  >
    <CModalHeader class="pt-2 pb-1">
      <CModalTitle class="fw-lighter"> เพิ่มแอดมิน </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard class="border-success m-0 p-0">
        <CCardBody>
          <CCardText class="small">
            <CForm novalidate>
              <CContainer fluid>
                <CAlert
                  color="danger"
                  variant="solid"
                  class="py-2"
                  :visible="addEmp.alertAddEmpVisible"
                >
                  <CIcon :icon="ic.cilWarning" />

                  {{ addEmp.apiResult }}
                </CAlert>
                <CRow>
                  <CCol md="6">
                    <div class="d-inline-flex align-items-center">
                      <span class="me-2 small fw-semibold"> * เปิดใช้งาน </span>
                      <CFormSwitch
                        id="formSwitchCheckChecked"
                        v-model="addEmp.status"
                      />
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0 mb-2" />
                <CRow class="mb-2">
                  <CCol>
                    <div>
                      <label for="cEmpType" class="form-label mb-0">
                        เว็บไซต์ *
                      </label>
                      <CFormSelect size="sm" v-model="addEmp.agent_id" required>
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
                </CRow>
                <CRow class="mb-2">
                  <CCol>
                    <div>
                      <label for="cEmpType" class="form-label mb-0">
                        ประเภท *
                      </label>
                      <CFormSelect size="sm" v-model="addEmp.role" required>
                        <option
                          v-for="option in optRole"
                          :key="option._id"
                          :value="option._id"
                        >
                          {{ option.description }}
                        </option>
                      </CFormSelect>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cUsername" class="form-label mb-0">
                        Username *
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cUsername">
                          <CIcon :icon="ic.cilUserPlus" />
                        </CInputGroupText>
                        <CFormInput
                          feedbackValid="Looks good!"
                          feedbackInvalid="Please choose a username."
                          type="text"
                          id="cUsername"
                          v-model="addEmp.username"
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div>
                      <label for="cPassword" class="form-label mb-0">
                        Password *
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cPassword">
                          <CIcon :icon="ic.cilLockLocked" />
                        </CInputGroupText>
                        <CFormInput
                          :type="addEmp.pwdType"
                          id="cPassword"
                          v-model="addEmp.password"
                          required
                        />
                        <CButton
                          type="button"
                          color="secondary"
                          variant="outline"
                          @mousedown="showPwd('add')"
                          @mouseup="showPwd('add')"
                        >
                          <CIcon :icon="ic.cilLowVision" />
                        </CButton>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cName" class="form-label mb-0"> ชื่อ </label>
                      <CInputGroup size="sm">
                        <CFormInput
                          type="text"
                          id="cName"
                          v-model="addEmp.name"
                          required
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div>
                      <label for="cPhone" class="form-label mb-0">
                        เบอร์โทร
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cPhone">
                          <CIcon :icon="ic.cilPhone" />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="cPhone"
                          v-model="addEmp.tel"
                          required
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
              </CContainer>
              <hr />
              <div class="text-end">
                <CButton
                  type="submit"
                  color="success"
                  size="sm"
                  class="ms-1 text-light"
                  @click="addEmployee()"
                >
                  <CIcon :icon="ic.cilCheckCircle" size="sm" />
                  ตกลง
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  class="text-light ms-1"
                  @click="
                    () => {
                      mdCreate = false
                    }
                  "
                >
                  <CIcon :icon="ic.cilXCircle" size="sm" />
                  ปิด
                </CButton>
              </div>
            </CForm>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- แก้ไข -->
  <!-- ----- -->
  <CModal
    backdrop="static"
    :visible="mdEdit"
    @close="
      () => {
        mdEdit = false
      }
    "
  >
    <CModalHeader class="pt-2 pb-1">
      <CModalTitle class="fw-lighter"> แก้ไขบัญชี </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard class="border-warning m-0 p-0">
        <CCardBody>
          <CCardText class="small">
            <form>
              <CContainer fluid>
                <CAlert
                  color="danger"
                  variant="solid"
                  class="py-2"
                  :visible="editEmp.alertAddEmpVisible"
                >
                  <CIcon :icon="ic.cilWarning" />

                  {{ editEmp.apiResult }}
                </CAlert>
                <CRow>
                  <CCol md="6">
                    <div class="d-inline-flex align-items-center">
                      <span class="me-2 small fw-semibold"> * เปิดใช้งาน </span>
                      <CFormSwitch
                        id="formSwitchCheckChecked"
                        v-model="editEmp.status"
                      />
                    </div>
                  </CCol>
                </CRow>
                <hr class="mt-0 mb-2" />
                <CRow class="mb-2">
                  <CCol>
                    <div>
                      <label for="cEmpType" class="form-label mb-0">
                        เว็บไซต์ *
                      </label>
                      <CFormSelect
                        size="sm"
                        v-model="editEmp.agent_id"
                        required
                      >
                        <option value="629e381cb4839cabb5622da1">
                          banpong888
                        </option>
                      </CFormSelect>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-2">
                  <CCol>
                    <div>
                      <label for="cEmpType" class="form-label mb-0">
                        ประเภท *
                      </label>
                      <CFormSelect size="sm" v-model="editEmp.role" required>
                        <option
                          v-for="option in optRole"
                          :key="option._id"
                          :value="option._id"
                        >
                          {{ option.description }}
                        </option>
                      </CFormSelect>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cUsername" class="form-label mb-0">
                        Username *
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cUsername">
                          <CIcon :icon="ic.cilUserPlus" />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="cUsername"
                          disabled
                          v-model="editEmp.username"
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div>
                      <label for="cPassword" class="form-label mb-0">
                        Password *
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cPassword">
                          <CIcon :icon="ic.cilLockLocked" />
                        </CInputGroupText>
                        <CFormInput
                          :type="editEmp.pwdType"
                          id="cPassword"
                          v-model="editEmp.password"
                        />
                        <!-- <CInputGroupText id="basic-cHidden">
                          <CIcon :icon="ic.cilLowVision" />
                        </CInputGroupText> -->
                        <CButton
                          type="button"
                          color="secondary"
                          variant="outline"
                          @mousedown="showPwd('edit')"
                          @mouseup="showPwd('edit')"
                        >
                          <CIcon :icon="ic.cilLowVision" />
                        </CButton>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cName" class="form-label mb-0"> ชื่อ </label>
                      <CInputGroup size="sm">
                        <CFormInput
                          type="text"
                          id="cName"
                          v-model="editEmp.name"
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                  <CCol md="6">
                    <div>
                      <label for="cPhone" class="form-label mb-0">
                        เบอร์โทร
                      </label>
                      <CInputGroup size="sm">
                        <CInputGroupText id="basic-cPhone">
                          <CIcon :icon="ic.cilPhone" />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          id="cPhone"
                          v-model="editEmp.tel"
                        />
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
              </CContainer>
              <hr />
              <div class="text-end">
                <CButton
                  color="success"
                  size="sm"
                  class="ms-1 text-light"
                  @click="editEmployee()"
                >
                  <CIcon :icon="ic.cilCheckCircle" size="sm" />
                  ตกลง
                </CButton>
                <CButton
                  color="danger"
                  size="sm"
                  class="text-light ms-1"
                  @click="
                    () => {
                      mdEdit = false
                    }
                  "
                >
                  <CIcon :icon="ic.cilXCircle" size="sm" />
                  ปิด
                </CButton>
              </div>
            </form>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- ตรวจสอบ -->
  <!-- ----- -->
  <CModal
    fullscreen
    backdrop="static"
    :visible="mdViewProfile"
    @close="
      () => {
        mdViewProfile = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle component="h5" class="fw-bolder">
        <CContainer fluid>
          <CIcon :icon="ic.cilWc" size="xl" />
          ข้อมูลโปรไฟล์
        </CContainer>
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CContainer fluid>
        <CCard class="mb-2 border-secondary">
          <CCardBody>
            <CRow class="mx-4">
              <CCol md="2" class="mb-2 align-items-center text-center">
                <div class="clearfix">
                  <CImage
                    align="center"
                    rounded
                    thumbnail
                    :src="avatar1"
                    width="150"
                    height="150"
                    class="mb-1"
                  />
                  <CButton
                    color="dark"
                    variant="outline"
                    size="sm"
                    shape="rounded-pill"
                  >
                    <CIcon :icon="ic.cilLoopCircular" class="small" />
                    <span class="small"> เปลี่ยน</span>
                  </CButton>
                </div>
              </CCol>
              <CCol md="5" class="mb-2 small">
                <CContainer fluid>
                  <h4>natkingsize2</h4>
                  <hr class="mt-1" />
                  <h5>
                    <strong>สถานะ: </strong>
                    <span class="text-success"> เปิดใช้งาน</span>
                  </h5>
                  <h5>
                    <strong>ชื่อ: </strong>
                    <span class="text-secondary"> natkingsize</span>
                  </h5>
                  <span class="small"> สร้างเมื่อ: 3 เดือนที่แล้ว </span>
                  <br />
                  <span class="small"> แก้ไขล่าสุด: 6 นาทีที่แล้ว </span>
                </CContainer>
              </CCol>
              <CCol md="5" class="small align-self-end">
                <CRow class="align-items-end">
                  <CCol>
                    <CForm class="row g-1 align-items-end float-end">
                      <CCol lg="6">
                        <CInputGroup size="sm">
                          <CFormInput
                            id="searchDate"
                            value="19/02/2022 - 19/02/2022"
                          />
                          <CInputGroupText id="i-searchDate">
                            <CIcon :icon="ic.cilCalendar" />
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                      <CCol lg="5">
                        <CInputGroup size="sm">
                          <CFormInput id="searchTime" value="00:00" />
                          <CInputGroupText id="i-searchTime">
                            -
                          </CInputGroupText>
                          <CFormInput id="searchTime" value="23:59" />
                          <CInputGroupText id="i-searchTime">
                            <CIcon :icon="ic.cilClock" />
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                      <CCol lg="1">
                        <CButton color="primary" class="text-light" size="sm">
                          <CIcon :icon="ic.cilMagnifyingGlass" />
                        </CButton>
                      </CCol>
                    </CForm>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard class="border-secondary">
          <CCardHeader>ประวัติความเคลื่อนไหว</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol class="p-0">
                <div class="table-responsive">
                  <CTable hover small class="mb-3 small">
                    <CTableHead color="dark" class="fw-bold">
                      <CTableRow>
                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                        <CTableHeaderCell scope="col"
                          >คำอธิบาย</CTableHeaderCell
                        >
                        <CTableHeaderCell scope="col">เมื่อ</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      <CTableRow color="light">
                        <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                        <CTableDataCell>
                          👓 patpubul เข้าสู่ระบบ ด้วย IP:
                          2001:fb1:5a:e6e6:4c0e:8ce3:7b69:9482
                        </CTableDataCell>
                        <CTableDataCell>
                          2022-05-21 09:09:16 (9 ชั่วโมงที่แล้ว)
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  </CTable>
                </div>
              </CCol>
            </CRow>
            <div class="text-center">
              <CSmartPagination
                :activePage="2"
                :pages="3"
                size="sm"
                align="center"
              />
            </div>
          </CCardBody>
        </CCard>
      </CContainer>
    </CModalBody>
  </CModal>

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
import avatar1 from '@/assets/images/avatars/owner/02.png'
import avatar2 from '@/assets/images/avatars/owner/01.png'
import avatar3 from '@/assets/images/avatars/owner/04.png'
import avatar4 from '@/assets/images/avatars/manager/02.png'

import { CIcon } from '@coreui/icons-vue'
import {
  cilSmilePlus,
  cilPowerStandby,
  cilBadge,
  cilUser,
  cilColorBorder,
  cilXCircle,
  cilCheckCircle,
  cilUserPlus,
  cilLockLocked,
  cilLowVision,
  cilPhone,
  cilWc,
  cilLoopCircular,
  cilCalendar,
  cilClock,
  cilMagnifyingGlass,
  cilWarning,
} from '@coreui/icons'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SettingEmployee',
  components: {
    CIcon,
  },
  data() {
    return {
      toasts: [],

      // Data
      currentWebAgent: '',
      tmpRoleMyself: '',
      employees: {
        listOfEmp: [],
        totalPage: 1,
        activePage: 1,
      },
      addEmp: {
        agent_id: this.currentWebAgent,
        username: '',
        password: '',
        tel: '',
        avatar: '',
        name: '',
        role: '',
        status: true,
        apiResult: '',
        alertAddEmpVisible: false,
        pwdType: 'password',
      },
      editEmp: {
        agent_id: this.currentWebAgent,
        _id: '',
        username: '',
        password: '',
        tel: '',
        avatar: '',
        name: '',
        role: '',
        status: false,
        apiResult: '',
        alertAddEmpVisible: false,
        pwdType: 'password',
      },
      optRole: [],
      optWebAgent: [],
      // Controls
      avatar1: avatar1,
      avatar2: avatar2,
      avatar3: avatar3,
      avatar4: avatar4,
      imgBank,
      mdCreate: false,
      mdEdit: false,
      mdViewProfile: false,
      ic: {
        cilSmilePlus,
        cilPowerStandby,
        cilBadge,
        cilUser,
        cilColorBorder,
        cilXCircle,
        cilCheckCircle,
        cilUserPlus,
        cilLockLocked,
        cilLowVision,
        cilPhone,
        cilWc,
        cilLoopCircular,
        cilCalendar,
        cilClock,
        cilMagnifyingGlass,
        cilWarning,
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
    navigateTo(route) {
      this.$router.push(route)
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
    async getRoleStaff() {
      await this.$http
        .post('panel/getrole', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optRole = response.data.result
            this.addEmp.role = this.optRole[0]._id
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getrole : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getrole : error' + error)
        })
    },
    async getAllEmployee() {
      await this.$http
        .post('panel/getallemployee', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.employees.listOfEmp = response.data.result.emp
            this.employees.totalPage = Math.ceil(
              response.data.result.total / 10,
            )
            console.log(this.employees.listOfEmp)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getallemployee : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getallemployee : error' + error)
        })
    },
    async addEmployee() {
      this.addEmp.avatar = await this.getAvatar(this.addEmp.role)
      let _status = ''
      if (this.addEmp.status) {
        _status = 'active'
      } else {
        _status = 'inactive'
      }
      await this.$http
        .post('panel/addemployee', {
          agent_id: this.addEmp.agent_id,
          username: this.addEmp.username,
          password: this.addEmp.password,
          tel: this.addEmp.tel,
          avatar: this.addEmp.avatar,
          name: this.addEmp.name,
          role: this.addEmp.role,
          status: _status,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.createToast(
              'success',
              'การดำเนินการ',
              'เพิ่มข้อมูลพนักงานเรียบร้อยแล้ว',
            )
            this.mdCreate = false
            console.log(response)
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
            this.mdCreate = true
            this.addEmp.alertAddEmpVisible = true
            this.addEmp.apiResult = response.data.message
            console.log(
              'call api - panel/addemployee : status = ' +
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
          this.mdCreate = true
          this.addEmp.alertAddEmpVisible = true
          this.addEmp.apiResult = error
          console.log('call api - panel/addemployee : error' + error)
        })
        .finally(() => {
          this.getAllEmployee()
        })
    },
    async editEmployee() {
      let _status = ''
      if (this.addEmp.status) {
        _status = 'active'
      } else {
        _status = 'inactive'
      }
      await this.$http
        .post('panel/updateemp', {
          user_id: this.editEmp.username,
          password: this.editEmp.password,
          name: this.editEmp.name,
          tel: this.editEmp.tel,
          role: this.editEmp.role,
          status: _status,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.createToast(
              'success',
              'การดำเนินการ',
              'ปรับปรุงข้อมูลพนักงานเรียบร้อยแล้ว',
            )
            this.mdEdit = false
            console.log(response)
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
            this.mdEdit = true
            this.editEmp.alertAddEmpVisible = true
            this.editEmp.apiResult = response.data.message
            console.log(
              'call api - panel/updateemp : status = ' +
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
          this.mdEdit = true
          this.editEmp.alertAddEmpVisible = true
          this.editEmp.apiResult = error
          console.log('call api - panel/updateemp : error' + error)
        })
        .finally(() => {
          this.getAllEmployee()
        })
    },

    // functions
    getAvatar(_roleID) {
      let _role = ''
      for (let i = 0; i < this.optRole.length; i++) {
        if (this.optRole[i]._id == _roleID) {
          _role = this.optRole[i].role
          break
        }
      }
      let randomNo = 0
      if (_role == 'admin') {
        randomNo = this.getRandomArbitrary(1, 5)
      } else if (_role == 'owner') {
        randomNo = this.getRandomArbitrary(1, 4)
      } else if (_role == 'manager') {
        randomNo = this.getRandomArbitrary(1, 8)
      } else if (_role == 'staff') {
        randomNo = this.getRandomArbitrary(1, 24)
      } else if (_role == 'partner') {
        randomNo = this.getRandomArbitrary(1, 2)
      }
      return this.leftPad(randomNo, 2) + '.png'
    },
    showPwd(_from) {
      if (_from == 'add') {
        if (this.addEmp.pwdType == 'password') {
          this.addEmp.pwdType = 'text'
        } else {
          this.addEmp.pwdType = 'password'
        }
      } else if (_from == 'edit') {
        if (this.editEmp.pwdType == 'password') {
          this.editEmp.pwdType = 'text'
        } else {
          this.editEmp.pwdType = 'password'
        }
      }
    },
    getRandomArbitrary(min, max) {
      // return Math.random() * (max - min) + min
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    leftPad(number, targetLength) {
      var output = number + ''
      while (output.length < targetLength) {
        output = '0' + output
      }
      return output
    },
    convertStatus(status) {
      const _status = status.toString().toLowerCase()
      if (_status == 'active') {
        return 'เปิดใช้งาน'
      } else if (_status == 'suspend') {
        return 'ปิดใช้งาน'
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
      } else {
        return 'dark'
      }
    },
    compareRole(myself, emp) {
      const _myself = myself.toString().toLowerCase()
      const _emp = emp.toString().toLowerCase()
      if (_myself == 'admin') {
        return true
      } else if (_myself == 'owner') {
        if (
          _emp == 'owner' ||
          _emp == 'manager' ||
          _emp == 'staff' ||
          _emp == 'system' ||
          _emp == 'partner'
        ) {
          return true
        } else {
          return false
        }
      } else if (_myself == 'manager') {
        if (
          _emp == 'manager' ||
          _emp == 'staff' ||
          _emp == 'system' ||
          _emp == 'partner'
        ) {
          return true
        } else {
          return false
        }
      } else if (_myself == 'staff') {
        if (_emp == 'staff' || _emp == 'system' || _emp == 'partner') {
          return true
        } else {
          return false
        }
      } else if (_myself == 'system') {
        if (_emp == 'system' || _emp == 'partner') {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getImgAvatar(role, img) {
      try {
        return require('../../../assets/images/avatars/' + role + '/' + img)
      } catch (err) {
        return require('../../../assets/images/error-404-01.png')
      }
    },
    addEmpShown() {
      this.addEmp.agent_id = this.currentWebAgent
      this.addEmp.username = ''
      this.addEmp.password = ''
      this.addEmp.tel = ''
      this.addEmp.avatar = ''
      this.addEmp.name = ''
      this.addEmp.role = this.optRole[0]._id
      this.addEmp.status = true
      this.addEmp.apiResult = ''
      this.addEmp.alertAddEmpVisible = false
      this.addEmp.pwdType = 'password'
      this.mdCreate = !this.mdCreate
    },
    editEmpShown(empID) {
      this.mdEdit = !this.mdEdit
      this.employees.listOfEmp.forEach((value) => {
        if (value._id == empID) {
          this.editEmp.agent_id = this.currentWebAgent
          this.editEmp._id = value._id
          this.editEmp.username = value.username
          this.editEmp.password = value.password
          this.editEmp.tel = value.tel
          this.editEmp.avatar = value.avatar
          this.editEmp.name = value.name
          this.editEmp.role = value.role
          this.editEmp.status = value.status
          this.editEmp.apiResult = ''
          this.editEmp.alertAddEmpVisible = false
          this.editEmp.pwdType = 'password'
        }
      })
    },
  },
  mounted() {
    this.getRoleStaff().then(() => {
      this.getWebPrefixList().then(() => {
        this.getAllEmployee().then(() => {
          this.tmpRoleMyself = this.user.role
        })
      })
    })
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>
