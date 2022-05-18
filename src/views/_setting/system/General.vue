<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon :icon="ic.cilTerminal" />
        การตั้งค่าระบบ
      </CCardHeader>
      <CCardBody>
        <CCardText>
          <CRow>
            <CCol>
              <CRow>
                <CCol>Prefix</CCol>
                <CCol>Login Url หน้าบ้าน</CCol>
              </CRow>
              <CRow>
                <CCol>Partner Url หน้าบ้าน</CCol>
                <CCol>จำกัดการสมัครต่อวัน ต่อ IP</CCol>
              </CRow>
              <CRow>
                <CCol>User Template</CCol>
                <CCol>Last User</CCol>
              </CRow>
              <CRow>
                <CCol>Line Token ฝาก</CCol>
                <CCol>Line Token ถอน</CCol>
              </CRow>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <CCol>ฝาก</CCol>
            <CCol>ถอน</CCol>
          </CRow>
        </CCardText>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'

import avatar from '@/assets/images/avatars/owner/02.png'

export default {
  components: {},
  name: 'Transfer',
  comments: {},
  data() {
    return {
      avatar: avatar,
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
