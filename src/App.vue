<template>
  <div class="app-container">
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home、Search是显示的，在登录、注册是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'

import Footer from '@/components/Footer/index.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {},
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知vuex发送请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped></style>
