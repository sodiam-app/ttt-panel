<template>
  <div>
    <CCard>
      <CCardHeader component="h4">
        <div class="d-flex justify-content-between">
          <div class="align-self-center">
            <strong>
              <CIcon :icon="ic.cilLoopCircular" size="lg" />
              คืนยอดเสีย
            </strong>
          </div>
          <div>
            <CButton color="info">
              <CIcon :icon="ic.cilPlaylistAdd" />
              สร้างรายการ
            </CButton>
          </div>
        </div>
      </CCardHeader>
      <CCardBody class="p-0">
        <CCardText>
          <div class="table-responsive">
            <CTable hover>
              <CTableHead align="middle">
                <CTableRow align="top">
                  <CTableHeaderCell
                    scope="col"
                    rowspan="2"
                    class="border-1 border-top-0 border-start-0"
                  >
                    ลำดับ
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    rowspan="2"
                    class="border-1 border-top-0"
                  >
                    ชื่อไฟล์
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    colspan="4"
                    class="border-1 border-top-0"
                  >
                    สถานะ
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    rowspan="2"
                    class="border-1 border-top-0 border-end-0"
                  >
                    วันที่ทำรายการ
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <!-- <CTableHeaderCell scope="col">ลำดับ</CTableHeaderCell> -->
                  <!-- <CTableHeaderCell scope="col">ชื่อไฟล์</CTableHeaderCell> -->
                  <CTableHeaderCell scope="col" class="border-1">
                    สำเร็จ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="border-1">
                    ไม่สำเร็จ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="border-1">
                    กำลังดำเนินการ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="border-1">
                    ทั้งหมด
                  </CTableHeaderCell>
                  <!-- <CTableHeaderCell scope="col">วันที่ทำรายการ</CTableHeaderCell> -->
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row" class="text-center">
                    1.
                  </CTableHeaderCell>
                  <CTableDataCell> loss-2022-07-11.xlsx </CTableDataCell>
                  <CTableDataCell class="text-center"> 100 </CTableDataCell>
                  <CTableDataCell class="text-center"> 0 </CTableDataCell>
                  <CTableDataCell class="text-center"> 0 </CTableDataCell>
                  <CTableDataCell class="text-center"> 100 </CTableDataCell>
                  <CTableDataCell class="text-center">
                    11/07/2022 20:59:20
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row" class="text-center">
                    2.
                  </CTableHeaderCell>
                  <CTableDataCell>คืนยอดเสียลูกค้า11022022.xlsx</CTableDataCell>
                  <CTableDataCell class="text-center">60</CTableDataCell>
                  <CTableDataCell class="text-center">5</CTableDataCell>
                  <CTableDataCell class="text-center">3</CTableDataCell>
                  <CTableDataCell class="text-center">68</CTableDataCell>
                  <CTableDataCell class="text-center">
                    11/07/2022 06:49:11
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row" class="text-center">
                    3.
                  </CTableHeaderCell>
                  <CTableDataCell>11-07-2022รายการคืนยอด.xlsx</CTableDataCell>
                  <CTableDataCell class="text-center">99</CTableDataCell>
                  <CTableDataCell class="text-center">0</CTableDataCell>
                  <CTableDataCell class="text-center">1</CTableDataCell>
                  <CTableDataCell class="text-center">100</CTableDataCell>
                  <CTableDataCell class="text-center">
                    09/06/2022 15:07:43
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </div>
        </CCardText>
        <div class="text-center">
          <CSmartPagination
            :activePage="1"
            :pages="1"
            size="sm"
            align="center"
            v-show="true"
          />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'
import { cilLoopCircular, cilPlaylistAdd } from '@coreui/icons'

export default {
  name: 'Transection',
  comments: {
    CIcon,
  },
  data() {
    return {
      // icons
      ic: {
        cilLoopCircular,
        cilPlaylistAdd,
      },
    }
  },
}
</script>
