// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from "./store"
import router from './router'
import 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
if (window.plus) {
  window.plus.navigator.setFullscreen(true)
  window.plus.screen.lockOrientation('landscape')
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
