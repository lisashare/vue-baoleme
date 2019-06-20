import './modules/rem'
import Vue from 'vue'
import App from './App'
import router from './router'
//引入样式
import './stylesheets/main.scss';
//引入animate.css
import 'animate.css'
//Vue.use会查找插件对象里的install方法去执行，并且给install方法里传入Vue对象
Vue.config.productionTip = false

//处理axios,让组件通过this.$http来使用
import axios from 'axios'
Vue.prototype.$http = axios;
//引入echarts 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
   //将创建好的store注入到根实例里，目的就是在任意组件中都可以使用到$store的api,用以使用vuex
  store,
  components: { App },
  template: '<App/>'
})
