// URL gateway API.
const gatewayUrl = 'http://192.168.1.123:10000'

module.exports = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0wNi0yMFQxNjo0NzoxMCswNzowMCIsInVzZXJuYW1lIjoibWFuYWdlcjAxIiwidXNlcl9pZCI6IjYyYTNhMmMwZGMwNDVmMDViMTI2MWJjYyIsInJvbGUiOiJtYW5hZ2VyIiwicmVxdWVzdCI6InBhbmVsIiwiaWF0IjoxNjU1NzE4NDMwLCJleHAiOjE2NTU3NjE2MzB9.f2IPidpr1EixIbV2_zD9Jl3-LGOrftpVoKjZpvdpLA0',
  member: {
    GetAllmember: gatewayUrl + '/member/getallmember',
    GetMemberProfile: gatewayUrl + '/panel/getprofileuser',
  },
  banking: {
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
