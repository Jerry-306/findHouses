import axios from 'axios'
import {BASE_URL} from './url'
import { getToken, removeToken } from './auth'

// 封装axios,为其配置默认URL
const API = axios.create({
    baseURL: BASE_URL
});

// 使用axios拦截器统一处理token
// 添加请求拦截器
API.interceptors.request.use(config => {
    const { url } = config;
    // 需要请求头才添加请求头
    if (
        url.startsWith('/user') &&
        !url.startsWith('/user/logout') && 
        !url.startsWith('/user/registered')
    ) {
        // 添加请求头
        config.headers.Authorization = getToken();
    }
    return config;
});

// 添加响应拦截器
API.interceptors.response.use(res => {
    const { status } = res.data;
    if (status === 400) {
        // token 失效，直接移除本地 token
        removeToken();
    }
    // 一定要返回 res
    return res
})

export default API