//此模块作用：统一管理api接口
import requests from './request'
import mockRequests from './mock'
//三级联动api 
export const reqCategoryList = () => requests({url: 'product/getBaseCategoryList', method: 'get'})
// 获取首页轮播图
export const reqGetBannerList = () => mockRequests({url: '/banner', method: 'get'})
// 获取floor数据
export const reqGetFloorList = () => mockRequests({url: '/floor', method: 'get'})
// 获取搜索模块数据 请求方式：post 需要带参数, 给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({url: "/list", method: "post", data: params})
// 获取产品详情接口  URL: /api/item/{ skuId } 请求方式：get
export const reqGetGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method: "get"})
// 将产品添加到购物车中（获取或更新某产品的个数）
///api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})
// 获取购物车数据
export const reqCartList = () => requests({url: '/cart/cartList', method: 'get'})
// 删除购物车产品接口
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'DELETE'})
// 修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
// 获取验证码接口
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})
// 用户注册接口
export const reqUserRegister = (data) => requests({url: '/user/passport/register', data, method: 'post'})
// 用户登录接口
export const reqUserLogin = (data) => requests({url: '/user/passport/login', data, method: 'post'})
// 获取用户信息
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'})
// 推出登录
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'})