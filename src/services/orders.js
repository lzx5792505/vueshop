import { request } from './request';

//创建订单
export function createOrders(params){
    return request({
        url:'/api/orders',
        method:'post',
        params
    });
}

//获取地址详情
export function getOrderInfo(){
    return request({
        url:'/api/orders/preview',
    });
}

//获取支付
export function payOrders(order,params){
    return request({
        url:`/api/orders/${order}/pay`,
        params
    });
}

//获取支付状态
export function payOrderStatus(order){
    return request({
        url:`/api/orders/${order}/status`,
    });
}

//获取订单列表
export function getOrdersList(params){
    return request({
        url:'/api/orders',
        params
    });
}

//获取订单详情
export function getOrdersInfo(order){
    return request({
        url:`/api/orders/${order}`,
        params:{
            include:'user,orderDetails.goods'
        }
    });
}

//确认订单
export function confirmOrders(order){
    return request({
        url:`/api/orders/${order}/confirm`,
        method:'patch'
    });
}

//获取物流信息
export function expressOrders(order){
    return request({
        url:`/api/orders/${order}/express`,
    });
}