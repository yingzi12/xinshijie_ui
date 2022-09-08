import request from '@/utils/request'

// 查询元素列表
export function listDiscuss(query) {
  return request({
    url: '/admin/discuss/list',
    method: 'get',
    params: query
  })
}

export function listDiscussAdmin(query) {
  return request({
    url: '/admin/discuss/listAdmin',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDiscuss(wid,did) {
  return request({
    url: '/wiki/discuss/getInfo?wid=' + wid+'&did='+did,
    method: 'get'
  })
}

// 新增元素
export function addDiscuss(data) {
  return request({
    url: '/admin/discuss/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDiscuss(data) {
  return request({
    url: '/admin/discuss/edit',
    method: 'put',
    data: data
  })
}
export function updateStatus(data) {
  return request({
    url: '/admin/discuss/updateStatus',
    method: 'put',
    data: data
  })
}

export function updateStatusAdmin(data) {
  return request({
    url: '/admin/discuss/updateStatusAdmin',
    method: 'put',
    data: data
  })
}

// 删除元素
export function delDiscuss(wid,did) {
  return request({
    url: '/admin/discuss/remove?wid=' + wid+'&did='+did,
    method: 'delete'
  })
}
