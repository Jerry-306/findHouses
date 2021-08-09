// 该文件涉及 token 的一些处理方法

const TOKEN_MAME = 'zfy_token';

// 获取token
function getToken () {
    return localStorage.getItem(TOKEN_MAME)
}

// 设置token
function setToken (value) {
    localStorage.setItem(TOKEN_MAME, value)
}

// 删除token
function removeToken () {
    localStorage.removeItem(TOKEN_MAME)
}

// 判断是否有权限（是否登录）
function isAuth () {
    return getToken()
}

export { getToken, setToken, removeToken, isAuth }