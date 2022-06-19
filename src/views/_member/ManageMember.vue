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
                                  v-model="memberProfile.status"
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
                                  disabled
                                  v-model="memberProfile.web_id"
                                >
                                  <option value="0">กรุณาเลือก</option>
                                  <option value="629e381cb4839cabb5622da1">
                                    banpong888
                                  </option>
                                </select>
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cUsername" class="form-label mb-0">
                                  Username
                                </label>
                                <CInputGroup>
                                  <CInputGroupText id="basic-cUsername">
                                    <CIcon :icon="ic.cilShieldAlt" />
                                  </CInputGroupText>
                                  <CFormInput
                                    id="cUsername"
                                    disabled
                                    v-model="memberProfile.pd.username"
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
                                  v-model="memberProfile.name"
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
                                  v-model="memberProfile.surename"
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
                                    v-model="memberProfile.birthday_date"
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
                                  <CFormSelect
                                    size="sm"
                                    v-model="memberProfile.status_id"
                                  >
                                    <option value="">สามารถเลือกได้</option>
                                    <option
                                      v-for="option in optStatus"
                                      :key="option._id"
                                      :value="option.status"
                                    >
                                      {{ option.status_th }}
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
                                <CFormSelect
                                  size="sm"
                                  v-model="memberProfile.channel"
                                >
                                  <option value="">สามารถเลือกได้</option>
                                  <option
                                    v-for="option in optChannel"
                                    :key="option._id"
                                    :value="option.channel"
                                  >
                                    {{ option.channel }}
                                  </option>
                                </CFormSelect>
                              </div>
                            </CCol>
                            <CCol md="6">
                              <div>
                                <label for="cSpecial" class="form-label mb-0">
                                  สิทธิพิเศษ
                                </label>
                                <CInputGroup>
                                  <CInputGroupText
                                    id="basic-cStatus"
                                    class="p-2"
                                  >
                                    <CImage
                                      fluid
                                      :src="
                                        require('../../assets/images/privilege/vip-card.png')
                                      "
                                      width="22"
                                    />
                                  </CInputGroupText>
                                  <CFormSelect
                                    size="sm"
                                    v-model="memberProfile.privilege"
                                  >
                                    <option value="">สามารถเลือกได้</option>
                                    <option
                                      v-for="option in optPrivilege"
                                      :key="option._id"
                                      :value="option.privilege_name"
                                    >
                                      {{ option.privilege_name }}
                                    </option>
                                  </CFormSelect>
                                </CInputGroup>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
                            <CCol md="6">
                              <div>
                                <label for="cRegisIP" class="form-label mb-0">
                                  ยูสเซอร์แนะนำ
                                </label>
                                <CFormInput
                                  type="text"
                                  id="cRegisIP"
                                  v-model="memberProfile.user_reference"
                                />
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
                                  disabled
                                >
                                  <option selected>ยังไม่พร้อมใช้งาน</option>
                                </select>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
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
                                    required
                                    v-model="memberProfile.tel"
                                  />
                                </CInputGroup>
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
                                  v-model="memberProfile.register_ip"
                                />
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
                            <CCol>
                              <div>
                                <label for="cNote" class="form-label mb-0">
                                  หมายเหตุ
                                </label>
                                <CFormTextarea
                                  id="cNote"
                                  rows="2"
                                  text="Must be 8-20 words long."
                                  v-model="memberProfile.note"
                                ></CFormTextarea>
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
                                    :type="memberProfile.pinType"
                                    id="cPin"
                                    placeholder="1234"
                                    aria-label="PIN"
                                    aria-describedby="basic-cPin"
                                    v-model="memberProfile.pin"
                                  />
                                  <CButton
                                    type="button"
                                    color="secondary"
                                    variant="outline"
                                    @click="showPwd"
                                  >
                                    <CIcon :icon="ic.cilLockLocked" />
                                  </CButton>
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
                                  disabled
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
                                    placeholder="http://xxxx.com/login/06123456xx"
                                    aria-label="URL"
                                    aria-describedby="basic-cUrl"
                                    class="text-muted border-secondary"
                                    v-model="memberProfile.web_url"
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
                                    v-model="memberProfile.mobile_number"
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
                                    placeholder="cus.id.xxx"
                                    aria-label="cus.id.xxx"
                                    aria-describedby="basic-cLineID"
                                    v-model="memberProfile.line_id"
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
                                    v-model="memberProfile.email"
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
                              @click="getMemberProfile"
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
                                      >-- ฿</span
                                    >
                                  </li>
                                </ul>
                              </CCol>
                            </CRow>
                            <hr class="mt-1 mb-2" />
                            <CRow>
                              <CCol>
                                <ul class="list-group mb-1">
                                  <!-- <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    wallet:
                                    <span class="badge bg-success rounded-pill"
                                      >600.29 ฿</span
                                    >
                                  </li> -->
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    เครดิต:
                                    <span class="badge bg-success rounded-pill">
                                      {{ memberProfile.pd.credit }}
                                      {{ memberProfile.pd.currency }}
                                    </span>
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
                                      -- ยูส
                                    </span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ค่าคอมฯ ถอนได้:
                                    <span class="badge bg-dark rounded-pill"
                                      >-- ฿</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ถอนรวม:
                                    <span class="badge bg-dark rounded-pill"
                                      >-- ฿</span
                                    >
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    ถอนล่าสุดเมื่อ:
                                    <span> --/--/---- </span>
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    จำนวน:
                                    <span class="badge bg-dark rounded-pill"
                                      >-- ฿</span
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
                                      {{
                                        memberProfile.financial
                                          .deposit_first_time_amount
                                      }}
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ฝากรวม:
                                    <span class="badge bg-success rounded-pill">
                                      {{
                                        memberProfile.financial.deposit_count
                                      }}
                                    </span>
                                    ครั้ง,
                                    <span class="badge bg-success rounded-pill">
                                      {{
                                        memberProfile.financial
                                          .deposit_total_amount
                                      }}
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ถอนรวม:
                                    <span class="badge bg-danger rounded-pill">
                                      {{
                                        memberProfile.financial.withdraw_count
                                      }}
                                    </span>
                                    ครั้ง,
                                    <span class="badge bg-danger rounded-pill">
                                      {{
                                        memberProfile.financial
                                          .withdraw_total_amount
                                      }}
                                    </span>
                                    ฿
                                  </li>
                                  <li class="pb-1">
                                    ดุล:
                                    <span class="badge bg-warning rounded-pill">
                                      {{
                                        (
                                          memberProfile.financial
                                            .withdraw_total_amount -
                                          memberProfile.financial
                                            .deposit_total_amount
                                        ).toFixed(2)
                                      }}
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
                                    <p class="mb-0">
                                      {{ memberProfile.create_date }}
                                    </p>
                                    <small class="text-muted"
                                      >(-- เดือนที่แล้ว)</small
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
                                  <option value="ttb">
                                    <img :src="imgBank.kbank" />
                                    ทหารไทยธนชาต
                                  </option>
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
                                  v-model="
                                    memberProfile.banking_account.bank_acct
                                  "
                                />
                              </CInputGroup>
                            </div>
                          </CCol>
                        </CRow>
                        <CRow class="mb-2">
                          <CCol>
                            <div>
                              <label for="cBankAcct" class="form-label mb-0">
                                ชื่อบัญชีลูกค้า
                              </label>
                              <CInputGroup>
                                <CInputGroupText id="basic-cBankAcct">
                                  <CIcon :icon="ic.cilContact" />
                                </CInputGroupText>
                                <CFormInput
                                  id="cBankAcct"
                                  aria-label="ชื่อบัญชีลูกค้า"
                                  aria-describedby="basic-cBankAcct"
                                  v-model="
                                    memberProfile.banking_account.bank_acct_name
                                  "
                                  disabled
                                />
                              </CInputGroup>
                            </div>
                          </CCol>
                        </CRow>
                        <!-- <CRow class="mb-2">
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
                        </CRow> -->
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
            <!-- ประวัติการฝากถอน -->
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
            <!-- การเชิญชวน -->
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 3"
            >
              <CCardText> ยังไม่พร้อมใช้งาน </CCardText>
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
import avatar from '@/assets/images/avatars/owner/02.png'

import moment from 'moment'

const apiUrl = require('./../../constants/api-url-list')
const headers = {
  Authorization: 'Bearer ' + apiUrl.token,
}

import { CIcon } from '@coreui/icons-vue'
import {
  cilShieldAlt,
  cilSave,
  cilBan,
  cilPhone,
  cilBirthdayCake,
  cilLockLocked,
  cilCopy,
  cibLine,
  cilLink,
  cilEnvelopeOpen,
  cilReload,
  cilCreditCard,
  cilCalendar,
  cilClock,
  cilMagnifyingGlass,
  cilBank,
  cilContact,
} from '@coreui/icons'

export default {
  name: 'ManageMember',
  comments: { CIcon },
  data() {
    return {
      avatar: avatar,
      tabPaneActiveKey: 1,
      webSite: 0,
      memberID: 0,
      memberProfile: {
        status: false,
        status_id: '',
        username: '',
        line_id: '',
        tel: '',
        web_id: '',
        web_name: '',
        web_url: '',
        name: '',
        surename: '',
        birthday_date: '',
        pin: '',
        pinType: 'password',
        register_ip: '',
        user_reference: '',
        privilege: '',
        email: '',
        mobile_number: '',
        channel: '',
        channel_id: '',
        note: '',
        banking_account: {
          bank_id: '',
          bank_acct: '',
          bank_acct_name: '',
          bank_name: '',
          bank_name_th: '',
          bank_code: '',
          bank_status: '',
        },
        financial: {
          deposit_first_time_amount: '',
          deposit_first_time: '',
          deposit_count: '',
          deposit_total_amount: '',
          withdraw_first_time: '',
          withdraw_count: '',
          withdraw_total_amount: '',
        },
        pd: {
          username: '',
          credit: '',
          currency: '',
          hdp: '',
          mixParlay: '',
          mixStep: '',
          casino: '',
          slot: '',
          card: '',
          lotto: '',
          keno: '',
          trade: '',
          poker: '',
        },
        create_date: '',
        update_date: '',
        update_by: '',
      },
      optChannel: [],
      optPrivilege: [],
      optStatus: [],
      optShownBankAcct: [
        { value: 0, text: '0213832833 (ttb Auto)', selected: true },
        { value: 1, text: '4732291820 (ttb VIP1)', selected: false },
        { value: 2, text: '6678738476 (kbank VIP2)', selected: true },
        { value: 3, text: '7782736621 (ttb Junior Auto)', selected: false },
        { value: 4, text: '6674625517 (scb Auto)', selected: false },
        { value: 5, text: '5894882912 (scb VIP1)', selected: true },
      ],
      ic: {
        cilShieldAlt,
        cilSave,
        cilBan,
        cilPhone,
        cilBirthdayCake,
        cilLockLocked,
        cilCopy,
        cibLine,
        cilLink,
        cilEnvelopeOpen,
        cilReload,
        cilCreditCard,
        cilCalendar,
        cilClock,
        cilMagnifyingGlass,
        cilBank,
        cilContact,
      },
    }
  },
  methods: {
    async getMemberProfile() {
      await this.$http
        .post(
          apiUrl.member.GetMemberProfile,
          {
            agent_id: '629e381cb4839cabb5622da1',
            user_id: this.memberID,
          },
          { headers },
        )
        .then((response) => {
          console.log(response)
          if (response.data.status == 200) {
            let mem = response.data.result.profile_mem
            if (mem.status.toString().toLowerCase() == 'active') {
              this.memberProfile.status = true
            } else {
              this.memberProfile.status = false
            }
            this.memberProfile.status_id = mem.status
            this.memberProfile.username = mem.username
            this.memberProfile.line_id = mem.line_id
            this.memberProfile.tel = mem.tel
            this.memberProfile.web_id = mem.web_id
            this.memberProfile.web_name = mem.web_name
            this.memberProfile.web_url = mem.url + '/login/' + mem.tel
            this.memberProfile.name = mem.name
            this.memberProfile.surename = mem.surename
            this.memberProfile.birthday_date = mem.birthday_date
            this.memberProfile.pin = mem.pin
            this.memberProfile.register_ip = mem.register_ip
            this.memberProfile.user_reference = mem.user_reference
            this.memberProfile.privilege = mem.privilege
            this.memberProfile.email = mem.email
            this.memberProfile.mobile_number = mem.mobile_number
            this.memberProfile.channel = mem.channel
            this.memberProfile.channel_id = mem.channel_id
            this.memberProfile.note = mem.note
            this.memberProfile.banking_account.bank_id =
              mem.banking_account.bank_id
            this.memberProfile.banking_account.bank_acct =
              mem.banking_account.bank_acct
            this.memberProfile.banking_account.bank_acct_name =
              mem.banking_account.bank_acct_name
            this.memberProfile.banking_account.bank_name =
              mem.banking_account.bank_name
            this.memberProfile.banking_account.bank_name_th =
              mem.banking_account.bank_name_th
            this.memberProfile.banking_account.bank_code =
              mem.banking_account.bank_code
            this.memberProfile.banking_account.bank_status =
              mem.banking_account.bank_status
            this.memberProfile.financial.deposit_first_time_amount =
              mem.financial.deposit_first_time_amount.toFixed(2)
            this.memberProfile.financial.deposit_first_time =
              mem.financial.deposit_first_time
            this.memberProfile.financial.deposit_count =
              mem.financial.deposit_count
            this.memberProfile.financial.deposit_total_amount =
              mem.financial.deposit_total_amount.toFixed(2)
            this.memberProfile.financial.withdraw_first_time =
              mem.financial.withdraw_first_time
            this.memberProfile.financial.withdraw_count =
              mem.financial.withdraw_count
            this.memberProfile.financial.withdraw_total_amount =
              mem.financial.withdraw_total_amount.toFixed(2)
            this.memberProfile.pd.username = mem.pd.username
            this.memberProfile.pd.credit = mem.pd.credit
            this.memberProfile.pd.currency = mem.pd.currency
            this.memberProfile.pd.hdp = mem.pd.hdp
            this.memberProfile.pd.mixParlay = mem.pd.mixParlay
            this.memberProfile.pd.mixStep = mem.pd.mixStep
            this.memberProfile.pd.casino = mem.pd.casino
            this.memberProfile.pd.slot = mem.pd.slot
            this.memberProfile.pd.card = mem.pd.card
            this.memberProfile.pd.lotto = mem.pd.lotto
            this.memberProfile.pd.keno = mem.pd.keno
            this.memberProfile.pd.trade = mem.pd.trade
            this.memberProfile.pd.poker = mem.pd.poker
            this.memberProfile.create_date = this.dateTime(mem.create_date)
            this.memberProfile.update_date = mem.update_date
            this.memberProfile.update_by = mem.update_by
          } else {
            console.log(
              'callAPI - ' +
                apiUrl.member.GetMemberProfile +
                ' >>> ' +
                response.data.status +
                ', ' +
                response.data.message,
            )
            // this.closeWindow()
          }
        })
        .catch((error) => {
          console.log(
            'callAPI (catch) - ' +
              apiUrl.member.GetMemberProfile +
              ' >>> ' +
              error,
          )
        })
    },
    async getConfChannel() {
      await this.$http
        .post(apiUrl.conf.GetChannel, {}, { headers })
        .then((response) => {
          console.log(response)
          if (response.data.status == 200) {
            this.optChannel = response.data.channel
            console.log(this.optChannel)
          } else {
            console.log(
              'callAPI - ' +
                apiUrl.conf.GetChannel +
                ' >>> ' +
                response.data.status +
                ', ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log(
            'callAPI (catch) - ' + apiUrl.conf.GetChannel + ' >>> ' + error,
          )
        })
    },
    async getConfPrivilege() {
      await this.$http
        .post(apiUrl.conf.GetPrivilege, {}, { headers })
        .then((response) => {
          console.log(response)
          if (response.data.status == 200) {
            this.optPrivilege = response.data.privilege
            console.log(this.optPrivilege)
          } else {
            console.log(
              'callAPI - ' +
                apiUrl.conf.GetPrivilege +
                ' >>> ' +
                response.data.status +
                ', ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log(
            'callAPI (catch) - ' + apiUrl.conf.GetPrivilege + ' >>> ' + error,
          )
        })
    },
    async getConfStatus() {
      await this.$http
        .post(apiUrl.conf.GetStatus, {}, { headers })
        .then((response) => {
          console.log(response)
          if (response.data.status == 200) {
            this.optStatus = response.data.result_status
            console.log(this.optStatus)
          } else {
            console.log(
              'callAPI - ' +
                apiUrl.conf.GetStatus +
                ' >>> ' +
                response.data.status +
                ', ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log(
            'callAPI (catch) - ' + apiUrl.conf.GetStatus + ' >>> ' + error,
          )
        })
    },
    showPwd() {
      if (this.memberProfile.pinType == 'password') {
        this.memberProfile.pinType = 'text'
      } else {
        this.memberProfile.pinType = 'password'
      }
    },
    dateTime(value) {
      var myDate = new Date(value)
      return moment(myDate).format('DD/MM/YYYY hh:mm:ss')
    },
    closeWindow() {
      window.close()
    },
  },
  mounted() {
    this.getConfChannel()
    this.getConfStatus()
    this.getConfPrivilege()
    this.getMemberProfile()
  },
  created() {
    ;(this.memberID = this.$route.params.memberID),
      (this.webSite = this.$route.params.webSite)
  },
  setup() {
    return {
      imgBank,
      imgStatus,
    }
  },
}
</script>
