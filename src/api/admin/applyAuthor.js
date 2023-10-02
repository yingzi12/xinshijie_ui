import request from '@/utils/request'

export function addApplyAuthor(data) {
    return request({
        url: '/admin/applyAuthor/add',
        method: 'post',
        data: data
    })
}
export function listApplyAuthor(wid,sid) {
    return request({
        url: '/admin/applyAuthor/list?sid=' + sid+"&wid="+wid,
        method: 'get'
    })
}
export function pageApplyAuthor(query) {
    return request({
        url: '/admin/applyAuthor/getApplyAuthorList',
        method: 'get',
        params: query
    })
}
export function auditApplyAuthor(data) {
    return request({
        url: '/admin/applyAuthor/audit',
        method: 'post',
        data: data
    })
}
