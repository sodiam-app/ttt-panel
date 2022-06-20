// URL gateway API.
const gatewayUrl = 'http://192.168.1.41:10000'

module.exports = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0wNi0yMFQyMjoyNzo1MSswNzowMCIsInVzZXJuYW1lIjoibWFuYWdlcjAxIiwidXNlcl9pZCI6IjYyYTNhMmMwZGMwNDVmMDViMTI2MWJjYyIsInJvbGUiOiJtYW5hZ2VyIiwicmVxdWVzdCI6InBhbmVsIiwiaWF0IjoxNjU1NzM4ODcxLCJleHAiOjE2NTU3ODIwNzF9.kH74DXjs3GXsgjeIN8APaGyCe9xxayGqWSUhvaGILNc',
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
