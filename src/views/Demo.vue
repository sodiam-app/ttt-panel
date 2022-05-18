<template>
  <div>
    <CCard>
      <CCardHeader component="h5">
        <CRow class="my-2">
          <CCol class="mt-1">
            <strong class="align-middle">
              <CIcon :icon="ic.cilGroup" size="lg" />
              Demo
            </strong>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CRow :xs="{ cols: 4 }" v-for="track in gamelists" :key="track.id">
          <CCol v-for="game in track.games" :key="game.id">
            <CCard>
              <CCardImage
                width="100"
                orientation="top"
                :src="game.image.horizontal"
              />
              <CCardBody>
                <CCardTitle>{{ game.gameName }}</CCardTitle>
                <CCardText>
                  <p>Status: {{ game.status }}</p>
                  <p>Provider: {{ track.providerName }}</p>
                </CCardText>
                <CButton href="#">Go</CButton>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import { imgBankSmoothSet as imgBank } from '@/assets/images/banking/th/smooth-corner'
import { iconsSet as ic } from '@/assets/icons'

const urlGetGameList = 'http://192.168.1.36:45003/getgamelist'

export default {
  name: 'Demo',
  comments: {},
  data() {
    return {
      gamelists: [],
    }
  },
  setup() {
    return {
      imgBank,
      ic,
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async getGameList() {
      await this.$http
        .post(urlGetGameList, { gametype: 'Casino' })
        .then((response) => {
          this.gamelists = response.data.result.data
          // console.log(this.gamelists)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.getGameList()
  },
}
</script>
