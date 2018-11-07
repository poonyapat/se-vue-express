<template>
  <v-app id="app">
    <navigator/>
    <router-view/>
  </v-app>

</template>
<script>
  import Navigator from '@/components/Navigator'
  export default {
    components: {
      Navigator
    },
    beforeCreate() {
      if (!this.$store.state.isUserLoggedIn){
        this.$router.push({name: 'home'})
      }
    },
    watch:{
      '$store.state.isUserLoggedIn': {
        immediate: true,
        async handler (value) {
          if (!value){
            this.$router.push({name: 'home'})
          }
        }
      }
    }
  }
</script>
<style src="./theme.css">

</style>
