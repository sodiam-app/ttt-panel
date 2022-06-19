// URL gateway API.
const gatewayUrl = 'http://192.168.1.41:10000'

module.exports = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiMjAyMi0wNi0xOVQxMjoxMzo0NyswNzowMCIsInVzZXJuYW1lIjoibWFuYWdlcjAxIiwidXNlcl9pZCI6IjYyYTNhMmMwZGMwNDVmMDViMTI2MWJjYyIsInJvbGUiOiJtYW5hZ2VyIiwicmVxdWVzdCI6InBhbmVsIiwiaWF0IjoxNjU1NjE1NjI3LCJleHAiOjE2NTU2NTg4Mjd9.DhPz8cs4uqkuZvGho6h3Vwfgniwwj_L8PQRJdWsJ7z4',
  member: {
    GetAllmember: gatewayUrl + '/member/getallmember',
    GetMemberProfile: gatewayUrl + '/panel/getprofileuser',
  },
  banking: {},
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
  },
}
