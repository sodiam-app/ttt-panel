<template>
  <div class="mb-3">
    <CAccordion :active-item-key="2" always-open>
      <CAccordionItem :item-key="1">
        <CAccordionHeader>
          <CIcon :icon="ic.cilBank" class="me-1" /> บัญชีธนาคาร
        </CAccordionHeader>
        <CAccordionBody class="m-0">
          <div class="d-flex justify-content-between mb-1">
            <div class="d-inline-flex align-items-end">
              <span class="me-2 fw-semibold"> * เฉพาะสถานะเปิดใช้งาน </span>
              <CFormSwitch id="formSwitchCheckChecked" />
            </div>
            <CButton color="primary" size="sm" @click="mdAddBank = !mdAddBank">
              <CIcon :icon="ic.cilPlus" />
              เพิ่มบัญชี
            </CButton>
          </div>
          <CCard class="mb-1 border-secondary">
            <CCardBody class="p-1">
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
                      <CTableHeaderCell scope="col"
                        >เลขที่บัญชี</CTableHeaderCell
                      >
                      <CTableHeaderCell scope="col">ชื่อบัญชี</CTableHeaderCell>
                      <!-- <CTableHeaderCell scope="col">Tag</CTableHeaderCell> -->
                      <CTableHeaderCell scope="col" class="text-center">
                        Bank Auto
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" class="text-center">
                        SMS Auto
                      </CTableHeaderCell>
                      <!-- <CTableHeaderCell scope="col" class="text-center">
                    สำหรับลูกค้า
                  </CTableHeaderCell> -->
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
                    <CTableRow
                      v-for="(bank, index) in dataAllBankSetting"
                      :key="bank._id"
                    >
                      <CTableHeaderCell scope="row" class="text-center">
                        {{ index + 1 }}.
                      </CTableHeaderCell>
                      <CTableDataCell class="text-center">
                        <CIcon
                          :icon="
                            bank.bank_status == 'active'
                              ? ic.cilPowerStandby
                              : ic.cilBan
                          "
                          :class="
                            'text-' + convertBankStatusColor(bank.bank_status)
                          "
                        />
                      </CTableDataCell>
                      <CTableDataCell class="text-success">
                        <CBadge
                          :color="convertBankTypeColor(bank.type)"
                          shape="rounded-pill"
                        >
                          {{ convertBankType(bank.type) }}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CRow
                          :xs="{ cols: 'auto', gutterX: 0, gutterY: 1 }"
                          class="align-bottom"
                        >
                          <CCol xs>
                            <CImage
                              fluid
                              :src="getBankIMG(bank.bank_code)"
                              width="30"
                              class="ms-1 me-1"
                            />
                          </CCol>
                          <CCol>
                            <div class="fw-bolder">
                              {{ bank.bank_account }}
                            </div>
                            <div class="small lh-1 fw-light">
                              {{ bank.bank_name_th }}
                            </div>
                          </CCol>
                        </CRow>
                      </CTableDataCell>
                      <CTableDataCell>{{ bank.account_name }}</CTableDataCell>
                      <CTableDataCell class="text-center">
                        <CIcon
                          :icon="
                            bank.bank_auto_status == 'active'
                              ? ic.cilSun
                              : ic.cilMoon
                          "
                          :class="
                            'text-' +
                            convertAutoStatusColor(bank.sms_auto_status)
                          "
                        />
                      </CTableDataCell>
                      <CTableDataCell class="text-center">
                        <CIcon
                          :icon="
                            bank.sms_auto_status == 'active'
                              ? ic.cilSun
                              : ic.cilMoon
                          "
                          :class="
                            'text-' +
                            convertAutoStatusColor(bank.sms_auto_status)
                          "
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div class="d-block">
                          <CImage
                            fluid
                            :src="getBankCustomerIMG(bank.memb_bank)"
                            width="30"
                          />
                          <span class="small ms-1">
                            {{ getBankCustomerName(bank.memb_bank) }}
                          </span>
                        </div>
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
                          @click="mdEditBank = true"
                        >
                          <CIcon :icon="ic.cilColorBorder" class="small" />
                          แก้ไข
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </div>
            </CCardBody>
          </CCard>
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem :item-key="2">
        <CAccordionHeader>
          <CIcon :icon="ic.cilLayers" class="me-1" /> Bank Auto Transfer
        </CAccordionHeader>
        <CAccordionBody>
          <CRow>
            <!-- การฝาก -->
            <CCol xl="6">
              <CCard class="mb-1">
                <CCardBody class="py-2 bg-success text-center rounded-top">
                  <span class="fw-bolder">การฝาก</span>
                  <span class="small text-muted" style="font-size: 0.69em">
                    (2/3 บัญชี)
                  </span>
                  <CButton
                    color="light"
                    size="sm"
                    variant="outline"
                    shape="rounded-pill"
                    class="float-end"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <!-- ไม่พบรายการฝาก -->
              <CAlert color="warning" v-if="false">
                <CIcon size="lg" :icon="ic.cilWarning" />
                ไม่พบข้อมูลบัญชีฝากที่ถูกตั้งค่าไว้
              </CAlert>
              <!-- Demo account 1-->
              <CCard
                v-for="(depositBankAuto, index) in dataBankAutoDepositSetting"
                :key="depositBankAuto._id"
                class="mb-1 border-success"
              >
                <CCardHeader>
                  <div class="d-flex justify-content-between align-self-end">
                    <CImage
                      fluid
                      :src="getBankIMG(depositBankAuto.bank.bank_code)"
                      width="30"
                      class="ms-1 me-1"
                    />
                    <div class="align-self-center">
                      <span class="fs-6">
                        <CIcon
                          :class="
                            depositBankAuto.bank.bank_auto_status == 'active'
                              ? 'text-success'
                              : 'text-secondary'
                          "
                          :icon="
                            depositBankAuto.bank.bank_auto_status == 'active'
                              ? ic.cilSun
                              : ic.cilMoon
                          "
                        />
                        บัญชีที่ {{ index + 1 }}
                      </span>
                      <span
                        class="small font-monospace"
                        v-if="!depositBankAuto.flagShow"
                      >
                        ({{ depositBankAuto.bank.bank_account }})
                      </span>
                    </div>
                    <div>
                      <span v-if="depositBankAuto.flagShow">
                        <CButton
                          size="sm"
                          color="warning"
                          variant="outline"
                          class="ms-1"
                          @click="
                            depositBankAuto.flagEdit = !depositBankAuto.flagEdit
                          "
                          v-if="depositBankAuto.flagEdit == false"
                        >
                          <CIcon size="sm" :icon="ic.cilColorBorder" />
                        </CButton>
                        <CButton
                          size="sm"
                          color="success"
                          class="ms-1"
                          @click="
                            depositBankAuto.flagEdit = !depositBankAuto.flagEdit
                          "
                          v-else
                        >
                          <CIcon size="sm" :icon="ic.cilSave" />
                        </CButton>
                        <CButton size="sm" color="danger" class="ms-1">
                          <CIcon size="sm" :icon="ic.cilTrash" />
                        </CButton>
                      </span>
                      <CButton
                        size="sm"
                        color="light"
                        class="ms-3"
                        @click="
                          depositBankAuto.flagShow = !depositBankAuto.flagShow
                        "
                      >
                        <CIcon
                          size="sm"
                          :icon="ic.cilFullscreenExit"
                          v-if="depositBankAuto.flagShow"
                        />
                        <CIcon size="sm" :icon="ic.cilFullscreen" v-else />
                      </CButton>
                    </div>
                  </div>
                </CCardHeader>
                <CListGroup flush>
                  <CListGroupItem class="small" v-if="depositBankAuto.flagShow">
                    <CRow>
                      <CCol>
                        <div class="d-inline-flex align-items-center mb-2">
                          <span class="me-2 fw-semibold"> เปิดใช้งาน </span>
                          <CFormSwitch
                            id="formSwitchCheckChecked"
                            :checked="checkedBankAutoSetting(depositBankAuto)"
                            @change="
                              onchgBankAutoDepositSetting(
                                depositBankAuto.bank._id,
                              )
                            "
                            :disabled="!depositBankAuto.flagEdit"
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            เลขที่บัญชี
                          </label>
                          <CFormInput
                            type="text"
                            id="cFName"
                            v-model="depositBankAuto.bank.bank_account"
                            disabled
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            ชื่อบัญชี
                          </label>
                          <CFormInput
                            type="text"
                            id="cLName"
                            v-model="depositBankAuto.bank.account_name"
                            disabled
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            Username *
                          </label>
                          <CFormInput
                            type="text"
                            id="cFName"
                            v-model="
                              depositBankAuto.bank.bank_auto_config.username
                            "
                            :disabled="!depositBankAuto.flagEdit"
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            Password *
                          </label>
                          <CInputGroup>
                            <CFormInput
                              type="password"
                              id="cLName"
                              v-model="
                                depositBankAuto.bank.bank_auto_config.password
                              "
                              :disabled="!depositBankAuto.flagEdit"
                            />
                            <CButton
                              type="button"
                              color="secondary"
                              class="border-secondary"
                              :disabled="!depositBankAuto.flagEdit"
                            >
                              <CIcon :icon="ic.cilLockLocked" />
                            </CButton>
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            QR Code
                            <span class="small text-muted">
                              (สำหรับแสดงที่หน้าจอลูกค้า)
                            </span>
                          </label>
                          <div class="clearfix mb-2">
                            <CImage
                              align="center"
                              class="border"
                              height="150"
                              rounded
                              :src="
                                depositBankAuto.bank.bank_auto_config.qr_code
                              "
                            />
                          </div>
                          <div>
                            <CButton
                              color="dark"
                              size="sm"
                              shape="rounded-pill"
                              variant="outline"
                              @click="$refs.fileInput.click()"
                              :disabled="!depositBankAuto.flagEdit"
                            >
                              <CIcon :icon="ic.cilCloudUpload" />
                              อัพโหลด
                            </CButton>
                            <input
                              style="display: none"
                              type="file"
                              class="form-control form-control-sm"
                              ref="fileInput"
                              @change="pickFile"
                            />
                          </div>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            โน้ต
                          </label>
                          <CFormTextarea
                            rows="3"
                            text="สามารถระบุได้"
                            v-model="depositBankAuto.bank.bank_auto_config.note"
                            :disabled="!depositBankAuto.flagEdit"
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                  <!-- <CListGroupItem>ตัวเลือกอื่น ๆ</CListGroupItem> -->
                </CListGroup>
              </CCard>
            </CCol>
            <!-- การถอน -->
            <CCol xl="6">
              <CCard class="mb-1">
                <CCardBody class="py-2 bg-danger text-center rounded-top">
                  <span class="fw-bolder">การถอน</span>
                  <span class="small text-muted" style="font-size: 0.69em">
                    (1/1 บัญชี)
                  </span>
                  <CButton
                    color="light"
                    size="sm"
                    variant="outline"
                    shape="rounded-pill"
                    class="float-end"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <!-- ไม่พบรายการฝาก -->
              <CAlert color="warning" v-if="false">
                <CIcon size="lg" :icon="ic.cilWarning" />
                ไม่พบข้อมูลบัญชีถอนที่ถูกตั้งค่าไว้
              </CAlert>
              <!-- Demo account 1-->
              <CCard
                v-for="(withdrawBankAuto, index) in dataBankAutoWithdrawSetting"
                :key="withdrawBankAuto._id"
                class="mb-1 border-danger"
              >
                <CCardHeader>
                  <div class="d-flex justify-content-between align-self-end">
                    <CImage
                      fluid
                      :src="getBankIMG(withdrawBankAuto.bank.bank_code)"
                      width="30"
                      class="ms-1 me-1"
                    />
                    <div class="align-self-center">
                      <span class="fs-6">
                        <CIcon
                          :class="
                            withdrawBankAuto.bank.bank_auto_status == 'active'
                              ? 'text-success'
                              : 'text-secondary'
                          "
                          :icon="
                            withdrawBankAuto.bank.bank_auto_status == 'active'
                              ? ic.cilSun
                              : ic.cilMoon
                          "
                        />
                        บัญชีที่ {{ index + 1 }}
                      </span>
                      <span
                        class="small font-monospace"
                        v-if="!withdrawBankAuto.flagShow"
                      >
                        ({{ withdrawBankAuto.bank.bank_account }})
                      </span>
                    </div>
                    <div>
                      <span v-if="withdrawBankAuto.flagShow">
                        <CButton
                          size="sm"
                          color="warning"
                          variant="outline"
                          class="ms-1"
                          @click="
                            withdrawBankAuto.flagEdit =
                              !withdrawBankAuto.flagEdit
                          "
                          v-if="withdrawBankAuto.flagEdit == false"
                        >
                          <CIcon size="sm" :icon="ic.cilColorBorder" />
                        </CButton>
                        <CButton
                          size="sm"
                          color="success"
                          class="ms-1"
                          @click="
                            withdrawBankAuto.flagEdit =
                              !withdrawBankAuto.flagEdit
                          "
                          v-else
                        >
                          <CIcon size="sm" :icon="ic.cilSave" />
                        </CButton>
                        <CButton size="sm" color="danger" class="ms-1">
                          <CIcon size="sm" :icon="ic.cilTrash" />
                        </CButton>
                      </span>
                      <CButton
                        size="sm"
                        color="light"
                        class="ms-3"
                        @click="
                          withdrawBankAuto.flagShow = !withdrawBankAuto.flagShow
                        "
                      >
                        <CIcon
                          size="sm"
                          :icon="ic.cilFullscreenExit"
                          v-if="withdrawBankAuto.flagShow"
                        />
                        <CIcon size="sm" :icon="ic.cilFullscreen" v-else />
                      </CButton>
                    </div>
                  </div>
                </CCardHeader>
                <CListGroup flush>
                  <CListGroupItem
                    class="small"
                    v-if="withdrawBankAuto.flagShow"
                  >
                    <CRow>
                      <CCol>
                        <div class="d-inline-flex align-items-center mb-2">
                          <span class="me-2 fw-semibold"> เปิดใช้งาน </span>
                          <CFormSwitch
                            id="formSwitchCheckChecked"
                            :checked="checkedBankAutoSetting(withdrawBankAuto)"
                            @change="
                              onchgBankAutoWithdrawSetting(
                                withdrawBankAuto.bank._id,
                              )
                            "
                            :disabled="!withdrawBankAuto.flagEdit"
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            เลขที่บัญชี
                          </label>
                          <CFormInput
                            type="text"
                            id="cFName"
                            v-model="withdrawBankAuto.bank.bank_account"
                            disabled
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            ชื่อบัญชี
                          </label>
                          <CFormInput
                            type="text"
                            id="cLName"
                            v-model="withdrawBankAuto.bank.account_name"
                            disabled
                          />
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cFName" class="form-label mb-0">
                            Username *
                          </label>
                          <CFormInput
                            type="text"
                            id="cFName"
                            v-model="
                              withdrawBankAuto.bank.bank_auto_config.username
                            "
                            :disabled="!withdrawBankAuto.flagEdit"
                          />
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            Password *
                          </label>
                          <CInputGroup>
                            <CFormInput
                              type="password"
                              id="cLName"
                              v-model="
                                withdrawBankAuto.bank.bank_auto_config.password
                              "
                              :disabled="!withdrawBankAuto.flagEdit"
                            />
                            <CButton
                              type="button"
                              color="secondary"
                              class="border-secondary"
                              :disabled="!withdrawBankAuto.flagEdit"
                            >
                              <CIcon :icon="ic.cilLockLocked" />
                            </CButton>
                          </CInputGroup>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow class="mb-2">
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            SMS Device *
                            <span class="small text-muted">
                              (สำหรับใช้งาน OTP)
                            </span>
                          </label>
                          <CFormSelect
                            v-model="
                              withdrawBankAuto.bank.bank_auto_config.push_bullet
                            "
                            :disabled="!withdrawBankAuto.flagEdit"
                          >
                            <option value="SMS1">SMS1</option>
                            <option value="SMS2">SMS2</option>
                            <option value="DEMO01">DEMO01</option>
                          </CFormSelect>
                        </div>
                      </CCol>
                      <CCol md="6">
                        <div>
                          <label for="cLName" class="form-label mb-0">
                            โน้ต
                          </label>
                          <CFormTextarea
                            rows="3"
                            text="สามารถระบุได้"
                            v-model="
                              withdrawBankAuto.bank.bank_auto_config.note
                            "
                            :disabled="!withdrawBankAuto.flagEdit"
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    </CRow>
                  </CListGroupItem>
                  <!-- <CListGroupItem>ตัวเลือกอื่น ๆ</CListGroupItem> -->
                </CListGroup>
              </CCard>
            </CCol>
          </CRow>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  </div>

  <!-- ----- -->
  <!-- เพิ่มบัญชี -->
  <!-- ------ -->
  <CModal
    size="lg"
    backdrop="static"
    :visible="mdAddBank"
    @close="
      () => {
        mdAddBank = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle class="fw-lighter">
        <strong>
          <span class="h5">
            <CIcon size="lg" :icon="ic.cilLibraryAdd" />
            เพิ่มบัญชีธนาคาร
          </span>
        </strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard>
        <CCardBody>
          <CCardText>
            <div>
              <CRow>
                <CCol>
                  <div class="d-inline-flex align-items-center mb-2">
                    <span class="me-2 fw-semibold"> เปิดใช้งาน * </span>
                    <CFormSwitch id="formSwitchCheckChecked" checked />
                  </div>
                </CCol>
              </CRow>
              <hr class="mt-0 mb-2" />
              <CRow>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cBanking" class="form-label mb-0">
                      ประเภท *
                    </label>
                    <CInputGroup>
                      <CInputGroupText
                        :class="
                          dataAddBank.type == 'deposit'
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        <CIcon :icon="ic.cibDiscover" />
                      </CInputGroupText>
                      <CFormSelect v-model="dataAddBank.type">
                        <option value="deposit">ฝาก</option>
                        <option value="withdraw">ถอน</option>
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cBanking" class="form-label mb-0">
                      ธนาคาร *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CImage fluid :src="dataAddBank.bank_img" width="22" />
                      </CInputGroupText>
                      <CFormSelect
                        v-model="dataAddBank.bank_id"
                        @change="onchgBankingAdd($event.target.value)"
                      >
                        <option value="">กรุณาเลือกธนาคาร</option>
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
              <CRow>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cFName" class="form-label mb-0">
                      เลขที่บัญชี *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon :icon="ic.cilCreditCard" />
                      </CInputGroupText>
                      <CFormInput type="text" id="cFName" />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cLName" class="form-label mb-0">
                      ชื่อบัญชี *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon :icon="ic.cilContact" />
                      </CInputGroupText>
                      <CFormInput type="text" id="cLName" />
                    </CInputGroup>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  <CRow>
                    <CCol class="mb-2">
                      <div>
                        <label for="cBanking" class="form-label mb-0">
                          ธนาคารลูกค้า *
                        </label>
                        <CInputGroup>
                          <CInputGroupText>
                            <CImage
                              fluid
                              :src="dataAddBank.memb_bank_img"
                              width="22"
                            />
                          </CInputGroupText>
                          <CFormSelect
                            v-model="dataAddBank.memb_bank"
                            @change="onchgBankingMemberAdd($event.target.value)"
                          >
                            <option value="all">ทั้งหมด</option>
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
                  <CRow>
                    <CCol class="mb-2">
                      <div>
                        <label for="aNote" class="form-label mb-0">
                          โน้ต
                        </label>
                        <CFormTextarea
                          id="aNote"
                          rows="2"
                          text="สามารถระบุได้"
                          v-model="dataAddBank.description"
                        ></CFormTextarea>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="aNote" class="form-label mb-0">
                      คลาส
                      <span class="small text-muted">
                        (กำหนดเพื่อระบุกลุ่มของลูกค้า)
                      </span>
                    </label>
                    <CMultiSelect
                      :options="optPrivilegeAdd"
                      placeholder="กรุณาเลือกคลาสบัญชี"
                      select-all-label="เลือกทั้งหมด"
                      search-no-results-label="ไม่พบข้อมูล"
                      selection-type="tags"
                      selection-type-counter-text="คลาส ที่เลือกไว้"
                    />
                  </div>
                </CCol>
              </CRow>
            </div>
            <hr />
            <div class="text-end">
              <CButton size="sm" color="success" class="ms-1 text-light">
                <CIcon :icon="ic.cilCheckCircle" />
                เพิ่มบัญชี
              </CButton>
              <CButton
                size="sm"
                color="secondary"
                class="text-light ms-1"
                @click="
                  () => {
                    mdAddBank = false
                  }
                "
              >
                <CIcon :icon="ic.cilXCircle" />
                ปิด
              </CButton>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- แก้ไขบัญชี -->
  <!-- ------ -->
  <CModal
    size="lg"
    backdrop="static"
    :visible="mdEditBank"
    @close="
      () => {
        mdEditBank = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle class="fw-lighter">
        <strong>
          <span class="h5">
            <CIcon size="lg" :icon="ic.cilColorBorder" />
            แก้ไขบัญชีธนาคาร
          </span>
        </strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard>
        <CCardBody>
          <CCardText>
            <div>
              <CRow>
                <CCol>
                  <div class="d-inline-flex align-items-center mb-2">
                    <span class="me-2 fw-semibold"> เปิดใช้งาน * </span>
                    <CFormSwitch id="formSwitchCheckChecked" checked />
                  </div>
                </CCol>
              </CRow>
              <hr class="mt-0 mb-2" />
              <CRow>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cBanking" class="form-label mb-0">
                      ประเภท *
                    </label>
                    <CInputGroup>
                      <CInputGroupText
                        :class="
                          dataEditBank.type == 'deposit'
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        <CIcon :icon="ic.cibDiscover" />
                      </CInputGroupText>
                      <CFormSelect v-model="dataEditBank.type">
                        <option value="deposit">ฝาก</option>
                        <option value="withdraw">ถอน</option>
                      </CFormSelect>
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cBanking" class="form-label mb-0">
                      ธนาคาร *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CImage fluid :src="dataEditBank.bank_img" width="22" />
                      </CInputGroupText>
                      <CFormSelect
                        v-model="dataEditBank.bank_id"
                        @change="onchgBankingEdit($event.target.value)"
                      >
                        <option value="">กรุณาเลือกธนาคาร</option>
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
              <CRow>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cFName" class="form-label mb-0">
                      เลขที่บัญชี *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon :icon="ic.cilCreditCard" />
                      </CInputGroupText>
                      <CFormInput type="text" id="cFName" />
                    </CInputGroup>
                  </div>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="cLName" class="form-label mb-0">
                      ชื่อบัญชี *
                    </label>
                    <CInputGroup>
                      <CInputGroupText>
                        <CIcon :icon="ic.cilContact" />
                      </CInputGroupText>
                      <CFormInput type="text" id="cLName" />
                    </CInputGroup>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol md="6">
                  <CRow>
                    <CCol class="mb-2">
                      <div>
                        <label for="cBanking" class="form-label mb-0">
                          ธนาคารลูกค้า *
                        </label>
                        <CInputGroup>
                          <CInputGroupText>
                            <CImage
                              fluid
                              :src="dataEditBank.memb_bank_img"
                              width="22"
                            />
                          </CInputGroupText>
                          <CFormSelect
                            v-model="dataEditBank.memb_bank"
                            @change="
                              onchgBankingMemberEdit($event.target.value)
                            "
                          >
                            <option value="all">ทั้งหมด</option>
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
                  <CRow>
                    <CCol class="mb-2">
                      <div>
                        <label for="aNote" class="form-label mb-0">
                          โน้ต
                        </label>
                        <CFormTextarea
                          id="aNote"
                          rows="2"
                          text="สามารถระบุได้"
                          v-model="dataEditBank.description"
                        ></CFormTextarea>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol md="6" class="mb-2">
                  <div>
                    <label for="aNote" class="form-label mb-0">
                      คลาส
                      <span class="small text-muted">
                        (กำหนดเพื่อระบุกลุ่มของลูกค้า)
                      </span>
                    </label>
                    <CMultiSelect
                      :options="optPrivilegeEdit"
                      placeholder="กรุณาเลือกคลาสบัญชี"
                      select-all-label="เลือกทั้งหมด"
                      search-no-results-label="ไม่พบข้อมูล"
                      selection-type="tags"
                      selection-type-counter-text="คลาส ที่เลือกไว้"
                    />
                  </div>
                </CCol>
              </CRow>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>
                <CButton size="sm" color="danger" class="ms-1 text-light">
                  <CIcon :icon="ic.cilTrash" />
                  ลบ
                </CButton>
              </div>
              <div>
                <CButton size="sm" color="success" class="ms-1 text-light">
                  <CIcon :icon="ic.cilCheckCircle" />
                  ยืนยัน
                </CButton>
                <CButton
                  size="sm"
                  color="secondary"
                  class="text-light ms-1"
                  @click="
                    () => {
                      mdEditBank = false
                    }
                  "
                >
                  <CIcon :icon="ic.cilXCircle" />
                  ปิด
                </CButton>
              </div>
            </div>
          </CCardText>
        </CCardBody>
      </CCard>
    </CModalBody>
  </CModal>

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
import { CIcon } from '@coreui/icons-vue'
import {
  cibDiscover,
  cilAsteriskCircle,
  cilBank,
  cilBan,
  cilColorBorder,
  cilPowerStandby,
  cilMediaRecord,
  cilLayers,
  cilMoon,
  cilSun,
  cilPlus,
  cilZoomOut,
  cilZoomIn,
  cilCaretTop,
  cilCaretBottom,
  cilLockLocked,
  cilFullscreenExit,
  cilFullscreen,
  cilTrash,
  cilWarning,
  cilCheckCircle,
  cilXCircle,
  cilFeaturedPlaylist,
  cilCreditCard,
  cilContact,
  cilLibraryAdd,
  cilSave,
  cilCloudUpload,
} from '@coreui/icons'

import avatar from '@/assets/images/avatars/owner/02.png'
import { mapActions } from 'vuex'

export default {
  components: {},
  name: 'Setting Bank Account',
  comments: {
    CIcon,
  },
  data() {
    return {
      previewImage: null,
      toasts: [],

      mdAddBank: false,
      mdEditBank: false,

      currentWebAgent: '',
      dataAllBankSetting: [],
      dataAddBank: {
        agent_id: this.currentWebAgent,
        bank_id: '',
        bank_img: '',
        bank_account_number: '',
        bank_account_name: '',
        memb_bank: 'all',
        memb_bank_img: '',
        description: '',
        status: 'active',
        type: 'deposit',
      },
      dataEditBank: {
        agent_id: this.currentWebAgent,
        bank_id: '',
        bank_img: '',
        bank_account_number: '',
        bank_account_name: '',
        memb_bank: 'all',
        memb_bank_img: '',
        description: '',
        status: 'active',
        type: 'deposit',
      },
      dataBankAutoDepositSetting: [
        {
          flagShow: false,
          flagEdit: false,
          bank: {
            _id: '62a76285b4839cabb5622daa',
            bank_id: '62ae1de41fa4c734108a7763',
            bank_account: '222222222',
            account_name: 'นาย4506 45056',
            bank_name_th: 'ธนาคารเกียรตินาคินภัทร',
            bank_name_en: 'kkp',
            bank_code: 'kkp',
            description: '',
            bank_status: 'active',
            type: 'deposit',
            sub_type: 'deposit',
            memb_bank: null,
            bank_auto_status: 'active',
            bank_auto_config: {
              username: 'natkingsize2',
              password: '12345678',
              note: 'บัญชีฝากหลัก',
              qr_code: '',
            },
            sms_auto_status: 'inactive',
            sms_auto_config: null,
            privilege: null,
          },
        },
        {
          flagShow: false,
          flagEdit: false,
          bank: {
            _id: '62a76285b4839cabb5622daa',
            bank_id: '62ae1de41fa4c734108a7763',
            bank_account: '0993848273',
            account_name: 'สมใจ จริงจริง',
            bank_name_th: 'ธนาคารกสิกรไทย',
            bank_name_en: 'kbank',
            bank_code: 'kbank',
            description: '',
            bank_status: 'active',
            type: 'deposit',
            sub_type: 'deposit',
            memb_bank: null,
            bank_auto_status: 'suspend',
            bank_auto_config: {
              username: 'natkingsize2',
              password: '12345678',
              note: 'จดข้อมูล',
              qr_code: '',
            },
            sms_auto_status: 'inactive',
            sms_auto_config: null,
            privilege: null,
          },
        },
      ],
      dataBankAutoWithdrawSetting: [
        {
          flagShow: false,
          flagEdit: false,
          bank: {
            _id: '62a76285b4839cabb5622daa',
            bank_id: '62ae1de41fa4c734108a7763',
            bank_account: '0938884717',
            account_name: 'สมหมาย ใจหมา',
            bank_name_th: 'ธนาคารทหารไทยธนชาติ',
            bank_name_en: 'ttb',
            bank_code: 'ttb',
            description: '',
            bank_status: 'active',
            type: 'withdraw',
            sub_type: 'withdraw',
            memb_bank: null,
            bank_auto_status: 'active',
            bank_auto_config: {
              username: 'paponwut.wut',
              password: '009398477',
              note: 'บัญชีถอนตัวหลัก',
              push_bullet: 'SMS1',
            },
            sms_auto_status: 'inactive',
            sms_auto_config: null,
            privilege: null,
          },
        },
      ],

      optWebAgent: [],
      optAllBank: [],
      optPrivilegeAdd: [
        {
          value: 0,
          text: 'normal',
          selected: true,
        },
        {
          value: 1,
          text: 'vip1',
          selected: true,
        },
        {
          value: 2,
          text: 'vip2',
          selected: true,
        },
        {
          value: 3,
          text: 'vvip1',
          selected: true,
        },
        {
          value: 4,
          text: 'vvip2',
          selected: true,
        },
        {
          value: 5,
          text: 'vvip3',
          selected: true,
        },
      ],
      optPrivilegeEdit: [
        {
          value: 0,
          text: 'normal',
          selected: true,
        },
        {
          value: 1,
          text: 'vip1',
          selected: true,
        },
        {
          value: 2,
          text: 'vip2',
          selected: true,
        },
        {
          value: 3,
          text: 'vvip1',
          selected: true,
        },
        {
          value: 4,
          text: 'vvip2',
          selected: true,
        },
        {
          value: 5,
          text: 'vvip3',
          selected: true,
        },
      ],

      avatar: avatar,
      ic: {
        cibDiscover,
        cilAsteriskCircle,
        cilBank,
        cilBan,
        cilColorBorder,
        cilPowerStandby,
        cilMediaRecord,
        cilLayers,
        cilMoon,
        cilSun,
        cilPlus,
        cilZoomOut,
        cilZoomIn,
        cilCaretTop,
        cilCaretBottom,
        cilLockLocked,
        cilFullscreenExit,
        cilFullscreen,
        cilTrash,
        cilWarning,
        cilCheckCircle,
        cilXCircle,
        cilFeaturedPlaylist,
        cilCreditCard,
        cilContact,
        cilLibraryAdd,
        cilSave,
        cilCloudUpload,
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
    //api
    async getWebPrefixList() {
      await this.$http
        .post('panel/getprefix', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.optWebAgent = response.data.result_perfix
            this.currentWebAgent = this.optWebAgent[0]._id
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
    async getAllBank() {
      await this.$http
        .post('panel/getbanking', {
          status: 'active',
        })
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
    async getAllBankSetting() {
      await this.$http
        .post('panel/getallbanksetting', { agent_id: this.currentWebAgent })
        .then((response) => {
          if (response.data.status == 200) {
            this.dataAllBankSetting = response.data.result
            console.log(this.dataAllBankSetting)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getallbanksetting : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getallbanksetting : error' + error)
        })
    },

    // functions
    convertBankType(_type) {
      let type = _type.toString().toLowerCase()
      if (type == 'deposit') {
        return 'ฝาก'
      } else if (type == 'withdraw') {
        return 'ถอน'
      } else {
        return 'ระบุไม่ได้'
      }
    },
    convertBankTypeColor(_type) {
      let type = _type.toString().toLowerCase()
      if (type == 'deposit') {
        return 'success'
      } else if (type == 'withdraw') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertBankStatusColor(_status) {
      let status = _status.toString().toLowerCase()
      if (status == 'active') {
        return 'success'
      } else if (status == 'inactive') {
        return 'danger'
      } else {
        return 'dark'
      }
    },
    convertAutoStatusColor(_status) {
      let status = _status.toString().toLowerCase()
      if (status == 'active') {
        return 'success'
      } else if (status == 'inactive') {
        return 'secondary'
      } else {
        return 'dark'
      }
    },
    getBankIMG(_bankCode) {
      try {
        return require('../../../assets/images/banking/th/smooth-corner/' +
          _bankCode +
          '.png')
      } catch (error) {
        return require('../../../assets/images/error-404-01.png')
      }
    },
    getBankCustomerIMG(_memb_bank) {
      try {
        if (_memb_bank) {
          return require('../../../assets/images/banking/th/smooth-corner/' +
            _memb_bank.memb_bank_code +
            '.png')
        } else {
          return require('../../../assets/images/banking/th/smooth-corner/all.png')
        }
      } catch (error) {
        return require('../../../assets/images/error-404-01.png')
      }
    },
    getBankCustomerName(_memb_bank) {
      if (_memb_bank) {
        return _memb_bank.memb_bank_nameth
      } else {
        return 'ทั้งหมด'
      }
    },
    onchgBankingAdd(_id) {
      this.dataAddBank.bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code) {
        try {
          this.dataAddBank.bank_img = require('../../../assets/images/banking/th/smooth-corner/' +
            bank_code +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgBankingMemberAdd(_id) {
      this.dataAddBank.memb_bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code || _id == 'all') {
        try {
          if (_id == 'all') {
            this.dataAddBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')
          } else {
            this.dataAddBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/' +
              bank_code +
              '.png')
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgBankingEdit(_id) {
      this.dataEditBank.bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code) {
        try {
          this.dataEditBank.bank_img = require('../../../assets/images/banking/th/smooth-corner/' +
            bank_code +
            '.png')
        } catch (err) {
          console.log(err)
        }
      }
    },
    onchgBankingMemberEdit(_id) {
      this.dataEditBank.memb_bank_img = ''
      let bank_code = null
      for (let i = 0; i < this.optAllBank.length; i++) {
        if (this.optAllBank[i]._id == _id) {
          bank_code = this.optAllBank[i].bankcode
          break
        }
      }
      if (bank_code || _id == 'all') {
        try {
          if (_id == 'all') {
            this.dataEditBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')
          } else {
            this.dataEditBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/' +
              bank_code +
              '.png')
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    checkedBankAutoSetting(opj) {
      if (opj.bank.bank_auto_status == 'active') {
        return true
      } else {
        return false
      }
    },
    onchgBankAutoDepositSetting(_id) {
      for (let i = 0; i < this.dataBankAutoDepositSetting.length; i++) {
        if (this.dataBankAutoDepositSetting[i].bank._id == _id) {
          if (
            this.dataBankAutoDepositSetting[i].bank.bank_auto_status == 'active'
          ) {
            this.dataBankAutoDepositSetting[i].bank.bank_auto_status = 'suspend'
          } else {
            this.dataBankAutoDepositSetting[i].bank.bank_auto_status = 'active'
          }
        }
      }
    },
    onchgBankAutoWithdrawSetting(_id) {
      for (let i = 0; i < this.dataBankAutoWithdrawSetting.length; i++) {
        if (this.dataBankAutoWithdrawSetting[i].bank._id == _id) {
          if (
            this.dataBankAutoWithdrawSetting[i].bank.bank_auto_status ==
            'active'
          ) {
            this.dataBankAutoWithdrawSetting[i].bank.bank_auto_status =
              'suspend'
          } else {
            this.dataBankAutoWithdrawSetting[i].bank.bank_auto_status = 'active'
          }
        }
      }
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
          this.dataBankAutoDepositSetting[0].bank.bank_auto_config.qr_code =
            reader.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
  },
  mounted() {
    this.getWebPrefixList().then(() => {
      this.getAllBankSetting()
    })
    this.getAllBank()

    // Setup
    this.dataAddBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')
    this.dataEditBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')

    // Mockup
    // this.mdEditBank = true
  },
  setup() {
    return {
      imgBank,
    }
  },
}
</script>
