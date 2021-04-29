import { request } from './request';

//添加购物车
export function addCart(data){
    return request({
        url:'/api/carts',
        method:'POST',
        data
    });
}

//修改购物车
export function editCart(id,data){
    return request({
        url:`/api/carts/${id}`,
        method:'PUT',
        data
    });
}

//选中商品状态
export function ckeckCart(data){
    return request({
        url:'/api/carts/checked',
        method:'PATCH',
        data
    });
}

//获取购物车
export function getCart(data = ''){
    return request({
        url:'/api/carts?' + data,
    });
}

//删除购物车
export function delCart(id){
    return request({
        url:`/api/carts/${id}`,
        method:'DELETE'
    });
}




