import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'

import HighchartsVue from 'highcharts-vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/ru-RU' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import GAuth from 'vue-google-oauth2'
import Highcharts from 'highcharts'
import VCalendar from 'v-calendar'

import settings from '@/settings'


// Vue.component('calendar', Calendar)
Vue.use(VCalendar, {
  masks: {
    title: 'MMMM YYYY',
    weekdays: 'WW',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'WWW, MMM D, YYYY',
    data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
  }
})
var moment = require('moment')
moment().format()
moment.locale('ru')


Vue.use(GAuth, {
  clientId: settings.clientId,
  scope: 'email https://www.googleapis.com/auth/admin.directory.user.readonly',
  prompt: 'select_account',
  fetch_basic_profile: false
})

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Highcharts.setOptions({
  lang: {
    resetZoom: 'Вернуть'
  }
})

Vue.use(HighchartsVue, {
  highcharts: Highcharts
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
