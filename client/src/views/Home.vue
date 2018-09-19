<template>
  <v-layout row align-center justify-space-around>
      <v-flex lg7 xl3>
        <carousel/>
      </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src

import Carousel from '@/components/Carousel'
export default {
  name: 'home',
  components: {
    Carousel
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
