<template>
  <div class="mb-3">
    <CAccordion :active-item-key="3" always-open>
      <CAccordionItem :item-key="1" aria-expanded="true">
        <CAccordionHeader>
          <CIcon :icon="ic.cilBank" class="me-1" /> บัญชีธนาคาร
        </CAccordionHeader>
        <CAccordionBody class="m-0">
          <div class="d-flex justify-content-between mb-1">
            <div class="d-inline-flex align-items-end">
              <span class="me-2 fw-semibold"> * เฉพาะสถานะเปิดใช้งาน </span>
              <CFormSwitch
                id="formSwitchCheckChecked"
                v-model="visibleOfActiveBank"
              />
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
                      v-show="
                        visibleOfActiveBank == false ||
                        (visibleOfActiveBank == true &&
                          bank.bank_status == 'active')
                      "
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
                      <CTableDataCell>
                        <span class="text-success">
                          <CBadge
                            :color="convertBankTypeColor(bank.type)"
                            shape="rounded-pill"
                          >
                            {{ convertBankType(bank.type) }}
                          </CBadge>
                        </span>
                        <CIcon
                          v-show="bank.qr_code"
                          :icon="ic.cilQrCode"
                          class="ms-1"
                        />
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
                          @click="clickShowEdit(bank._id)"
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
                    @click="clickAddBankAuto('deposit')"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <!-- ไม่พบรายการฝาก -->
              <CAlert
                color="danger"
                class="py-2 text-center"
                v-if="dataBankAutoDepositSetting.length == 0"
              >
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
                            actUpdateBankAuto(
                              depositBankAuto.bank.bank_auto_status,
                              depositBankAuto,
                            )
                          "
                          v-else
                        >
                          <CIcon size="sm" :icon="ic.cilSave" />
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          class="ms-1"
                          @click="
                            clickDeleteBankOrBankAuto(
                              'bankAuto',
                              depositBankAuto,
                            )
                          "
                        >
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
                      <!-- <CCol md="6">
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
                              accept=".png, .jpg, jpeg"
                              type="file"
                              class="form-control form-control-sm"
                              ref="fileInput"
                              @change="pickFile"
                            />
                          </div>
                        </div>
                      </CCol> -->
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
                    @click="clickAddBankAuto('withdraw')"
                  >
                    <CIcon :icon="ic.cilPlus" />
                    เพิ่ม
                  </CButton>
                </CCardBody>
              </CCard>
              <!-- ไม่พบรายการฝาก -->
              <CAlert
                color="danger"
                class="py-2 text-center"
                v-if="dataBankAutoWithdrawSetting.length == 0"
              >
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
                            actUpdateBankAuto(
                              withdrawBankAuto.bank.bank_auto_status,
                              withdrawBankAuto,
                            )
                          "
                          v-else
                        >
                          <CIcon size="sm" :icon="ic.cilSave" />
                        </CButton>
                        <CButton
                          size="sm"
                          color="danger"
                          class="ms-1"
                          @click="
                            clickDeleteBankOrBankAuto(
                              'bankAuto',
                              withdrawBankAuto,
                            )
                          "
                        >
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
                            <option value="">กรุณาเลือก</option>
                            <option
                              v-for="option in optPushBullet"
                              :key="option._id"
                              :value="option._id"
                            >
                              {{ option.name }}
                            </option>
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
      <CAccordionItem :item-key="3">
        <CAccordionHeader>
          <CIcon :icon="ic.cilSpeech" class="me-1" /> SMS Auto Transfer
        </CAccordionHeader>
        <CAccordionBody> ยังไม่พร้อมใช้งาน </CAccordionBody>
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
                    <CFormSwitch
                      id="formSwitchCheckChecked"
                      :checked="checkedStatusBank(dataAddBank.status)"
                      @change="onchgStatusAddBank(dataAddBank.status)"
                    />
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
                      <CFormSelect
                        v-model="dataAddBank.type"
                        @change="dataAddBank.qr_code = ''"
                      >
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
                      <CFormInput
                        type="text"
                        id="cFName"
                        v-model="dataAddBank.bank_account_number"
                      />
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
                      <CFormInput
                        type="text"
                        id="cLName"
                        v-model="dataAddBank.bank_account_name"
                      />
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
                    <CCol>
                      <div class="mb-2">
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
                  <div class="mb-2">
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
                  <div v-show="dataAddBank.type == 'deposit'">
                    <label class="form-label mb-1">
                      QR Code
                      <span class="small text-muted">
                        (สำหรับแสดงที่หน้าจอลูกค้า)
                      </span>
                    </label>
                    <div class="clearfix mb-2" v-if="dataAddBank.qr_code">
                      <CImage
                        align="center"
                        class="border"
                        height="150"
                        rounded
                        :src="dataAddBank.qr_code"
                      />
                    </div>
                    <div class="text-center">
                      <CButton
                        color="dark"
                        size="sm"
                        shape="rounded-pill"
                        variant="outline"
                        @click="$refs.fileInput.click()"
                      >
                        <CIcon :icon="ic.cilCloudUpload" />
                        อัพโหลด
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        shape="rounded-pill"
                        variant="outline"
                        class="ms-2"
                        @click="dataAddBank.qr_code = ''"
                        v-if="dataAddBank.qr_code"
                      >
                        <CIcon :icon="ic.cilTrash" />
                        ลบ
                      </CButton>
                      <input
                        style="display: none"
                        type="file"
                        accept=".png, .jpg, jpeg"
                        class="form-control form-control-sm"
                        ref="fileInput"
                        @change="pickFile('add')"
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
            <hr />
            <div class="text-end">
              <CButton
                size="sm"
                color="success"
                class="ms-1 text-light"
                @click="actInsertBank()"
              >
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
              <!-- <CAlert color="warning" class="align-items-center">
                <CIcon :icon="ic.cilWarning" />
                <div>ไม่สามารถแก้ไข "สถานะการใช้งาน" และ "ประเภทบัญชีได้"</div>
                <div>เนื่องจากมีการตั้งค่า Bank Auto หรือ SMS Auto ไว้</div>
              </CAlert> -->
              <CAlert
                color="warning"
                class="py-2 text-center"
                v-show="
                  dataEditBank.bank_auto_config || dataEditBank.sms_auto_config
                "
              >
                <CIcon size="lg" :icon="ic.cilWarning" />
                <span>
                  ไม่สามารถ "ประเภทบัญชี" ได้, เนื่องจากบัญชีนี้มีการตั้งค่า
                  Bank Auto หรือ SMS Auto ไว้
                </span>
              </CAlert>
              <div class="d-inline-flex align-items-center mb-2">
                <span class="me-2 fw-semibold"> เปิดใช้งาน * </span>
                <CFormSwitch
                  id="formSwitchCheckChecked"
                  :checked="checkedStatusBank(dataEditBank.status)"
                  @change="onchgStatusEditBank(dataEditBank.status)"
                />
              </div>
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
                      <CFormSelect
                        v-model="dataEditBank.type"
                        :disabled="
                          dataEditBank.bank_auto_config ||
                          dataEditBank.sms_auto_config
                        "
                        @change="dataEditBank.qr_code = ''"
                      >
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
                      <CFormInput
                        type="text"
                        id="cFName"
                        v-model="dataEditBank.bank_account_number"
                      />
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
                      <CFormInput
                        type="text"
                        id="cLName"
                        v-model="dataEditBank.bank_account_name"
                      />
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
                  <div>
                    <label for="cFName" class="form-label mb-1">
                      QR Code
                      <span class="small text-muted">
                        (สำหรับแสดงที่หน้าจอลูกค้า)
                      </span>
                    </label>
                    <div class="clearfix mb-2" v-if="dataEditBank.qr_code">
                      <CImage
                        align="center"
                        class="border"
                        height="150"
                        rounded
                        :src="dataEditBank.qr_code"
                      />
                    </div>
                    <div class="text-center">
                      <CButton
                        color="dark"
                        size="sm"
                        shape="rounded-pill"
                        variant="outline"
                        @click="$refs.fileInputEdit.click()"
                      >
                        <CIcon :icon="ic.cilCloudUpload" />
                        อัพโหลด
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        shape="rounded-pill"
                        variant="outline"
                        class="ms-2"
                        @click="dataEditBank.qr_code = ''"
                        v-if="dataEditBank.qr_code"
                      >
                        <CIcon :icon="ic.cilTrash" />
                        ลบ
                      </CButton>
                      <input
                        style="display: none"
                        type="file"
                        accept=".png, .jpg, jpeg"
                        class="form-control form-control-sm"
                        ref="fileInputEdit"
                        @change="pickFile('edit')"
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <div>
                <CButton
                  size="sm"
                  color="danger"
                  class="ms-1 text-light"
                  @click="
                    () => {
                      mdEditBank = false
                      clickDeleteBankOrBankAuto('bank', dataEditBank._id)
                    }
                  "
                >
                  <CIcon :icon="ic.cilTrash" />
                  ลบ
                </CButton>
              </div>
              <div>
                <CButton
                  size="sm"
                  color="success"
                  class="ms-1 text-light"
                  @click="actUpdateBank()"
                >
                  <CIcon :icon="ic.cilCheckCircle" />
                  บันทึก
                </CButton>
                <CButton
                  size="sm"
                  color="secondary"
                  class="text-light ms-1"
                  @click="
                    () => {
                      prepareBankSetting(), (mdEditBank = false)
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

  <!-- ----- -->
  <!-- เพิ่ม Bank Auto Tranfer :: Deposit -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdBankAutoDeposit"
    @close="
      () => {
        mdBankAutoDeposit = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle class="fw-lighter">
        <strong>
          <span class="h5">
            <CIcon size="lg" :icon="ic.cilTerminal" />
            เพิ่มบัญชี
            <CBadge color="success" shape="rounded-pill" class="py-1"
              >ฝาก</CBadge
            >
            ออโต้
          </span>
        </strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard>
        <CCardBody class="pt-2">
          <CCardText>
            <div class="mb-2">
              <label class="form-label mb-0"> ธนาคาร * </label>
              <CInputGroup>
                <CInputGroupText>
                  <CImage fluid :src="confAutoBankSetup.bank_img" width="22" />
                </CInputGroupText>
                <CFormSelect
                  v-model="confAutoBankSetup.bank_code"
                  @change="
                    onchgBankingAutoConf($event.target.value),
                      getBankAutoTranfer($event.target.value)
                  "
                >
                  <option value="">กรุณาเลือกธนาคาร</option>
                  <option
                    v-for="option in optDepositActivated"
                    :key="option._id"
                    :value="option.bankcode"
                  >
                    {{ option.banknameth }}
                  </option>
                </CFormSelect>
              </CInputGroup>
            </div>
            <div>
              <CAlert
                color="danger"
                class="py-2 text-center"
                v-if="confAutoBankSetup.errVisible"
              >
                <CIcon size="lg" :icon="ic.cilWarning" />
                {{ confAutoBankSetup.errMessage }}
              </CAlert>
            </div>
            <!-- ::SCB:: - Bank Auto Transfer (Deposit) -->
            <div
              v-if="
                confAutoBankSetup.bank_code == 'scb' &&
                optBankAutoTransfer.length != 0
              "
            >
              <div class="mb-2">
                <label class="form-label mb-0"> บัญชีฝาก * </label>
                <CFormSelect v-model="conf_deposit_scb._id">
                  <option value="">กรุณาเลือกบัญชี</option>
                  <option
                    v-for="option in optBankAutoTransfer"
                    :key="option._id"
                    :value="option._id"
                  >
                    {{ option.bank_account }} ({{ option.account_name }})
                  </option>
                </CFormSelect>
              </div>
              <div class="mb-2">
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cFName" class="form-label mb-0">
                        Username *
                      </label>
                      <CFormInput
                        type="text"
                        id="cFName"
                        v-model="conf_deposit_scb.bank_auto_config.username"
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
                          v-model="conf_deposit_scb.bank_auto_config.password"
                        />
                        <CButton
                          type="button"
                          color="secondary"
                          class="border-secondary"
                          variant="outline"
                        >
                          <CIcon :icon="ic.cilLockLocked" />
                        </CButton>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
              </div>
              <div class="mb-2">
                <label for="cLName" class="form-label mb-0"> โน้ต </label>
                <CFormTextarea
                  rows="2"
                  text="สามารถระบุได้"
                  v-model="conf_deposit_scb.bank_auto_config.note"
                ></CFormTextarea>
              </div>
              <!-- <div class="mb-2">
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
                    :src="conf_deposit_scb.bank_auto_config.qr_code"
                  />
                </div>
                <div>
                  <CButton
                    color="dark"
                    size="sm"
                    shape="rounded-pill"
                    variant="outline"
                    @click="$refs.fileInputSCBDP.click()"
                  >
                    <CIcon :icon="ic.cilCloudUpload" />
                    อัพโหลด
                  </CButton>
                  <input
                    style="display: none"
                    accept=".png, .jpg, jpeg"
                    type="file"
                    class="form-control form-control-sm"
                    ref="fileInputSCBDP"
                    @change="pickFileAddAutoTransfer('DP', 'scb')"
                  />
                </div>
              </div> -->
            </div>
            <!-- ::Other:: - Bank Auto Tranfer (Deposit) -->
            <!-- ... -->
            <!-- ... -->
            <hr />
            <div class="d-flex justify-content-end">
              <div>
                <CButton
                  size="sm"
                  color="success"
                  class="ms-1 text-light"
                  v-if="optBankAutoTransfer.length != 0"
                  @click="actInsertBankAuto('deposit')"
                >
                  <CIcon :icon="ic.cilCheckCircle" />
                  ยืนยัน
                </CButton>
                <CButton
                  size="sm"
                  color="secondary"
                  class="text-light ms-1"
                  @click="
                    () => {
                      mdBankAutoDeposit = false
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

  <!-- ----- -->
  <!-- เพิ่ม Bank Auto Tranfer :: Withdraw -->
  <!-- ------ -->
  <CModal
    backdrop="static"
    :visible="mdBankAutoWithdraw"
    @close="
      () => {
        mdBankAutoWithdraw = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle class="fw-lighter">
        <strong>
          <span class="h5">
            <CIcon size="lg" :icon="ic.cilTerminal" />
            เพิ่มบัญชี
            <CBadge color="danger" shape="rounded-pill" class="py-1"
              >ถอน</CBadge
            >
            ออโต้
          </span>
        </strong>
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="m-0 p-0">
      <CCard>
        <CCardBody class="pt-2">
          <CCardText>
            <div class="mb-2">
              <label class="form-label mb-0"> ธนาคาร * </label>
              <CInputGroup>
                <CInputGroupText>
                  <CImage fluid :src="confAutoBankSetup.bank_img" width="22" />
                </CInputGroupText>
                <CFormSelect
                  v-model="confAutoBankSetup.bank_code"
                  @change="
                    onchgBankingAutoConf($event.target.value),
                      getBankAutoTranfer($event.target.value)
                  "
                >
                  <option value="">กรุณาเลือกธนาคาร</option>
                  <option
                    v-for="option in optWithdrawActivated"
                    :key="option._id"
                    :value="option.bankcode"
                  >
                    {{ option.banknameth }}
                  </option>
                </CFormSelect>
              </CInputGroup>
            </div>
            <div>
              <CAlert
                color="danger"
                class="py-2 text-center"
                v-if="confAutoBankSetup.errVisible"
              >
                <CIcon size="lg" :icon="ic.cilWarning" />
                {{ confAutoBankSetup.errMessage }}
              </CAlert>
            </div>
            <!-- ::TTB:: - Bank Auto Transfer (Deposit) -->
            <div
              v-if="
                confAutoBankSetup.bank_code == 'ttb' &&
                optBankAutoTransfer.length != 0
              "
            >
              <div class="mb-2">
                <label class="form-label mb-0"> บัญชีถอน * </label>
                <CFormSelect v-model="conf_withdraw_ttb._id">
                  <option value="">กรุณาเลือกบัญชี</option>
                  <option
                    v-for="option in optBankAutoTransfer"
                    :key="option._id"
                    :value="option._id"
                  >
                    {{ option.bank_account }} ({{ option.account_name }})
                  </option>
                </CFormSelect>
              </div>
              <div class="mb-2">
                <CRow class="mb-2">
                  <CCol md="6">
                    <div>
                      <label for="cFName" class="form-label mb-0">
                        Username *
                      </label>
                      <CFormInput
                        type="text"
                        id="cFName"
                        v-model="conf_withdraw_ttb.bank_auto_config.username"
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
                          v-model="conf_withdraw_ttb.bank_auto_config.password"
                        />
                        <CButton
                          type="button"
                          color="secondary"
                          class="border-secondary"
                          variant="outline"
                        >
                          <CIcon :icon="ic.cilLockLocked" />
                        </CButton>
                      </CInputGroup>
                    </div>
                  </CCol>
                </CRow>
              </div>
              <div class="mb-2">
                <label for="cLName" class="form-label mb-0"> โน้ต </label>
                <CFormTextarea
                  rows="2"
                  text="สามารถระบุได้"
                  v-model="conf_withdraw_ttb.bank_auto_config.note"
                ></CFormTextarea>
              </div>
              <div class="mb-2">
                <div>
                  <label for="cLName" class="form-label mb-0">
                    SMS Device *
                    <span class="small text-muted"> (สำหรับใช้งาน OTP) </span>
                  </label>
                  <CFormSelect
                    v-model="conf_withdraw_ttb.bank_auto_config.push_bullet"
                  >
                    <option value="">กรุณาเลือก</option>
                    <option
                      v-for="option in optPushBullet"
                      :key="option._id"
                      :value="option._id"
                    >
                      {{ option.name }}
                    </option>
                  </CFormSelect>
                </div>
              </div>
            </div>
            <!-- ::Other:: - Bank Auto Tranfer (Deposit) -->
            <!-- ... -->
            <!-- ... -->
            <hr />
            <div class="d-flex justify-content-end">
              <div>
                <CButton
                  size="sm"
                  color="success"
                  class="ms-1 text-light"
                  v-if="optBankAutoTransfer.length != 0"
                  @click="actInsertBankAuto('withdraw')"
                >
                  <CIcon :icon="ic.cilCheckCircle" />
                  ยืนยัน
                </CButton>
                <CButton
                  size="sm"
                  color="secondary"
                  class="text-light ms-1"
                  @click="
                    () => {
                      mdBankAutoWithdraw = false
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

  <!-- ----- -->
  <!-- Confirm Delete Bank / Bank Auto -->
  <!-- ------ -->
  <CModal
    alignment="center"
    size="sm"
    :visible="mdDeleteBank"
    @close="
      () => {
        mdDeleteBank = false
      }
    "
  >
    <CModalHeader class="pb-2">
      <CModalTitle>
        <CIcon size="lg" :icon="ic.cilWarning" />
        กรุณายืนยันการลบข้อมูล
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-grid gap-2 d-flex justify-content-center">
        <CButton
          color="danger"
          class="me-2"
          @click="actUpdateBankAuto('inactive', dataDeleteBankAoto)"
          v-if="dataDeleteBankAoto"
        >
          <CIcon :icon="ic.cilCheckCircle" />
          ยืนยัน
        </CButton>
        <CButton
          color="danger"
          class="me-2"
          @click="
            () => {
              mdDeleteBank = false
              actDeleteBank(dataDeleteBank)
            }
          "
          v-if="dataDeleteBank"
        >
          <CIcon :icon="ic.cilCheckCircle" />
          ยืนยัน
        </CButton>
        <CButton
          color="secondary"
          @click="
            () => {
              dataDeleteBankAoto = null
              dataDeleteBank = null
              mdDeleteBank = false
            }
          "
        >
          <CIcon :icon="ic.cilXCircle" />
          ยกเลิก
        </CButton>
      </div>
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
  cilTerminal,
  cilQrCode,
  cilSpeech,
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
      mdBankAutoDeposit: false,
      mdBankAutoWithdraw: false,
      mdDeleteBank: false,

      dataDeleteBankAoto: null,
      dataDeleteBank: null,

      currentWebAgent: '',
      visibleOfActiveBank: false,
      dataAllBankSetting: [],
      dataAddBank: {
        agent_id: '',
        bank_id: '',
        bank_img: '',
        bank_account_number: '',
        bank_account_name: '',
        memb_bank: 'all',
        memb_bank_img: '',
        description: '',
        privilege: '',
        status: 'active',
        type: 'deposit',
        qr_code: '',
      },
      dataEditBank: {
        _id: '',
        agent_id: '',
        bank_id: '',
        bank_img: '',
        bank_account_number: '',
        bank_account_name: '',
        memb_bank: 'all',
        memb_bank_img: '',
        description: '',
        privilege: '',
        status: 'active',
        type: 'deposit',
        qr_code: '',
        bank_auto_status: null,
        bank_auto_config: null,
        sms_auto_status: null,
        sms_auto_config: null,
      },
      dataBankAutoDepositSetting: [],
      dataBankAutoWithdrawSetting: [],

      confAutoBankSetup: {
        bank_code: '',
        bank_img: '',
        req_type: '',
        errVisible: false,
        errMessage: '',
      },
      conf_deposit_scb: {
        _id: '',
        agent_id: '',
        bank_auto_status: 'active',
        bank_auto_config: {
          username: '',
          password: '',
          note: '',
        },
        status: '',
        type: 'deposit',
      },
      conf_withdraw_ttb: {
        _id: '',
        agent_id: '',
        bank_auto_status: 'active',
        bank_auto_config: {
          username: '',
          password: '',
          note: '',
          push_bullet: '',
        },
        status: '',
        type: 'withdraw',
      },

      optDepositActivated: [
        {
          _id: null,
          banknameth: 'ธนาคารไทยพาณิชย์',
          banknameen: 'scb',
          bankcode: 'scb',
          status: 'active',
        },
      ],
      optWithdrawActivated: [
        {
          _id: null,
          banknameth: 'ธนาคารทหารไทยธนชาต',
          banknameen: 'ttb',
          bankcode: 'ttb',
          status: 'active',
        },
      ],
      optBankAutoTransfer: [],

      optWebAgent: [],
      optAllBank: [],
      optPushBullet: [],
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
        cilTerminal,
        cilQrCode,
        cilSpeech,
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
      this.dataAllBankSetting = []
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
    async getBankAutoTranfer(_bankcode) {
      await this.$http
        .post('panel/getbankautotranfer', {
          agent_id: this.currentWebAgent,
          bank_code: _bankcode,
          type: this.confAutoBankSetup.req_type,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optBankAutoTransfer = response.data.result
            console.log(this.optBankAutoTransfer)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            this.createToast(
              'warning',
              'การดำเนินการ',
              'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + response.data.message,
            )
            this.confAutoBankSetup.errVisible = true
            this.confAutoBankSetup.errMessage = response.data.message
            console.log(
              'call api - panel/getbankautotranfer : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          this.createToast(
            'warning',
            'การดำเนินการ',
            'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ' + error,
          )
          this.confAutoBankSetup.errVisible = true
          this.confAutoBankSetup.errMessage = error
          console.log('call api - panel/getbankautotranfer : error' + error)
        })
    },
    async getPushBullet() {
      await this.$http
        .post('panel/getpushbulletsetting', {
          agent_id: this.currentWebAgent,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.optPushBullet = response.data.result
            console.log(this.optPushBullet)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getpushbulletsetting : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getpushbulletsetting : error' + error)
        })
    },
    async actInsertBank() {
      let memberbank = ''
      if (this.dataAddBank.memb_bank != 'all') {
        memberbank = this.dataAddBank.memb_bank
      }
      await this.$http
        .post('panel/insertbank', {
          agent_id: this.currentWebAgent,
          bank_id: this.dataAddBank.bank_id,
          bank_account_number: this.dataAddBank.bank_account_number,
          bank_account_name: this.dataAddBank.bank_account_name,
          memb_bank: memberbank,
          description: this.dataAddBank.description,
          privilege: this.dataAddBank.privilege,
          status: this.dataAddBank.status,
          type: this.dataAddBank.type,
          qr_code: this.dataAddBank.qr_code,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.prepareBankSetting()
            this.createToast(
              'success',
              'การดำเนินการ',
              'เพิ่มบัญชีธนาคารเรียบร้อย',
            )

            // reset data type
            this.dataAddBank.agent_id = ''
            this.dataAddBank.bank_id = ''
            this.dataAddBank.bank_img = ''
            this.dataAddBank.bank_account_name = ''
            this.dataAddBank.bank_account_number = ''
            this.dataAddBank.memb_bank = 'all'
            this.dataAddBank.memb_bank_img = ''
            this.dataAddBank.description = ''
            this.dataAddBank.privilege = ''
            this.dataAddBank.status = 'active'
            this.dataAddBank.type = 'deposit'
            // close modal
            this.mdAddBank = false
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
              'call api - panel/insertbank : status = ' +
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
          console.log('call api - panel/insertbank : error' + error)
        })
    },
    async actUpdateBank() {
      let memberbank = ''
      if (this.dataEditBank.memb_bank != 'all') {
        memberbank = this.dataEditBank.memb_bank
      }
      await this.$http
        .post('panel/updatebank', {
          _id: this.dataEditBank._id,
          agent_id: this.currentWebAgent,
          bank_id: this.dataEditBank.bank_id,
          bank_account_number: this.dataEditBank.bank_account_number,
          bank_account_name: this.dataEditBank.bank_account_name,
          memb_bank: memberbank,
          description: this.dataEditBank.description,
          privilege: this.dataEditBank.privilege,
          status: this.dataEditBank.status,
          type: this.dataEditBank.type,
          qr_code: this.dataEditBank.qr_code,
        })
        .then((response) => {
          if (response.data.status == 200) {
            if (
              this.dataEditBank.status == 'inactive' &&
              this.dataEditBank.bank_auto_status == 'active'
            ) {
              let _bank = null
              for (let i = 0; i < this.dataAllBankSetting.length; i++) {
                if (this.dataAllBankSetting[i]._id == this.dataEditBank._id) {
                  _bank = { bank: this.dataAllBankSetting[i] }
                  break
                }
              }
              if (_bank) {
                this.actUpdateBankAuto('suspend', _bank).finally(() => {
                  this.prepareBankSetting()
                })
              }
            } else {
              this.getAllBankSetting()
            }

            this.createToast(
              'success',
              'การดำเนินการ',
              'แก้ไขบัญชีธนาคารเรียบร้อย',
            )

            this.mdEditBank = false
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
              'call api - panel/updatebank : status = ' +
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
          console.log('call api - panel/updatebank : error' + error)
        })
    },
    async actDeleteBank(_id) {
      let delBank = null
      for (let i = 0; i < this.dataAllBankSetting.length; i++) {
        if (this.dataAllBankSetting[i]._id == _id) {
          delBank = this.dataAllBankSetting[i]
          break
        }
      }
      console.log(delBank)
      if (delBank) {
        let memberbank = ''
        if (delBank.memb_bank != 'all' && delBank.memb_bank != null) {
          memberbank = delBank.memb_bank.memb_bank_id
        }
        await this.$http
          .post('panel/updatebank', {
            agent_id: this.currentWebAgent,
            _id: _id,
            bank_id: delBank.bank_id,
            bank_account_number: delBank.bank_account,
            bank_account_name: delBank.account_name,
            memb_bank: memberbank,
            description: delBank.description,
            privilege: delBank.privilege,
            status: 'delete',
            type: delBank.type,
          })
          .then((response) => {
            this.prepareBankSetting()
            if (response.data.status == 200) {
              this.createToast(
                'success',
                'การดำเนินการ',
                'ลบบัญชีธนาคารเรียบร้อย',
              )
              this.dataDeleteBank = null
              this.dataDeleteBankAoto = null
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
                'call api - panel/updatebank : status = ' +
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
            console.log('call api - panel/updatebank : error' + error)
          })
      } else {
        this.createToast(
          'danger',
          'การดำเนินการ',
          'ไม่สามารถดำเนินการได้, ข้อผิดพลาด : ไม่พบ _id นี้ในระบบ',
        )
      }
    },
    async actInsertBankAuto(_type) {
      let _id = null
      let bank_auto_status = null
      let bank_auto_config = null

      if (_type == 'withdraw' && this.confAutoBankSetup.bank_code == 'ttb') {
        _id = this.conf_withdraw_ttb._id
        bank_auto_status = this.conf_withdraw_ttb.bank_auto_status
        bank_auto_config = this.conf_withdraw_ttb.bank_auto_config
        console.log('conf_withdraw_ttb', this.conf_withdraw_ttb)
      }

      if (_type == 'deposit' && this.confAutoBankSetup.bank_code == 'scb') {
        _id = this.conf_deposit_scb._id
        bank_auto_status = this.conf_deposit_scb.bank_auto_status
        bank_auto_config = this.conf_deposit_scb.bank_auto_config
        console.log('conf_deposit_scb', this.conf_deposit_scb)
      }

      if (_id) {
        await this.$http
          .post('panel/updatebankautotranfer', {
            _id: _id,
            agent_id: this.currentWebAgent,
            bank_auto_status: bank_auto_status,
            bank_auto_config: bank_auto_config,
          })
          .then((response) => {
            if (response.data.status == 200) {
              this.prepareBankSetting()
              this.createToast(
                'success',
                'การดำเนินการ',
                'เพิ่มบัญชีธนาคารสำหรับทำระบบออโต้เรียบร้อย',
              )
              this.mdBankAutoDeposit = false
              this.mdBankAutoWithdraw = false
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
                'call api - panel/updatebankautotranfer : status = ' +
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
            console.log(
              'call api - panel/updatebankautotranfer : error' + error,
            )
          })
      } else {
        this.createToast(
          'danger',
          'การดำเนินการ',
          'ไม่สามารถดำเนินการได้ กรุณาตรวจสอบข้อมูล และดำเนินการอีกครั้ง',
        )
      }
    },
    async actUpdateBankAuto(_action, _objBank) {
      await this.$http
        .post('panel/updatebankautotranfer', {
          _id: _objBank.bank._id,
          agent_id: this.currentWebAgent,
          bank_auto_status: _action,
          bank_auto_config: _objBank.bank.bank_auto_config,
        })
        .then((response) => {
          if (response.data.status == 200) {
            // this.prepareBankSetting()
            if (_action != 'inactive') {
              _objBank.flagEdit = false
            }
            if (_action == 'inactive' && _objBank.bank.type == 'deposit') {
              const index = this.dataBankAutoDepositSetting.indexOf(_objBank)
              if (index > -1) {
                this.dataBankAutoDepositSetting.splice(index, 1)
              }
            }
            if (_action == 'inactive' && _objBank.bank.type == 'withdraw') {
              const index = this.dataBankAutoWithdrawSetting.indexOf(_objBank)
              if (index > -1) {
                this.dataBankAutoWithdrawSetting.splice(index, 1)
              }
            }

            this.mdDeleteBank = false
            this.dataDeleteBankAoto = null
            this.dataDeleteBank = null
            this.createToast(
              'success',
              'การดำเนินการ',
              'ปรับปรุงบัญชีสำหรับทำระบบออโต้เรียบร้อย',
            )
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
              'call api - panel/updatebankautotranfer : status = ' +
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
          console.log('call api - panel/updatebankautotranfer : error' + error)
        })
    },

    // functions
    prepareBankSetting() {
      this.getAllBankSetting().then(() => {
        this.dataBankAutoDepositSetting = []
        this.dataBankAutoWithdrawSetting = []
        for (let i = 0; i < this.dataAllBankSetting.length; i++) {
          if (
            this.dataAllBankSetting[i].bank_auto_status == 'active' ||
            this.dataAllBankSetting[i].bank_auto_status == 'suspend'
          ) {
            let _tempData = {
              flagShow: false,
              flagEdit: false,
              bank: this.dataAllBankSetting[i],
            }

            // บัญชีฝาก
            if (this.dataAllBankSetting[i].type == 'deposit') {
              this.dataBankAutoDepositSetting.push(_tempData)
            }

            // บัญชีถอน
            if (this.dataAllBankSetting[i].type == 'withdraw') {
              this.dataBankAutoWithdrawSetting.push(_tempData)
            }
          }
        }
        // Mockup
        // this.mdEditBank = true
        // this.clickAddBankAuto('deposit')
        // this.clickAddBankAuto('withdraw')
      })
    },
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
    onchgBankingAutoConf(_bank_code) {
      this.confAutoBankSetup.bank_img = ''
      try {
        this.confAutoBankSetup.bank_img = require('../../../assets/images/banking/th/smooth-corner/' +
          _bank_code +
          '.png')
      } catch (err) {
        console.log(err)
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
    pickFile(_type) {
      let input = null
      if (_type == 'add') {
        input = this.$refs.fileInput
      }
      if (_type == 'edit') {
        input = this.$refs.fileInputEdit
      }
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
          if (_type == 'add') {
            this.dataAddBank.qr_code = reader.result
          }
          if (_type == 'edit') {
            this.dataEditBank.qr_code = reader.result
          }
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    pickFileAddAutoTransfer(_type, _bank) {
      let input = this.$refs.fileInputSCBDP
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
          // DP - SCB
          if (_type == 'DP' && _bank == 'scb') {
            this.conf_deposit_scb.bank_auto_config.qr_code = reader.result
          }
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    onchgStatusAddBank(_status) {
      if (_status == 'active') {
        this.dataAddBank.status = 'inactive'
      } else if (_status == 'inactive') {
        this.dataAddBank.status = 'active'
      }
    },
    checkedStatusBank(_status) {
      if (_status == 'active') {
        return true
      } else {
        return false
      }
    },
    onchgStatusEditBank(_status) {
      if (_status == 'active') {
        this.dataEditBank.status = 'inactive'
      } else if (_status == 'inactive') {
        this.dataEditBank.status = 'active'
      }
    },
    clickShowEdit(_id) {
      let foundBank = false
      for (let i = 0; i < this.dataAllBankSetting.length; i++) {
        if (this.dataAllBankSetting[i]._id == _id) {
          let bank = this.dataAllBankSetting[i]
          let memberbank = 'all'
          let bankIMG = 'all'
          if (this.dataAllBankSetting[i].memb_bank) {
            memberbank = bank.memb_bank.memb_bank_id
            bankIMG = bank.memb_bank.memb_bank_code
          }
          this.dataEditBank._id = bank._id
          this.dataEditBank.agent_id = this.currentWebAgent
          this.dataEditBank.bank_id = bank.bank_id
          this.dataEditBank.bank_img = this.getBankIMG(bank.bank_code)
          this.dataEditBank.bank_account_number = bank.bank_account
          this.dataEditBank.bank_account_name = bank.account_name
          this.dataEditBank.memb_bank = memberbank
          this.dataEditBank.memb_bank_img = this.getBankIMG(bankIMG)
          this.dataEditBank.description = bank.description
          this.dataEditBank.privilege = bank.privilege
          this.dataEditBank.status = bank.bank_status
          this.dataEditBank.type = bank.type
          this.dataEditBank.bank_auto_config = bank.bank_auto_config
          this.dataEditBank.bank_auto_status = bank.bank_auto_status
          this.dataEditBank.sms_auto_config = bank.sms_auto_config
          this.dataEditBank.sms_auto_status = bank.sms_auto_status
          this.dataEditBank.qr_code = bank.qr_code
          foundBank = true
          break
        }
      }
      if (foundBank) {
        this.mdEditBank = true
      } else {
        this.createToast(
          'danger',
          'การดำเนินการ',
          'ไม่สามารถดำเนินการปรับปรุงบัญชีนี้ได้',
        )
      }
    },
    clickDeleteBankOrBankAuto(_dataType, _objBank) {
      if (_dataType == 'bank') {
        this.dataDeleteBank = _objBank
      }
      if (_dataType == 'bankAuto') {
        this.dataDeleteBankAoto = _objBank
      }

      this.mdDeleteBank = true
    },
    // Bank Auto - Deposit
    clickAddBankAuto(_type) {
      if (_type == 'deposit') {
        this.optBankAutoTransfer = []
        this.confAutoBankSetup.req_type = 'deposit'
        this.confAutoBankSetup.bank_code = ''
        this.confAutoBankSetup.bank_img = ''
        // reset error
        this.confAutoBankSetup.errVisible = false
        this.confAutoBankSetup.errMessage = ''
        // reset scb
        this.conf_deposit_scb._id = ''
        this.conf_deposit_scb.bank_auto_status = 'active'
        this.conf_deposit_scb.bank_auto_config.username = ''
        this.conf_deposit_scb.bank_auto_config.password = ''
        this.conf_deposit_scb.bank_auto_config.note = ''
        this.conf_deposit_scb.bank_auto_config.qr_code = ''
        this.conf_deposit_scb.status = ''
        this.conf_deposit_scb.type = 'deposit'

        // shown popup
        this.mdBankAutoDeposit = true
      } else if (_type == 'withdraw') {
        this.optBankAutoTransfer = []
        this.confAutoBankSetup.req_type = 'withdraw'
        this.confAutoBankSetup.bank_code = ''
        this.confAutoBankSetup.bank_img = ''
        // reset error
        this.confAutoBankSetup.errVisible = false
        this.confAutoBankSetup.errMessage = ''
        // reset ttb
        let push_bullet = ''
        if (this.optPushBullet.length > 0) {
          push_bullet = this.optPushBullet[0]._id
        }
        this.conf_withdraw_ttb._id = ''
        this.conf_withdraw_ttb.bank_auto_status = 'active'
        this.conf_withdraw_ttb.bank_auto_config.username = ''
        this.conf_withdraw_ttb.bank_auto_config.password = ''
        this.conf_withdraw_ttb.bank_auto_config.note = ''
        this.conf_withdraw_ttb.bank_auto_config.push_bullet = push_bullet
        this.conf_withdraw_ttb.status = ''
        this.conf_withdraw_ttb.type = 'withdraw'

        // shown popup
        this.mdBankAutoWithdraw = true
      }
      // this.confAutoBankSetup.bank_code = this.optDepositActivated[0].bankcode
      // this.onchgBankingAutoConf(this.confAutoBankSetup.bank_code)
      // this.getBankAutoTranfer(this.confAutoBankSetup.bank_code).then(() => {
      //   console.log('Started')
      // })
    },
  },
  mounted() {
    this.getWebPrefixList().then(() => {
      this.prepareBankSetting()
      this.getPushBullet()
    })
    this.getAllBank()

    // Setup
    this.dataAddBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')
    this.dataEditBank.memb_bank_img = require('../../../assets/images/banking/th/smooth-corner/all.png')
  },
  setup() {
    return {
      imgBank,
    }
  },
}
</script>
