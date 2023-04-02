import Mock from "mockjs"
import banner from "./banner.json"
import floor from "./floor.json"
// json,图片格式不需要export就能引入
// 模拟数据
Mock.mock("/mock/banner", {
    code: 200,
    data: banner
})

Mock.mock("/mock/floor", {
    code: 200,
    data: floor
})