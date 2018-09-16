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
  }
}
</script>
