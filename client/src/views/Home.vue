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
          
          
            <Login v-if="!isUserLoggedIn">
                <v-btn
            class="mx-0"
            color="primary"
            large
          >
            Get Started
          </v-btn>
            </Login>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
// @ is an alias to /src

import Carousel from '@/components/Carousel'
import Login from '@/components/Login'
import {mapState} from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      gradient: 'to top right, rgba(63,81,255, .8), rgba(25,32,72, .7)'
    }
  },
  computed: {
    ...mapState([
      'username', 'isUserLoggedIn'
    ])
  },
  components: {
    Carousel, Login
  },
  mounted() {
    if (this.isUserLoggedIn){
      this.$router.push({name: 'profile', params: {username: this.username}})
    }
  },
  watch: {
    'isUserLoggedIn': {
      immediate: true,
      async handler (value) {
        if (value){
          this.$router.push({name: 'profile', params: {username: this.username}})
        }
      }
    }
  }
}
</script>
