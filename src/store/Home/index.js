//home模块的仓库
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'
const actions = {
  async categoryList({commit}) {
    let result = await reqCategoryList()
    // console.log(result);
    if(result.code === 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reqGetBannerList()
    if(result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor轮播图数据
  async getFloorList({commit}) {
    let result = await reqGetFloorList()
    if(result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const state = {
  //state中的起始值别瞎写，服务器返回什么数据类型，起始值就是什么类型
  categoryList: [],
  bannerList: [],
  floorList: []
}
const getters = {

}
export default {
  actions,
  mutations,
  state,
  getters
}