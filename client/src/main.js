import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false
Vue.use(vuetify,{
  theme: {
    // why did you define these theme? you didn't use theme
    primary: colors.grey.darken4, // #E53935
    secondary: colors.pink.lighten2, // #FFCDD2
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
