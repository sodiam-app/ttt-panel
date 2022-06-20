// URL gateway API.
const gatewayUrl = 'http://192.168.1.41:10000'

module.exports = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0wNi0yMVQwNToyMTo0MCswNzowMCIsInVzZXJuYW1lIjoiYWRtaW45OSIsInVzZXJfaWQiOiI2MmIwZjJhNGQ4YWZkZDMyMzYzMGQwZTkiLCJyb2xlIjoiYWRtaW4iLCJyZXF1ZXN0IjoicGFuZWwiLCJpYXQiOjE2NTU3NjM3MDB9.zdM713S7uTRHvfR42YXykOgGUotQEaDF0W1wpdkor14',
  member: {
    GetAllmember: gatewayUrl + '/member/getallmember',
    GetMemberProfile: gatewayUrl + '/panel/getprofileuser',
  },
  banking: {
    history: gatewayUrl + '/panel/history',
    deposit: {
      SubmitDeposit: gatewayUrl + '/panel/deposit',
    },
    withdraw: {},
  },
  setting: {
    system: {},
    employee: {
      GetAllEmployee: gatewayUrl + '/panel/getallemployee',
      AddEmployee: gatewayUrl + '/panel/addemployee',
    },
    promotion: {},
  },
  report: {},
  conf: {
    GetRole: gatewayUrl + '/panel/getrole',
    GetChannel: gatewayUrl + '/panel/getchannel',
    GetPrivilege: gatewayUrl + '/panel/getprivilege',
    GetStatus: gatewayUrl + '/panel/getstatus',
    GetBanking: gatewayUrl + '/panel/getbanking',
  },
}
