import { getGoodsList } from "@/api/index"

export default {
    namespaced: true,
    actions: {
        async getGoodsListaction(context, value = {}) {
            const result = await getGoodsList(value);
            if (result.data.code === 200) {
                context.commit("getGoodsMutations", result.data.data)
            }
        }
    },
    mutations: {
        getGoodsMutations(state, value) {
            state.list = value;
        }
    },
    state: {
        list: {}
    },
    getters: {
        // 如果服务器数据还没回来，返回的应该是空数组。
        attrsList(state) {
            return state.list.attrsList || [];
        },
        goodsList(state) {
            return state.list.goodsList || [];
        },
        trademarkList(state) {
            return state.list.trademarkList || [];
        }
    }
}