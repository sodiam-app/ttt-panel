export default [
  {
    component: 'CNavItem',
    name: 'แดชบอร์ด',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavTitle',
    name: 'ข้อมูลการเงิน',
  },
  {
    component: 'CNavItem',
    name: 'ฝาก - ถอน',
    to: '/banking/transaction',
    icon: 'cil-institution',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'โอนมือ',
  //   to: '/banking/transfer',
  //   icon: 'cil-braille',
  // },
  {
    component: 'CNavTitle',
    name: 'ข้อมูลลูกค้า',
  },
  {
    component: 'CNavItem',
    name: 'สร้างลูกค้าใหม่',
    to: '/member/create',
    icon: 'cil-user-plus',
  },
  {
    component: 'CNavItem',
    name: 'รายชื่อลูกค้า',
    to: '/member/list',
    icon: 'cil-group',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'รายชื่อลูกค้าเปิดใหม่',
  //   to: '/member/list-new',
  //   icon: 'cil-child',
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'แบลคลิส',
  //   to: '/member/blacklist',
  //   icon: 'cil-thumb-down',
  // },
  {
    component: 'CNavTitle',
    name: 'การตั้งค่า',
  },
  // {
  //   component: 'CNavGroup',
  //   name: 'ระบบ',
  //   to: '/setting',
  //   icon: 'cil-settings',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'ทั่วไป',
  //       to: '/setting/general',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'บัญชีเว็บ',
  //       to: '/setting/banking-acct',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'หน้าเว็บ',
  //       to: '/setting/front-end',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ความปลอดภัย',
  //       to: '/setting/security',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'เว็บเอเย่น',
  //       to: '/setting/agent',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'บัญชีดำ',
  //       to: '/setting/balck-list',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'โปรโมชั่น',
  //   to: '/promotion',
  //   icon: 'cil-gift',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'ตั้งค่าโปร',
  //       to: '/promotion/setting',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'การเข้าร่วม',
  //       to: '/promotion/joined',
  //     },
  //   ],
  // },
  {
    component: 'CNavItem',
    name: 'พนักงาน',
    to: '/setting/employee',
    icon: 'cil-contact',
  },
  // {
  //   component: 'CNavTitle',
  //   name: 'รายงาน',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: 'รายงาน',
  //   to: '/report',
  //   icon: 'cil-folder-open',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: 'ตัดรอบบิล',
  //       to: '/report/bill-cycle',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ภาพรวม (สถิติ)',
  //       to: '/report/overall-stat',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ภาพรวมยูสเซอร์',
  //       to: '/report/overall-members',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'สรุปยอดรายเดือน',
  //       to: '/report/monthly-summary',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: 'ความเคลื่อนไหว',
  //       to: '/report/action-event',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'นำออกเอกสาร',
  //   to: '/report/export',
  //   icon: 'cil-cloud-download',
  // },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
