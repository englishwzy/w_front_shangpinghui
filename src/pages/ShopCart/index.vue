<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="changeStatus(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkunum('mini', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkunum('shuru', $event.target.value, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkunum('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckedAll"
          @change="checkedAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">0</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle"; //按需引入节流
export default {
  name: "ShopCart",
  mounted() {
    this.getCartInfo();
    // console.log(this.isCheckedAll);
  },
  methods: {
    getCartInfo() {
      this.$store.dispatch("shopcartAbout/getCartInfo");
    },
    // 切换num数量  3.12

    // 处理数量加上节流
    changeSkunum: throttle(async function (type, num, skuObj) {
      let skuNum = 0;
      // console.log("@", num);
      switch (type) {
        case "add":
          skuNum = 1;
          break;
        case "mini":
          if (skuObj.skuNum > 1) {
            skuNum = -1;
          } else {
            skuNum = 0;
          }
          break;
        case "shuru":
          if (isNaN(num)) {
            skuNum = 0;
          } else {
            skuNum = parseInt(num - skuObj.skuNum);
            if (skuObj.skuNum + skuNum < 0) {
              skuNum = 0;
            }
          }
          break;
      }
      console.log(skuNum);
      try {
        let result = await this.$store.dispatch("detailAbout/addCart", {
          skuId: skuObj.skuId,
          skuNum: skuNum,
        });
        console.log(result);
        this.getCartInfo();
      } catch (error) {
        alert(error.message);
      }
    }, 50),
    // 删除购物车
    async deleteCart(skuId) {
      // console.log(skuId);
      try {
        let result = await this.$store.dispatch(
          "shopcartAbout/deleteCart",
          skuId
        );
        console.log(result);
        this.getCartInfo();
      } catch (error) {
        alert(error.message);
      }
    },

    // 改变选中状态
    async changeStatus(cartInfo) {
      let status = "0";
      if (cartInfo.isChecked == "1") {
        status = "0";
      } else {
        status = "1";
      }
      console.log(status);
      try {
        let result = await this.$store.dispatch("shopcartAbout/changeChecked", {
          skuId: cartInfo.skuId,
          isChecked: status,
        });
        console.log(result);
        this.getCartInfo();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的商品
    async deleteAllChecked() {
      try {
        let result = await this.$store.dispatch(
          "shopcartAbout/deleteAllChecked"
        );
        console.log(result);
        this.getCartInfo();
      } catch (error) {
        alert(error.message);
      }
    },

    // 全选、全不选状态改变
    async checkedAll(e) {
      try {
        let flag = e.target.checked == true ? "1" : "0";
        console.log(flag);
        let result = await this.$store.dispatch(
          "shopcartAbout/checkedAll",
          flag
        );
        console.log(result);
        this.getCartInfo();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters("shopcartAbout", ["cartInfoList"]),
    isCheckedAll() {
      let result = this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
      console.log(result);
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>