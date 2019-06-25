import 'babel-polyfill'/* 要写在前面 */
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
    loading: require('./common/image/default-ldt.png')
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
