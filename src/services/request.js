import axios from 'axios';

export function request(config){
    const instance = axios.create({
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000,
    });

    // 请求拦截
    instance.interceptors.request.use(config=>{
        //认证接口
        return config;
    },err=>{
        return err;
    });

    // 响应拦截
    instance.interceptors.response.use(res=>{
        //授权接口（登录）
        return res.data ? res.data : res;
    },err=>{
        return err;
    });

    return instance(config);
}

