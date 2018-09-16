<template>
  <v-app id="app" primary>
    <navigator/>
    <v-content>
      <v-container fluid >
        <router-view/>
      </v-container>
    </v-content>
  </v-app>

</template>
<script>
  import Navigator from '@/components/Navigator'
  export default {
    components: {
      Navigator
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
</style>
