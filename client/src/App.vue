<template>
  <v-app id="app">
    <navigator/>
    <v-content>
        <router-view/>
    </v-content>
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
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color:#424242;
}
.v-dialog__activator {
  height: 100%;
}

.v-dialog__container {
  display: block !important;
}
</style>
