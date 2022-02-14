<template>
  <div class="Home-container">
    <!-- 三级联动为全局组件 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor> 
    <Brand></Brand>
  </div>
</template>

<script>
//非路由组件在使用的时候分为三大步：定义、注册、使用
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Brand from './Brand'
import Floor from './Floor'
import {mapState} from 'vuex'
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {},
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  methods: {

  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor
  },
  mounted(){
    // 派发floor的数据
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="less" scoped></style>
