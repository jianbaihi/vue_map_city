import axios from 'axios'

const instance = axios.create()

// 请求拦截
const { VITE_MAP_KEY } = import.meta.env;
instance.interceptors.request.use((config) => {
    let url = config.url;
    let reg = /^map/;
    if (reg.test(url) && url.includes("?")) {
        config.url = `${url}&key=${VITE_MAP_KEY}`;
    } 
    else if (reg.test(url)) {
        config.url = `${url}?key=${VITE_MAP_KEY}`;
    }
    return config;
});

// 响应拦截
instance.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default instance