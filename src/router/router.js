// 配置路由的地方
import Vue from "vue"
import VueRouter from "vue-router"

// 使用路由懒加载
// import Home from "@/pages/Home/index.vue"
// import Login from "@/pages/Login/index.vue"
// import Register from "@/pages/Register/index.vue"
// import Search from "@/pages/Search/index.vue"
// import Detail from "@/pages/Detail/index.vue"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"
import Myorder from "@/pages/Center/Myorder"
import Teamorder from "@/pages/Center/Teamorder"
// 使用插件

import { getToken } from "@/utils/token"
import store from "@/store"


// 重写push|replace方法
let originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
}


Vue.use(VueRouter);
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: () => import("@/pages/Home"),
            meta: {
                show: true,
            }
        },
        {
            path: '/login',
            component: () => import("@/pages/Login"),
            meta: {
                show: false,
            }
        },
        {
            path: '/register',
            component: () => import("@/pages/Register"),
            meta: {
                show: false,
            }
        },
        {
            name: 'sousuo',
            path: '/search/:keyword?',
            // props: true,
            // props: { abc: 1 },
            props($route) {
                return {
                    keyword: $route.params.keyword,
                }
            },
            component: () => import("@/pages/Search"),
            meta: {
                show: true,
            }
        },
        {
            path: '/detail/:skuid',
            component: () => import("@/pages/Detail"),
            meta: {
                show: true,
            }
        },
        {
            // 添加购物车
            path: '/addcard',
            component: AddCartSuccess,
            meta: {
                show: true,
            }
        },
        {
            // 购物车
            path: '/cart',
            component: ShopCart,
            meta: {
                show: true,
            }
        },
        {
            // 购物车
            path: '/trade',
            component: Trade,
            meta: {
                show: true,
            },
            // 路由独享守卫，只能从购物车进入
            beforeEnter(to, from, next) {
                if (from.path == '/cart') {
                    next();
                } else {
                    next(false);
                    // 意思是从哪来回哪去
                }
            }
        },
        {
            // 支付
            path: '/pay',
            component: Pay,
            meta: {
                show: true,
            },
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next();
                } else {
                    next(false);
                    // 意思是从哪来回哪去
                }
            }
        },
        {
            // 支付
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                show: true,
            },
            beforeEnter(to, from, next) {
                if (from.path == '/pay') {
                    next();
                } else {
                    next(false);
                    // 意思是从哪来回哪去
                }
            }
        },
        {
            // 支付
            path: '/center',
            component: Center,
            meta: {
                show: true,
            },
            children: [
                {
                    path: 'myorder',
                    component: Myorder,
                },
                {
                    path: 'teamorder',
                    component: Teamorder,
                }
            ]
        },
        // 重定向，项目跑起来的时候，访问/立马让他定向到首页
        {
            path: "*",
            redirect: '/home',
        }
    ],
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // vue3使用top:0        vue2使用y：0
        return { y: 0 }
    }
})

// 全局导航前置守卫
router.beforeEach((to, from, next) => {
    console.log(store);
    if (getToken()) {
        // 如果有token
        console.log(from.path);
        console.log("@", to.path);
        if (to.path == '/login' || to.path == "/register") {
            // 如果登录之后，应该是不能跳转到登录页面。
            if (!store.state.loginAbout.userInfo.name) {
                store.dispatch("loginAbout/logout");
                next();
            } else {
                next("/home");
            }

        } else {
            if (store.state.loginAbout.userInfo.name) {
                next();
            } else {
                try {

                    // 获取用户信息
                    store.dispatch("loginAbout/getUserInfo");
                    next();
                } catch (error) {
                    // 如果token过期，则直接调用退出登录
                    store.dispatch("loginAbout/logout");
                    next();
                }
            }
        }
    } else {
        // 没登陆   1. 如果要去的路径包含center则返回/home
        if (to.path.indexOf("center") != -1 || to.path.indexOf("pay") != -1 || to.path.indexOf("trade") != -1) {
            let toPath = to.path;
            // 使用query参数保存之前想去的路由
            next("/login?redirect=" + toPath);
        }

        next();
    }




})

export default router;