<template>
  <div>
    <Typenav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-show="goodInfo.categoryName">
              {{ goodInfo.categoryName }}<i @click="removeCategory">x</i>
            </li>
            <!-- 关键词面包屑 -->
            <li class="with-x" v-show="goodInfo.keyword">
              {{ goodInfo.keyword }}<i @click="removeKeyword">x</i>
            </li>
            <!-- 商标面包屑 -->
            <li class="with-x" v-if="goodInfo.trademark">
              {{ goodInfo.trademark.split(":")[1]
              }}<i @click="removeTrademark">x</i>
            </li>
            <li
              class="with-x"
              v-for="(prop, index) in goodInfo.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}<i @click="removeProp(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademark="tradeMarkHandler" @attr="AttrHandler" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click.prevent="changeOrder(1)">
                  <a href="#"
                    >综合<i
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantoucuxiao': isAsc && isOne,
                        'icon-xiangxiajiantoucuxiao': isDesc && isOne,
                      }"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click.prevent="changeOrder(2)">
                  <a href="#"
                    >价格<i
                      class="iconfont"
                      :class="{
                        'icon-xiangshangjiantoucuxiao': isAsc && isTwo,
                        'icon-xiangxiajiantoucuxiao': isDesc && isTwo,
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`"
                      ><img v-lazy="good.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>$</em>
                      <i> {{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :pageNo="goodInfo.pageNo"
            :pageSize="goodInfo.pageSize"
            :continue="5"
            :total="list.total"
            @changePage="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      goodInfo: {
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        categoryName: undefined, //分类名字
        keyword: "", //关键字
        props: [], //平台售卖属性
        order: "2:asc", //排序
        pageNo: 1, //当前第几页
        pageSize: 10, //每页20个数据
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  beforeMount() {
    Object.assign(this.goodInfo, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState("searchAbout", ["list"]),
    ...mapGetters("searchAbout", ["attrsList", "goodsList", "trademarkList"]),
    // 判断是否是综合还是价格排序
    isOne() {
      return this.goodInfo.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.goodInfo.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.goodInfo.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.goodInfo.order.indexOf("desc") !== -1;
    },
  },
  methods: {
    getData() {
      this.$store.dispatch("searchAbout/getGoodsListaction", this.goodInfo);
      this.goodInfo.category1Id = undefined;
      this.goodInfo.category2Id = undefined;
      this.goodInfo.category3Id = undefined;
    },
    removeCategory() {
      this.goodInfo.categoryName = undefined;
      // 当点击x后，把名字定义为undefined。这样不会把这个参数添加到发送请求中。
      if (this.$route.params) {
        // 如果路由有params参数，则跳转路由。这时候watch监听到路由变化，把数据更新到请求发送的数据中，并且发送请求。
        this.$router.push({ name: "sousuo", params: this.$route.params });
      } else {
        this.$router.push({ name: "sousuo" });
      }
    },
    removeKeyword() {
      this.$bus.$emit("clear");
      this.goodInfo.keyword = undefined;
      this.$router.push({ name: "sousuo", query: this.$route.query });
    },
    // 这个是自定义事件的回调函数 数据格式：品牌: "ID:品牌名称"
    tradeMarkHandler(value) {
      // console.log(value);
      this.goodInfo.trademark = `${value.tmId}:${value.tmName}`;
      this.getData();
    },

    removeTrademark() {
      this.goodInfo.trademark = undefined;
      this.getData();
    },

    AttrHandler(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      console.log(props);
      if (this.goodInfo.props.indexOf(props) === -1) {
        this.goodInfo.props.push(props);
        this.getData();
      }
    },

    removeProp(index) {
      this.goodInfo.props.splice(index, 1);
      this.getData();
    },

    changeOrder(flag) {
      let originFlag = this.goodInfo.order.split(":")[0];
      let originOrder = this.goodInfo.order.split(":")[1];
      let newOrder;
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originOrder === "desc" ? "asc" : "desc"}`;
        //  this.goodInfo.order = newOrder;
      } else {
        newOrder = `${flag}:${originOrder}`;
      }
      this.goodInfo.order = newOrder;
      this.getData();
    },
    // 修改当前的pageNo，再次发送请求
    changePage(pageNo) {
      this.goodInfo.pageNo = pageNo;
      this.getData();
    },
  },
  watch: {
    $route(newValue, old) {
      Object.assign(this.goodInfo, this.$route.query, this.$route.params);
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>