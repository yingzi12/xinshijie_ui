import request from '@/utils/request'

export function addApplyManage(data) {
    return request({
        url: '/admin/applyManage/add',
        method: 'post',
        data: data
    })
}
export function listApplyManage(id) {
    return request({
        url: '/admin/applyManage/list?wid=' + id,
        method: 'get'
    })
}
export function pageApplyManage(query) {
    return request({
        url: '/admin/applyManage/getApplyManageList',
        method: 'get',
        params: query
    })
}
export function auditApplyManage(data) {
    return request({
        url: '/admin/applyManage/audit',
        method: 'post',
        data: data
    })
}
