<template>
  <div id="app">
  <v-app id="app" >
    <v-content>
      <v-container fluid >
        <v-layout row wrap="false" align-center justify-space-around>
           <v-flex lg7 xl3>
              <pic></pic>
           </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>

</template>

<script>
// @ is an alias to /src

import Pic from '@/components/pic.vue'
export default {
  name: 'home',
 components: {
    Pic
 }
}
</script>
