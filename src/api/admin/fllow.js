import request from '@/utils/request'

// 查询关注列表
export function listFllow(query) {
    return request({
        url: '/admin/fllow/list',
        method: 'get',
        params: query
    })
}

// 添加关注
export function addFllow(wid) {
    return request({
        url: '/admin/fllow/fllow?wid=' + wid,
        method: 'get'
    })
}
//
export function getInfoByWid(wid) {
    return request({
        url: '/admin/fllow/getInfoByWid?wid=' + wid,
        method: 'get'
    })
}


// 取消关注
export function fllowClose(wid) {
    return request({
        url: '/admin/fllow/fllowClose?wid=' + wid,
        method: 'get'
    })
}
