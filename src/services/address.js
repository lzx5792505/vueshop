import { request } from './request';

//获取地址
export function getAddress(){
    return request({
        url:'/api/address',
    });
}

//获取地址详情
export function getAddressInfo(id){
    return request({
        url:`/api/address/${id}`,
    });
}

//添加地址
export function addAddress(params){
    return request({
        url:'/api/address',
        method:'post',
        params
    });
}

//修改地址
export function editAddress(id,params){
    return request({
        url:`/api/address/${id}`,
        method:'put',
        params
    });
}

//删除地址
export function delAddress(id){
    return request({
        url:`/api/address/${id}`,
        method:'delete',
    });
}
