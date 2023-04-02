import { deleteCart, changeStatus, getCatInfo } from "@/api/index"
export default {
    namespaced: true,
    actions: {
        // 删除购物车商品信息
        async deleteCart(context, skuId) {
            let result = await deleteCart(skuId);
            // console.log(result);
            if (result.data.code == 200) {
                return "删除成功！";
            } else {
                return Promise.reject("fail");
            }
        },

        // 改变选中状态
        async changeChecked(context, { skuId, isChecked }) {
            // console.log("@", skuId, isChecked);
            let result = await changeStatus(skuId, isChecked);
            // console.log(result);
            if (result.data.code == 200) {
                return "选中状态改变成功";
            } else {
                return Promise.reject("fail");
            }
        },
        // 获取购物车信息
        async getCartInfo(context, value) {

            let result = await getCatInfo();
            // console.log("获取信息");
            // console.log(result.data.data);
            if (result.data.code == 200) {
                context.commit("GetCartInfo", result.data.data);
            }
        },

        // 删除选中的商品
        deleteAllChecked({ dispatch, getters }) {
            let promiseAll = [];
            getters.cartInfoList.forEach(item => {

                if (item.isChecked == 1) {
                    let promise = dispatch("deleteCart", item.skuId);
                    promiseAll.push(promise);
                }
            })
            return Promise.all(promiseAll);
            // 如果一个失败返回失败，全成功才是成功。
        },

        // 全选全不选状态改变
        checkedAll({ dispatch, getters }, isChecked) {
            let promiseAll = [];
            getters.cartInfoList.forEach(item => {
                let result = dispatch("changeChecked", { skuId: item.skuId, isChecked });
                promiseAll.push(result);
            })
            return Promise.all(promiseAll);
        }

    },
    mutations: {
        GetCartInfo(state, value) {
            state.cartInfo = value;
        }
    },
    state: {
        cartInfo: ["1"],
    },
    getters: {
        // 购物车信息
        cartInfoList(state) {
            return state.cartInfo[0].cartInfoList || [];
        }
    }
}