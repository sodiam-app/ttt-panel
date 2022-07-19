<template>
  <div v-if="visiblePage">
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
                  color="dark"
                  class="ms-1 text-light"
                  size="sm"
                  v-if="tabPaneActiveKey === 1"
                  @click="navigateTo('/member/create')"
                >
                  <CIcon :icon="ic.cilUserPlus" />
                  สร้าง
                </CButton>
                <CButton
                  color="success"
                  class="ms-1 text-light"
                  size="sm"
                  v-if="tabPaneActiveKey === 1"
                  @click.prevent="updateMember()"
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
                    <CCard class="border-secondary p-0 mb-1">
                      <CCardHeader>
                        <CRow>
                          <CCol> ข้อมูลการเงิน </CCol>
                          <CCol class="text-end">
                            <CButton
                              color="info"
                              class="ms-1 text-light"
                              size="sm"
                              @click="getMemberProfile(webAgentID, memberID)"
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
                                    แนะนำเพื่อน
                                  </li>
                                  <li
                                    class="list-group-item d-flex justify-content-between align-items-center"
                                  >
                                    จำนวน:
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
                                    จำนวนเงิน:
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
                                  <CCol xs="4" class="pe-1 text-end">
                                    สมัครเมื่อ:
                                  </CCol>
                                  <CCol xs="8" class="ps-1">
                                    <p class="mb-0">
                                      {{ memberProfile.create_date }}
                                    </p>
                                    <small class="text-muted">
                                      (<timeago
                                        auto-update
                                        :datetime="
                                          memberProfile.create_date_datetime_type
                                        "
                                      />)
                                    </small>
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
                              <CInputGroup class="has-validation">
                                <CInputGroupText
                                  id="basic-cBanking"
                                  class="p-2"
                                >
                                  <CImage
                                    fluid
                                    :src="memberProfile.bank_img"
                                    width="22"
                                  />
                                </CInputGroupText>
                                <CFormSelect
                                  size="sm"
                                  v-model="
                                    memberProfile.banking_account.bank_id
                                  "
                                  @change="onchgBanking($event.target.value)"
                                  feedbackInvalid="กรุณาเลือกข้อมูลธนาคาร"
                                  :invalid="
                                    v$.memberProfile.banking_account.bank_id
                                      .$error
                                  "
                                  @input="
                                    v$.memberProfile.banking_account.bank_id.$touch()
                                  "
                                  @blur="
                                    v$.memberProfile.banking_account.bank_id.$touch()
                                  "
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.banking_account.bank_id
                                        .$error,
                                    'is-valid':
                                      !v$.memberProfile.banking_account.bank_id
                                        .$error && validatedCreate,
                                  }"
                                >
                                  <option value="" disabled>
                                    สามารถเลือกได้
                                  </option>
                                  <option
                                    v-for="option in optAllBank"
                                    :key="option._id"
                                    :value="option._id"
                                  >
                                    {{ option.banknameth }}
                                  </option>
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
                              <CInputGroup class="has-validation">
                                <CInputGroupText>
                                  <CIcon :icon="ic.cilCreditCard" />
                                </CInputGroupText>
                                <CFormInput
                                  id="cBankAcct"
                                  aria-label="บัญชีลูกค้า"
                                  v-model="
                                    memberProfile.banking_account.bank_acct
                                  "
                                  feedbackInvalid="กรุณากรอกข้อมูลเลขที่บัญชีลูกค้า"
                                  :invalid="
                                    v$.memberProfile.banking_account.bank_acct
                                      .$error
                                  "
                                  @input="
                                    v$.memberProfile.banking_account.bank_acct.$touch()
                                  "
                                  @blur="
                                    v$.memberProfile.banking_account.bank_acct.$touch()
                                  "
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.banking_account.bank_acct
                                        .$error,
                                    'is-valid':
                                      !v$.memberProfile.banking_account
                                        .bank_acct.$error && validatedCreate,
                                  }"
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
                                disabled
                              />
                            </div>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  </CCol>
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
                              disabled
                            >
                              <CIcon :icon="ic.cilBan" />
                              แบลคลิส
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
                                  @change="onchgStatusSwich"
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
                                  feedbackInvalid="กรุณากรอกข้อมูลชื่อลูกค้า"
                                  :invalid="v$.memberProfile.name.$error"
                                  @input="v$.memberProfile.name.$touch()"
                                  @blur="v$.memberProfile.name.$touch()"
                                  :class="{
                                    'is-invalid': v$.memberProfile.name.$error,
                                    'is-valid':
                                      !v$.memberProfile.name.$error &&
                                      validatedCreate,
                                  }"
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
                                  feedbackInvalid="กรุณากรอกข้อมูลนามสกุลลูกค้า"
                                  :invalid="v$.memberProfile.surename.$error"
                                  @input="v$.memberProfile.surename.$touch()"
                                  @blur="v$.memberProfile.surename.$touch()"
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.surename.$error,
                                    'is-valid':
                                      !v$.memberProfile.surename.$error &&
                                      validatedCreate,
                                  }"
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
                                <CInputGroup class="has-validation">
                                  <CInputGroupText class="px-2">
                                    <CImage
                                      fluid
                                      :src="memberProfile.status_img"
                                      width="22"
                                    />
                                  </CInputGroupText>
                                  <CFormSelect
                                    size="sm"
                                    v-model="memberProfile.status_id"
                                    @change="onchgStatus($event.target.value)"
                                    feedbackInvalid="กรุณาเลือกสถานะลูกค้า"
                                    :invalid="v$.memberProfile.status_id.$error"
                                    @input="v$.memberProfile.status_id.$touch()"
                                    @blur="v$.memberProfile.status_id.$touch()"
                                    :class="{
                                      'is-invalid':
                                        v$.memberProfile.status_id.$error,
                                      'is-valid':
                                        !v$.memberProfile.status_id.$error &&
                                        validatedCreate,
                                    }"
                                  >
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
                                  feedbackInvalid="กรุณาเลือกช่องทางการสมัครให้ถูกต้อง"
                                  :invalid="v$.memberProfile.channel.$error"
                                  @input="v$.memberProfile.channel.$touch()"
                                  @blur="v$.memberProfile.channel.$touch()"
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.channel.$error,
                                    'is-valid':
                                      !v$.memberProfile.channel.$error &&
                                      validatedCreate,
                                  }"
                                >
                                  <option value="">สามารถเลือกได้</option>
                                  <option
                                    v-for="option in optChannel"
                                    :key="option._id"
                                    :value="option.channel_id"
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
                                <CInputGroup class="has-validation">
                                  <CInputGroupText class="px-2">
                                    <CImage
                                      fluid
                                      :src="memberProfile.privilege_img"
                                      width="22"
                                    />
                                  </CInputGroupText>
                                  <CFormSelect
                                    size="sm"
                                    v-model="memberProfile.privilege"
                                    @change="
                                      onchgPrivilege($event.target.value)
                                    "
                                    feedbackInvalid="กรุณาเลือกสิทธิพิเศษ"
                                    :invalid="
                                      v$.memberProfile.privilege_id.$error
                                    "
                                    @input="
                                      v$.memberProfile.privilege_id.$touch()
                                    "
                                    @blur="
                                      v$.memberProfile.privilege_id.$touch()
                                    "
                                    :class="{
                                      'is-invalid':
                                        v$.memberProfile.privilege_id.$error,
                                      'is-valid':
                                        !v$.memberProfile.privilege_id.$error &&
                                        validatedCreate,
                                    }"
                                  >
                                    <option
                                      v-for="option in optPrivilege"
                                      :key="option._id"
                                      :value="option.privilege_id"
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
                                  feedbackInvalid="กรุณากรอกยูสเซอร์แนะนำให้ถูกต้อง"
                                  :invalid="
                                    v$.memberProfile.user_reference.$error
                                  "
                                  @input="
                                    v$.memberProfile.user_reference.$touch()
                                  "
                                  @blur="
                                    v$.memberProfile.user_reference.$touch()
                                  "
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.user_reference.$error,
                                    'is-valid':
                                      !v$.memberProfile.user_reference.$error &&
                                      validatedCreate,
                                  }"
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
                                <CInputGroup class="has-validation">
                                  <CInputGroupText>
                                    <CIcon :icon="ic.cilPhone" />
                                  </CInputGroupText>
                                  <CFormInput
                                    id="cPhone"
                                    placeholder="06123456xx"
                                    aria-label="เบอร์โทรลูกค้า"
                                    aria-describedby="basic-cPhone"
                                    required
                                    v-model="memberProfile.tel"
                                    feedbackInvalid="กรุณากรอกข้อมูลเบอร์โทรลูกค้าให้ถูกต้อง"
                                    :invalid="v$.memberProfile.tel.$error"
                                    @input="v$.memberProfile.tel.$touch()"
                                    @blur="v$.memberProfile.tel.$touch()"
                                    :class="{
                                      'is-invalid': v$.memberProfile.tel.$error,
                                      'is-valid':
                                        !v$.memberProfile.tel.$error &&
                                        validatedCreate,
                                    }"
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
                                  v-model="memberProfile.register_ip"
                                  readonly
                                  feedbackInvalid="ไม่สามารถระบุ IP Address ได้"
                                  :invalid="v$.memberProfile.register_ip.$error"
                                  @input="v$.memberProfile.register_ip.$touch()"
                                  @blur="v$.memberProfile.register_ip.$touch()"
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.register_ip.$error,
                                    'is-valid':
                                      !v$.memberProfile.register_ip.$error &&
                                      validatedCreate,
                                  }"
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
                                  feedbackInvalid=""
                                  :invalid="v$.memberProfile.remark.$error"
                                  @input="v$.memberProfile.remark.$touch()"
                                  @blur="v$.memberProfile.remark.$touch()"
                                  :class="{
                                    'is-invalid':
                                      v$.memberProfile.remark.$error,
                                    'is-valid':
                                      !v$.memberProfile.remark.$error &&
                                      validatedCreate,
                                  }"
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
                                <CInputGroup class="has-validation">
                                  <CFormInput
                                    :type="memberProfile.pinType"
                                    id="cPin"
                                    placeholder="1234"
                                    aria-label="PIN"
                                    aria-describedby="basic-cPin"
                                    v-model="memberProfile.pin"
                                    feedbackInvalid="กรุณากรอกข้อมูล PIN จำนวน 4 หลัก"
                                    :invalid="v$.memberProfile.pin.$error"
                                    @input="v$.memberProfile.pin.$touch()"
                                    @blur="v$.memberProfile.pin.$touch()"
                                    :class="{
                                      'is-invalid': v$.memberProfile.pin.$error,
                                      'is-valid':
                                        !v$.memberProfile.pin.$error &&
                                        validatedCreate,
                                    }"
                                  />
                                  <CButton
                                    type="button"
                                    color="secondary"
                                    variant="outline"
                                    @mousedown="showPwd"
                                    @mouseup="showPwd"
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
                                    aria-label="URL"
                                    aria-describedby="basic-cUrl"
                                    class="text-muted border-secondary"
                                    v-model="memberProfile.web_url"
                                    readonly
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
                                <CInputGroup class="has-validation">
                                  <CInputGroupText id="basic-cPhone">
                                    <CIcon :icon="ic.cilPhone" />
                                  </CInputGroupText>
                                  <CFormInput
                                    id="cPhone"
                                    placeholder="e.g. 0992909910"
                                    v-model="memberProfile.mobile_number"
                                    feedbackInvalid="กรุณากรอกข้อมูลเบอร์ให้ถูกต้อง"
                                    :invalid="
                                      v$.memberProfile.mobile_number.$error
                                    "
                                    @input="
                                      v$.memberProfile.mobile_number.$touch()
                                    "
                                    @blur="
                                      v$.memberProfile.mobile_number.$touch()
                                    "
                                    :class="{
                                      'is-invalid':
                                        v$.memberProfile.mobile_number.$error,
                                      'is-valid':
                                        !v$.memberProfile.mobile_number
                                          .$error && validatedCreate,
                                    }"
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
                                <div class="d-flex">
                                  <div class="flex-fill">
                                    <CInputGroup class="has-validation">
                                      <CInputGroupText>
                                        <CIcon :icon="ic.cibLine" />
                                      </CInputGroupText>
                                      <CFormInput
                                        id="cLineID"
                                        placeholder="e.g. cus.id.xxx"
                                        v-model="memberProfile.line_id"
                                        feedbackInvalid="กรุณากรอกข้อมูลให้ถูกต้อง"
                                        :invalid="
                                          v$.memberProfile.line_id.$error
                                        "
                                        @input="
                                          v$.memberProfile.line_id.$touch()
                                        "
                                        @blur="
                                          v$.memberProfile.line_id.$touch()
                                        "
                                        :class="{
                                          'is-invalid':
                                            v$.memberProfile.line_id.$error,
                                          'is-valid':
                                            !v$.memberProfile.line_id.$error &&
                                            validatedCreate,
                                        }"
                                      />
                                      <!-- <CInputGroupText id="basic-LinkLineID">
                                    <CIcon :icon="ic.cilLink" />
                                  </CInputGroupText> -->
                                    </CInputGroup>
                                  </div>
                                  <div class="flex-fill ms-1">
                                    <CButton color="secondary">
                                      <CIcon :icon="ic.cilLink" />
                                    </CButton>
                                  </div>
                                </div>
                              </div>
                            </CCol>
                          </CRow>
                          <CRow class="mb-2">
                            <CCol>
                              <div>
                                <label for="cEmail" class="form-label mb-0">
                                  Email
                                </label>
                                <CInputGroup class="has-validation">
                                  <CInputGroupText id="basic-cEmail">
                                    <CIcon :icon="ic.cilEnvelopeOpen" />
                                  </CInputGroupText>
                                  <CFormInput
                                    id="cEmail"
                                    placeholder="ตัวอย่าง : email@tttmail.com"
                                    aria-label="อีเมลลูกค้า"
                                    aria-describedby="basic-cEmail"
                                    v-model="memberProfile.email"
                                    feedbackInvalid="กรุณากรอกข้อมูลอีเมลให้ถูกต้อง ตัวอย่าง: panel@tttmail.com"
                                    :invalid="v$.memberProfile.email.$error"
                                    @input="v$.memberProfile.email.$touch()"
                                    @blur="v$.memberProfile.email.$touch()"
                                    :class="{
                                      'is-invalid':
                                        v$.memberProfile.email.$error,
                                      'is-valid':
                                        !v$.memberProfile.email.$error &&
                                        validatedCreate,
                                    }"
                                  />
                                </CInputGroup>
                              </div>
                            </CCol>
                          </CRow>
                        </CCardText>
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
              <CCardText v-if="true"> ยังไม่พร้อมใช้งาน </CCardText>
              <CCardText v-else>
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
  <div v-else>
    <CAlert color="danger" class="text-center">
      <CAlertHeading>
        <CIcon size="xxl" :icon="ic.cilWarning" />
        เกิดข้อผิดพลาด
      </CAlertHeading>
      <p>ไม่พบข้อมูลที่ท่านกำลังดำเนินการในระบบ</p>
      <hr />
      <p class="small mb-0 fw-lighter">
        กรุณาติดต่อผู้ดูแลระบบ หรือดำเนินการทำรายการนี้ใหม่อีกครั้งภายหลัง
      </p>
    </CAlert>
  </div>

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
import avatar from '@/assets/images/avatars/owner/02.png'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import {
  required,
  numeric,
  email,
  minLength,
  maxLength,
} from '@vuelidate/validators'
import { validateAlphabet, validateLineID } from '../../validations/validation'

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
  cilUserPlus,
  cilThumbUp,
  cilThumbDown,
  cilWarning,
} from '@coreui/icons'
import { mapActions } from 'vuex'

export default {
  name: 'ManageMember',
  comments: { CIcon },
  data() {
    return {
      toasts: [],
      visiblePage: true,

      avatar: avatar,
      tabPaneActiveKey: 1,

      webSite: '',
      webAgentID: 0,

      memberID: 0,
      memberProfile: {
        _id: '',
        status: false,
        status_id: '',
        status_img: '',
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
        privilege_img: '',
        email: '',
        mobile_number: '',
        channel: '',
        note: '',
        bank_img: '',
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
        create_date_datetime_type: new Date(),
        update_date: '',
        update_by: '',
      },
      optWebAgent: [],
      optChannel: [],
      optPrivilege: [],
      optStatus: [],
      optAllBank: [],
      // optShownBankAcct: [],

      // validations
      validatedCreate: false,

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
        cilUserPlus,
        cilThumbUp,
        cilThumbDown,
        cilWarning,
      },
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
    navigateTo(route) {
      // navigateToNewTab('/member/list/99dev/' + member._id)
      this.$router.push(route)
    },
    createToast(_color, _title, _content) {
      this.toasts.push({
        title: _title,
        content: _content,
        color: _color,
      })
    },

    // api
    async getWebPrefixList() {
      await this.$http
        .post('panel/getprefix', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optWebAgent = response.data.result_perfix
            console.log(this.optWebAgent)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            // open elements after get member success
            this.visiblePage = false
            console.log(
              'call api - panel/getprefix : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          this.visiblePage = false
          console.log('call api - panel/getprefix : error' + error)
        })
    },
    async getMemberProfile(_web, _member) {
      await this.$http
        .post('panel/getprofileuser', {
          agent_id: _web,
          user_id: _member,
        })
        .then((response) => {
          if (response.data.status == 200) {
            let mem = response.data.result.profile_mem
            if (mem.status.toString().toLowerCase() == 'active') {
              this.memberProfile.status = true
            } else {
              this.memberProfile.status = false
            }
            this.memberProfile._id = mem._id
            this.memberProfile.status_id = mem.status
            this.onchgStatus(this.memberProfile.status_id)
            this.memberProfile.username = mem.username
            this.memberProfile.line_id = mem.line_id
            this.memberProfile.tel = mem.tel
            this.memberProfile.web_id = mem.web_id
            this.memberProfile.web_name = mem.web_name
            this.memberProfile.web_url = mem.url + '/' + mem.tel
            this.memberProfile.name = mem.name
            this.memberProfile.surename = mem.surename
            this.memberProfile.birthday_date = mem.birthday_date
            this.memberProfile.pin = mem.pin
            this.memberProfile.register_ip = mem.register_ip
            this.memberProfile.user_reference = mem.user_reference
            this.memberProfile.privilege = mem.privilege
            this.onchgPrivilege(this.memberProfile.privilege)
            this.memberProfile.email = mem.email
            this.memberProfile.mobile_number = mem.mobile_number
            this.memberProfile.channel = mem.channel_id
            this.memberProfile.note = mem.note
            // get current bank image
            this.onchgBanking(mem.banking_account.bank_id)
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
            this.memberProfile.financial.deposit_first_time_amount = Number(
              mem.financial.deposit_first_time_amount,
            ).toFixed(2)
            this.memberProfile.financial.deposit_first_time =
              mem.financial.deposit_first_time
            this.memberProfile.financial.deposit_count =
              mem.financial.deposit_count
            this.memberProfile.financial.deposit_total_amount = Number(
              mem.financial.deposit_total_amount,
            ).toFixed(2)
            this.memberProfile.financial.withdraw_first_time =
              mem.financial.withdraw_first_time
            this.memberProfile.financial.withdraw_count =
              mem.financial.withdraw_count
            this.memberProfile.financial.withdraw_total_amount = Number(
              mem.financial.withdraw_total_amount,
            ).toFixed(2)
            this.memberProfile.pd.username = mem.pd.username
            this.memberProfile.pd.credit = Number(mem.pd.credit).toFixed(2)
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
            this.memberProfile.create_date_datetime_type = mem.create_date
            this.memberProfile.update_date = mem.update_date
            this.memberProfile.update_by = mem.update_by
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            // open elements after get member success
            this.visiblePage = false
            this.createToast(
              'danger',
              'การดำเนินการ',
              'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + response.data.message,
            )
            console.log(
              'call api - panel/deposit : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          // open elements after get member success
          this.visiblePage = false
          this.createToast(
            'danger',
            'การดำเนินการ',
            'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + error,
          )
          console.log('call api - panel/getprofileuser : error' + error)
        })
    },
    async getConfChannel() {
      await this.$http
        .post('panel/getchannel', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optChannel = response.data.channel
            console.log(this.optChannel)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getchannel : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getchannel : error' + error)
        })
    },
    async getConfPrivilege() {
      await this.$http
        .post('panel/getprivilege', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optPrivilege = response.data.privilege
            console.log(this.optPrivilege)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getprivilege : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getprivilege : error' + error)
        })
    },
    async getConfStatus() {
      await this.$http
        .post('panel/getstatus', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optStatus = response.data.result_status
            console.log(this.optStatus)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getstatus : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getstatus : error' + error)
        })
    },
    async getConfBanking() {
      await this.$http
        .post('panel/getbanking', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optAllBank = response.data.result.banking
            console.log(this.optAllBank)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getbanking : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getbanking : error' + error)
        })
    },
    async updateMember() {
      this.validatedCreate = true
      this.v$.$validate()
      if (!this.v$.$error) {
        await this.$http
          .post('panel/updatemember', {
            memb_id: this.memberProfile._id,
            agent_id: this.webAgentID,
            username: this.memberProfile.surename,
            name: this.memberProfile.name,
            surname: this.memberProfile.surename,
            birthday_date: this.memberProfile.birthday_date,
            status: this.status_id,
            channel: this.memberProfile.channel,
            privilege: this.memberProfile.privilege,
            user_reference: this.memberProfile.user_reference,
            tel: this.memberProfile.tel,
            ipinfo: this.memberProfile.register_ip,
            remark: this.memberProfile.note,
            pin: this.memberProfile.pin,
            mobile_no: this.memberProfile.mobile_number,
            line_id: this.memberProfile.line_id,
            email: this.memberProfile.email,
            // promotion_status:
            bank_id: this.memberProfile.banking_account.bank_id,
            bank_acctount: this.memberProfile.banking_account.bank_acct,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.createToast(
                'success',
                'การดำเนินการ',
                'อัพเดทข้อมูลของลูกค้าเรียบร้อย',
              )
              console.log(response.data.message)
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
              console.log(
                'call api - panel/updatemember : status = ' +
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
            console.log('call api - panel/updatemember : error' + error)
          })
      }
    },

    // functions
    onchgBanking(_id) {
      this.memberProfile.bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code) {
        try {
          this.memberProfile.bank_img = require('../../assets/images/banking/th/smooth-corner/' +
            bank_code +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgPrivilege(_id) {
      this.memberProfile.privilege_img = ''
      let privilege = null
      for (let i = 0; i < this.optPrivilege.length; i++) {
        if (
          this.optPrivilege[i].privilege_id == _id ||
          this.optPrivilege[i].privilege_name == _id
        ) {
          privilege = this.optPrivilege[i].privilege_name
          break
        }
      }
      if (privilege) {
        try {
          this.memberProfile.privilege_img = require('../../assets/images/privilege/' +
            privilege +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgStatus(_status) {
      this.memberProfile.status_img = ''
      if (_status) {
        try {
          this.memberProfile.status_img = require('../../assets/images/status/' +
            _status +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgStatusSwich() {
      this.memberProfile.status = !this.memberProfile.status
      if (this.memberProfile.status == true) {
        this.memberProfile.status_id = 'active'
        this.onchgStatus('active')
      } else {
        this.memberProfile.status_id = 'suspend'
        this.onchgStatus('suspend')
      }
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
    this.getConfBanking()
    this.getConfChannel()
    this.getConfStatus()
    this.getConfPrivilege()
    this.getWebPrefixList().then(() => {
      let agent_id = null
      for (let i = 0; i < this.optWebAgent.length; i++) {
        if (this.optWebAgent[i].name == this.webSite) {
          agent_id = this.optWebAgent[i]._id
          this.webAgentID = this.optWebAgent[i]._id
          break
        }
      }
      if (agent_id) {
        this.getMemberProfile(agent_id, this.memberID)
      } else {
        // open elements after get member success
        this.visiblePage = false
        this.createToast(
          'danger',
          'การดำเนินการ',
          'ไม่พบข้อมูล Agent web ที่ตรงกับระบบ',
        )
      }
    })
    // this next
  },
  created() {
    ;(this.memberID = this.$route.params.memberID),
      (this.webSite = this.$route.params.webSite)
  },
  setup() {
    return {
      v$: useVuelidate(),
      imgBank,
    }
  },
  validations() {
    return {
      memberProfile: {
        status_id: { required },
        tel: {
          required,
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        pin: {
          required,
          numeric,
          minLength: minLength(4),
          maxLength: maxLength(4),
        },
        line_id: { validateLineID },
        name: { required, validateAlphabet },
        surename: { required, validateAlphabet },
        birthday: {},
        privilege_id: {},
        channel: {},
        remark: {},
        register_ip: {},
        user_reference: {},
        mobile_number: {
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        email: { email },
        banking_account: {
          bank_id: { required },
          bank_acct: {
            required,
            numeric,
            minLength: minLength(9),
            maxLength: maxLength(13),
          },
        },
      },
    }
  },
}
</script>
