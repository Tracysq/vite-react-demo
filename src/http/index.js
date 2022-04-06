import axios from 'axios';
// import QS from 'qs';

//保存环境变量
// const isPrd = process.env.NODE_ENV == 'production';

//区分开发环境还是生产环境基础URL
// export const basciUrl = isPrd ? 'https://www.production.com' : 'http://www.development.com'

export const basicUrl = 'http://60.205.170.76:8090'


const service = axios.create({
    baseURL: basicUrl
})

// 请求拦截器
service.interceptors.request.use(config => { 
// 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
//在每次的请求中添加token
// config.data = Object.assign({}, config.data, {
//     token: token,
// })
//设置请求头
config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
}
// config.data = QS.stringify(config.data)
return config
}, error => { 
    return error;
})

// 响应拦截器
service.interceptors.response.use(response => {
    //根据返回不同的状态码做不同的事情
    // 这里一定要和后台开发人员协商好统一的错误状态码
    if (response.code) {
        switch (response.code) {
            case 200:
            return response.data;
            case 401:
            //未登录处理方法
            break;
            case 403:
            //token过期处理方法
            break;
            default:
            // message.error(response.data.msg)
            alert(response.data.msg)
        }
    } else { 
        return response;
    }
})

//最后把封装好的axios导出
export default service
