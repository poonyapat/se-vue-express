<template>
  <v-card>
    <v-snackbar v-model="show" :timeout="timeout" :top="y === 'top'">
      {{ text }}
      <v-btn color="pink" flat @click="show = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        require: true
      },
      //  errorMassange: false
      show: false,
    },
    data() {
      return {
        // snackbar: false,   
        y: 'top',
        x: null,
        mode: '',
        timeout: 1000,
        dialog: false
      }
    },
    watch: {
      show(valueA1) {
        this.$emit('showBar', valueA1)
      }
    }

  }
</script>