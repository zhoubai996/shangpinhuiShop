import Vue from 'vue'
import App from './App.vue'
// 三级联动组件
import TypeNav from '@/components/TypeNav/index.vue'
// 轮播图组件
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'
Vue.component(Carousel.name, Carousel)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false
// 引入MockServe.js----mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/css/swiper.css'
new Vue({
  render: (h) => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  //组件身上会有$route和$router属性
  router,
  //组件身上会有$store属性
  store,
}).$mount('#app')