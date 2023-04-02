import { reqAddressInfo, getUserGoods } from "@/api/index"
export default {
    namespaced: true,
    actions: {
        async getUserAddress(context, value) {
            let result = await reqAddressInfo();
            // console.log(result.data);
            if (result.data.code == 200) {
                context.commit("GETUSERADDRESS", result.data.data);
            }
        },

        async getUserGoods(context, value) {
            let result = await getUserGoods();
            console.log(result.data);
            if (result.data.code == 200) {
                context.commit("GETGOODS", result.data.data);
            }
        }
    },
    mutations: {
        GETUSERADDRESS(state, value) {
            state.address = value;
        },
        GETGOODS(state, value) {
            state.orderInfo = value;
        }
    },
    state: {
        address: [],
        orderInfo: {},
    },
    getters: {

    }
}