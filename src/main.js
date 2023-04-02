import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
// 三个全局组件
import Typenav from '@/components/Typenav'
import Carsouel from "@/components/Carsouel"
import Pagination from "@/components/Pagination"

// 按需引入 弹框
import { MessageBox } from "element-ui"

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

import store from "@/store"
// 统一导入API
import * as API from "@/api/index";
Vue.prototype.$API = API;
import "@/mock/mockServe"
// 引入swiper样式
import "swiper/css/swiper.css"
import ElementUI from 'element-ui'

import img from "@/assets/1.gif"
// 懒加载
import VueLazyload from 'vue-lazyload'
// 使用插件
Vue.use(VueLazyload, {
  loading: img,
})



Vue.config.productionTip = false
// 注册全局组件
Vue.component(Carsouel.name, Carsouel)
Vue.component(Typenav.name, Typenav)
Vue.component(Pagination.name, Pagination)
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
