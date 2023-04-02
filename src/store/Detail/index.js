import { getGoodInfo, addToCat } from "@/api/index"
import { getUuid } from "@/utils/uuid_token"
export default {
    namespaced: true,
    actions: {
        // 获取商品详情数据
        async getGoodDetail(context, skuid) {

            let result = await getGoodInfo(skuid);
            // console.log(result);
            if (result.data.code == 200) {
                context.commit("GetGoodsInfo", result.data.data);
            }
        },

        // 添加购物车
        async addCart({ state, commit, dispatch }, { skuId, skuNum }) {
            //底下即为：加入购物车(修改商品个数)的请求,参数顺序不能瞎写

            let result = await addToCat(skuId, skuNum);
            // console.log("addCart");
            // console.log(result);
            if (result.data.code == 200) {
                return "成功";
            } else {
                return Promise.reject("fail");
            }
        },



    },
    mutations: {
        GetGoodsInfo(state, value) {
            state.goodsInfo = value;
        },

    },
    state: {
        goodsInfo: {},
        uuid: getUuid(),

    },
    getters: {
        categoryView(state) {
            return state.goodsInfo.categoryView || {};
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || [];
        },

    }
}