import requests from "./request"
// 用于统一api接口
// 引入mockjs模拟的axios请求
import mockRequest from "./mockRequest"
// 发起axios请求真实后台接口数据
export const getBaseCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })


export const getGoodsList = (params) => requests({
    url: '/list',
    method: 'POST',
    data: params,
})

// 获取商品详情
export const getGoodInfo = (skuid) => requests({
    url: `/item/${skuid}`,
    method: 'GET',
})

// 添加购物车
export const addToCat = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

// 获取购物车信息
export const getCatInfo = () => requests({ url: '/cart/cartList', method: 'get' })

// 删除购物车信息
export const deleteCart = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete',
})

// 切换商品的选中状态
export const changeStatus = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码
export const sendCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });

//注册
export const register = (data) => requests({ url: `/user/passport/register`, method: 'post', data });

// 登录
export const login = (data) => requests({ url: '/user/passport/login', method: 'post', data })

// 获取用户信息
export const getUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

// 退出登录
export const logOut = () => requests({ url: '/user/passport/logout', method: 'get' });

// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

// 获取商品信息
export const getUserGoods = () => requests({ url: '/order/auth/trade', method: 'get' });

// 提交订单
export const submitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'POST', data, })

// 获取订单支付信息
export const paymentWeixin = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

// 查询订单支付状态
export const queryPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

//查询我的订单
export const myorder = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });


// 使用mock模拟数据
// 获取banner的数据
export const getBannerList = () => mockRequest.get("/banner");

// 获取floor的数据

export const getFloorList = () => mockRequest.get("/floor");
