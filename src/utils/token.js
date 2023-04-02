// 有关token的操作

export const getToken = () => {
    return localStorage.getItem("token");
}
export const setToken = (token) => {
    localStorage.setItem("token", token);
}
export const removeToken = () => {
    localStorage.removeItem("token")
}