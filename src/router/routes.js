// 引入路由组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
// 路由配置信息
export default [
  { path: '/shopcart', component: ShopCart, name: 'shopcart', meta: { show: true } },
  { path: '/addcartsuccess', component: AddCartSuccess, name: 'addcartsuccess', meta: { show: true } },
  { path: '/detail/:skuid', component: Detail, meta: { show: true } },
  { path: '/home', component: Home, meta: { show: true } },
  { path: '/Search/:keyword', component: Search, meta: { show: true }, name: 'search' },
  { path: '/Login', component: Login, meta: { show: false } },
  { path: '/Register', component: Register, meta: { show: false } },
  // 路由重定向
  { path: '*', redirect: '/home' },
]