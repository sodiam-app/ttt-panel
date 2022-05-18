<template>
  <div>
    <CCard>
      <CCardBody>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <CNav variant="tabs" class="card-header-tabs">
                  <CNavItem>
                    <CNavLink
                      class="text-reset"
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 1"
                      @click="
                        () => {
                          tabPaneActiveKey = 1
                        }
                      "
                    >
                      ทั่วไป
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      class="text-reset"
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 2"
                      @click="
                        () => {
                          tabPaneActiveKey = 2
                        }
                      "
                    >
                      การฝากถอน
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      class="text-reset"
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 3"
                      @click="
                        () => {
                          tabPaneActiveKey = 3
                        }
                      "
                    >
                      การเชิญชวน
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCol>
              <CCol class="text-end">
                <CButton
                  color="success"
                  class="ms-1 text-light"
                  size="sm"
                  v-if="tabPaneActiveKey === 1"
                >
                  <CIcon :icon="ic.cilSave" />
                  บันทึก
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 1"
            >
              <CCardText>
                <CRow>
                  <CCol xl="6" class="px-1">
                    <CCard class="border-secondary mb-1">
                      <CCardHeader>
                        <CRow>
                          <CCol> ข้อมูลพื้นฐาน </CCol>
                          <CCol class="text-end">
                            <CButton
                              color="danger"
                              class="ms-1 text-light"
                              size="sm"
                            >
                              <CIcon :icon="ic.cilBan" />
                              แบลลิส
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody>
                        <CCardText class="small">
                          <CRow>
                            <CCol>
                              <div
                                class="d-inline-flex align-items-center mb-2"
                              >
                                <span class="me-2 small fw-semibold">
                                  * เปิดใช้งาน
                                </span>
                                <CFormSwitch
                                  id="formSwitchCheckChecked"
                                  checked
                                />
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
                                  <option value="Banpong888" selected>
                                    Banpong888
                                  </option>
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
                                    value="0614496191"
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
                                <CFormInput
                                  type="text"
                                  id="cFName"
                                  value="นายสมชาย"
                                />
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cLName" class="form-label mb-0">
                                  นามสกุล
                                </label>
                                <CFormInput
                                  type="text"
                                  id="cLName"
                                  value="หลายใจ"
                                />
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
                                    aria-label="วันเกิดลูกค้า"
                                    aria-describedby="basic-cBirthday"
                                    value="1993-02-19"
                                  />
                                </CInputGroup>
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cStatus" class="form-label mb-0">
                                  สถานะลูกค้า
                                </label>
                                <CInputGroup>
                                  <CInputGroupText
                                    id="basic-cStatus"
                                    class="p-2"
                                  >
                                    <CImage
                                      fluid
                                      :src="imgStatus.correct"
                                      width="22"
                                    />
                                  </CInputGroupText>
                                  <CFormSelect id="cStatus">
                                    <option selected value="ปกติ">ปกติ</option>
                                    <option value="เฝ้าระวัง">เฝ้าระวัง</option>
                                    <option value="ระงับ">ระงับ</option>
                                    <option value="ไม่เคลื่อนไหว">
                                      ไม่เคลื่อนไหว
                                    </option>
                                  </CFormSelect>
                                </CInputGroup>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
                            <CCol md="6">
                              <div>
                                <label
                                  for="cApplyMethod"
                                  class="form-label mb-0"
                                >
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
                                  <option value="4" selected>
                                    เพื่อนแนะนำ
                                  </option>
                                </select>
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
                                <label for="cRegisIP" class="form-label mb-0">
                                  ยูสเซอร์แนะนำ
                                </label>
                                <CFormInput type="text" id="cRegisIP" />
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
                                  <option value="3" selected>สมศักดิ์</option>
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
                                <CFormInput
                                  type="text"
                                  id="cNote"
                                  placeholder=""
                                />
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cRegisIP" class="form-label mb-0">
                                  Register IP
                                </label>
                                <CFormInput
                                  type="text"
                                  id="cRegisIP"
                                  placeholder="IP Address"
                                  value="201.292.220.199"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <hr />
                          <CRow class="mb-2">
                            <CCol md="6">
                              <div>
                                <label for="cPin" class="form-label mb-0">
                                  PIN *
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
                                  label="เปิด/ปิดโปรฯ"
                                  id="cPromotion"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
                            <CCol>
                              <div>
                                <label for="cUrl" class="form-label mb-0">
                                  URL
                                  <small>
                                    <small class="text-muted">
                                      (สำหรับเข้าสู่ระบบ)
                                    </small>
                                  </small>
                                </label>
                                <CInputGroup>
                                  <CFormInput
                                    type="text"
                                    id="cUrl"
                                    placeholder="URL"
                                    aria-label="URL"
                                    aria-describedby="basic-cUrl"
                                    class="text-muted border-secondary"
                                    value="https://banpong888.com/login?tel=0659162647"
                                    disabled
                                  />
                                  <CButton
                                    type="button"
                                    color="secondary"
                                    variant="outline"
                                    id="button-cUrl"
                                  >
                                    <CIcon :icon="ic.cilCopy" />
                                  </CButton>
                                </CInputGroup>
                              </div>
                            </CCol>
                          </CRow>
                          <hr />
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
                                    aria-label="เบอร์โทรลูกค้า"
                                    aria-describedby="basic-cPhone"
                                    value="0659162647"
                                  />
                                </CInputGroup>
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cLineID" class="form-label mb-0">
                                  ไลน์ไอดี
                                  <small>
                                    <small class="text-muted">
                                      (Line ID)
                                    </small>
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
                                    value="psodiam"
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
                                    value="ss.app@gmail.com"
                                  />
                                </CInputGroup>
                              </div>
                            </CCol>
                          </CRow>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  <CCol xl="6" class="px-1">
                    <CCard class="border-secondary p-0 mb-1">
                      <CCardHeader>
                        <CRow>
                          <CCol> ข้อมูลการเงิน </CCol>
                          <CCol class="text-end">
                            <CButton
                              color="info"
                              class="ms-1 text-light"
                              size="sm"
                            >
                              <CIcon :icon="ic.cilReload" />
                              รีโหลด
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody class="small">
                        <CRow class="mb-2">
                          <CCol md="6">
                            <CRow>
                              <CCol>
                                <ul class="list-group">
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ยอดเสียปัจจุบัน:
                                    <span class="badge bg-warning rounded-pill"
                                      >0.00 ฿</span
                                    >
                                  </li>
                                </ul>
                              </CCol>
                            </CRow>
                            <hr class="mt-1 mb-2" />
                            <CRow>
                              <CCol>
                                <ul class="list-group mb-1">
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    wallet:
                                    <span class="badge bg-success rounded-pill"
                                      >600.29 ฿</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    เครดิต:
                                    <span class="badge bg-success rounded-pill"
                                      >0.0 ฿</span
                                    >
                                  </li>
                                </ul>
                              </CCol>
                            </CRow>
                            <CRow>
                              <CCol>
                                <ul class="list-group mb-1">
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    แนะนำเพื่อน:
                                    <span class="badge bg-dark rounded-pill">
                                      2 ยูส
                                    </span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ค่าคอมฯ ถอนได้:
                                    <span class="badge bg-dark rounded-pill"
                                      >5.29 ฿</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ถอนรวม:
                                    <span class="badge bg-dark rounded-pill"
                                      >0.0 ฿</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ถอนล่าสุดเมื่อ:
                                    <span> - </span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    จำนวน:
                                    <span class="badge bg-dark rounded-pill"
                                      >0.0 ฿</span
                                    >
                                  </li>
                                </ul>
                              </CCol>
                            </CRow>
                          </CCol>
                          <CCol md="6">
                            <CRow>
                              <CCol>
                                <ul class="ps-4">
                                  <li class="pb-1">
                                    ฝากครั้งแรก:
                                    <span
                                      class="badge bg-secondary rounded-pill"
                                    >
                                      5.00
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ฝากรวม:
                                    <span class="badge bg-success rounded-pill">
                                      15
                                    </span>
                                    ครั้ง,
                                    <span class="badge bg-success rounded-pill">
                                      440.00
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ถอนรวม:
                                    <span class="badge bg-danger rounded-pill">
                                      8
                                    </span>
                                    ครั้ง,
                                    <span class="badge bg-danger rounded-pill">
                                      350.00
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ดุล:
                                    <span class="badge bg-warning rounded-pill">
                                      31.00
                                    </span>
                                    ฿
                                  </li>
                                </ul>
                              </CCol>
                            </CRow>
                            <hr class="mt-0" />
                            <CRow class="small">
                              <CCol>
                                <CRow>
                                  <CCol xs="4" class="pe-1 text-end"
                                    >สมัครเมื่อ:
                                  </CCol>
                                  <CCol xs="8" class="ps-1">
                                    <p class="mb-0">08/02/2022 00:32:09</p>
                                    <small class="text-muted"
                                      >(3 เดือนที่แล้ว)</small
                                    >
                                  </CCol>
                                </CRow>
                              </CCol>
                            </CRow>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                    <CCard class="border-secondary p-0 mb-1">
                      <CCardHeader>ข้อมูลบัญชี</CCardHeader>
                      <CCardBody>
                        <CRow class="mb-2">
                          <CCol>
                            <div>
                              <label for="cBanking" class="form-label mb-0">
                                ธนาคาร *
                              </label>
                              <CInputGroup>
                                <CInputGroupText
                                  id="basic-cBanking"
                                  class="p-2"
                                >
                                  <CImage
                                    fluid
                                    :src="imgBank.kbank"
                                    width="22"
                                  />
                                </CInputGroupText>
                                <CFormSelect id="cBanking">
                                  <option value="ttb">ทหารไทยธนชาต</option>
                                  <option value="kbank" selected>
                                    กสิกรไทย
                                  </option>
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
                                  aria-label="บัญชีลูกค้า"
                                  aria-describedby="basic-cBankAcct"
                                  value="0213832832"
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
                              <label
                                for="cSkipCheckName"
                                class="form-label mb-0"
                              >
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
                  </CCol>
                </CRow>
              </CCardText>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 2"
            >
              <CCardText>
                <CRow>
                  <CCol class="text-end px-1 mb-1">
                    <CForm
                      class="row row-cols-lg-auto g-3 align-items-end float-end"
                    >
                      <CCol class="mt-1">
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
                      <CCol class="mt-1">
                        <CInputGroup size="sm">
                          <CFormInput id="searchTime" value="00:00 - 23:59" />
                          <CInputGroupText id="i-searchTime">
                            <CIcon :icon="ic.cilClock" />
                          </CInputGroupText>
                        </CInputGroup>
                      </CCol>
                      <CCol class="mt-1">
                        <CButton
                          color="primary"
                          class="ms-1 text-light"
                          size="sm"
                        >
                          <CIcon :icon="ic.cilMagnifyingGlass" />
                        </CButton>
                      </CCol>
                    </CForm>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol class="px-1">
                    <CCard class="border-secondary mb-1">
                      <CCardHeader>
                        <CRow>
                          <CCol> ประวัติการฝากถอน </CCol>
                        </CRow>
                      </CCardHeader>
                      <CCardBody>
                        <CCardText class="small">
                          <div class="table-responsive">
                            <CTable hover class="mb-3">
                              <CTableHead
                                color="dark"
                                class="fw-bold fst-italic"
                              >
                                <CTableRow>
                                  <CTableHeaderCell scope="col"
                                    >#</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >ช่องทาง</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >ประเภท</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >จำนวนเงิน</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >เวลา</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col">
                                    ยูสเซอร์ลูกค้า
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col"
                                    >ชื่อลูกค้า</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >บัญชีเว็บ</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >สถานะ</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col">
                                    ผู้ดำเนินการ
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col"
                                    >web</CTableHeaderCell
                                  >
                                  <CTableHeaderCell scope="col"
                                    >หมายเหตุ</CTableHeaderCell
                                  >
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                <CTableRow color="success">
                                  <CTableHeaderCell scope="row"
                                    >1.</CTableHeaderCell
                                  >
                                  <CTableDataCell>
                                    <div class="text-break"></div>
                                    <div
                                      class="d-inline-flex align-items-center"
                                    >
                                      <CIcon :icon="ic.cilBank" />
                                      <CBadge
                                        color="dark"
                                        class="ms-1 d-none d-md-block"
                                      >
                                        NetBank
                                      </CBadge>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CBadge color="success">ฝาก</CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <strong class="fst-italic">100.00</strong>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CRow>
                                      <p class="m-0">20:49</p>
                                    </CRow>
                                    <CRow>
                                      <small class="fw-lighter m-0"
                                        >02/05/2022</small
                                      >
                                    </CRow>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <a href="#">99dev100001</a>
                                    <br />
                                    <CBadge color="success" shape="rounded-pill"
                                      >ปกติ</CBadge
                                    >
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CRow>
                                      <CCol lg="2" class="p-0 m-0">
                                        <CImage
                                          fluid
                                          :src="imgBank.kbank"
                                          width="20"
                                          class="ms-1 me-1"
                                        />
                                      </CCol>
                                      <CCol lg="10" class="ps-1">
                                        <strong> 0213832833 </strong>
                                      </CCol>
                                    </CRow>
                                    <CRow>
                                      <CCol class="offset-lg-2 small ps-1">
                                        นายสมพงค์ คงขำ</CCol
                                      >
                                    </CRow>
                                  </CTableDataCell>
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
                                      <CCol class="offset-lg-2 small ps-1">
                                        Demo-name
                                      </CCol>
                                    </CRow>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <CBadge color="success">Success</CBadge>
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    <div
                                      class="d-inline-flex align-items-center"
                                    >
                                      <CAvatar
                                        :src="avatar"
                                        size="sm"
                                        status="success"
                                      />
                                      <CBadge
                                        color="dark"
                                        class="ms-1 d-none d-md-block"
                                      >
                                        แอดมินนัท
                                      </CBadge>
                                    </div>
                                  </CTableDataCell>
                                  <CTableDataCell>banpong999</CTableDataCell>
                                  <CTableDataCell></CTableDataCell>
                                </CTableRow>
                              </CTableBody>
                            </CTable>
                          </div>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol class="px-1">
                    <div class="text-center">
                      <CPagination size="sm" align="center">
                        <CPaginationItem href="#">ก่อนหน้า</CPaginationItem>
                        <CPaginationItem href="#">1</CPaginationItem>
                        <CPaginationItem href="#" active>2</CPaginationItem>
                        <CPaginationItem href="#">3</CPaginationItem>
                        <CPaginationItem href="#">ถัดไป</CPaginationItem>
                      </CPagination>
                    </div>
                  </CCol>
                </CRow>
              </CCardText>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 3"
            >
              <CCardText> ยังพร้อมใช้งาน </CCardText>
            </CTabPane>
          </CCardBody>
        </CCard>
      </CCardBody>
      <CCardFooter class="d-xl-none">
        <CCol class="text-end">
          <CButton color="success" class="ms-1 text-light" size="sm">
            <CIcon :icon="ic.cilSave" />
            บันทึก
          </CButton>
        </CCol>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { imgStatus as imgStatus } from '@/assets/images/status'
import { iconsSet as ic } from '@/assets/icons'

import avatar from '@/assets/images/avatars/owner/02.png'

export default {
  name: 'Transection',
  comments: {},
  data() {
    return {
      avatar: avatar,
      tabPaneActiveKey: 1,
      webSite: 0,
      memberID: 0,
      optShownBankAcct: [
        { value: 0, text: '0213832833 (ttb Auto)', selected: true },
        { value: 1, text: '4732291820 (ttb VIP1)', selected: false },
        { value: 2, text: '6678738476 (kbank VIP2)', selected: true },
        { value: 3, text: '7782736621 (ttb Junior Auto)', selected: false },
        { value: 4, text: '6674625517 (scb Auto)', selected: false },
        { value: 5, text: '5894882912 (scb VIP1)', selected: true },
      ],
    }
  },
  created() {
    ;(this.memberID = this.$route.params.memberID),
      (this.webSite = this.$route.params.webSite)
  },
  setup() {
    return {
      imgBank,
      imgStatus,
      ic,
    }
  },
}
</script>
