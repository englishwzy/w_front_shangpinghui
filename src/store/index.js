import Vue from "vue"
import Vuex from "vuex"
import homeAbout from "@/store/home"
import searchAbout from "@/store/search"
import detailAbout from "@/store/Detail"
import shopcartAbout from "@/store/ShopCart"
import loginAbout from "@/store/login"
import tradeAbout from "@/store/Trade"
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        homeAbout,
        searchAbout,
        detailAbout,
        shopcartAbout,
        loginAbout,
        tradeAbout
    }
})
export default store;