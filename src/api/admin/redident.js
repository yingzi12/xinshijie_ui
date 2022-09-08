import request from '@/utils/request'

// 查询居民数列表
export function listRedident(query) {
  return request({
    url: '/admin/redident/list',
    method: 'get',
    params: query
  })
}

// 查询居民数详细
export function getRedident(id) {
  return request({
    url: '/admin/redident/getInfo/' + id,
    method: 'get'
  })
}

// 新增居民数
export function addRedident(data) {
  return request({
    url: '/admin/redident/add',
    method: 'post',
    data: data
  })
}

// 修改居民数
export function updateRedident(data) {
  return request({
    url: '/admin/redident/edit',
    method: 'put',
    data: data
  })
}

// 删除居民数
export function delRedident(id) {
  return request({
    url: '/admin/redident/remove/' + id,
    method: 'delete'
  })
}
