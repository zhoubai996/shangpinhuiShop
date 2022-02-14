<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <!-- 事件委托 -->
        <div class="all-sort-list2" @click="goSearch">
          <!-- 一级分类 -->
          <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{ cur:currentIndex===index }">
            <h3 @mouseenter="changeIndex(index)">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <!-- 二级分类 -->
              <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
//获取仓库中的categoryList数据
import {mapState} from 'vuex'
//按需引入lodash节流函数 
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      //千万不能为0，否则打开页面第一个就加上了背景色
      //存储一级分类列表索引
      currentIndex: -1,
      show: true
    }
  },
  created() {},
  computed: {
    ...mapState({
      //右侧菜单需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      //注入一个参数state，其实为大仓库的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    //鼠标进去修改响应式数据currentIndex属性
    //使用了节流，且别用箭头函数，可能会出现上下文this问题
    changeIndex: throttle(function(index) {
      this.currentIndex = index
    }, 50),
    //鼠标离开清楚样式，一级分类清除样式
    leaveIndex() {
      this.currentIndex = -1
    },
    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案:编程式导航+事件委派
      //存在一些问题:事件委派，是把全部的子节点[h3、dt、dl、em] 的事件委派给父亲节点
      //点击a标签的时候，才会进行路由跳转[怎么能确定点击的一定是a标签]
      //存在另外一个问题: 即使你能确定点击的是a标签如何区分是一级、二级、三级分类的标签。
      //第一个问题:把子节点当中a标签，我加上自定义属性data-categoryName,其余的子节点是没有的
      let element = event.target;
      //获取到 当前出发这个事件的节点[h3、a、dt、 dl]，需要带有data-categoryname这样 节点[一定是a标签] 
      //节点有一个属性dataset属性， 可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id} = element.dataset;
      //如果标签身上拥有categoryname一定是a标签
      if(categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" }
        let query = { categoryName: categoryname }
        //在判断是a标签的基础上判断是几级分类 
        if(category1id) {
          query.category1Id = category1id
        }else if(category2id) {
          query.category2Id = category2id
        }else if(category3id) {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候，带有params参数，也需要捎带传递过去
        if(this.$route.params) {
          // 携带params参数
          location.params = this.$route.params
          //整理完参数，动态给location配置对象添加query属性
          location.query = query
          //进行路由跳转
          this.$router.push(location)
        }
        
      }


    },
    //当鼠标移入，显示TypeNav
    enterShow() {
      if(this.$route.path != '/home') {
      this.show = true
      }
    },
    //当鼠标移出，让商品分类列表进行隐藏
    leaveShow() {
      this.currentIndex = -1
      //判断如果是search组件的时候才会执行
      if(this.$route.path != '/home') {
        this.show = false
      }

    }
  },
  mounted() {

    //当组件挂载完毕，让show的值变为false
    //如果不是Home路由组件，将TypeNav隐藏
    if(this.$route.path != '/home') {
      this.show = false
    }

  },
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b; 

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .cur {
          background-color: skyblue
        }
      }
    }
    // 过度动画样式
    // 过度动画开始效果（进入）
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all .1s linear;
    }
  }
}
</style>
