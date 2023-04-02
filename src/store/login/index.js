import { sendCode, register, login, getUserInfo, logOut } from "@/api/index"
import { getToken, setToken, removeToken } from "@/utils/token"
export default {
    namespaced: true,
    actions: {
        // 验证码
        async getCode(context, phone) {
            let result = await sendCode(phone);
            // console.log(result.data);
            if (result.data.code == 200) {
                context.commit("GetCode", result.data.data);
                return "ok"
            } else {
                return Promise.reject(new Error("fail"));
            }
        },
        // 注册
        async register(context, data) {
            // console.log("action", phone, password, code);
            let result = await register(data);
            console.log(result);
            if (result.data.code === 200) {
                return "ok"
            } else {
                return Promise.reject(new Error("fail"));
            }
        },

        // 登录
        async login(context, data) {
            let result = await login(data);
            console.log(result);
            if (result.data.code == 200) {
                // localStorage.setItem("token", result.data.data.token);
                setToken(result.data.data.token);
                return "ok"
            } else {
                return Promise.reject(new Error("login fail"));
            }
        },
        // 获取用户信息
        async getUserInfo(context, data) {
            let result = await getUserInfo();
            console.log("getUSERinfo", result);
            if (result.data.code == 200) {
                context.commit("GetUserInfo", result.data.data);
            }
        },

        // 退出登录     1.发请求 2.清除token
        async logout(context, value) {
            let result = await logOut();
            console.log(result);
            if (result.data.code == 200) {

                context.commit("LOGOUT");
                return "退出登录成功"
            } else {
                return Promise.reject(new Error("fail"));
            }

        }
    },
    mutations: {
        GetCode(state, value) {
            state.code = value;
        },
        GetUserInfo(state, data) {
            state.userInfo = data;
        }

        , LOGOUT(state, value) {
            // localStorage.removeItem("token");
            removeToken();
            state.userInfo = {};
        }
    },
    state: {
        code: '',
        userInfo: {},
    },
    getters: {
    }
}