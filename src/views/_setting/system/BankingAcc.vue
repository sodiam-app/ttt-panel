<template>
  <div>
    <CAccordion :active-item-key="1" always-open>
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
                  <CTableHeaderCell scope="col">Tag</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    Bank Auto
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    SMS Auto
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    สำหรับลูกค้า
                  </CTableHeaderCell>
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
                <CTableRow>
                  <CTableHeaderCell scope="row" class="text-center">
                    1.
                  </CTableHeaderCell>
                  <CTableDataCell class="text-center">
                    <CIcon :icon="ic.cilPowerStandby" class="text-success" />
                  </CTableDataCell>
                  <CTableDataCell class="text-success">
                    <CBadge color="success" shape="rounded-pill"> ฝาก </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <!-- <div class="d-flex align-items-center">
                    <CImage
                      fluid
                      :src="imgBank.scb"
                      width="30"
                      class="ms-1 me-1"
                    />
                    <div>
                      <div class="small">ไทยพาณิชย์</div>
                      <div>5544143899</div>
                    </div>
                  </div> -->
                    <CRow>
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
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>นางสาว อริศรา กระแสโท</CTableDataCell>
                  <CTableDataCell>bp-scb-01</CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon :icon="ic.cilPowerStandby" class="text-success" />
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon :icon="ic.cilBan" class="text-danger" />
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CIcon :icon="ic.cilPowerStandby" class="text-success" />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-block">
                      <CImage fluid :src="imgBank.all" width="30" />
                      <span class="small ms-1">ทั้งหมด</span>
                    </div>
                    <CRow>
                      <CCol xs="auto"> </CCol>
                      <CCol class="ps-0"> </CCol>
                    </CRow>
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
    </CAccordion>
  </div>
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
} from '@coreui/icons'

import avatar from '@/assets/images/avatars/owner/02.png'

export default {
  components: {},
  name: 'Setting Bank Account',
  comments: {
    CIcon,
  },
  data() {
    return {
      avatar: avatar,
      ic: {
        cilAsteriskCircle,
        cilBank,
        cilBan,
        cilColorBorder,
        cilPowerStandby,
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
