import request from '@/utils/request'

// 新增元素分类
export function login(data) {
    return request({
        url: '/wiki/login',
        method: 'post',
        params: query
    })
}
