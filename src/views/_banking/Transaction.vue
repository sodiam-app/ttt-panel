<template>
  <div>
    <CCard class="mb-2" v-if="bankingVisible">
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
                            <b>-----.--</b>
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
                          @click="clickDeposit"
                        >
                          <strong>
                            <CIcon :icon="ic.cilCash" size="sm" />
                            ฝาก
                          </strong>
                        </CButton>
                        <CButton
                          color="danger"
                          class="text-light"
                          @click="clickWithdraw"
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
                                :options="optMemberList"
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
                    <CButton
                      color="secondary"
                      variant="outline"
                      size="sm"
                      @click="bankingVisible = !bankingVisible"
                    >
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
    <div v-else class="text-end mb-2">
      <CButton
        color="secondary"
        variant="outline"
        size="sm"
        @click="bankingVisible = !bankingVisible"
      >
        <strong>
          <CIcon :icon="ic.cilFullscreen" size="sm" />
        </strong>
      </CButton>
    </div>
    <CCard>
      <CCardHeader>
        <CNav variant="tabs" class="card-header-tabs">
          <CNavItem>
            <CNavLink
              class="text-reset"
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 1"
              @click="onClicktabPaneActive(1)"
            >
              รอดำเนินการ
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              class="text-reset"
              href="javascript:void(0);"
              :active="tabPaneActiveKey === 2"
              @click="onClicktabPaneActive(2)"
            >
              รายการล่าสุด
            </CNavLink>
          </CNavItem>
        </CNav>
      </CCardHeader>
      <CCardBody class="pt-1">
        <!-- รอดำเนินการ -->
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
                    <CFormSwitch
                      id="formSwitchCheckChecked"
                      :onchange="updateFlagAutoHistory"
                      v-model="flagAutoHistory"
                      disabled
                    />
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
                    <CTableHeaderCell scope="col">web</CTableHeaderCell>
                    <!-- <CTableHeaderCell scope="col" class="text-center">
                      ตรวจสอบ
                    </CTableHeaderCell> -->
                    <CTableHeaderCell scope="col">ผู้ดูแล</CTableHeaderCell>
                    <CTableHeaderCell scope="col" class="text-center">
                      จัดการ
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">
                      ยูสเซอร์ลูกค้า
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">บัญชีลูกค้า</CTableHeaderCell>
                    <CTableHeaderCell scope="col">บัญชีเว็บ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">สถานะ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow
                    v-for="(history, index) in dataHistory"
                    :key="history.id"
                    :color="convertTypeRowsColor(history.type)"
                    class=""
                  >
                    <CTableHeaderCell scope="row">
                      {{ index + 1 }}.
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div class="d-inline-flex align-items-center">
                        <CIcon :icon="ic.cilBank" />
                        <CBadge color="dark" class="ms-1 d-none d-md-block">
                          {{ history.channel }}
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge :color="convertTypeColor(history.type)">
                        {{ convertType(history.type) }}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong class="fst-italic">
                        {{ convertAmount2Degit(history.amount) }}
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CRow>
                        <p class="m-0">
                          {{ convertTime(history.request_date) }}
                        </p>
                      </CRow>
                      <CRow>
                        <small class="fw-lighter m-0">
                          {{ convertDate(history.request_date) }}
                        </small>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>{{ history.web_prefix }}</CTableDataCell>
                    <CTableDataCell>
                      <div v-if="!checkLockedTransac(history.lock)">
                        <div class="d-inline-flex align-items-center">
                          <CAvatar
                            :src="
                              getImgAvatar(
                                history.lock.lock_role,
                                history.lock.lock_avatar,
                              )
                            "
                            size="sm"
                            status="success"
                            class="mb-1"
                          />
                          <!-- <CSpinner size="sm" variant="grow" class="me-1" /> -->
                          <CBadge color="dark" shape="rounded-pill">
                            {{ history.lock.lock_by }}
                          </CBadge>
                        </div>
                        <div class="small">
                          <timeago
                            auto-update
                            :datetime="history.lock.lock_date"
                          />
                        </div>
                      </div>
                      <div v-if="checkLockedTransacByMe(history.lock)">
                        <div class="d-inline-flex align-items-center">
                          <CSpinner
                            size="sm"
                            variant="grow"
                            class="me-1"
                            color="danger"
                          />
                          <CBadge color="primary" shape="rounded-pill">
                            คุณ
                          </CBadge>
                        </div>
                        <div class="small">
                          <timeago
                            auto-update
                            :datetime="history.lock.lock_date"
                          />
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell class="text-center">
                      <CButtonGroup role="group" size="sm">
                        <CButton
                          :color="history.memb_username ? 'info' : 'warning'"
                          variant="outline"
                          @click.prevent="
                            showManageTransaction(history._id, history.type)
                          "
                        >
                          <CIcon
                            :icon="ic.cilCog"
                            size="sm"
                            :class="!history.memb_username ? 'loader' : ''"
                          />
                          <div class="lh-1 mb-1">
                            <small>จัดการ</small>
                          </div>
                        </CButton>
                      </CButtonGroup>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div v-if="history.memb_username">
                        <CButton
                          size="sm"
                          color="link"
                          class="p-0"
                          @click="
                            navigateToNewTap(
                              '/member/list/' +
                                history.web_aka +
                                '/' +
                                history.memb_id,
                            )
                          "
                          >{{ history.memb_username }}
                        </CButton>
                        <br />
                        <CBadge
                          :color="convertMemberStatusColor(history.memb_status)"
                          shape="rounded-pill"
                        >
                          {{ convertMemberStatus(history.memb_status) }}
                        </CBadge>
                      </div>
                      <div v-else class="text-danger fw-bolder">
                        <CIcon :icon="ic.cilSad" size="sm" />
                        ระบุลูกค้าไม่ได้
                        <div class="small fw-lighter text-secondary">
                          <small>
                            กรุณากดปุ่ม "จัดการ" เพื่อระบุยูสลูกค้า
                          </small>
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div v-if="history.memb_bank">
                        <CRow :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }">
                          <CCol xs>
                            <CImage
                              fluid
                              :src="getBankIMG(history.memb_banking_code)"
                              width="20"
                              class="ms-1 me-1"
                            />
                          </CCol>
                          <CCol>
                            <div class="fw-bolder">
                              {{ history.memb_bank }}
                            </div>
                          </CCol>
                        </CRow>
                        <div class="fst-italic small">
                          {{ history.memb_name }}
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div v-if="history.web_account_number">
                        <div v-if="history.sub_type != 'bonus'">
                          <CRow :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }">
                            <CCol xs>
                              <CImage
                                fluid
                                :src="getBankIMG(history.web_account_code)"
                                width="20"
                                class="ms-1 me-1"
                              />
                            </CCol>
                            <CCol>
                              <div class="fw-bolder">
                                {{ history.web_account_number }}
                              </div>
                            </CCol>
                          </CRow>
                          <div class="fst-italic small">
                            {{ history.web_account_name }}
                          </div>
                        </div>
                        <div v-else class="d-inline-flex align-items-start">
                          <CIcon class="text-info" :icon="ic.cibPalantir" />
                          <CBadge color="info" class="ms-1 d-none d-md-block">
                            บัญชีโบนัส
                          </CBadge>
                        </div>
                      </div>
                      <div v-else class="text-danger">
                        <div>
                          <CIcon :icon="ic.cilFire" size="sm" />
                          ระบบผิดพลาด
                        </div>
                        <div class="small fw-lighter text-secondary">
                          กรุณาติดต่อผู้ดูแล
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div class="d-inline-flex align-items-start">
                        <CSpinner
                          color="warning"
                          size="sm"
                          class="me-1"
                          :variant="
                            history.status == 'pending' ? 'grow' : 'border'
                          "
                        />
                        <CBadge :color="convertStatusColor(history.status)">
                          <!-- {{ convertHistoryStatus(history.status) }} -->
                          {{ history.status }}
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell class="small">
                      <div v-for="note in history.description" :key="note._id">
                        <CBadge
                          :color="convertUserNoteColor(note.username)"
                          shape="rounded-pill"
                        >
                          {{ note.username }}
                        </CBadge>
                        : {{ note.note }}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </CCardText>
          <div class="text-center">
            <CSmartPagination
              :activePage="activePage1"
              :pages="totalPage1"
              size="sm"
              align="end"
            />
          </div>
        </CTabPane>
        <!-- รายการล่าสุด -->
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
                    <CFormSwitch id="formSwitchCheckChecked" disabled />
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
                  <CTableRow
                    v-for="(historylasted, index) in dataHistoryLasted"
                    :key="historylasted.id"
                    :color="convertTypeRowsColor(historylasted.type)"
                  >
                    <CTableHeaderCell scope="row">
                      {{ index + 1 }}
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div class="text-break"></div>
                      <div class="d-inline-flex align-items-center">
                        <CIcon :icon="ic.cilBank" />
                        <CBadge color="dark" class="ms-1 d-none d-md-block">
                          {{ historylasted.channel }}
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge :color="convertTypeColor(historylasted.type)">
                        {{ convertType(historylasted.type) }}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong class="fst-italic">
                        {{ convertAmount2Degit(historylasted.amount) }}
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CRow>
                        <p class="m-0">
                          {{
                            convertTime(historylasted.approve_by.approve_date)
                          }}
                        </p>
                      </CRow>
                      <CRow>
                        <small class="fw-lighter m-0">
                          {{
                            convertDate(historylasted.approve_by.approve_date)
                          }}
                        </small>
                      </CRow>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="link"
                        class="p-0"
                        @click="
                          navigateToNewTap(
                            '/member/list/' +
                              historylasted.web_aka +
                              '/' +
                              historylasted.memb_id,
                          )
                        "
                        >{{ historylasted.memb_username }}
                      </CButton>
                      <br />
                      <CBadge
                        :color="
                          convertMemberStatusColor(historylasted.memb_status)
                        "
                        shape="rounded-pill"
                      >
                        {{ convertMemberStatus(historylasted.memb_status) }}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CRow :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }">
                          <CCol xs>
                            <CImage
                              fluid
                              :src="getBankIMG(historylasted.memb_banking_code)"
                              width="20"
                              class="ms-1 me-1"
                            />
                          </CCol>
                          <CCol>
                            <div class="fw-bolder">
                              {{ historylasted.memb_bank }}
                            </div>
                          </CCol>
                        </CRow>
                        <div class="fst-italic small">
                          {{ historylasted.memb_name }}
                        </div>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div v-if="historylasted.sub_type != 'bonus'">
                        <CRow :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }">
                          <CCol xs>
                            <CImage
                              fluid
                              :src="getBankIMG(historylasted.web_account_code)"
                              width="20"
                              class="ms-1 me-1"
                            />
                          </CCol>
                          <CCol>
                            <div class="fw-bolder">
                              {{ historylasted.web_account_number }}
                            </div>
                          </CCol>
                        </CRow>
                        <div class="fst-italic small">
                          {{ historylasted.web_account_name }}
                        </div>
                      </div>
                      <div v-else class="d-inline-flex align-items-start">
                        <CIcon class="text-info" :icon="ic.cibPalantir" />
                        <CBadge color="info" class="ms-1 d-none d-md-block">
                          บัญชีโบนัส
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CBadge :color="convertStatusColor(historylasted.status)">
                        {{ historylasted.status }}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div class="align-items-center">
                        <CAvatar
                          :src="
                            getImgAvatar(
                              historylasted.approve_by.approve_role,
                              historylasted.approve_by.approve_avatar,
                            )
                          "
                          size="sm"
                          status="success"
                          class="mb-1"
                        />
                        <CBadge color="dark" shape="rounded-pill">
                          {{ historylasted.approve_by.approve_username }}
                        </CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {{ historylasted.web_prefix }}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div
                        v-for="note in historylasted.description"
                        :key="note._id"
                      >
                        <CBadge
                          :color="convertUserNoteColor(note.username)"
                          shape="rounded-pill"
                        >
                          {{ note.username }}
                        </CBadge>
                        : {{ note.note }}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </CCardText>
          <div class="text-center">
            <CSmartPagination
              :activePage="activePage2"
              :pages="totalPage2"
              size="sm"
              align="end"
            />
          </div>
        </CTabPane>
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
    tabindex="-1"
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
    <CModalBody class="m-0 p-0 bg-success">
      <CCard class="m-0 p-0 border-bottom border-success">
        <CCardBody>
          <CCardText class="small">
            <form>
              <div class="mb-1">
                <CFormSwitch label="ผ่านบัญชีโบนัส" v-model="isBonusDeposit" />
                <div v-if="!isBonusDeposit">
                  <label for="depositBank" class="form-label">
                    * บัญชีเว็บ
                  </label>
                  <CInputGroup class="mb-3">
                    <CInputGroupText id="basic-addon1">
                      <CIcon :icon="ic.cilCreditCard" />
                    </CInputGroupText>
                    <CFormSelect
                      size="sm"
                      v-model="dataDeposit.account_deposit"
                    >
                      <option v-if="optBankDeposit.length == 0" value="">
                        บัญชีโบนัส
                      </option>
                      <option
                        v-for="option in optBankDeposit"
                        :key="option._id"
                        :value="option._id"
                      >
                        [{{ option.bank_code }}] | {{ option.bank_account }} ({{
                          option.account_name
                        }})
                      </option>
                    </CFormSelect>
                  </CInputGroup>
                </div>
              </div>
              <div v-if="isBonusDeposit" class="fw-bolder fst-italic small">
                *
                <span class="text-decoration-underline">
                  กรณีฝากยอดผ่านบัญชีโบนัสระบบจะยึดเวลาปัจจุบัน
                </span>
              </div>
              <hr class="mt-2 mb-2" />
              <div class="mb-1" v-show="optWebAgent.length > 1">
                <label for="depositWebAgent" class="form-label mb-1">
                  * เว็บลูกค้า
                </label>
                <CInputGroup class="has-validation">
                  <CInputGroupText>
                    <CIcon :icon="ic.cilPin" />
                  </CInputGroupText>
                  <CFormSelect
                    id="depositWebAgent"
                    size="sm"
                    v-model="dataDeposit.web_agent_id"
                    @change="getMemberList($event.target.value)"
                    feedbackInvalid="กรุณาเลือกข้อมูลเว็บ"
                    :invalid="v$.dataDeposit.web_agent_id.$error"
                    @input="v$.dataDeposit.web_agent_id.$touch()"
                    @blur="v$.dataDeposit.web_agent_id.$touch()"
                    :class="{
                      'is-invalid': v$.dataDeposit.web_agent_id.$error,
                      'is-valid':
                        !v$.dataDeposit.web_agent_id.$error && validatedDeposit,
                    }"
                  >
                    <option value="">กรุณาเลือกเว็บ</option>
                    <option
                      v-for="option in optWebAgent"
                      :key="option._id"
                      :value="option._id"
                    >
                      {{ option.name }}
                    </option>
                  </CFormSelect>
                </CInputGroup>
              </div>
              <div class="mb-1">
                <label for="depositMemberID" class="form-label mb-1">
                  * ยูสเซอร์ลูกค้า
                </label>
                <Select2
                  tabindex="0"
                  placeholder="กรุณาเลือกข้อมูลลูกค้า"
                  v-model="dataDeposit.memb_id"
                  :options="optMemberListMultiSelect"
                  :settings="{
                    width: '100%',
                  }"
                  @change="myChangeEvent($event)"
                  feedbackInvalid="กรุณาเลือกลูกค้าที่จะทำรายการ"
                  :invalid="v$.dataDeposit.memb_id.$error"
                  @input="v$.dataDeposit.memb_id.$touch()"
                  @blur="v$.dataDeposit.memb_id.$touch()"
                  :class="{
                    'is-invalid': v$.dataDeposit.memb_id.$error,
                    'is-valid':
                      !v$.dataDeposit.memb_id.$error && validatedDeposit,
                  }"
                />
                <div class="form-text mt-0 mb-2">
                  สามารถค้นหาด้วย: ยูส, เบอร์โทร, ชื่อ
                </div>
              </div>
              <div v-if="!isBonusDeposit" class="mb-1">
                <label for="depositDateTime" class="form-label mb-1">
                  * วันเวลาที่ทำรายการ
                </label>
                <CRow class="g-2">
                  <CCol sm="7">
                    <CDatePicker
                      id="depositDateTime"
                      locale="th-TH"
                      confirm-button="ตกลง"
                      cancel-button="ยกเลิก"
                      placeholder="วันที่ทำรายการ"
                      footer
                      :date="new Date()"
                      format="dd/MM/yyyy"
                      data-coreui-weekdayFormat="long"
                      :calendarDate="dataDeposit.transaction_date"
                      v-model="dataDeposit.transaction_date"
                    />
                  </CCol>
                  <CCol sm>
                    <CTimePicker
                      locale="th-TH"
                      placeholder="เวลาที่ทำรายการ"
                      :time="new Date()"
                      id="timeDeposit"
                    />
                  </CCol>
                </CRow>
              </div>
              <div class="mb-1">
                <label for="depositAmount" class="form-label mb-1">
                  * ยอดเงิน
                </label>
                <CInputGroup class="has-validation">
                  <CInputGroupText>
                    <CIcon :icon="ic.cilCash" />
                  </CInputGroupText>
                  <CFormInput
                    min="0"
                    type="number"
                    id="depositAmount"
                    v-model="dataDeposit.amount"
                    feedbackInvalid="กรุณากรอกข้อมูลจำนวนเงินให้ถูกต้อง"
                    :invalid="v$.dataDeposit.amount.$error"
                    @input="v$.dataDeposit.amount.$touch()"
                    @blur="v$.dataDeposit.amount.$touch()"
                    :class="{
                      'is-invalid': v$.dataDeposit.amount.$error,
                      'is-valid':
                        !v$.dataDeposit.amount.$error && validatedDeposit,
                    }"
                  />
                  <!-- <CInputGroupText> ฿ </CInputGroupText> -->
                </CInputGroup>
              </div>
              <hr class="mb-2" />
              <div class="mb-1">
                <div class="form-floating">
                  <textarea
                    class="form-control form-control-sm"
                    placeholder="Leave a comment here"
                    id="floatingTextarea1"
                    style="height: 90px"
                    v-model="dataDeposit.description"
                  ></textarea>
                  <label for="floatingTextarea2">หมายเหตุ</label>
                </div>
              </div>
              <hr />
              <CAlert
                color="danger"
                variant="solid"
                class="py-2"
                :visible="dataDeposit.errorVisible"
              >
                <CIcon :icon="ic.cilWarning" />

                {{ dataDeposit.errorMessage }}
              </CAlert>
              <div class="text-end">
                <CButton
                  color="success"
                  class="ms-1 text-light"
                  @click="submitDeposit"
                >
                  <CIcon :icon="ic.cilCheckCircle" />
                  ตกลง
                </CButton>
                <CButton
                  color="danger"
                  class="text-light ms-1"
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
    tabindex="-1"
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
      <CCard class="border-bottom border-danger">
        <CCardBody>
          <CCardText class="small">
            <form>
              <CFormSwitch label="ผ่านบัญชีโบนัส" v-model="isBonusWithdraw" />
              <div v-if="!isBonusWithdraw">
                <div class="mb-1">
                  <label for="withdrawBank" class="form-label">
                    *บัญชีถอน
                  </label>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon :icon="ic.cilCreditCard" />
                    </CInputGroupText>
                    <CFormSelect
                      id="withdrawBank"
                      size="sm"
                      v-model="dataWithdraw.account_withdraw"
                    >
                      <option v-if="optBankWithdraw.length == 0" value="">
                        บัญชีโบนัส
                      </option>
                      <option
                        v-for="option in optBankWithdraw"
                        :key="option._id"
                        :value="option._id"
                      >
                        [{{ option.bank_code }}] | {{ option.bank_account }} ({{
                          option.account_name
                        }})
                      </option>
                    </CFormSelect>
                  </CInputGroup>
                </div>
                <div v-if="isBonusWithdraw" class="fw-bolder fst-italic small">
                  *
                  <span class="text-decoration-underline">
                    กรณีถอนยอดผ่านบัญชีโบนัสระบบจะยึดเวลาปัจจุบัน
                  </span>
                </div>
              </div>
              <hr class="mt-2 mb-2" />
              <div class="mb-1" v-show="optWebAgent.length > 1">
                <label for="withdrawWebAgent" class="form-label mb-1">
                  * เว็บลูกค้า
                </label>
                <CInputGroup class="has-validation">
                  <CInputGroupText>
                    <CIcon :icon="ic.cilPin" />
                  </CInputGroupText>
                  <CFormSelect
                    id="withdrawWebAgent"
                    size="sm"
                    v-model="dataWithdraw.web_agent_id"
                    @change="getMemberList($event.target.value)"
                    feedbackInvalid="กรุณาเลือกข้อมูลเว็บ"
                    :invalid="v$.dataWithdraw.web_agent_id.$error"
                    @input="v$.dataWithdraw.web_agent_id.$touch()"
                    @blur="v$.dataWithdraw.web_agent_id.$touch()"
                    :class="{
                      'is-invalid': v$.dataWithdraw.web_agent_id.$error,
                      'is-valid':
                        !v$.dataWithdraw.web_agent_id.$error &&
                        validatedWithdraw,
                    }"
                  >
                    <option value="">กรุณาเลือกเว็บ</option>
                    <option
                      v-for="option in optWebAgent"
                      :key="option._id"
                      :value="option._id"
                    >
                      {{ option.name }}
                    </option>
                  </CFormSelect>
                </CInputGroup>
              </div>
              <div class="mb-1">
                <label for="withdrawMemberID" class="form-label mb-1">
                  * ยูสเซอร์ลูกค้า
                </label>
                <Select2
                  tabindex="0"
                  placeholder="กรุณาเลือกข้อมูลลูกค้า"
                  v-model="dataWithdraw.memb_id"
                  :options="optMemberListMultiSelect"
                  :settings="{
                    width: '100%',
                  }"
                  @change="myChangeEvent($event)"
                  feedbackInvalid="กรุณาเลือกลูกค้าที่จะทำรายการ"
                  :invalid="v$.dataWithdraw.memb_id.$error"
                  @input="v$.dataWithdraw.memb_id.$touch()"
                  @blur="v$.dataWithdraw.memb_id.$touch()"
                  :class="{
                    'is-invalid': v$.dataWithdraw.memb_id.$error,
                    'is-valid':
                      !v$.dataWithdraw.memb_id.$error && validatedWithdraw,
                  }"
                />
                <div class="form-text mt-0 mb-2">
                  สามารถค้นหาด้วย: ยูส, เบอร์โทร, ชื่อ
                </div>
              </div>
              <div class="mb-1">
                <label for="withdrawAmount" class="form-label mb-1">
                  * ยอดเงิน
                </label>
                <CInputGroup class="has-validation">
                  <CInputGroupText>
                    <CIcon :icon="ic.cilCash" />
                  </CInputGroupText>
                  <CFormInput
                    type="number"
                    min="0"
                    id="withdrawAmount"
                    v-model="dataWithdraw.amount"
                    feedbackInvalid="กรุณากรอกข้อมูลจำนวนเงินให้ถูกต้อง"
                    :invalid="v$.dataWithdraw.amount.$error"
                    @input="v$.dataWithdraw.amount.$touch()"
                    @blur="v$.dataWithdraw.amount.$touch()"
                    :class="{
                      'is-invalid': v$.dataWithdraw.amount.$error,
                      'is-valid':
                        !v$.dataWithdraw.amount.$error && validatedWithdraw,
                    }"
                  />
                  <!-- <CInputGroupText> ฿ </CInputGroupText> -->
                </CInputGroup>
              </div>
              <hr class="mb-2" />
              <div class="mb-1">
                <div class="form-floating">
                  <textarea
                    class="form-control form-control-sm"
                    placeholder="Leave a comment here"
                    id="floatingTextarea1"
                    style="height: 90px"
                    v-model="dataWithdraw.description"
                  ></textarea>
                  <label for="floatingTextarea2">หมายเหตุ</label>
                </div>
              </div>
              <hr />
              <CAlert
                color="danger"
                variant="solid"
                class="py-2"
                :visible="dataWithdraw.errorVisible"
              >
                <CIcon :icon="ic.cilWarning" />

                {{ dataWithdraw.errorMessage }}
              </CAlert>
              <div class="text-end">
                <CButton
                  color="success"
                  class="ms-1 text-light"
                  @click="submitWithdraw()"
                >
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

  <!-- ----- -->
  <!-- Confirm Approve -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdConfirmApprove"
    @close="
      () => {
        mdConfirmApprove = false
      }
    "
  >
    <CModalBody class="m-0 p-0">
      <CCard class="border-warning m-0 p-0">
        <CCardBody>
          <CCardText class="small text-center">
            <CModalTitle class="fw-bolder text-decoration-underline mb-2 mt-1">
              ยืนยันการอนุมัติ
            </CModalTitle>
            <span
              >คุณกำลังดำเนินการ <b>"อนุมัติ"</b> โดยไม่ผ่านการ
              <b>"เช็ค"</b></span
            >
            <p>
              <CIcon :icon="ic.cilHandPointDown" />
              กรุณาตรวจสอบข้อมูลอีกครั้ง
            </p>
            <hr />
            <CAlert color="danger" class="py-1" :visible="errApproveVisible">
              <CIcon :icon="ic.cilWarning" />
              {{ errApproveMessage }}
            </CAlert>
            <ul class="list-group mb-1">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                ช่องทาง / ประเภท:
                <div>
                  <span class="badge bg-dark me-1"> --- </span>
                  <span
                    :class="
                      'badge bg-' + convertTypeColor(dataConfirmApprove.type)
                    "
                  >
                    {{ convertType(dataConfirmApprove.type) }}
                  </span>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                จำนวนเงิน:
                <span
                  :class="
                    'badge rounded-pill bg-' +
                    convertTypeColor(dataConfirmApprove.type)
                  "
                >
                  {{ convertAmount2Degit(dataConfirmApprove.amount) }} ฿
                </span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                เวลา:
                <div class="text-end">
                  <span class="fw-bolder">
                    {{ convertTime(dataConfirmApprove.request_date) }}
                  </span>
                  <br />
                  <span class="fw-lighter small">
                    {{ convertDate(dataConfirmApprove.request_date) }}
                  </span>
                </div>
              </li>
            </ul>
            <ul class="list-group mb-1">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                web:
                <span> {{ dataConfirmApprove.web_aka }} </span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                ยูสเซอร์ลูกค้า:
                <CButton
                  size="sm"
                  color="link"
                  class="p-0"
                  @click="
                    navigateToNewTap(
                      '/member/list/' +
                        dataConfirmApprove.web_aka +
                        '/' +
                        dataConfirmApprove.memb_id,
                    )
                  "
                >
                  {{ dataConfirmApprove.memb_username }}
                </CButton>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                บัญชีลูกค้า:
                <div class="text-end d-flex">
                  <div class="d-inline d-block">
                    <strong>{{ dataConfirmApprove.memb_bank }}</strong>
                    <br />
                    <span>{{ dataConfirmApprove.memb_name }}</span>
                  </div>
                  <div class="d-inline">
                    <CImage
                      fluid
                      :src="getBankIMG(dataConfirmApprove.memb_banking_code)"
                      width="30"
                      class="ms-1 me-1"
                    />
                  </div>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                บัญชีเว็บ:
                <div class="text-end d-flex">
                  <div class="d-inline d-block">
                    <strong>
                      {{ dataConfirmApprove.web_account_number }}
                    </strong>
                    <br />
                    <span>{{ dataConfirmApprove.web_account_name }}</span>
                  </div>
                  <div class="d-inline">
                    <CImage
                      fluid
                      :src="getBankIMG(dataConfirmApprove.web_account_code)"
                      width="30"
                      class="ms-1 me-1"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <hr />
            <div class="text-center mb-2">
              <CButton
                size="sm"
                color="secondary"
                class="text-light ms-1"
                @click="
                  () => {
                    mdConfirmApprove = false
                  }
                "
              >
                <CIcon :icon="ic.cilXCircle" />
                ปิด
              </CButton>
              <CButton
                size="sm"
                color="warning"
                class="ms-1 text-light"
                @click="
                  submitTransactionStatus(
                    dataConfirmApprove._id,
                    'approve',
                    dataConfirmApprove.type,
                    dataConfirmApprove.description,
                  )
                "
              >
                <CIcon :icon="ic.cilCheckCircle" />
                ตกลง
              </CButton>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- Manage Transaction -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdManageTransaction"
    @close="
      () => {
        mdManageTransaction = false
      }
    "
  >
    <CModalBody class="m-0 p-0">
      <CCard class="border-warning m-0 p-0">
        <CCardBody>
          <CCardText class="small text-center">
            <CModalTitle class="fw-bolder text-decoration-underline mb-1 mt-1">
              การจัดการการอนุมัติ
            </CModalTitle>
            <p class="mb-2">
              <CIcon :icon="ic.cilHandPointDown" />
              กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนการดำเนินการ
            </p>
            <hr class="mt-0" />
            <CAlert
              color="danger"
              class="py-1"
              :visible="errManageTransacVisible"
            >
              <CIcon :icon="ic.cilWarning" />
              {{ errManageTransacMessage }}
            </CAlert>
            <ul class="list-group mb-1">
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-1"
              >
                ช่องทาง / ประเภท:
                <div>
                  <span class="badge bg-dark me-1"> --- </span>
                  <span
                    :class="
                      'badge bg-' + convertTypeColor(dataManageTransaction.type)
                    "
                  >
                    {{ convertType(dataManageTransaction.type) }}
                  </span>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-1"
              >
                จำนวนเงิน:
                <span
                  :class="
                    'badge rounded-pill bg-' +
                    convertTypeColor(dataManageTransaction.type)
                  "
                >
                  {{ convertAmount2Degit(dataManageTransaction.amount) }} ฿
                </span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center py-1"
              >
                เวลา:
                <div class="text-end">
                  <div class="fw-bolder">
                    {{ convertTime(dataManageTransaction.request_date) }}
                  </div>
                  <div class="fw-lighter lh-1 small">
                    {{ convertDate(dataManageTransaction.request_date) }}
                  </div>
                </div>
              </li>
            </ul>
            <ul class="list-group mb-1">
              <li
                class="list-group-item d-flex justify-content-between align-items-center lh-1"
              >
                web:
                <span> {{ dataManageTransaction.web_aka }} </span>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center lh-1 py-1"
              >
                ยูสเซอร์ลูกค้า:
                <div v-if="dataManageTransaction.memb_username">
                  <CButton
                    size="sm"
                    color="link"
                    class="p-0"
                    @click="
                      navigateToNewTap(
                        '/member/list/' +
                          dataManageTransaction.web_aka +
                          '/' +
                          dataManageTransaction.memb_id,
                      )
                    "
                  >
                    {{ dataManageTransaction.memb_username }}
                  </CButton>
                </div>
                <div v-else>
                  <Select2
                    class="text-start"
                    tabindex="0"
                    placeholder="กรุณาเลือกข้อมูลลูกค้า"
                    v-model="dataManageTransaction.memb_id"
                    :options="optMemberListMultiSelect"
                    :settings="{
                      width: '300px',
                    }"
                    @select="selectedMemberOnManage($event)"
                  />
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                บัญชีลูกค้า:
                <div v-if="dataManageTransaction.memb_bank">
                  <div class="text-end d-flex">
                    <div class="d-inline d-block">
                      <div class="fw-bolder lh-1">
                        {{ dataManageTransaction.memb_bank }}
                      </div>
                      <div class="fst-italic small">
                        {{ dataManageTransaction.memb_name }}
                      </div>
                    </div>
                    <div class="d-inline">
                      <CImage
                        fluid
                        :src="
                          getBankIMG(dataManageTransaction.memb_banking_code)
                        "
                        width="30"
                        class="ms-2"
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                บัญชีเว็บ:
                <div v-if="dataManageTransaction.web_account_number">
                  <div class="text-end d-flex">
                    <div class="d-inline d-block">
                      <div class="fw-bolder lh-1">
                        {{ dataManageTransaction.web_account_number }}
                      </div>
                      <div class="fst-italic small">
                        {{ dataManageTransaction.web_account_name }}
                      </div>
                    </div>
                    <div class="d-inline">
                      <CImage
                        fluid
                        :src="
                          getBankIMG(dataManageTransaction.web_account_code)
                        "
                        width="30"
                        class="ms-2"
                      />
                    </div>
                  </div>
                </div>
                <div v-else class="text-danger text-end">
                  <div>
                    <CIcon :icon="ic.cilFire" size="sm" />
                    ระบบผิดพลาด
                  </div>
                  <div class="small fw-lighter text-secondary">
                    กรุณาติดต่อผู้ดูแล
                  </div>
                </div>
              </li>
            </ul>
            <CCard
              v-if="dataManageTransaction.description"
              class="mt-0 mb-1 text-start border-start-2 border-start-warning small"
            >
              <CCardHeader class="py-1">* หมายเหตุก่อนหน้า</CCardHeader>
              <CCardBody class="py-1">
                <CCardText>
                  <!-- <div
                    v-for="note in dataManageTransaction.description"
                    :key="note._id"
                  >
                    <CBadge
                      :color="convertUserNoteColor(note.username)"
                      shape="rounded-pill"
                    >
                      {{ note.username }}
                    </CBadge>
                    : {{ note.note }}
                  </div> -->
                  <div
                    v-if="typeof dataManageTransaction.description === 'object'"
                  >
                    <div
                      v-for="note in dataManageTransaction.description"
                      :key="note._id"
                    >
                      <CBadge
                        :color="convertUserNoteColor(note.username)"
                        shape="rounded-pill"
                      >
                        {{ note.username }}
                      </CBadge>
                      : {{ note.note }}
                    </div>
                  </div>
                  <div v-else>
                    {{ dataManageTransaction.description }}
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
            <div class="form-floating">
              <textarea
                class="form-control form-control-sm"
                placeholder="Leave a comment here"
                id="floatingTextarea1"
                style="height: 90px"
                v-model="dataManageTransactionNote"
              ></textarea>
              <label for="floatingTextarea2">หมายเหตุ</label>
            </div>
            <hr />
            <div class="text-center mb-2">
              <div class="d-flex justify-content-between">
                <!-- start -->
                <div>
                  <CButton
                    size="sm"
                    color="success"
                    class="text-light"
                    v-show="dataManageTransaction.memb_id"
                    @click="
                      submitTransactionStatus(
                        dataManageTransaction._id,
                        'approve',
                        dataManageTransaction.type,
                        dataManageTransactionNote,
                        dataManageTransaction.memb_id,
                        dataManageTransaction.from_bank_id,
                        dataManageTransaction.from_account_id,
                        dataManageTransaction.silp_image,
                      )
                    "
                  >
                    <CIcon :icon="ic.cilCheckCircle" />
                    อนุมัติ
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    class="text-light ms-1"
                    @click="
                      submitTransactionStatus(
                        dataManageTransaction._id,
                        'cancel',
                        dataManageTransaction.type,
                        dataManageTransactionNote,
                        dataManageTransaction.memb_id,
                        dataManageTransaction.from_bank_id,
                        dataManageTransaction.from_account_id,
                        dataManageTransaction.silp_image,
                      )
                    "
                  >
                    <CIcon :icon="ic.cilXCircle" />
                    ปฏิเสธ
                  </CButton>
                </div>
                <!-- end -->
                <div>
                  <CButton
                    size="sm"
                    color="info"
                    class="text-light ms-1"
                    @click="
                      submitTransactionStatus(
                        dataManageTransaction._id,
                        'save',
                        dataManageTransaction.type,
                        dataManageTransactionNote,
                        dataManageTransaction.memb_id,
                        dataManageTransaction.from_bank_id,
                        dataManageTransaction.from_account_id,
                        dataManageTransaction.silp_image,
                      )
                    "
                  >
                    <CIcon :icon="ic.cilSave" />
                    บันทึก
                  </CButton>
                  <CButton
                    size="sm"
                    color="secondary"
                    class="text-light ms-1"
                    @click="
                      submitTransactionStatus(
                        dataManageTransaction._id,
                        'close',
                        dataManageTransaction.type,
                        '',
                        '',
                        '',
                        '',
                        '',
                      )
                    "
                  >
                    <CIcon :icon="ic.cilX" />
                    ปิด
                  </CButton>
                </div>
              </div>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- Popup Alert Click Same Job -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    alignment="center"
    scrollable
    :visible="mdClickSameJob"
    @close="
      () => {
        mdClickSameJob = false
      }
    "
  >
    <CModalHeader class="pt-3 pb-2 bg-warning border-warning bg-opacity-75">
      <CModalTitle class="text-center fw-bolder">
        <CIcon size="lg" :icon="ic.cilWarning" />
        เกิดข้อผิดพลาด
      </CModalTitle>
    </CModalHeader>
    <CModalBody
      class="bg-warning bg-opacity-50 border-bottom border-4 border-warning"
    >
      <!-- <CModalTitle class="text-center fw-bolder">
        <CIcon :icon="ic.cilWarning" />
        เกิดข้อผิดพลาด
      </CModalTitle> -->
      <div class="mb-3">
        ไม่สามารถ <span class="fw-bolder fst-italic">" จัดการ "</span>
        รายการนี้ได้ เนื่องจาก ผู้ดูแล
        <span class="badge rounded-pill bg-info">{{
          errClickSameJob.user
        }}</span>
        กำลังดำเนินการนี้อยู่ เมื่อ:
        <span class="fw-light me-1">
          {{ convertDate(errClickSameJob.date) }}
        </span>
        <span class="fw-bold"> {{ convertTime(errClickSameJob.date) }}</span>
      </div>
      <div class="text-center">
        <CButton
          color="dark"
          size="sm"
          class="text-white"
          @click="
            () => {
              mdClickSameJob = false
            }
          "
        >
          <CIcon :icon="ic.cilXCircle" />
          ปิด
        </CButton>
      </div>
    </CModalBody>
    <!-- <CModalFooter class="pt-1 pb-2 bg-warning bg-opacity-75">
      <div class="align-self-center">
        <CButton
          color="secondary"
          size="sm"
          class="text-center"
          @click="
            () => {
              mdManageAlert = false
            }
          "
        >
          <CIcon :icon="ic.cilXCircle" />
          ปิด
        </CButton>
      </div>
    </CModalFooter> -->
  </CModal>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { CIcon } from '@coreui/icons-vue'
import {
  cilCash,
  cilLoopCircular,
  cilClearAll,
  cilExternalLink,
  cilCalendar,
  cilClock,
  cilMagnifyingGlass,
  cilReload,
  cilFilter,
  cilFullscreenExit,
  cilBank,
  cilCircle,
  cilCheckAlt,
  cilX,
  cilCheckCircle,
  cilXCircle,
  cilHandPointDown,
  cilWarning,
  cilBadge,
  cilCreditCard,
  cibPalantir,
  cilGroup,
  cilPin,
  cilFullscreen,
  cilPencil,
  cilSave,
  cilCog,
  cilSad,
  cilFire,
} from '@coreui/icons'

import { mapActions, mapGetters } from 'vuex'
import { CDatePicker } from '@coreui/vue-pro'
import Select2 from 'vue3-select2-component'
import moment from 'moment'
import useVuelidate from '@vuelidate/core'
import { required, numeric } from '@vuelidate/validators'
import { validateAmount } from '../../validations/validation'

export default {
  name: 'Transection',
  comments: {
    CIcon,
    CDatePicker,
    Select2,
  },
  data() {
    return {
      picked: new Date(),
      bankingVisible: true,
      tabPaneActiveKey: 1,
      visibleSearch: false,
      visibleBank: true,

      // Modal (Popup)
      mdStatement: false,
      mdDeposit: false,
      mdConfirmApprove: false,
      mdManageTransaction: false,
      mdClickSameJob: false,

      mdWithdraw: false,

      // Alert Popup
      alertMessage: '',
      errClickSameJob: {
        user: '',
        date: '',
      },

      // controls
      isBonusDeposit: false,
      isBonusWithdraw: false,
      errApproveVisible: false,
      errApproveMessage: '',
      errManageTransacVisible: false,
      errManageTransacMessage: '',

      // Web
      providerCredit: 0,

      // Deposit submit
      dataDeposit: {
        web_agent_id: '',
        account_deposit: '',
        memb_id: '',
        transaction_date: Date(),
        transaction_time: Date(),
        amount: '0',
        description: '',
        errorVisible: false,
        errorMessage: '',
      },
      dataWithdraw: {
        web_agent_id: '',
        account_withdraw: '',
        memb_id: '',
        transaction_date: Date(),
        transaction_time: Date(),
        amount: '0',
        description: '',
        errorVisible: false,
        errorMessage: '',
      },

      totalPage1: 1,
      activePage1: 1,
      totalPage2: 1,
      activePage2: 1,

      // data
      flagAutoHistory: false,
      updateHistoryAutoCount: 0,
      updateHistoryAuto: null,
      dataHistory: [],
      dataHistoryLasted: [],
      dataConfirmApprove: {},
      dataManageTransaction: {},
      dataManageTransactionNote: '',

      // list of select elements
      optWebAgent: [],
      optMemberList: [],
      optBankDeposit: [],
      optBankWithdraw: [],
      optMemberListMultiSelect: [],
      myOptions: ['op1', 'op2', 'op3'],

      // validations
      validatedDeposit: false,
      validatedWithdraw: false,

      // icons
      ic: {
        cilCash,
        cilLoopCircular,
        cilClearAll,
        cilExternalLink,
        cilCalendar,
        cilClock,
        cilMagnifyingGlass,
        cilReload,
        cilFilter,
        cilFullscreenExit,
        cilBank,
        cilCircle,
        cilCheckAlt,
        cilX,
        cilCheckCircle,
        cilXCircle,
        cilHandPointDown,
        cilWarning,
        cilBadge,
        cilCreditCard,
        cibPalantir,
        cilGroup,
        cilPin,
        cilFullscreen,
        cilPencil,
        cilSave,
        cilCog,
        cilSad,
        cilFire,
      },
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
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
    async getMemberList(webID) {
      await this.$http
        .post('panel/getallmember', {
          agent_id: webID,
          domain_name: '',
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optMemberList = response.data.result.Member
            this.optMemberListMultiSelect =
              this.prepareOptMemberListMultiSelect(this.optMemberList)
            console.log(this.optMemberList)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getallmember : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getallmember : error' + error)
        })
    },
    async getWebDeposit(webID) {
      await this.$http
        .post('panel/getbanktrnsaction', {
          agent_id: webID,
          type: 'deposit',
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optBankDeposit = response.data.result
            if (!this.dataDeposit.account_deposit) {
              this.dataDeposit.account_deposit = this.optBankDeposit[0]._id
            }
            console.log(this.optBankDeposit)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getbanktrnsaction : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getbanktrnsaction : error' + error)
        })
    },
    async getWebWithdraw(webID) {
      await this.$http
        .post('panel/getbanktrnsaction', {
          agent_id: webID,
          type: 'withdraw',
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optBankWithdraw = response.data.result
            if (!this.dataWithdraw.account_withdraw) {
              this.dataWithdraw.account_withdraw = this.optBankWithdraw[0]._id
            }
            console.log(this.optBankWithdraw)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getbanktrnsaction : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getbanktrnsaction : error' + error)
        })
    },
    async submitDeposit() {
      this.validatedDeposit = true
      this.v$.dataDeposit.$validate()
      if (!this.v$.dataDeposit.$error) {
        let bank_id = ''
        if (!this.isBonusDeposit) {
          bank_id = this.dataDeposit.account_deposit
        } else {
          this.dataDeposit.account_deposit = ''
        }
        await this.$http
          .post('panel/deposit', {
            account_deposit: bank_id,
            memb_id: this.dataDeposit.memb_id,
            transaction_date: moment().format(),
            amount: this.dataDeposit.amount,
            description: this.dataDeposit.description,
          })
          .then((response) => {
            if (response.data.status == 200) {
              console.log(response.data.message + ' : ' + response.data.result)
              this.mdDeposit = false

              // clear data
              this.dataDeposit.memb_id = ''
              this.dataDeposit.amount = '0'
              this.dataDeposit.description = ''
              this.dataDeposit.account_withdraw = ''
              this.isBonusDeposit = false

              this.dataDeposit.errorVisible = false
              this.dataDeposit.errorMessage = ''

              this.validatedDeposit = false
              this.v$.$reset()
            } else if (
              response.data.status == 502 ||
              response.data.status == 503
            ) {
              this.tokenExpired().then(() => {
                this.navigateTo('/pages/login')
              })
            } else {
              this.dataDeposit.errorVisible = true
              this.dataDeposit.errorMessage = response.data.message
              console.log(
                'call api - panel/deposit : status = ' +
                  response.data.status +
                  ', message = ' +
                  response.data.message,
              )
            }
          })
          .catch((error) => {
            this.dataDeposit.errorVisible = true
            this.dataDeposit.errorMessage = error
            console.log('call api - panel/deposit : error' + error)
          })
          .finally(() => {
            this.onClicktabPaneActive(this.tabPaneActiveKey)
          })
      }
    },
    async submitWithdraw() {
      this.validatedWithdraw = true
      this.v$.dataWithdraw.$validate()
      if (!this.v$.dataWithdraw.$error) {
        let bank_id = ''
        if (!this.isBonusWithdraw) {
          bank_id = this.dataWithdraw.account_withdraw
        } else {
          this.dataWithdraw.account_withdraw = ''
        }
        await this.$http
          .post('panel/withdraw', {
            account_withdraw: bank_id,
            memb_id: this.dataWithdraw.memb_id,
            transaction_date: moment().format(),
            amount: this.dataWithdraw.amount,
            description: this.dataWithdraw.description,
          })
          .then((response) => {
            if (response.data.status == 200) {
              console.log(response.data.message + ' : ' + response.data.result)
              this.mdWithdraw = false

              // clear data
              this.dataWithdraw.memb_id = ''
              this.dataWithdraw.amount = '0'
              this.dataWithdraw.description = ''
              this.dataWithdraw.account_withdraw = ''
              this.isBonusWithdraw = false

              this.dataWithdraw.errorVisible = false
              this.dataWithdraw.errorMessage = ''

              this.validatedWithdraw = false
              this.v$.$reset()
            } else if (
              response.data.status == 502 ||
              response.data.status == 503
            ) {
              this.tokenExpired().then(() => {
                this.navigateTo('/pages/login')
              })
            } else {
              this.dataWithdraw.errorVisible = true
              this.dataWithdraw.errorMessage = response.data.message
              console.log(
                'call api - panel/withdraw : status = ' +
                  response.data.status +
                  ', message = ' +
                  response.data.message,
              )
            }
          })
          .catch((error) => {
            this.dataWithdraw.errorVisible = true
            this.dataWithdraw.errorMessage = error
            console.log('call api - panel/withdraw : error' + error)
          })
          .finally(() => {
            this.onClicktabPaneActive(this.tabPaneActiveKey)
          })
      }
    },
    async getHistory() {
      await this.$http
        .post('panel/history', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.dataHistory = response.data.result
            this.totalPage1 = Math.ceil(this.dataHistory.length / 10)
            console.log(this.dataHistory)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/history : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/history : error' + error)
        })
    },
    async getHistoryLasted() {
      await this.$http
        .post('panel/historylasted', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.dataHistoryLasted = response.data.result
            this.totalPage2 = Math.ceil(this.dataHistoryLasted.length / 10)
            console.log(this.dataHistoryLasted)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/historylasted : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/historylasted : error' + error)
        })
    },
    async submitApprove(_id, _checked, _type, _description) {
      // ไม่ได้ใช้งานแล้วเนื่องจากมีการตัดเรื่องการ check ออก
      if (_checked == null) {
        let _isfound = false
        for (var val in this.dataHistory) {
          if (this.dataHistory[val]._id == _id) {
            console.log(this.dataHistory[val]._id)
            this.dataConfirmApprove = this.dataHistory[val]
            this.errApproveVisible = false
            this.errApproveMessage = ''
            _isfound = true
            break
          }
        }
        if (!_isfound) {
          this.dataConfirmApprove = {}
          this.errApproveVisible = true
          this.errApproveMessage = 'ไม่พบรายการนี้ในระบบ'
        }
      } else {
        this.submitTransactionStatus(_id, 'approve', _type, _description)
      }
    },
    async submitTransactionStatus(
      _id,
      _status,
      _type,
      _description,
      _memb_id,
      _bank_id,
      _bank_account_id,
      _silp_image,
    ) {
      // Check, Approve, Cancel, Close
      await this.$http
        .post('panel/updatetransaction', {
          doc_id: _id,
          status: _status,
          type: _type,
          description: _description.trim(),
          memb_id: _memb_id,
          bank_id: _bank_id,
          bank_account_id: _bank_account_id,
          silp_image: _silp_image,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.providerCredit = response.data.credit_web
            // this.mdConfirmApprove = false
            this.mdManageTransaction = false
            console.log(
              'call api - panel/updatetransaction : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            // this.errApproveVisible = true
            // this.errApproveMessage = response.data.message
            this.errManageTransacVisible = true
            this.errManageTransacMessage = response.data.message
            console.log(
              'call api - panel/updatetransaction : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/updatetransaction : error' + error)
        })
        .finally(() => {
          this.getHistory()
        })
    },
    async showManageTransaction(_id, _type) {
      this.dataManageTransactionNote = ''
      await this.$http
        .post('panel/historybyId', {
          doc_id: _id,
          type: _type,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.dataManageTransaction = response.data.result
            this.getMemberList(this.dataManageTransaction.agent_id)
            this.mdManageTransaction = true
            console.log(
              'call api - panel/historybyId : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          } else if (response.data.status == 201) {
            this.errClickSameJob.user = response.data.lock.lock_by_name
            this.errClickSameJob.date = response.data.lock.lock_date
            this.mdClickSameJob = true
            this.getHistory()
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/historybyId : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/historybyId : error' + error)
        })
        .finally(() => {
          // this.getHistory()
        })
    },
    // functions
    navigateTo(route) {
      this.$router.push(route)
    },
    navigateToNewTap(route) {
      // this.$router.push(route)
      let _route = this.$router.resolve({ path: route })
      window.open(_route.href)
    },
    clickDeposit() {
      if (this.optWebAgent.length != 0) {
        if (!this.dataDeposit.web_agent_id) {
          this.dataDeposit.web_agent_id = this.optWebAgent[0]._id
        }
        this.getWebDeposit(this.dataDeposit.web_agent_id).then(() => {
          this.getMemberList(this.dataDeposit.web_agent_id)
        })
      }
      this.mdDeposit = !this.mdDeposit
    },
    clickWithdraw() {
      if (this.optWebAgent.length != 0) {
        if (!this.dataWithdraw.web_agent_id) {
          this.dataWithdraw.web_agent_id = this.optWebAgent[0]._id
        }
        this.getWebWithdraw(this.dataWithdraw.web_agent_id).then(() => {
          this.getMemberList(this.dataWithdraw.web_agent_id)
        })
      }
      this.mdWithdraw = !this.mdWithdraw
    },
    loadHistory() {
      if (this.updateHistoryAuto) {
        return
      }
      const dots = setInterval(() => {
        this.updateHistoryAutoCount = this.updateHistoryAutoCount + 1
        console.log(this.updateHistoryAutoCount)
        this.getHistory()
      }, 5000)
      this.updateHistoryAuto = dots
    },
    updateFlagAutoHistory() {
      this.flagAutoHistory = !this.flagAutoHistory
      if (this.flagAutoHistory == true) {
        this.onAutoGetHistory()
      } else {
        this.offAutoGetHistory()
      }
    },
    onAutoGetHistory() {
      this.updateHistoryAuto = null
      this.loadHistory()
    },
    offAutoGetHistory() {
      clearInterval(this.updateHistoryAuto)
    },
    onChangePage(pageOfItems) {
      this.pageOfItemsHistory = pageOfItems
    },
    onClicktabPaneActive(_index) {
      this.tabPaneActiveKey = _index
      if (_index == 1) {
        this.getHistory()
      }
      if (_index == 2) {
        this.getHistoryLasted()
      }
    },
    checkLockedTransac(_locked) {
      if (!_locked) return true
      if (_locked.lock_by != this.user.username) return false
      else {
        return true
      }
    },
    checkLockedTransacByMe(_locked) {
      if (!_locked) return false
      if (
        _locked.lock_by == this.user.username &&
        _locked.lock_status == 'lock'
      )
        return true
      else {
        return false
      }
    },
    selectedMemberOnManage({ id }) {
      console.log('id', id)
      for (let i = 0; i < this.optMemberList.length; i++) {
        if (id == this.optMemberList[i]._id) {
          console.log('loop i', this.optMemberList[i])
          // this.dataManageTransaction.memb_id =
          // this.optMemberList[i].banking_account.bank_id
          this.dataManageTransaction.from_bank_id =
            this.optMemberList[i].banking_account.bank_id
          this.dataManageTransaction.from_account_id =
            this.optMemberList[i].banking_account.account_bank_id
          this.dataManageTransaction.memb_bank =
            this.optMemberList[i].banking_account.account_number
          this.dataManageTransaction.memb_name =
            this.optMemberList[i].banking_account.account_name
          this.dataManageTransaction.memb_banking_code =
            this.optMemberList[i].banking_account.bank_code
        }
      }
    },
    // convert functions
    getImgAvatar(role, avatar) {
      try {
        return require('../../assets/images/avatars/' + role + '/' + avatar)
      } catch (err) {
        return require('../../assets/images/error-404-01.png')
      }
    },
    getBankIMG(bankCode) {
      try {
        return require('../../assets/images/banking/th/smooth-corner/' +
          bankCode +
          '.png')
      } catch (error) {
        return require('../../assets/images/error-404-01.png')
      }
    },
    convertDate(value) {
      var myDate = new Date(value)
      return moment(myDate).format('DD/MM/YYYY')
    },
    convertTime(value) {
      var myDate = new Date(value)
      return moment(myDate).format('HH:mm')
    },
    convertAmount2Degit(value) {
      return Number(value).toFixed(2)
    },
    convertType(value) {
      const _val = value.toString().toLowerCase()
      if (_val == 'deposit') {
        return 'ฝาก'
      } else if (_val == 'withdraw') {
        return 'ถอน'
      } else if (_val == 'bonus') {
        return 'โบนัส'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertTypeColor(value) {
      const _val = value.toString().toLowerCase()
      if (_val == 'deposit') {
        return 'success'
      } else if (_val == 'withdraw') {
        return 'danger'
      } else if (_val == 'bonus') {
        return 'info'
      } else {
        return 'dark'
      }
    },
    convertTypeRowsColor(value) {
      const _val = value.toString().toLowerCase()
      if (_val == 'deposit') {
        return 'success'
      } else if (_val == 'withdraw') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertHistoryStatus(value) {
      const _val = value.toString().toLowerCase()
      if (_val == 'success') {
        return 'สำเร็จ'
      } else if (_val == 'pending') {
        return 'รอดำเนินการ'
      } else if (_val == 'reject') {
        return 'ยกเลิก'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertStatusColor(value) {
      const _val = value.toString().toLowerCase()
      if (_val == 'success') {
        return 'success'
      } else if (_val == 'approve') {
        return 'success'
      } else if (_val == 'pending') {
        return 'warning'
      } else if (_val == 'save') {
        return 'warning'
      } else if (_val == 'cancel') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertMemberStatus(value) {
      if (!value) return 'ระบุไม่ได้'
      const _val = value.toString().toLowerCase()
      if (_val == 'active') {
        return 'ปกติ'
      } else if (_val == 'suspend') {
        return 'ถูกระงับ'
      } else if (_val == 'inactive') {
        return 'ไม่เคลื่อนไหว'
      } else if (_val == 'watchout') {
        return 'เฝ้าระวัง'
      } else if (_val == 'blacklist') {
        return 'แบลคลิส'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertMemberStatusColor(value) {
      if (!value) return 'info'
      const _val = value.toString().toLowerCase()
      if (_val == 'active') {
        // ปกติ
        return 'success'
      } else if (_val == 'suspend') {
        // ถูกระงับ
        return 'danger'
      } else if (_val == 'inactive') {
        // ไม่เคลื่อนไหว
        return 'secondary'
      } else if (_val == 'watchout') {
        // เฝ้าระวัง
        return 'warning'
      } else if (_val == 'blacklist') {
        // แบลคลิส
        return 'dark'
      } else {
        // ระบุไม่ได้
        return 'light'
      }
    },
    convertUserNoteColor(value) {
      if (!value) return 'danger'
      const _val = value.toString().toLowerCase()
      if (_val == 'system') {
        return 'secondary'
      } else {
        return 'primary'
      }
    },
    myChangeEvent(val) {
      console.log(val)
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text })
    },

    //prepare
    prepareOptMemberListMultiSelect(_obj) {
      let _result = []
      for (let i = 0; i < _obj.length; i++) {
        let id = _obj[i]._id
        let _txt =
          '🌐 ' +
          _obj[i].username +
          ' 🕵 ' +
          _obj[i].profile.name +
          ' ' +
          _obj[i].profile.surename +
          ' 📲 ' +
          _obj[i].profile.tel
        _result.push({ id: id, text: _txt })
      }
      return _result
    },
  },
  created() {
    if (this.tabPaneActiveKey == 1) {
      this.getHistory()
    }
    if (this.tabPaneActiveKey == 2) {
      this.getHistoryLasted()
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  mounted() {
    if (this.flagAutoHistory == true) {
      this.loadHistory()
    }
    this.getWebPrefixList()
  },
  setup() {
    return {
      v$: useVuelidate(),
      imgBank,
    }
  },
  validations() {
    return {
      dataDeposit: {
        web_agent_id: { required },
        account_deposit: {},
        memb_id: { required },
        transaction_date: {},
        transaction_time: {},
        amount: { required, numeric, validateAmount },
        description: {},
      },
      dataWithdraw: {
        web_agent_id: { required },
        account_withdraw: {},
        memb_id: { required },
        transaction_date: {},
        transaction_time: {},
        amount: { required, numeric, validateAmount },
        description: {},
      },
    }
  },
}
</script>
