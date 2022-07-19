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
          <div class="d-inline-flex">
            <div v-show="optWebAgent.length > 1">
              <CFormSelect
                class="me-1"
                style="width: 150px"
                @change="onchgPrefix($event.target.value)"
              >
                <option
                  v-for="option in optWebAgent"
                  :key="option._id"
                  :value="option._id"
                >
                  {{ option.name }}
                </option>
              </CFormSelect>
            </div>
            <CButton
              class="me-1"
              color="light"
              size="sm"
              @click="
                exportCSVFile(
                  csvtemplate_headers,
                  csvtemplate_itemsFormatted,
                  csvtemplate_fileTitle,
                )
              "
            >
              <CIcon :icon="ic.cilCloudDownload" size="sm" />
              ตัวอย่าง
            </CButton>
            <CButton color="primary" size="sm" @click="$refs.myFile.click()">
              <CIcon :icon="ic.cilPlaylistAdd" />
              สร้าง
            </CButton>
            <input
              style="display: none"
              type="file"
              accept=".csv"
              class="form-control form-control-sm"
              ref="myFile"
              @change="pickFile(false)"
            />
          </div>
        </div>
      </CCardHeader>
      <CCardBody class="p-0">
        <CCardText class="small lh-sm">
          <div class="table-responsive">
            <CTable hover small bordered>
              <CTableHead align="middle">
                <CTableRow align="middle" class="border-top-0">
                  <CTableHeaderCell scope="col" rowspan="2">
                    #
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" rowspan="2">
                    ชื่อไฟล์
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    scope="col"
                    rowspan="2"
                    v-show="optWebAgent.length > 1"
                  >
                    เว็บ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" rowspan="2">
                    สถานะไฟล์
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" colspan="3">
                    สถานะ
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" colspan="3">
                    ยอดเงิน
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" rowspan="2">
                    โดย
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" rowspan="2">
                    วันที่
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" rowspan="2">
                    จัดการ
                  </CTableHeaderCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="col"> สำเร็จ </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> ไม่สำเร็จ </CTableHeaderCell>
                  <!-- <CTableHeaderCell scope="col"> รอ </CTableHeaderCell> -->
                  <CTableHeaderCell scope="col"> ทั้งหมด </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Cash </CTableHeaderCell>
                  <CTableHeaderCell scope="col"> Bonus </CTableHeaderCell>
                  <CTableHeaderCell scope="col" class="text-end">
                    รวม
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow
                  align="middle"
                  v-for="(winloss, index) in listDataWinLoss"
                  :key="winloss.id"
                >
                  <CTableDataCell scope="row" class="text-center">
                    {{ index + 1 }}.
                  </CTableDataCell>
                  <CTableDataCell class="fw-semibold">
                    {{ winloss.file_name }}
                    <CSpinner
                      v-show="winloss.pending"
                      color="dark"
                      size="sm"
                      style="width: 0.8rem; height: 0.8rem"
                    />
                  </CTableDataCell>
                  <CTableDataCell
                    class="text-center"
                    v-show="optWebAgent.length > 1"
                  >
                    {{ winloss.agent_name }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CBadge :color="convertStatusColor(winloss.status)">
                      {{ winloss.status }}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell
                    class="text-center"
                    :color="winloss.success ? 'success' : 'light'"
                  >
                    {{ winloss.success }}
                  </CTableDataCell>
                  <CTableDataCell
                    class="text-center"
                    :color="winloss.fail ? 'danger' : 'light'"
                    :class="winloss.fail ? 'text-danger' : ''"
                  >
                    {{ winloss.fail }}
                  </CTableDataCell>
                  <!-- <CTableDataCell
                    class="text-center"
                    :color="winloss.pending ? 'warning' : 'light'"
                  >
                    {{ winloss.pending }}
                  </CTableDataCell> -->
                  <CTableDataCell
                    class="text-center fw-bolder"
                    color="secondary"
                  >
                    {{ winloss.all }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ convertAmount2Degit(winloss.amountCash) }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ convertAmount2Degit(winloss.amountBonus) }}
                  </CTableDataCell>
                  <CTableDataCell class="text-end fw-bolder" color="primary">
                    {{
                      convertAmount2Degit(
                        Number(winloss.amountCash) +
                          Number(winloss.amountBonus),
                      )
                    }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CBadge color="dark" shape="rounded-pill">
                      {{ winloss.cr_by }}
                    </CBadge>
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    {{ convertDate(winloss.cr_date) }}
                    {{ convertTime(winloss.cr_date) }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center">
                    <CButton
                      color="info"
                      variant="outline"
                      size="sm"
                      shape="rounded-pill"
                      style="padding: 0.1em 0.5em"
                      @click="viewWinLossByID(winloss._id)"
                    >
                      <CIcon :icon="ic.cilSearch" size="sm" />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
              <CTableHead>
                <CTableRow class="fs-6">
                  <CTableDataCell colspan="6" class="text-end fw-bolder">
                    รวม
                  </CTableDataCell>
                  <CTableDataCell class="text-center fw-bolder">
                    {{ convertAmount2Degit(totalBonusWinLoss) }}
                  </CTableDataCell>
                  <CTableDataCell class="text-center fw-bolder">
                    {{ convertAmount2Degit(totalCashWinLoss) }}
                  </CTableDataCell>
                  <CTableDataCell
                    class="text-end fw-bolder fs-5 text-decoration-underline"
                  >
                    {{ convertAmount2Degit(totalWinLoss) }}
                  </CTableDataCell>
                  <CTableDataCell colspan="3"></CTableDataCell>
                </CTableRow>
                <CTableRow class="fs-6" v-show="listDataWinLoss == 0">
                  <CTableDataCell colspan="12" class="text-center fw-bolder">
                    ไม่พบข้อมูลในระบบ
                  </CTableDataCell>
                </CTableRow>
              </CTableHead>
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

  <!-- --- -->
  <!-- Shown Win Loss by file -->
  <!-- --- -->
  <CModal
    size="xl"
    backdrop="static"
    :visible="mdView"
    @close="
      () => {
        mdView = false
      }
    "
  >
    <CModalHeader class="pt-3 pb-2">
      <CModalTitle class="h5">
        <CIcon :icon="ic.cilBook" size="lg" />
        รายการคืนยอดเสีย
      </CModalTitle>
    </CModalHeader>
    <CModalBody class="small">
      <div class="d-flex justify-content-between">
        <div>
          <span class="fs-6 fw-bold me-2">กรองสถานะ : </span>
          <CFormCheck
            inline
            label="Processing"
            v-model="filterProcessing"
            @change="
              filterStatusCalculate(
                $event.target.checked,
                filterSuccess,
                filterFail,
              )
            "
          />
          <CFormCheck
            inline
            label="Success"
            v-model="filterSuccess"
            @change="
              filterStatusCalculate(
                filterProcessing,
                $event.target.checked,
                filterFail,
              )
            "
          />
          <CFormCheck
            inline
            label="Fail"
            v-model="filterFail"
            @change="
              filterStatusCalculate(
                filterProcessing,
                filterSuccess,
                $event.target.checked,
              )
            "
          />
        </div>
        <div class="text-end mb-1">
          <CBadge color="primary" class="ms-1">
            ทั้งหมด : {{ dataWinLossByIDSummary.all }}
          </CBadge>
          <CBadge
            color="warning"
            class="ms-1"
            v-show="dataWinLossByIDSummary.pending > 0"
          >
            รอดำเนินการ : {{ dataWinLossByIDSummary.pending }}
          </CBadge>
          <CBadge color="success" class="ms-1">
            สำเร็จ : {{ dataWinLossByIDSummary.success }}
          </CBadge>
          <CBadge color="danger" class="ms-1">
            ไม่สำเร็จ : {{ dataWinLossByIDSummary.fail }}
          </CBadge>
          <CBadge color="dark" shape="rounded-pill" class="ms-1">
            Cash : {{ convertAmount2Degit(dataWinLossByIDSummary.amountCash) }}
          </CBadge>
          <CBadge color="info" shape="rounded-pill" class="ms-1">
            Bonus :
            {{ convertAmount2Degit(dataWinLossByIDSummary.amountBonus) }}
          </CBadge>
        </div>
      </div>
      <div class="table-responsive">
        <CTable small hover bordered>
          <CTableHead color="secondary">
            <CTableRow>
              <CTableHeaderCell scope="col" colspan="6" class="text-center">
                <div class="d-flex justify-content-between">
                  <div></div>
                  <div class="align-self-center">
                    <CIcon :icon="ic.cilDescription" />
                    {{ dataWinLossByIDSummary.file_name }}
                    <span
                      class="small text-muted fw-lighter"
                      v-show="dataWinLossByIDSummary.cr_date"
                    >
                      <small>
                        ({{ convertDate(dataWinLossByIDSummary.cr_date) }}
                        {{ convertTime(dataWinLossByIDSummary.cr_date) }})
                      </small>
                    </span>
                  </div>
                  <div>
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="rounded-pill"
                      size="sm"
                      class="ms-2"
                      style="padding: 0.09em 0.49em"
                      @click="viewWinLossByID(transactionID)"
                    >
                      <CIcon :icon="ic.cilLoopCircular" />
                      รีโหลด
                    </CButton>
                  </div>
                </div>
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col" class="text-center">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">ยูสลูกค้า</CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-center">
                ประเภท
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-end">
                จำนวนเงิน
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-center">
                สถานะ
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow
              v-for="(transac, index) in dataWinLossByIDTransaction"
              :key="transac.id"
              v-show="
                (filterProcessing == true &&
                  transac.transaction_file.status == 'processing') ||
                (filterSuccess == true &&
                  transac.transaction_file.status == 'success') ||
                (filterFail == true &&
                  transac.transaction_file.status == 'failed')
              "
            >
              <CTableHeaderCell scope="row" class="text-center">
                {{ index + 1 }}.
              </CTableHeaderCell>
              <CTableDataCell>
                <CButton
                  size="sm"
                  color="link"
                  class="p-0"
                  v-if="transac.transaction_file.member_id"
                  @click="
                    navigateToNewTap(
                      '/member/list/' +
                        transac.transaction_file.prefix +
                        '/' +
                        transac.transaction_file.member_id,
                    )
                  "
                  >{{ transac.transaction_file.username }}
                </CButton>
                <span v-else>
                  {{ transac.transaction_file.username }}
                </span>
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <CBadge
                  shape="rounded-pill"
                  class="ms-1"
                  :color="convertTypeColor(transac.transaction_file.type)"
                >
                  {{ transac.transaction_file.type }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell class="text-end">
                {{ convertAmount2Degit(transac.transaction_file.amount) }}
              </CTableDataCell>
              <CTableDataCell class="text-center">
                <CBadge
                  :color="
                    convertTransacStatusColor(transac.transaction_file.status)
                  "
                >
                  {{ transac.transaction_file.status }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell>
                <div
                  v-if="
                    typeof transac.transaction_file.description === 'object'
                  "
                >
                  <div
                    v-for="note in transac.transaction_file.description"
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
                  {{ transac.transaction_file.description }}
                </div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead class="secondary">
            <CTableRow class="fs-6" color="secondary">
              <CTableDataCell colspan="3" class="text-end fw-bolder">
                รวม
              </CTableDataCell>
              <CTableDataCell
                class="text-end fw-bolder text-decoration-underline"
              >
                {{ convertAmount2Degit(totalWinLossByID) }}
              </CTableDataCell>
              <CTableDataCell colspan="2"></CTableDataCell>
            </CTableRow>
            <CTableRow class="fs-6" v-show="dataWinLossByIDTransaction == 0">
              <CTableDataCell colspan="6" class="text-center fw-bolder">
                ไม่พบข้อมูลในระบบ
              </CTableDataCell>
            </CTableRow>
          </CTableHead>
        </CTable>
      </div>
    </CModalBody>
  </CModal>

  <!-- ----- -->
  <!-- Shown import CSV file file -->
  <!-- ------ -->
  <CModal
    size="xl"
    backdrop="static"
    :visible="mdViewImport"
    @close="
      () => {
        mdViewImport = false
      }
    "
  >
    <CModalHeader class="pt-3 pb-2">
      <CModalTitle class="h5">
        <CIcon :icon="ic.cilNoteAdd" size="lg" />
        รายการนำเข้า
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="text-end mb-1">
        <CBadge color="primary" class="ms-1">
          ทั้งหมด {{ csvfileResult.length }} รายการ
        </CBadge>
      </div>
      <div class="table-responsive">
        <CTable small hover bordered>
          <CTableHead color="secondary">
            <CTableRow class="small">
              <CTableHeaderCell scope="col" colspan="6" class="text-center">
                <CIcon :icon="ic.cilNewspaper" size="sm" />
                {{ csvfileName }}
              </CTableHeaderCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="col" class="text-center">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-center">
                ลำดับ
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">ยูสลูกค้า</CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-center">
                ประเภท
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" class="text-end">
                จำนวนเงิน
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">หมายเหตุ</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow
              v-for="csv in csvfileResult"
              :key="csv._id"
              :color="!csv.validation ? 'danger' : 'light'"
              class="text-danger"
            >
              <CTableHeaderCell scope="row" class="text-center">
                <CFormCheck
                  id="flexCheckDefault"
                  v-model="csv.checked"
                  :disabled="!csv.validation"
                />
              </CTableHeaderCell>
              <CTableHeaderCell scope="row" class="text-center">
                {{ csv.no }}.
              </CTableHeaderCell>
              <CTableDataCell>{{ csv.username }}</CTableDataCell>
              <CTableDataCell class="text-center">
                <CBadge
                  :color="convertTypeAmountColor(csv.type)"
                  shape="rounded-pill"
                >
                  {{ convertTypeAmount(csv.type) }}
                </CBadge>
              </CTableDataCell>
              <CTableDataCell class="text-end">
                {{ convertAmount2Degit(csv.amount) }}
              </CTableDataCell>
              <CTableDataCell>
                <span class="fw-lighter"> {{ csv.description }} </span>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead class="secondary">
            <CTableRow
              class="fs-6"
              color="secondary"
              v-show="csvfileResult.length > 0"
            >
              <CTableDataCell colspan="4" class="text-end fw-bolder">
                รวม
              </CTableDataCell>
              <CTableDataCell
                class="text-end fw-semibold text-decoration-underline"
              >
                {{ convertAmount2Degit(csvfileAmountTotal) }}
              </CTableDataCell>
            </CTableRow>
            <CTableRow class="fs-6" v-show="csvfileResult.length == 0">
              <CTableDataCell colspan="6" class="text-center fw-bolder">
                ไม่พบข้อมูลในไฟล์
              </CTableDataCell>
            </CTableRow>
          </CTableHead>
        </CTable>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="success"
        size="sm"
        v-show="csvfileResult.length > 0 && csvFailAllTrans == false"
        @click="submitImportWinLoss()"
      >
        <CIcon :icon="ic.cilCheckCircle" />
        ตกลง
      </CButton>
      <CButton
        color="secondary"
        size="sm"
        @click="
          () => {
            csvfileAmountTotal = 0
            csvfileName = ''
            csvfileResult = null
            csvFailAllTrans = false
            mdViewImport = false
          }
        "
      >
        <CIcon :icon="ic.cilXCircle" />
        ยกเลิก
      </CButton>
    </CModalFooter>
  </CModal>

  <!-- ----- -->
  <!-- Confirm Duplicate file -->
  <!-- ------ -->
  <CModal
    alignment="center"
    size="sm"
    backdrop="static"
    :visible="mdDuplicateFile"
    @close="
      () => {
        mdDuplicateFile = false
        this.$refs.myFile.value = null
      }
    "
  >
    <CModalHeader class="pb-2">
      <CModalTitle>
        <CIcon size="lg" :icon="ic.cilWarning" />
        กรุณายืนยัน
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div>
        <span
          >ท่ากำลังดำเนินการอัพโหลดไฟล์ข้อมูลที่มี
          <span class="text-decoration-underline">"ชื่อไฟล์"</span> ซ้ำ
          กับที่มีในระบบ, กรุณากดปุ่ม "ยืนยัน" เพื่อดำเนินการต่อ</span
        >
      </div>
      <hr />
      <div class="d-grid gap-2 d-flex justify-content-center">
        <CButton color="warning" class="me-2" @click="pickFile(true)">
          <CIcon :icon="ic.cilCheckCircle" />
          ยืนยัน
        </CButton>
        <CButton
          color="secondary"
          @click="
            () => {
              csvfileResult = null
              mdDuplicateFile = false
              this.$refs.myFile.value = null
            }
          "
        >
          <CIcon :icon="ic.cilXCircle" />
          ยกเลิก
        </CButton>
      </div>
    </CModalBody>
  </CModal>

  <!-- Demo -->
  <CModal
    backdrop="static"
    :visible="mdDemo"
    @close="
      () => {
        mdDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>แจ้งเตือนตัวใหญ่</CModalTitle>
    </CModalHeader>
    <CModalBody>อยู่ระหว่างการพัฒนา (ยังไม่สามารถใช้งานได้)</CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            mdDemo = false
          }
        "
      >
        Close
      </CButton>
    </CModalFooter>
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
import { CIcon } from '@coreui/icons-vue'
import {
  cilLoopCircular,
  cilPlaylistAdd,
  cilDescription,
  cilSearch,
  cilBook,
  cilCheckCircle,
  cilXCircle,
  cilWarning,
  cilNoteAdd,
  cilNewspaper,
  cilArrowThickToBottom,
  cilCloudDownload,
} from '@coreui/icons'
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'Transection',
  comments: {
    CIcon,
  },
  data() {
    return {
      toasts: [],
      transactionID: '',

      mdDemo: false,
      mdView: false,
      mdDuplicateFile: false,
      mdViewImport: false,
      // Data
      currentWebAgent: '',
      dataWinLossByIDSummary: {},
      dataWinLossByIDTransaction: [],
      totalWinLossByID: 0,

      listDataWinLoss: [],
      filterProcessing: true,
      filterSuccess: true,
      filterFail: true,
      totalBonusWinLoss: 0,
      totalCashWinLoss: 0,
      totalWinLoss: 0,
      optWebAgent: [],
      // import file
      csvfileResult: null,
      csvfileAmountTotal: 0,
      csvfileName: 'mockup-demo-001.csv',
      csvFailAllTrans: false,
      dupFile: false,
      // export template
      csvtemplate_headers: {
        username: 'User ID'.replace(/,/g, ''), // remove commas to avoid errors
        amount: 'Amount',
        type: 'Cash(1) / Bonus (2)',
        note: 'Note',
      },
      csvtemplate_itemsFormatted: [
        {
          username: '99dev101000019'.replace(/,/g, ''),
          amount: '100',
          type: '1',
          note: '(ตัวอย่างที่ 1 ประเภท cash)',
        },
        {
          username: '99dev101000002'.replace(/,/g, ''),
          amount: '50',
          type: '2',
          note: '(ตัวอย่างที่ 2 ประเภท bonus)',
        },
      ],
      csvtemplate_fileTitle: 'csv-template-import-return-credit-v1',
      // icons
      ic: {
        cilLoopCircular,
        cilPlaylistAdd,
        cilDescription,
        cilSearch,
        cilBook,
        cilCheckCircle,
        cilXCircle,
        cilWarning,
        cilNoteAdd,
        cilNewspaper,
        cilArrowThickToBottom,
        cilCloudDownload,
      },
    }
  },
  methods: {
    ...mapActions({
      tokenExpired: 'auth/tokenExpired',
    }),
    createToast(_color, _title, _content) {
      this.toasts.push({
        title: _title,
        content: _content,
        color: _color,
      })
    },
    navigateToNewTap(route) {
      // this.$router.push(route)
      let _route = this.$router.resolve({ path: route })
      window.open(_route.href)
    },

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
    async getWinLossList() {
      this.listDataWinLoss = []
      this.totalBonusWinLoss = 0
      this.totalCashWinLoss = 0
      this.totalWinLoss = 0

      await this.$http
        .post('panel/getreturnwinloss', {})
        .then((response) => {
          if (response.data.status == 200) {
            this.listDataWinLoss = response.data.result
            for (let i = 0; i < this.listDataWinLoss.length; i++) {
              this.totalBonusWinLoss += this.listDataWinLoss[i].amountBonus
              this.totalCashWinLoss += this.listDataWinLoss[i].amountCash
              this.totalWinLoss +=
                this.listDataWinLoss[i].amountCash +
                this.listDataWinLoss[i].amountBonus
            }
            console.log(this.listDataWinLoss)
          } else if (
            response.data.status == 502 ||
            response.data.status == 503
          ) {
            this.tokenExpired().then(() => {
              this.navigateTo('/pages/login')
            })
          } else {
            console.log(
              'call api - panel/getreturnwinloss : status = ' +
                response.data.status +
                ', message = ' +
                response.data.message,
            )
          }
        })
        .catch((error) => {
          console.log('call api - panel/getreturnwinloss : error' + error)
        })
    },
    async viewWinLossByID(_id) {
      this.transactionID = _id
      this.dataWinLossByIDSummary = {}
      this.dataWinLossByIDTransaction = []
      this.totalWinLossByID = 0

      await this.$http
        .post('panel/getreturnwinlossbyid', {
          file_id: _id,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.dataWinLossByIDSummary = response.data.summary
            this.dataWinLossByIDTransaction = response.data.transaction
            this.totalWinLossByID =
              this.dataWinLossByIDSummary.amountBonus +
              this.dataWinLossByIDSummary.amountCash
            this.filterProcessing = true
            this.filterSuccess = true
            this.filterFail = true
            this.mdView = true

            console.log(this.dataWinLossByIDSummary)
            console.log(this.dataWinLossByIDTransaction)
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
              'call api - panel/getreturnwinlossbyid : status = ' +
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
          console.log('call api - panel/getreturnwinlossbyid : error' + error)
        })
    },
    async submitImportWinLoss() {
      let _transactions = []
      for (let i = 0; i < this.csvfileResult.length; i++) {
        if (
          this.csvfileResult[i].validation == true &&
          this.csvfileResult[i].checked == true
        ) {
          let _type = ''
          if (this.csvfileResult[i].type == '1') {
            _type = 'cash'
          } else if (this.csvfileResult[i].type == '2') {
            _type = 'bonus'
          }

          // prepare json
          let _result = {
            no: this.csvfileResult[i].no,
            username: this.csvfileResult[i].username,
            amount: this.csvfileResult[i].amount,
            type: _type,
            description: this.csvfileResult[i].description,
          }
          _transactions.push(_result)
        }
      }
      await this.$http
        .post('panel/returnwinloss', {
          agent_id: this.currentWebAgent,
          file_name: this.csvfileName,
          transaction_file: _transactions,
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.createToast(
              'success',
              'การดำเนินการ',
              'ทำรายการเข้าสู่ระบบเรียบร้อยแล้ว',
            )
            this.getWinLossList()
            this.mdViewImport = false
            // Resets
            this.csvFailAllTrans = false
            this.csvfileAmountTotal = 0
            this.csvfileName = ''
            this.csvfileResult = null
            this.dupFile = false
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
              'call api - panel/returnwinloss : status = ' +
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
          console.log('call api - panel/returnwinloss : error' + error)
        })
    },

    // functions
    onchgPrefix(_id) {
      this.currentWebAgent = _id
      // this.getMemberList(_id)
    },
    convertTransacStatusColor(_val) {
      if (_val == 'success') {
        return 'success'
      } else if (_val == 'failed') {
        return 'danger'
      } else if (_val == 'processing') {
        return 'warning'
      } else {
        return 'light'
      }
    },
    convertTypeColor(_val) {
      if (_val == 'bonus' || _val == 'Bonus') {
        return 'info'
      } else if (_val == 'cash' || _val == 'Cash') {
        return 'dark'
      } else {
        return 'warning'
      }
    },
    convertStatusColor(_val) {
      if (_val == 'pending') {
        return 'info'
      } else if (_val == 'processing') {
        return 'warning'
      } else if (_val == 'success') {
        return 'success'
      } else {
        return 'light'
      }
    },
    convertUserNoteColor(value) {
      if (!value) return 'danger'
      const _val = value.toString().toLowerCase()
      if (_val == 'system') {
        return 'secondary'
      } else {
        return 'dark'
      }
    },
    convertDate(_val) {
      var myDate = new Date(_val)
      return moment(myDate).format('DD/MM/YYYY')
    },
    convertTime(_val) {
      var myDate = new Date(_val)
      return moment(myDate).format('HH:mm')
    },
    convertAmount2Degit(_val) {
      return Number(_val).toFixed(2)
    },
    convertTypeAmount(_val) {
      if (_val == '1') {
        return 'cash'
      } else if (_val == '2') {
        return 'bonus'
      } else {
        return '!!' + _val
      }
    },
    convertTypeAmountColor(_val) {
      if (_val == '1') {
        return 'dark'
      } else if (_val == '2') {
        return 'info'
      } else {
        return 'warning'
      }
    },
    filterStatusCalculate(_processing, _success, _fail) {
      let _total = 0
      for (let i = 0; i < this.dataWinLossByIDTransaction.length; i++) {
        console.log(_processing, _success, _fail)
        if (
          (_processing &&
            this.dataWinLossByIDTransaction[i].transaction_file.status ==
              'processing') ||
          (_success &&
            this.dataWinLossByIDTransaction[i].transaction_file.status ==
              'success') ||
          (_fail &&
            this.dataWinLossByIDTransaction[i].transaction_file.status ==
              'failed')
        ) {
          _total += this.dataWinLossByIDTransaction[i].transaction_file.amount
          console.log(_total)
        }
      }
      this.totalWinLossByID = _total
    },

    pickFile(_confirmed) {
      if (this.$refs.myFile.value) {
        this.mdDuplicateFile = false
        this.csvfileResult = null
        this.csvfileAmountTotal = 0
        this.csvfileName = ''
        this.dupFile = _confirmed
        this.csvFailAllTrans = false

        let isRead = true
        if (this.dupFile == true) {
          isRead = true
        } else {
          let _filename = this.$refs.myFile.files[0].name
          for (let i = 0; i < this.listDataWinLoss.length; i++) {
            if (_filename == this.listDataWinLoss[i].file_name) {
              isRead = false
              break
            }
          }
        }

        if (isRead == true) {
          this.dupFile = false
          // Read file
          let lines = ''
          let currentline = ''
          let csv = ''
          let header = ''
          let result = []
          this.csvfileName = this.$refs.myFile.files[0].name

          let input = this.$refs.myFile

          // clear file selected
          let file = input.files

          if (file && file[0]) {
            // reader.readAsText(this.$refs.myFile.files[0])
            let reader = new FileReader()
            reader.onload = (e) => {
              csv = e.target.result
              lines = csv.split('\r' + '\n')
              // header = lines[0].split(',')
              header = [
                'username',
                'amount',
                'type',
                'description',
                'no',
                'checked',
                'validation',
              ]
              let _failAllTrans = 0
              let _alltransaction = 0
              for (var i = 1; i < lines.length; i++) {
                if (!lines[i]) continue
                let obj = {}
                currentline = lines[i]
                var re = /"/g
                currentline = re[Symbol.replace](currentline, '')
                currentline = currentline.split(',')
                currentline.push(i)
                _alltransaction += 1

                let _valid = true
                let _checked = true
                for (var j = 0; j < header.length; j++) {
                  if (
                    j == 0 ||
                    j == 1 ||
                    j == 2 ||
                    j == 3 ||
                    j == 4 ||
                    j == 5 ||
                    j == 6
                  ) {
                    let head = header[j].trim()
                    let value = ''

                    // validations
                    if (j == 0) {
                      // Customer name
                      if (currentline[j] == '') {
                        _checked = false
                        _valid = false
                      }
                    }
                    if (j == 1) {
                      // Amount > 0
                      let _number = Number(currentline[j])
                      if (_number <= 0) {
                        _checked = false
                        _valid = false
                      }
                    }
                    if (j == 2) {
                      // Type (Cash / Bonus)
                      if (currentline[j] != '2') {
                        _checked = false
                        _valid = false
                      }
                    }
                    if (j == 3) {
                      // Description
                      if (currentline[j] == '') {
                        _checked = false
                        _valid = false
                      }
                    }
                    // -----

                    // final loop
                    if (j == 5) {
                      currentline.push(_checked)
                    }
                    if (j == 6) {
                      currentline.push(_valid)
                    }

                    if (typeof currentline[j] == 'string') {
                      value = currentline[j].trim()
                    } else {
                      value = currentline[j]
                    }
                    if (j == 1) {
                      this.csvfileAmountTotal += Number(currentline[j])
                    }
                    obj[head] = value
                  }
                }
                if (_valid == false) {
                  _failAllTrans += 1
                }
                result.push(obj)
              }
              // result = JSON.stringify(result)
              this.csvfileResult = result

              // check fail all transaction
              if (_failAllTrans == _alltransaction) {
                this.csvFailAllTrans = true
              }

              // show import modal
              this.mdViewImport = true
              console.log(result)
            }
            reader.readAsText(file[0])
            this.$emit('input', file[0])
            this.$refs.myFile.value = null
          }
        } else {
          this.mdDuplicateFile = true
          this.dupFile = false
        }
      }
    },
    exportCSVFile(headers, items, fileTitle) {
      if (headers) {
        items.unshift(headers)
      }

      // Convert Object to JSON
      var jsonObject = JSON.stringify(items)

      var csv = this.convertToCSV(jsonObject)

      var exportedFilenmae = fileTitle + '.csv' || 'export.csv'

      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae)
      } else {
        var link = document.createElement('a')
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', exportedFilenmae)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    },
    convertToCSV(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray
      var str = ''

      for (var i = 0; i < array.length; i++) {
        var line = ''
        for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index]
        }

        str += line + '\r\n'
      }

      return str
    },
  },
  mounted() {
    this.getWebPrefixList().then(() => {
      if (!this.currentWebAgent) {
        this.currentWebAgent = this.optWebAgent[0]._id
        this.getWinLossList()
      }
    })

    // Demo
    // this.mdViewImport = true
  },
}
</script>
