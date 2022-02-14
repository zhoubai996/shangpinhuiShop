import {reqGetGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid-》生成一个随机字符串（且不能改变）
import {getUUID} from '@/utils/uuid_token.js'
const actions = {
  // 获取产品信息的action
  async getGoodsInfo({commit}, skuId) {
    let result = await reqGetGoodsInfo(skuId)
    if(result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    if(result.code == 200) {          
      return 'ok'                                            
    }else {
      // 加入购物车失败
      return Promise.reject(new Error('faile'))
    }
    
  }
}
const mutations = {
  GETGOODSINFO(state, data) {
    state.goodsInfo = data
  }
}
const state = {
  goodsInfo: {},
  // 游客零时身份
  uuid_token: getUUID()
  
}
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    //比如:state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    //当前计算出的 categoryView属性值至少是一个空对象，假的报错不会有了。
    return state.goodsInfo.categoryView || {}
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
}
export default {
  actions,
  mutations,
  state,
  getters
}