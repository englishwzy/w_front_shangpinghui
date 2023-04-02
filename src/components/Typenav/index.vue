<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <h1>{{ l }}</h1> -->
    <div class="container">
      <div @mouseleave="mouseLeave" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="nav">
          <div class="sort" @click="goSearch1" v-show="isShow">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(list1, index) in list[0]"
                :key="list1.categoryId"
                @mouseenter="mouseEnter(index)"
                :class="{ cur: curentIndex === index }"
              >
                <h3>
                  <a
                    href="javascript:;"
                    :data-category="list1.categoryName"
                    :data-categoryid1="list1.categoryId"
                    >{{ list1.categoryName }}</a
                  >
                </h3>
                <!-- 二级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: curentIndex === index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="list2 in list1.categoryChild"
                      :key="list2.categoryId"
                    >
                      <dt>
                        <a
                          href="javascript:;"
                          :data-category="list2.categoryName"
                          :data-categoryid2="list2.categoryId"
                          >{{ list2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="list3 in list2.categoryChild"
                          :key="list3.categoryId"
                        >
                          <a
                            href="javascript:;"
                            :data-category="list3.categoryName"
                            :data-categoryid3="list3.categoryId"
                            >{{ list3.categoryName }}</a
                          >
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
// import _ from "lodash";//全部引入
import throttle from "lodash/throttle"; //按需引入节流
import { mapState } from "vuex";
export default {
  name: "Typenav",
  data() {
    return {
      curentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    console.log(this.$route.path);
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    // mouseEnter(index) {
    //   this.curentIndex = index;
    //   console.log("执行", index);
    // }
    // 节流
    mouseEnter: throttle(function (index) {
      this.curentIndex = index;
      console.log("执行", index);
    }, 50),

    mouseLeave() {
      this.curentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    // 移动则显示
    entershow() {
      if (this.$router.path !== "/home") {
        this.isShow = true;
      }
    },
    // 点击跳转到search路由
    goSearch1(e) {
      // const result = this.$router.push("/search");
      // 1.事件委托+编程式路由
      // 存在的问题：1.事件委托：把子组件的事件全部委托给父亲节点
      // 2.点击a标签，如何确定点击的是a标签
      // 3.即使确定是a标签，如何确定是一级、二级、三级a标签

      // 1.获取点击的节点，使用e.target
      console.log(e.target);

      // 2.使用自定义属性来确定点击的是否是a标签    使用dataset来获取自定义属性和值。
      const element = e.target;
      // console.log(element.dataset);
      const location = { name: "sousuo" };
      let { category, categoryid1, categoryid2, categoryid3 } = element.dataset;
      const query = {
        categoryName: category,
      };
      if (categoryid1) {
        query.category1Id = categoryid1;
      } else if (categoryid2) {
        query.category2Id = categoryid2;
      } else if (categoryid3) {
        query.category3Id = categoryid3;
      }
      location.query = query;
      // 判断是否存在params参数,合并参数
      // console.log(this.$route);
      if (this.$route.params) {
        location.params = this.$route.params;
      }
      console.log(location);
      this.$router.push(location);
    },
  },
  computed: {
    ...mapState("homeAbout", ["list"]),
  },
};
</script>

<style scoped lang="less">
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
            // display: none;
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

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
        // .item:hover {
        //   background-color: skyblue;
        // }
      }
    }
  }
}
// 过渡动画
.nav-enter-active {
  animation: trans 0.5s;
}
.nav-leave-active {
  animation: trans 0.5s reverse;
}
@keyframes trans {
  from {
    height: 0;
  }
  to {
    height: 461px;
  }
}
</style>