<template>
  <div>
    <CCard class="mb-1">
      <CCardBody>
        <CRow>
          <CCol md="6" class="mb-1">
            <CRow class="small">
              <CCol>
                <CCard class="border-top-3 border-top-primary">
                  <CCardBody class="p-2">
                    <CCardText class="mb-1 text-medium-emphasis">
                      <small>ลูกค้าใหม่</small>
                    </CCardText>
                    <CCardTitle class="mb-1 text-end">
                      <strong>10</strong>
                    </CCardTitle>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard class="border-top-3 border-top-success">
                  <CCardBody class="p-2">
                    <CCardText class="mb-1 text-medium-emphasis">
                      <small>ฝากครั้งแรก</small>
                    </CCardText>
                    <CCardTitle class="mb-1 text-end">
                      <strong>4</strong>
                    </CCardTitle>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol>
                <CCard class="border-top-3 border-top-warning">
                  <CCardBody class="p-2">
                    <CCardText class="mb-1 text-medium-emphasis">
                      <small>คิดเป็น</small>
                    </CCardText>
                    <CCardTitle class="mb-1 text-end">
                      <CRow>
                        <CCol lg="6">
                          <CProgress class="mb-1" :height="3">
                            <CProgressBar
                              color="warning"
                              variant="striped"
                              animated
                              :value="40"
                            />
                          </CProgress>
                        </CCol>
                        <CCol lg="6">
                          <strong>100%</strong>
                        </CCol>
                      </CRow>
                    </CCardTitle>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCol>
          <CCol md="6">
            <CForm class="row g-1 align-items-end float-end">
              <CCol lg="6">
                <CInputGroup size="sm">
                  <CFormInput id="searchDate" value="19/02/2022 - 19/02/2022" />
                  <CInputGroupText id="i-searchDate">
                    <CIcon :icon="ic.cilCalendar" />
                  </CInputGroupText>
                </CInputGroup>
              </CCol>
              <CCol lg="5">
                <CInputGroup size="sm">
                  <CFormInput id="searchTime" value="00:00" />
                  <CInputGroupText id="i-searchTime"> - </CInputGroupText>
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
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader component="h5" class="py-0">
        <CRow class="my-2">
          <CCol class="mt-1">
            <strong class="align-middle">
              <CIcon :icon="ic.cilGroup" size="lg" />
              รายชื่อลูกค้าใหม่
            </strong>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CCardText class="small">
          <div class="table-responsive">
            <CTable hover class="mb-3">
              <CTableHead color="dark" class="fw-bold fst-italic">
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ชื่อ-สกุล</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    ธนาคาร/เลขบัญชี
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">วันเปิดยูส</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ไอพีที่สมัคร</CTableHeaderCell>
                  <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ช่องทางสมัคร</CTableHeaderCell>
                  <CTableHeaderCell scope="col">พาร์ทเนอร์</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow color="light">
                  <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                  <CTableDataCell>
                    <a href="#">99dev100001</a>
                    <br />
                    <CBadge color="success" shape="rounded-pill">ปกติ</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>นายสมชาย หลายใจ</CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="p-0 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="20"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol lg="10" class="ps-1">
                        <strong> 0019203948 </strong>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol class="offset-lg-2 small ps-1"> Demo-name </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">02/05/2022</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">20:49:41</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <small class="fw-lighter m-0 text-wrap">
                      2001:fb1:5b:4f6a:24d4:d4d8:f1a9:97ac
                    </small>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="warning">รอโอน</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>Facebook</CTableDataCell>
                  <CTableDataCell>papon</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
          <div class="text-center">
            <CSmartPagination
              :activePage="2"
              :pages="5"
              size="sm"
              align="center"
            />
          </div>
        </CCardText>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'

export default {
  name: 'ListsNewMember',
  comments: {},
  data() {
    return {}
  },
  setup() {
    return {
      imgBank,
      ic,
    }
  },
}
</script>
