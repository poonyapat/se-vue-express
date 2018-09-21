<template>
  <!-- <v-layout row align-center justify-space-around>
      <v-flex lg7 xl3>
        <carousel/>
      </v-flex>
  </v-layout> -->
  <v-jumbotron
    :gradient="gradient"
    dark
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    height="100%"
    width="100%"
    class="ma-0" >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex class="white--text">
          <h3 class="display-3">Welcome to the Panut Team</h3>

          <span class="subheading">Panut Team help you coordinate and manage all the work your team does together. 
            <br> So everyone knows what they have to do, who’s responsible for doing it, and when it’s due.</span>

          <v-divider class="my-3"></v-divider>
          
          
            <sign-up v-if="!isUserLoggedIn">
                <v-btn
            class="mx-0"
            color="primary"
            large
          >
            Join Us
          </v-btn>
            </sign-up>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
// @ is an alias to /src

import Carousel from '@/components/Carousel'
import SignUp from '@/components/SignUp'
export default {
  name: 'home',
  data() {
    return {
      gradient: 'to top right, rgba(63,81,255, .8), rgba(25,32,72, .7)'
    }
  },
  components: {
    Carousel, SignUp
  },
  beforeCreate() {
    if (this.$store.state.isUserLoggedIn){
      this.$router.push({name: 'profile', params: {username: this.$store.state.user}})
    }
  },
  watch: {
    '$store.state.isUserLoggedIn': {
      immediate: true,
      async handler (value) {
        if (value){
          this.$router.push({name: 'profile', params: {username: this.$store.state.user}})
        }
      }
    }
  }
}
</script>
