// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import titleMixin from './mixins/titleMixin'
import VueMeta from 'vue-meta'
import VCalender from 'v-calendar' // why is v2 of this not working? https://github.com/nathanreyes/v-calendar/issues/303#issuecomment-536914997

Vue.use(VueMeta)
Vue.mixin(titleMixin) // not working on page navigation

Vue.use(VueLazyload, {
  observer: true,
  loading: '/static/img/blank-profile-picture.png',
  error: '/static/img/placeholder-image.png', // https://stackoverflow.com/a/47677814
})
Vue.config.productionTip = false;

Vue.use(VCalender)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  components: { App },
  render: (h) => {
    return h(App)
  },
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
})
// .$mount('#app')

/* document.addEventListener('DOMContentLoaded', function () {
  // this assumes App.vue template root element has `id="app"
  app.$mount('#app')
}); */
