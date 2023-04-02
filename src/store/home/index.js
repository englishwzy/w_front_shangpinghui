import { getBaseCategoryList, getBannerList, getFloorList } from "@/api/index"
export default {
    namespaced: true,
    actions: {
        async categoryList(context, value) {
            let result = await getBaseCategoryList();
            // console.log(result.data);
            context.commit('GETCATEGORYLIST', result.data);
        },

        async getBannerList(context, value) {
            let result = await getBannerList();
            // console.log(result.data.data);
            context.commit("GetBanner", result.data.data)
        },

        async acquireFloorList(context, value) {
            let result = await getFloorList();
            // console.log(result.data.data);
            if (result.data.code) {
                context.commit("GETFLOOR", result.data.data)
            }
        }
    },
    mutations: {
        GETCATEGORYLIST(state, value) {
            state.list.push(value.data);
            // console.log(state.list);
        },
        GetBanner(state, value) {
            state.bannerList = value;
        },
        GETFLOOR(state, value) {
            state.floorList = value;
        },
    },
    state: {
        list: [],
        bannerList: [],
        floorList: [],

    },
}