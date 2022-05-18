<template>
  <CHeader position="sticky" class="mb-3">
    <CContainer fluid class="px-2">
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <CNavLink href="#/dashboard">
            <CIcon :icon="cilChartLine" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#/member/list">
            <CIcon :icon="cilGroup" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#/banking/transaction">
            <CIcon :icon="cilInstitution" size="lg" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <!-- <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer> -->
  </CHeader>
</template>

<script>
// import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'

import { CIcon } from '@coreui/icons-vue'
import {
  cilAvTimer,
  cilInstitution,
  cilGroup,
  cilChartLine,
} from '@coreui/icons'

export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    AppHeaderDropdownAccnt,
    CIcon,
  },
  setup() {
    return {
      logo,
      cilAvTimer,
      cilInstitution,
      cilGroup,
      cilChartLine,
    }
  },
}
</script>
