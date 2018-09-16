<template>
<div>
  <v-carousel interval="5000" hide-delimiters felx>
    <v-carousel-item v-for="(item,i) in items" :key="i" v-bind:src="item.src" wight="200" >
    </v-carousel-item>
  </v-carousel>
</div>
</template>



<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://www.picz.in.th/images/2018/09/08/fEjLY8.jpg'
          },
          {
            src: 'https://www.picz.in.th/images/2018/09/12/fARGyV.jpg  '
          },
          {
            src: 'https://www.picz.in.th/images/2018/09/12/fARM82.jpg'
          },
          {
            src: 'https://www.picz.in.th/images/2018/09/12/fARmvn.jpg'
          },
          {
            src: 'https://www.picz.in.th/images/2018/09/12/fARIqW.jpg'
          },
          {
            src: 'https://www.picz.in.th/images/2018/09/12/fARFBg.jpg'
          }
        ]
      }
    }
  }
</script>