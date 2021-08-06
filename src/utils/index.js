// 导入axios
import axios from 'axios'

// 创建并导出获取定位城市的函数 getCurrentCity
export const getCurrentCity = () => {

    //判断 localStorage 中是否有定位城市
    const localCity = JSON.parse(localStorage.getItem('zfy_city'))
  
    if (!localCity) {
        // 如果没有，就使用首页中获取定位城市的代码来获取，并且存储到本地存储中，然后返回该城市数据
        return new Promise((resolve, reject) => {
            const curCity = new window.BMapGL.LocalCity()
            curCity.get(async res => {
                try {
                    const result = await axios.get(`http://localhost:8009/area/info?name=${res.name}`)
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
