import axios from "axios"
import nprogress from "nprogress"
import store from "@/store/index"
import { getToken } from "@/utils/token"

// 引入进度条
import "nprogress/nprogress.css"
// 引入进度条的样式


// start进度条开始 done：进度条结束A
// 利用create创建一个axios实例
const request = axios.create({
    // 基础路径
    baseURL: '/api',
    // 超时时间
    timeout: 5000,
})

request.interceptors.request.use(function (config) {
    // 发送时携带请求头，带上游客uuid
    // console.log(store);
    if (store.state.detailAbout.uuid) {
        config.headers.userTempId = store.state.detailAbout.uuid;
    }
    // 请求头携带token
    if (getToken()) {
        config.headers.token = getToken();
    }


    nprogress.start();
    // 在发送请求之前做些什么
    // config是一个配置对象，里面有一个属性header请求头
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    nprogress.done();
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default request;