// 导入axios
import axios from 'axios'
import {BASE_URL} from './url'

// 创建并导出获取定位城市的函数 getCurrentCity
export const getCurrentCity = () => {

    //判断 localStorage 中是否有定位城市
    const localCity = JSON.parse(localStorage.getItem('zfy_city'))
  
    if (!localCity) {
        // 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
        return new Promise((resolve, reject) => {
            // 使用百度地图API IP 定位方式，获取当前所在城市
            const curCity = new window.BMapGL.LocalCity()
            // 或者使用浏览器进行定位
            // const curCity = new window.BMapGL.Geolocation()
            // curCity.getCurrentPosition(async res => {
            curCity.get(async res => {
                try {
                    // res.name 就是当前城市名称, 而 /area/info?name=res.name 是后端提供的一个方法，用于获取城市的详细信息
                    /*
                    例如，传入的城市名称为“北京”，后端返回的body为以下内容
                      "body": {
                            "label": "北京",
                            "value": "AREA|88cff55c-aaa4-e2e0"
                        }
                    */
                    const result = await axios.get(`${BASE_URL}/area/info?name=${res.name}`)
                    // console.log(result);
                    
                    // 存储到本地存储中
                    localStorage.setItem('zfy_city', JSON.stringify(result.data.body))
                    // 返回该城市数据
                    resolve(result.data.body)
                } catch (e) {
                    // 获取定位城市失败
                    reject(e)
                }
            })
        })
    }

    // 如果有，直接返回本地存储中的城市数据
    // 因为此处的 Promise 不会失败，所以，此处，只要返回一个成功的Promise即可
    return Promise.resolve(localCity)
}
