import request from '@/utils/request'

// 新增元素分类
export function goodslist(query) {
    return request({
        url: '/api/goodslist',
        method: 'Get',
        params: query
    })
}
