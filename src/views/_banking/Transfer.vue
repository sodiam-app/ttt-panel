<template>
  <div>
    <CAccordion :active-item-key="1" class="mb-1">
      <CAccordionItem :item-key="1">
        <CAccordionHeader>
          <strong>
            <CIcon :icon="ic.cilBraille" />
            โอนเงิน
          </strong>
        </CAccordionHeader>
        <CAccordionBody>
          <CRow>
            <CCol md="6" class="mb-1">
              <CCard>
                <CCardBody>
                  <CCardTitle>
                    จากธนาคาร
                    <CIcon :icon="ic.cilPaperPlane" />
                  </CCardTitle>
                  <CCardSubtitle class="mb-2 text-muted">
                    <CProgress :height="2" class="mb-2">
                      <CProgressBar
                        :value="100"
                        color="warning"
                        variant="striped"
                        animated
                      ></CProgressBar>
                    </CProgress>
                  </CCardSubtitle>
                  <CCardText>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <CFormSelect>
                          <option>กรุณาเลือกบัญชี</option>
                          <option value="0213832833">
                            (ttb Auto) 0213832833
                          </option>
                          <option value="00928378472">
                            (Reserve) 00928378472
                          </option>
                          <option value="66536462819">
                            (tttAPI) 66536462819
                          </option>
                          <option value="0928837263">
                            (Demo001) 0928837263
                          </option>
                        </CFormSelect>
                      </CCol>
                      <CCol md="6">
                        <CRow>
                          <CCol> <strong>ธนาคาร: </strong> ทหารไทยธนชาต </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <strong>เลขที่บัญชี: </strong> 0213832833
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <strong>ยอดคงเหลือ: </strong>
                            <span class="fst-italic fw-bold text-info">
                              190236.00 ฿
                            </span>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md="6" class="mb-1">
              <CCard>
                <CCardBody>
                  <CCardTitle>
                    ไปยังธนาคาร
                    <CIcon :icon="ic.cilWallet" />
                  </CCardTitle>
                  <CCardSubtitle class="mb-2 text-muted">
                    <CProgress :height="2" class="mb-2">
                      <CProgressBar
                        :value="100"
                        color="info"
                        variant="striped"
                        animated
                      ></CProgressBar>
                    </CProgress>
                  </CCardSubtitle>
                  <CCardText>
                    <CRow class="mb-1">
                      <CCol>
                        <CInputGroup>
                          <CInputGroupText id="basic-addon1">
                            <CIcon :icon="ic.cilBank" class="small" />
                          </CInputGroupText>
                          <CFormSelect>
                            <option>กรุณาเลือกธนาคาร</option>
                            <option value="ttb">ทหารไทยธนชาต</option>
                            <option value="scb">ไทยพาณิชย์</option>
                            <option value="ktb">กรุงไทย</option>
                            <option value="bay">กรุงศรีอยุธยา</option>
                            <option value="gsb">ออมสิน</option>
                            <option value="kbank">สิกรไทย</option>
                          </CFormSelect>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow class="mb-1">
                      <CCol>
                        <CInputGroup>
                          <CInputGroupText id="idAccountNo">
                            * เลขที่บัญชี
                          </CInputGroupText>
                          <CFormInput
                            placeholder=""
                            aria-describedby="idAccountNo"
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow class="mb-1">
                      <CCol>
                        <CInputGroup>
                          <CInputGroupText id="idAmount">
                            * จำนวนยอดโอน
                          </CInputGroupText>
                          <CFormInput
                            placeholder=""
                            aria-describedby="idAmount"
                          />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                    <CRow class="mb-1">
                      <CCol>
                        <div class="mb-3">
                          <label for="idNote" class="form-label mb-1">
                            หมายเหตุ
                          </label>
                          <textarea
                            class="form-control"
                            id="idNote"
                            rows="2"
                          ></textarea>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol class="text-center">
                        <CButton
                          size="sm"
                          color="primary"
                          shape="rounded-pill"
                          variant="outline"
                        >
                          <CIcon :icon="ic.cilTransfer" size="sm" />
                          ดำเนินการโอน
                        </CButton>
                        <span class="text-muted"> | </span>
                        <CButton
                          size="sm"
                          color="dark"
                          shape="rounded-pill"
                          variant="outline"
                        >
                          <CIcon :icon="ic.cilBan" size="sm" />
                          ยกเลิก
                        </CButton>
                      </CCol>
                    </CRow>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
    <CCard>
      <CCardHeader component="h5" class="py-0">
        <CRow class="my-2">
          <CCol class="mt-1">
            <strong class="align-middle">
              <CIcon :icon="ic.cilHistory" size="lg" />
              ประวัติการโอน
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
                  <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ผู้ดำเนินการ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">จาก</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ไปยัง</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-end">
                    จำนวน
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">เวลารายการ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-center">
                    จัดการ
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow color="light">
                  <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                  <CTableDataCell>
                    <CBadge color="success" shape="rounded-pill">สำเร็จ</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-inline-flex align-items-center">
                      <CAvatar :src="avatar" size="sm" status="success" />
                      <CBadge color="light" class="ms-1 p-2 d-none d-md-block">
                        <a href="#">แอดมินนัท</a>
                      </CBadge>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0019203948</strong>
                        </p>
                        <p class="mb-0">
                          <small>นาย วัชระพันธุ์ จันทร์พงษ์วนิช</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.bay"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0213832833</strong>
                        </p>
                        <p class="mb-0">
                          <small>SUPAVIT CHARO</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell class="text-end">
                    <strong class="fst-italic">100.00</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">02/05/2022</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">20:49</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell class="text-end">
                    <CButtonGroup role="group" size="sm">
                      <CButton
                        color="primary"
                        @click="
                          () => {
                            modViewDetails = true
                          }
                        "
                      >
                        <CIcon :icon="ic.cilZoomIn" class="small" />
                        รายละเอียด
                      </CButton>
                      <CButton color="secondary">
                        <CIcon :icon="ic.cilReload" class="small" />
                        ทำซ้ำ
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow color="danger">
                  <CTableHeaderCell scope="row">2.</CTableHeaderCell>
                  <CTableDataCell>
                    <CBadge color="danger" shape="rounded-pill">
                      ผิดพลาด
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-inline-flex align-items-center">
                      <CAvatar :src="avatar" size="sm" status="success" />
                      <CBadge color="light" class="ms-1 p-2 d-none d-md-block">
                        <a href="#">แอดมินนัท</a>
                      </CBadge>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0019203948</strong>
                        </p>
                        <p class="mb-0">
                          <small>นาย วัชระพันธุ์ จันทร์พงษ์วนิช</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ktb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0921111112</strong>
                        </p>
                        <p class="mb-0">
                          <small>SUPAVIT CHARO</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell class="text-end">
                    <strong class="fst-italic">500.00</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">10/03/2021</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">34:22</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell class="text-end">
                    <CButtonGroup role="group" size="sm">
                      <CButton color="secondary">
                        <CIcon :icon="ic.cilReload" class="small" />
                        ทำซ้ำ
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow color="light">
                  <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                  <CTableDataCell>
                    <CBadge color="success" shape="rounded-pill">สำเร็จ</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-inline-flex align-items-center">
                      <CAvatar :src="avatar" size="sm" status="success" />
                      <CBadge color="light" class="ms-1 p-2 d-none d-md-block">
                        <a href="#">โจ้จิบิ</a>
                      </CBadge>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0019203948</strong>
                        </p>
                        <p class="mb-0">
                          <small>นาย วัชระพันธุ์ จันทร์พงษ์วนิช</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.bay"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0213832833</strong>
                        </p>
                        <p class="mb-0">
                          <small>SUPAVIT CHARO</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell class="text-end">
                    <strong class="fst-italic">1.00</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">01/05/2022</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">07:36</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell class="text-end">
                    <CButtonGroup role="group" size="sm">
                      <CButton color="primary">
                        <CIcon :icon="ic.cilZoomIn" class="small" />
                        รายละเอียด
                      </CButton>
                      <CButton color="secondary">
                        <CIcon :icon="ic.cilReload" class="small" />
                        ทำซ้ำ
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow color="light">
                  <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                  <CTableDataCell>
                    <CBadge color="success" shape="rounded-pill">สำเร็จ</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-inline-flex align-items-center">
                      <CAvatar :src="avatar" size="sm" status="success" />
                      <CBadge color="light" class="ms-1 p-2 d-none d-md-block">
                        <a href="#">แอดมินนัท</a>
                      </CBadge>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0019203948</strong>
                        </p>
                        <p class="mb-0">
                          <small>นาย วัชระพันธุ์ จันทร์พงษ์วนิช</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.bay"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0213832833</strong>
                        </p>
                        <p class="mb-0">
                          <small>SUPAVIT CHARO</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell class="text-end">
                    <strong class="fst-italic">50.00</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">19/04/2022</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">23:00</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell class="text-end">
                    <CButtonGroup role="group" size="sm">
                      <CButton color="primary">
                        <CIcon :icon="ic.cilZoomIn" class="small" />
                        รายละเอียด
                      </CButton>
                      <CButton color="secondary">
                        <CIcon :icon="ic.cilReload" class="small" />
                        ทำซ้ำ
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow color="light">
                  <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                  <CTableDataCell>
                    <CBadge color="success" shape="rounded-pill">สำเร็จ</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div class="d-inline-flex align-items-center">
                      <CAvatar :src="avatar" size="sm" status="success" />
                      <CBadge color="light" class="ms-1 p-2 d-none d-md-block">
                        <a href="#">ยังไงดี</a>
                      </CBadge>
                    </div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.ttb"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0019203948</strong>
                        </p>
                        <p class="mb-0">
                          <small>นาย วัชระพันธุ์ จันทร์พงษ์วนิช</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <CCol lg="2" class="ps-0 pe-1 m-0">
                        <CImage
                          fluid
                          :src="imgBank.bay"
                          width="30"
                          class="ms-1 me-1"
                        />
                      </CCol>
                      <CCol class="ps-1">
                        <p class="mb-0">
                          <strong>0213832833</strong>
                        </p>
                        <p class="mb-0">
                          <small>SUPAVIT CHARO</small>
                        </p>
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell class="text-end">
                    <strong class="fst-italic">90872.00</strong>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CRow>
                      <p class="m-0">12/04/2022</p>
                    </CRow>
                    <CRow>
                      <small class="fw-lighter m-0">16:48</small>
                    </CRow>
                  </CTableDataCell>
                  <CTableDataCell>-</CTableDataCell>
                  <CTableDataCell class="text-end">
                    <CButtonGroup role="group" size="sm">
                      <CButton color="primary">
                        <CIcon :icon="ic.cilZoomIn" class="small" />
                        รายละเอียด
                      </CButton>
                      <CButton color="secondary">
                        <CIcon :icon="ic.cilReload" class="small" />
                        ทำซ้ำ
                      </CButton>
                    </CButtonGroup>
                  </CTableDataCell>
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
  <!-- - -->
  <!-- รายละเอียด -->
  <!-- - -->
  <!-- - -->
  <CModal
    :visible="modViewDetails"
    @close="
      () => {
        modViewDetails = false
      }
    "
  >
    <CModalHeader class="pt-2 pb-1">
      <CModalTitle class="fw-lighter"> รายละเอียด </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CRow>
        <CCol md="5" class="mb-1 small">
          <div class="small">
            <CRow>
              <CCol>
                <CRow
                  class="row d-flex justify-content-center align-items-center"
                >
                  <CCol xs="4" class="d-flex justify-content-center">
                    <CImage
                      fluid
                      :src="imgBank.ttb"
                      width="50"
                      class="ms-1 me-1"
                    />
                  </CCol>
                  <CCol xs="auto" class="fw-bolder">
                    <CIcon :icon="ic.cilArrowThickFromLeft" size="lg" />
                  </CCol>
                  <CCol xs="4" class="d-flex justify-content-center">
                    <CImage
                      fluid
                      :src="imgBank.bay"
                      width="50"
                      class="ms-1 me-1"
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CProgress :height="2" class="mb-2 mt-2">
              <CProgressBar
                :value="100"
                color="success"
                variant="striped"
                animated
              ></CProgressBar>
            </CProgress>
            <CRow>
              <CCol>โอนเงินจาก: </CCol>
              <CCol></CCol>
            </CRow>
            <CRow>
              <CCol>โอนไปถึง: </CCol>
              <CCol></CCol>
            </CRow>
            <CRow>
              <CCol>จำนวนเงิน: </CCol>
              <CCol></CCol>
            </CRow>
            <CRow>
              <CCol>รหัสอ้างอิง: </CCol>
              <CCol></CCol>
            </CRow>
            <hr class="mt-2 mb-1" />
            <CRow>
              <CCol>ยอดก่อนโอน: </CCol>
              <CCol></CCol>
            </CRow>
            <CRow>
              <CCol>ยอดหลังโอน: </CCol>
              <CCol></CCol>
            </CRow>
          </div>
        </CCol>
        <CCol md="7">
          <CImage fluid :src="demoSlip01" />
        </CCol>
      </CRow>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="danger"
        class="ms-1 text-light"
        @click="
          () => {
            modViewDetails = false
          }
        "
      >
        <CIcon :icon="ic.cilXCircle" />
        ปิด
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'

import avatar from '@/assets/images/avatars/owner/02.png'

import demoSlip01 from '@/assets/images/eslip/demo2.png'

export default {
  components: {},
  name: 'Transfer',
  comments: {},
  data() {
    return {
      demoSlip01: demoSlip01,
      avatar: avatar,
      modViewDetails: false,
      visibleLiveDemo: false,
    }
  },
  setup() {
    return {
      imgBank,
      ic,
    }
  },
}
</script>
