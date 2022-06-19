<template>
  <div>
    <CCard class="mb-2">
      <CCardBody class="p-2">
        <CContainer fluid class="ps-0 pe-0">
          <CRow class="mb-2">
            <CCol lg="8" class="mt-1">
              <CRow class="mb-1">
                <CCol lg="8">
                  <CCallout
                    color="success"
                    class="mt-0 mb-1 pt-1 pb-1 ps-2 pe-1"
                  >
                    <CRow>
                      <CCol xs="7">
                        <CRow>
                          <div>
                            <small class="text-muted">
                              <CImage
                                fluid
                                :src="imgBank.ttb"
                                width="20"
                                class="ms-1 me-1"
                              />
                              <small>0213832832 (ttb Auto)</small>
                            </small>
                          </div>
                        </CRow>
                        <CRow>
                          <CCol>
                            <CBadge color="danger" class="ms-1 mt-1 me-1">
                              <span class="fw-bold"> หยุดทำงาน </span>
                            </CBadge>
                            <CButton size="sm" class="p-0 btn-link text-reset">
                              <CIcon :icon="ic.cilLoopCircular" />
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol xs="5">
                        <div class="text-end me-2">
                          <small>
                            <small class="fw-lighter">รายการเดินบัญชี</small>
                            <small class="ms-1">
                              <CButton
                                color="secondary"
                                variant="outline"
                                size="sm"
                                @click="
                                  () => {
                                    mdStatement = true
                                  }
                                "
                              >
                                <CIcon :icon="ic.cilClearAll" />
                              </CButton>
                            </small>
                          </small>
                        </div>
                      </CCol>
                    </CRow>
                    <hr class="mt-1 mb-2" />
                    <CRow>
                      <CCol>
                        <div class="ms-1">
                          <h3>
                            <b>฿</b>
                          </h3>
                        </div>
                      </CCol>
                      <CCol>
                        <div class="text-end me-2">
                          <h3>
                            <b>445093.06</b>
                          </h3>
                        </div>
                      </CCol>
                    </CRow>
                  </CCallout>
                </CCol>
                <CCol lg="4">
                  <CRow>
                    <CCol>
                      <div class="d-grid gap-2">
                        <CButton
                          color="success"
                          class="text-light"
                          @click="mdDeposit = !mdDeposit"
                        >
                          <strong>
                            <CIcon :icon="ic.cilCash" size="sm" />
                            ฝาก
                          </strong>
                        </CButton>
                        <CButton
                          color="danger"
                          class="text-light"
                          @click="mdWithdraw = !mdWithdraw"
                        >
                          <strong>
                            <CIcon :icon="ic.cilExternalLink" size="sm" />
                            ถอน
                          </strong>
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow class="mb-1">
                <CCol lg="8">
                  <CRow>
                    <CCol md="7">
                      <div>
                        <label
                          for="searchDate"
                          class="form-label mb-0 text-muted"
                        >
                          <small>วันที่</small>
                        </label>
                        <CInputGroup>
                          <CFormInput
                            id="searchDate"
                            value="19/02/2022 - 19/02/2022"
                          />
                          <CInputGroupText id="i-searchDate">
                            <CIcon :icon="ic.cilCalendar" />
                          </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                    <CCol md="5">
                      <div>
                        <label
                          for="searchTime"
                          class="form-label mb-0 text-muted"
                        >
                          <small>เวลา</small>
                        </label>
                        <CInputGroup>
                          <CFormInput id="searchTime" value="00:00 - 23:59" />
                          <CInputGroupText id="i-searchTime">
                            <CIcon :icon="ic.cilClock" />
                          </CInputGroupText>
                        </CInputGroup>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol lg="4">
                  <div>
                    <label for="searchType" class="form-label mb-0 text-muted">
                      <small>ประเภท</small>
                    </label>
                    <select id="searchType" class="form-select">
                      <option selected>ทั้งหมด</option>
                      <option value="0">ฝาก - ถอน</option>
                      <option value="1">ฝาก</option>
                      <option value="2">ถอน</option>
                      <option value="3">ยกเลิก</option>
                      <option value="4">โยกเงิน</option>
                    </select>
                  </div>
                </CCol>
              </CRow>
            </CCol>
            <CCol lg="4" class="mt-1">
              <CRow class="mb-1">
                <CCol lg="10" class="px-1">
                  <CCollapse :visible="visibleSearch" class="mb-2">
                    <CCard class="mt-0">
                      <CCardBody>
                        <CCardTitle>
                          <p class="text-center text-decoration-underline lead">
                            ตัวกรองเพิ่มเติม
                          </p>
                        </CCardTitle>
                        <div class="container-fluid small">
                          <CRow>
                            <CCol>
                              <CFormCheck
                                id="flagDiff"
                                label="บิลเก่ากว่าเวลาสร้าง"
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol sm="12">
                              <CFormCheck id="flagAdmin" label="โดยแอดมิน" />
                            </CCol>
                            <CCol sm="12" class="mb-2">
                              <CMultiSelect
                                :options="optAdmin"
                                placeholder="เลือกแอดมิน"
                                select-all-label=""
                                search-no-results-label="ไม่มีข้อมูล"
                                select-all
                              />
                            </CCol>
                          </CRow>
                          <CRow>
                            <CCol sm="12">
                              <CFormCheck id="flagMember" label="โดยลูกค้า" />
                            </CCol>
                            <CCol sm="12" class="mb-2">
                              <CMultiSelect
                                :options="optAdmin"
                                placeholder="เลือกลูกค้า"
                                select-all-label=""
                                search-no-results-label="ไม่มีข้อมูล"
                                select-all
                              />
                            </CCol>
                          </CRow>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCollapse>
                  <div class="container-fluid small">
                    <CRow>
                      <CCol>
                        <div class="container-fluid text-center">
                          <CButton color="primary" variant="outline" size="sm">
                            <strong>
                              <CIcon :icon="ic.cilMagnifyingGlass" size="sm" />
                              ค้นหา
                            </strong>
                          </CButton>
                          <CButton
                            color="secondary"
                            variant="outline"
                            size="sm"
                          >
                            <strong>
                              <CIcon :icon="ic.cilReload" size="sm" />
                              เคลียร์
                            </strong>
                          </CButton>
                          <CButton
                            color="info"
                            variant="outline"
                            size="sm"
                            class="ms-2"
                            @click="visibleSearch = !visibleSearch"
                          >
                            <strong>
                              <CIcon :icon="ic.cilFilter" size="sm" />
                            </strong>
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                  </div>
                </CCol>
                <CCol lg="2" class="ps-0">
                  <div class="text-end">
                    <CButton color="secondary" variant="outline" size="sm">
                      <strong>
                        <CIcon :icon="ic.cilFullscreenExit" size="sm" />
                      </strong>
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
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
              รอดำเนินการ
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
              รายการล่าสุด
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CCardBody class="pt-1">
        <CTabPane
          role="tabpanel"
          aria-labelledby="home-tab"
          :visible="tabPaneActiveKey === 1"
        >
          <CCardText class="small mb-0">
            <CRow fluid>
              <CCol>
                <div class="float-end">
                  <div class="d-inline-flex align-items-center text-muted">
                    <span class="me-2 small">
                      <small><em>อัพเดทอัตโนมัติ</em></small>
                    </span>
                    <CFormSwitch id="formSwitchCheckChecked" checked />
                  </div>
                </div>
              </CCol>
            </CRow>
            <div class="table-responsive">
              <CTable hover class="mb-3">
                <CTableHead color="dark" class="fw-bold fst-italic">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ช่องทาง</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ประเภท</CTableHeaderCell>
                    <CTableHeaderCell scope="col">จำนวนเงิน</CTableHeaderCell>
                    <CTableHeaderCell scope="col">เวลา</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ตรวจสอบ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">จัดการ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      ยูสเซอร์ลูกค้า
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">ชื่อลูกค้า</CTableHeaderCell>
                    <CTableHeaderCell scope="col">บัญชีเว็บ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">web</CTableHeaderCell>
                    <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow color="success">
                    <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                    <CTableDataCell>
                      <div class="d-inline-flex align-items-center">
                        <CIcon :icon="ic.cilBank" />
                        <CBadge color="dark" class="ms-1 d-none d-md-block">
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
                        <small class="fw-lighter m-0">02/05/2022</small>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="warning"
                        variant="outline"
                        size="sm"
                        shape="rounded-pill"
                      >
                        <CIcon :icon="ic.cilCircle" size="sm" />
                        <br />
                        <small>เช็ค</small>
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButtonGroup role="group" size="sm">
                        <CButton color="success" variant="outline">
                          <CIcon :icon="ic.cilCheckAlt" size="sm" />
                          <br />
                          <small>อนุมัติ</small>
                        </CButton>
                        <CButton color="danger" variant="outline">
                          <CIcon :icon="ic.cilX" size="sm" />
                          <br />
                          <small>ปฏิเสธ</small>
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                    <CTableDataCell>
                      <a href="#">99dev100001</a>
                      <br />
                      <CBadge color="success" shape="rounded-pill">ปกติ</CBadge>
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
                        <CCol class="offset-lg-2 small ps-1"> Demo-name </CCol>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="warning">Pending</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>banpong888</CTableDataCell>
                    <CTableDataCell></CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </CCardText>
        </CTabPane>
        <CTabPane
          role="tabpanel"
          aria-labelledby="profile-tab"
          :visible="tabPaneActiveKey === 2"
        >
          <CCardText class="small mb-0">
            <CRow fluid>
              <CCol>
                <div class="float-end">
                  <div class="d-inline-flex align-items-center text-muted">
                    <span class="me-2 small">
                      <small><em>อัพเดทอัตโนมัติ</em></small>
                    </span>
                    <CFormSwitch id="formSwitchCheckChecked" checked />
                  </div>
                </div>
              </CCol>
            </CRow>
            <div class="table-responsive">
              <CTable hover class="mb-3">
                <CTableHead color="dark" class="fw-bold fst-italic">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ช่องทาง</CTableHeaderCell>
                    <CTableHeaderCell scope="col">ประเภท</CTableHeaderCell>
                    <CTableHeaderCell scope="col">จำนวนเงิน</CTableHeaderCell>
                    <CTableHeaderCell scope="col">เวลา</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      ยูสเซอร์ลูกค้า
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">ชื่อลูกค้า</CTableHeaderCell>
                    <CTableHeaderCell scope="col">บัญชีเว็บ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      ผู้ดำเนินการ
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">web</CTableHeaderCell>
                    <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow color="success">
                    <CTableHeaderCell scope="row">1.</CTableHeaderCell>
                    <CTableDataCell>
                      <div class="text-break"></div>
                      <div class="d-inline-flex align-items-center">
                        <CIcon :icon="ic.cilBank" />
                        <CBadge color="dark" class="ms-1 d-none d-md-block">
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
                        <small class="fw-lighter m-0">02/05/2022</small>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>
                      <a href="#">99dev100001</a>
                      <br />
                      <CBadge color="success" shape="rounded-pill">ปกติ</CBadge>
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
                        <CCol class="offset-lg-2 small ps-1"> Demo-name </CCol>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge color="success">Success</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div class="d-inline-flex align-items-center">
                        <CAvatar :src="avatar" size="sm" status="success" />
                        <CBadge color="dark" class="ms-1 d-none d-md-block">
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
        </CTabPane>

        <div class="text-center">
          <CPagination size="sm" align="end">
            <CPaginationItem href="#">ก่อนหน้า</CPaginationItem>
            <CPaginationItem href="#" active>1</CPaginationItem>
            <CPaginationItem href="#">2</CPaginationItem>
            <CPaginationItem href="#">3</CPaginationItem>
            <CPaginationItem href="#">ถัดไป</CPaginationItem>
          </CPagination>
        </div>
      </CCardBody>
    </CCard>
  </div>

  <!-- ----- -->
  <!-- รายการเดินบัญชี -->
  <!-- ------ -->
  <CModal
    size="xl"
    :visible="mdStatement"
    @close="
      () => {
        mdStatement = false
      }
    "
  >
    <CModalHeader class="pt-3 pb-2">
      <CModalTitle>
        รายการเดินบัญชี (0213832832)
        <CImage fluid :src="imgBank.ttb" width="20" class="ms-1 me-1" />
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="table-responsive">
        <CTable hover small>
          <CTableHead color="dark" class="fw-bold">
            <CTableRow>
              <CTableHeaderCell scope="col" class="text-center">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">เวลารายการ</CTableHeaderCell>
              <CTableHeaderCell scope="col">ประเภท</CTableHeaderCell>
              <CTableHeaderCell scope="col">จำนวนเงิน</CTableHeaderCell>
              <CTableHeaderCell scope="col">รายละเอียด</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow color="success">
              <CTableDataCell scope="row" class="text-center"
                >1.</CTableDataCell
              >
              <CTableDataCell>02/04/2022 23:07:14</CTableDataCell>
              <CTableDataCell>ฝาก</CTableDataCell>
              <CTableDataCell>500.00</CTableDataCell>
              <CTableDataCell>กสิกรไทย (KBANK) /X204046</CTableDataCell>
            </CTableRow>
            <CTableRow color="success">
              <CTableDataCell scope="row" class="text-center"
                >2.</CTableDataCell
              >
              <CTableDataCell>02/04/2022 23:09:31</CTableDataCell>
              <CTableDataCell>ฝาก</CTableDataCell>
              <CTableDataCell>4.00</CTableDataCell>
              <CTableDataCell>กรุงเทพ (BBL) /X502255</CTableDataCell>
            </CTableRow>
            <CTableRow color="danger">
              <CTableDataCell scope="row" class="text-center"
                >3.</CTableDataCell
              >
              <CTableDataCell>02/04/2022 23:21:34</CTableDataCell>
              <CTableDataCell>ถอน</CTableDataCell>
              <CTableDataCell>10.00</CTableDataCell>
              <CTableDataCell>
                รับโอนจาก SCB x7904 นาย วัชระพันธุ์ จันท
              </CTableDataCell>
            </CTableRow>
            <CTableRow color="success">
              <CTableDataCell scope="row" class="text-center"
                >4.</CTableDataCell
              >
              <CTableDataCell>02/04/2022 23:30:56</CTableDataCell>
              <CTableDataCell>ฝาก</CTableDataCell>
              <CTableDataCell>500.00</CTableDataCell>
              <CTableDataCell>กสิกรไทย (KBANK) /X204046</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </div>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- ฝากเงิน -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdDeposit"
    @close="
      () => {
        mdDeposit = false
      }
    "
  >
    <CModalHeader class="pt-2 pb-1">
      <CModalTitle class="fw-lighter">
        <strong><p class="h4 mb-0 mt-1">เพิ่มรายการฝาก</p></strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard class="border-success m-0 p-0">
        <CCardBody>
          <CCardText class="small">
            <form>
              <div class="mb-1">
                <label for="depositBank" class="form-label"> *บัญชีฝาก </label>
                <select
                  class="form-select form-select-sm"
                  aria-label="กรุณาเลือกบัญชีฝาก"
                  id="depositBank"
                >
                  <option value="0213832833" selected>
                    (ttb Auto) 0213832833
                  </option>
                  <option value="00928378472">(Reserve) 00928378472</option>
                  <option value="66536462819">(tttAPI) 66536462819</option>
                  <option value="0928837263">(Demo) 0928837263</option>
                </select>
              </div>
              <hr />
              <div class="mb-1">
                <label for="depositMemberID" class="form-label mb-1">
                  *ยูสเซอร์ลูกค้า
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label="กรุณาเลือกยูสเซอร์"
                  id="depositMemberID"
                >
                  <option value="99dev100001" selected>99dev100001</option>
                  <option value="99dev100002">99dev100002</option>
                  <option value="99dev100004">99dev100004</option>
                  <option value="99dev100009">99dev100009</option>
                </select>
                <div id="emailHelp" class="form-text mt-0 mb-2">
                  สามารถค้นหาด้วย: ยูส, เบอร์โทร, ชื่อ
                </div>
              </div>
              <div class="mb-1">
                <label for="depositDateTime" class="form-label mb-1">
                  *วันเวลาที่ทำรายการ
                </label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="depositDateTime"
                />
              </div>
              <div class="mb-1">
                <label for="depositAmount" class="form-label mb-1">
                  *ยอดเงิน
                </label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  id="depositAmount"
                />
              </div>
              <hr class="mb-2" />
              <div class="mb-1">
                <div class="form-floating">
                  <textarea
                    class="form-control form-control-sm"
                    placeholder="Leave a comment here"
                    id="floatingTextarea1"
                    style="height: 100px"
                  ></textarea>
                  <label for="floatingTextarea2">หมายเหตุ</label>
                </div>
              </div>
              <hr />
              <div class="text-end">
                <CButton color="success" class="ms-1 text-light">
                  <CIcon :icon="ic.cilCheckCircle" />
                  ตกลง
                </CButton>
                <CButton
                  color="danger text-light"
                  class="ms-1"
                  @click="
                    () => {
                      mdDeposit = false
                    }
                  "
                >
                  <CIcon :icon="ic.cilXCircle" />
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
  <!-- ถอนเงิน -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdWithdraw"
    @close="
      () => {
        mdWithdraw = false
      }
    "
  >
    <CModalHeader class="pt-2 pb-1">
      <CModalTitle class="fw-lighter">
        <strong><p class="h4 mb-0 mt-1">เพิ่มรายการถอน</p></strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard class="border-danger m-0 p-0">
        <CCardBody>
          <CCardText class="small">
            <form>
              <div class="mb-1">
                <label for="depositBank" class="form-label"> *บัญชีถอน </label>
                <select
                  class="form-select form-select-sm"
                  aria-label="กรุณาเลือกบัญชีฝาก"
                  id="depositBank"
                >
                  <option value="0213832833" selected>
                    (ttb Auto) 0213832833
                  </option>
                  <option value="00928378472">(Reserve) 00928378472</option>
                  <option value="66536462819">(tttAPI) 66536462819</option>
                  <option value="0928837263">(Demo) 0928837263</option>
                </select>
              </div>
              <hr />
              <div class="mb-1">
                <label for="depositMemberID" class="form-label mb-1">
                  *ยูสเซอร์ลูกค้า
                </label>
                <select
                  class="form-select form-select-sm"
                  aria-label="กรุณาเลือกยูสเซอร์"
                  id="depositMemberID"
                >
                  <option value="99dev100001" selected>99dev100001</option>
                  <option value="99dev100002">99dev100002</option>
                  <option value="99dev100004">99dev100004</option>
                  <option value="99dev100009">99dev100009</option>
                </select>
                <div id="emailHelp" class="form-text mt-0 mb-2">
                  สามารถค้นหาด้วย: ยูส, เบอร์โทร, ชื่อ
                </div>
              </div>
              <div class="mb-1">
                <label for="depositDateTime" class="form-label mb-1">
                  *วันเวลาที่ทำรายการ
                </label>
                <input
                  type="date"
                  class="form-control form-control-sm"
                  id="depositDateTime"
                />
              </div>
              <div class="mb-1">
                <label for="depositAmount" class="form-label mb-1">
                  *ยอดเงิน
                </label>
                <input
                  type="number"
                  class="form-control form-control-sm"
                  id="depositAmount"
                />
              </div>
              <hr class="mb-2" />
              <div class="mb-1">
                <div class="form-floating">
                  <textarea
                    class="form-control form-control-sm"
                    placeholder="Leave a comment here"
                    id="floatingTextarea1"
                    style="height: 100px"
                  ></textarea>
                  <label for="floatingTextarea2">หมายเหตุ</label>
                </div>
              </div>
              <hr />
              <div class="text-end">
                <CButton color="success" class="ms-1 text-light">
                  <CIcon :icon="ic.cilCheckCircle" />
                  ตกลง
                </CButton>
                <CButton
                  color="danger"
                  class="ms-1 text-light"
                  @click="
                    () => {
                      mdWithdraw = false
                    }
                  "
                >
                  <CIcon :icon="ic.cilXCircle" />
                  ปิด
                </CButton>
              </div>
            </form>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { CIcon } from '@coreui/icons-vue'
import { iconsSet as ic } from '@/assets/icons'

import avatar from '@/assets/images/avatars/owner/02.png'

export default {
  name: 'Transection',
  comments: {
    CIcon,
  },
  data() {
    return {
      demo: '',
      avatar: avatar,
      tabPaneActiveKey: 1,
      visibleSearch: false,
      visibleBank: true,
      mdStatement: false,
      mdDeposit: false,
      mdWithdraw: false,
      optAdmin: [
        { name: '99dev100001', value: 0, text: '99dev100001', selected: false },
        { name: '99dev100002', value: 1, text: '99dev100002', selected: false },
        { name: '99dev100003', value: 2, text: '99dev100003', selected: false },
        { name: '99dev100004', value: 3, text: '99dev100004', selected: false },
        { name: '99dev100008', value: 4, text: '99dev100008', selected: false },
        { name: '99dev100019', value: 5, text: '99dev100019', selected: false },
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
