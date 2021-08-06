import axios from 'axios'
import {BASE_URL} from './url'

// 封装axios,为其配置默认URL
const API = axios.create({
    baseURL: BASE_URL
});

export default  API