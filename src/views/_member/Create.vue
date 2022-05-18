<template>
  <div>
    <CCard>
      <CCardHeader component="h5">
        <CRow class="my-2">
          <CCol>
            <strong class="align-middle">
              <CIcon :icon="ic.cilUserPlus" size="lg" />
              สร้างลูกค้าใหม่
            </strong>
          </CCol>
          <CCol class="text-end">
            <CButton color="success" class="ms-1 text-light" size="sm">
              <CIcon :icon="ic.cilSave" />
              สร้าง
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol xl="6">
              <CCard class="border-secondary mb-1">
                <CCardHeader> ข้อมูลพื้นฐาน </CCardHeader>
                <CCardBody>
                  <CCardText class="small">
                    <CRow>
                      <CCol md="6">
                        <div class="d-inline-flex align-items-center mb-2">
                          <span class="me-2 small fw-semibold">
                            * เปิดใช้งาน
                          </span>
                          <CFormSwitch id="formSwitchCheckChecked" checked />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cPrefix" class="form-label mb-0">
                            Prefix *
                          </label>
                          <select
                            id="cPrefix"
                            class="form-select"
                            aria-label="Prefix"
                          >
                            <option value="0">กรุณาเลือก</option>
                            <option value="Banpong888">Banpong888</option>
                            <option value="Inwtrue711">Inwtrue711</option>
                          </select>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cPhone" class="form-label mb-0">
                            เบอร์โทร *
                            <small>
                              <small class="text-muted">
                                (สำหรับเข้าสู่ระบบ)
                              </small>
                            </small>
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cPhone">
                              <CIcon :icon="ic.cilPhone" />
                            </CInputGroupText>
                            <CFormInput
                              id="cPhone"
                              placeholder="06123456xx"
                              aria-label="เบอร์โทรลูกค้า"
                              aria-describedby="basic-cPhone"
                            />
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            ชื่อ *
                          </label>
                          <CFormInput type="text" id="cFName" />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            นามสกุล
                          </label>
                          <CFormInput type="text" id="cLName" />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cBirthday" class="form-label mb-0">
                            วันเกิดลูกค้า
                          </label>
                          <CInputGroup>
                            <CInputGroupText id="basic-cBirthday">
                              <CIcon :icon="ic.cilBirthdayCake" />
                            </CInputGroupText>
                            <CFormInput
                              type="date"
                              id="cBirthday"
                              placeholder="dd/mm/yyyy"
                              aria-label="วันเกิดลูกค้า"
                              aria-describedby="basic-cBirthday"
                            />
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cSpecial" class="form-label mb-0">
                            สิทธิพิเศษ
                          </label>
                          <CFormInput type="text" id="cSpecial" />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cApplyMethod" class="form-label mb-0">
                            ช่องทางการสมัคร
                          </label>
                          <select
                            id="cApplyMethod"
                            class="form-select text-muted"
                            aria-label="ช่องทางการสมัคร"
                          >
                            <option selected>
                              <span>สามารถเลือกได้</span>
                            </option>
                            <option value="0">Google</option>
                            <option value="1">Facebook</option>
                            <option value="2">Youtube</option>
                            <option value="3">Website</option>
                            <option value="4">เพื่อนแนะนำ</option>
                          </select>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cPartner" class="form-label mb-0">
                            พาร์ทเนอร์
                          </label>
                          <select
                            id="cPartner"
                            class="form-select text-muted"
                            aria-label="พาร์ทเนอร์"
                          >
                            <option selected>สามารถเลือกได้</option>
                            <option value="0">สมหมาย</option>
                            <option value="1">สมชาย</option>
                            <option value="2">สมปอง</option>
                            <option value="3">สมศักดิ์</option>
                            <option value="4">รักยิ้ม</option>
                          </select>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cNote" class="form-label mb-0">
                            หมายเหตุ
                          </label>
                          <CFormInput type="text" id="cNote" placeholder="" />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cRegisIP" class="form-label mb-0">
                            ยูสเซอร์แนะนำ
                          </label>
                          <CFormInput type="text" id="cRegisIP" />
                        </div>
                      </CCol>
                    </CRow>
                    <hr />
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cPin" class="form-label mb-0">
                            PIN *
                            <small>
                              <small class="text-muted">
                                (สำหรับเข้าสู่ระบบ)
                              </small>
                            </small>
                          </label>
                          <CInputGroup>
                            <CFormInput
                              type="password"
                              id="cPin"
                              placeholder="PIN"
                              aria-label="PIN"
                              aria-describedby="basic-cPin"
                              value="1111"
                            />
                            <CInputGroupText id="basic-cPin">
                              <CIcon :icon="ic.cilLockLocked" />
                            </CInputGroupText>
                          </CInputGroup>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label
                            for="cPromotion"
                            class="form-label mb-0"
                          ></label>
                          <CFormSwitch
                            size="lg"
                            label="ปิด/เปิดโปรฯ"
                            id="cPromotion"
                          />
                        </div>
                      </CCol>
                    </CRow>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xl="6">
              <CCard class="border-secondary p-0 mb-1">
                <CCardHeader>บัญชีและการเงิน</CCardHeader>
                <CCardBody>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBanking" class="form-label mb-0">
                          ธนาคาร *
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cBanking" class="p-2">
                            <CImage fluid :src="imgBank.ttb" width="22" />
                          </CInputGroupText>
                          <CFormSelect id="cBanking">
                            <option value="ttb" selected>ทหารไทยธนชาต</option>
                            <option value="kbank">กสิกรไทย</option>
                            <option value="00">กรุงเทพ</option>
                            <option value="00">กรุงไทย</option>
                            <option value="00">ไทยพาณิชย์</option>
                            <option value="00">กรุงศรีอยุธยา</option>
                          </CFormSelect>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBankAcct" class="form-label mb-0">
                          เลขที่บัญชี *
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cBankAcct">
                            <CIcon :icon="ic.cilCreditCard" />
                          </CInputGroupText>
                          <CFormInput
                            id="cBankAcct"
                            placeholder="021-3-83283-2"
                            aria-label="บัญชีลูกค้า"
                            aria-describedby="basic-cBankAcct"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cBankAcct" class="form-label mb-0">
                          แสดงเฉพาะบัญชี
                        </label>
                        <CMultiSelect
                          :options="optShownBankAcct"
                          placeholder="ทั้งหมด"
                          select-all-label=""
                          search-no-results-label="ไม่มีข้อมูล"
                          select-all
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <hr class="mt-3" />
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cSkipCheckName" class="form-label mb-0">
                          เมื่อถอน
                        </label>
                        <CFormSwitch
                          size="lg"
                          label="ข้ามการตรวจสอบชื่อจากธนาคาร"
                          id="cSkipCheckName"
                        />
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard class="border-secondary p-0 mb-1">
                <CCardHeader>ช่องทางการติดต่อ</CCardHeader>
                <CCardBody>
                  <CRow class="mb-2">
                    <CCol md="6">
                      <div>
                        <label for="cPhone" class="form-label mb-0">
                          เบอร์ติดต่อ
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cPhone">
                            <CIcon :icon="ic.cilPhone" />
                          </CInputGroupText>
                          <CFormInput
                            id="cPhone"
                            placeholder="06123456xx"
                            aria-label="เบอร์โทรลูกค้า"
                            aria-describedby="basic-cPhone"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                    <CCol md="6">
                      <div>
                        <label for="cLineID" class="form-label mb-0">
                          ไลน์ไอดี
                          <small>
                            <small class="text-muted"> (Line ID) </small>
                          </small>
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cLineID">
                            <CIcon :icon="ic.cibLine" />
                          </CInputGroupText>
                          <CFormInput
                            id="cLineID"
                            placeholder="customer.xxx"
                            aria-label="customer.xxx"
                            aria-describedby="basic-cLineID"
                          />
                          <CInputGroupText id="basic-LinkLineID">
                            <CIcon :icon="ic.cilLink" />
                          </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow class="mb-2">
                    <CCol>
                      <div>
                        <label for="cEmail" class="form-label mb-0">
                          Email
                        </label>
                        <CInputGroup>
                          <CInputGroupText id="basic-cEmail">
                            <CIcon :icon="ic.cilEnvelopeOpen" />
                          </CInputGroupText>
                          <CFormInput
                            id="cEmail"
                            placeholder="email@tttAIP.com"
                            aria-label="อีเมลลูกค้า"
                            aria-describedby="basic-cEmail"
                          />
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardText>
      </CCardBody>
      <CCardFooter class="d-xl-none">
        <CCol class="text-end">
          <CButton color="success" class="ms-1 text-light" size="sm">
            <CIcon :icon="ic.cilSave" />
            สร้าง
          </CButton>
        </CCol>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'

export default {
  name: 'CreateMember',
  comments: {},
  data() {
    return {
      optShownBankAcct: [
        { value: 0, text: '0213832833 (ttb Auto)', selected: false },
        { value: 1, text: '4732291820 (ttb VIP1)', selected: false },
        { value: 2, text: '6678738476 (kbank VIP2)', selected: false },
        { value: 3, text: '7782736621 (ttb Junior Auto)', selected: false },
        { value: 4, text: '6674625517 (scb Auto)', selected: false },
        { value: 5, text: '5894882912 (scb VIP1)', selected: false },
      ],
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
