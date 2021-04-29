import axios from 'axios';
import router from '../router';
import { Notify, Toast } from 'vant';

export function request(config){
    const instance = axios.create({
        baseURL:'https://api.shop.eduwork.cn',
        timeout:5000,
    });

    // 请求拦截
    instance.interceptors.request.use(config => {
        //认证接口
        const token = window.localStorage.getItem('u_token');
        if(token){
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },err=>{
        return err;
    });

    // 响应拦截
    instance.interceptors.response.use(res => {
        //授权接口（登录）
        return res.data ? res.data : res;
    },err => {
        if( err.response.status == '401'){
            Toast.fail('请登录');
            router.push({path:'/login'});
        }
        //返回错误提示
        Notify({ type: 'warning', message: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]});
    });

    return instance(config);
}

