// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import HighchartsVue from "highcharts-vue";
import router from './router'

Vue.config.productionTip = false
Vue.prototype.AMAZON_URL = 'https://www.amazon.in';
Vue.prototype.FAKE_DETECTOR_URL = 'http://127.0.0.1:5000';
Vue.prototype.SCRAPPER_URL = 'http://127.0.0.1:5001';
Vue.prototype.REVIEW_ANALYSIS_URL = 'http://127.0.0.1:5002';

Vue.use(HighchartsVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

