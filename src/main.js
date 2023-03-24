import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import router from "./router";
import store from "./store/index"
import Vant from 'vant'
import i18n from './utils/index';
import formatDateTime from "./utils/date"
import SliderShow from 'slider-show'
// import formatDateTime from "./utils/date"
import '../src/utils/main' 
//引入rem适配文件
import "./utils/rem"
Vue.use(SliderShow)
//vue2使用Swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper)

Vue.use(Vuex)
Vue.prototype.formatDateTime = formatDateTime
import "./assets/css/initialization.css";
import "./assets/css/index.css";
Vue.config.productionTip = false;
//在main.js引入
import Web3 from 'web3'
Vue.prototype.Web3 = Web3

// 导入api.js 方法
import BNB from './abi/BNB'; 
Vue.use(BNB)
//swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// Vue.use(VueAwesomeSwiper)


import 'vant/lib/index.css';
Vue.use(Vant)

import { CountDown } from 'vant';
Vue.use(CountDown);

import {tip} from './utils/tip'
Vue.prototype.$tip = tip

import MyDialog from "@/components/MyDialog.vue";
Vue.component('MyDialog',MyDialog) 

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//获取本地选择的语言
new Vue({
  router,
  store,
  i18n,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
