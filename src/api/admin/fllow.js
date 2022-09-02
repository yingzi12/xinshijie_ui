import request from '@/utils/request'

// 查询元素列表
export function listFllow(query) {
    return request({
        url: '/admin/fllow/list',
        method: 'get',
        params: query
    })
}

// 添加关注
export function follow(wid) {
    return request({
        url: '/admin/fllow/fllow?wid=' + wid,
        method: 'delete'
    })
}

// 取消关注
export function fllowClose(wid) {
    return request({
        url: '/admin/fllow/fllowClose?wid=' + wid,
        method: 'delete'
    })
}
