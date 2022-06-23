<template>
  <CDropdown variant="nav-item">
    <!-- <CDropdownToggle placement="bottom-end" class="py-0" :caret="false"> -->
    <CDropdownToggle class="py-0" :caret="false">
      <CAvatar
        :src="getImgAvatar(user.role, user.avatar)"
        size="md"
        status="success"
      />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        {{ user.name }} <small class="small">({{ user.role }})</small>
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Updates
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        ตั้งค่า
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> โปรไฟล์ </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> ตั้งค่าระบบ </CDropdownItem>
      <!-- <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <!-- <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem> -->
      <CDropdownDivider />
      <!-- <CDropdownItem>
        <CIcon icon="cil-shield-alt" /> Lock Account
      </CDropdownItem> -->
      <li>
        <a class="dropdown-item" @click.prevent="singOut">
          <CIcon icon="cil-lock-locked" /> ออกจากระบบ
        </a>
      </li>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import avatar from '@/assets/images/avatars/owner/02.png'
export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    return {
      avatar: avatar,
      itemsCount: 42,
    }
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut',
    }),
    singOut() {
      this.signOutAction().then(() => {
        this.navigateTo('/pages/login')
      })
    },
    navigateTo(route) {
      this.$router.push(route)
    },
    getImgAvatar(role, img) {
      return require('../assets/images/avatars/' + role + '/' + img)
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>
