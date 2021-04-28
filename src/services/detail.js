import { request } from './request';

export function getGoodsDateil(id){
    return request({
        url:'/api/goods/' + id,
    });
}


