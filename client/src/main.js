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
    primary: colors.black, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
    inspire: colors.grey.darken3
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
