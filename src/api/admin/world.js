import request from '@/utils/request'

// 查询世界列表
export function listMangeWorld(query) {
  return request({
    url: '/admin/world/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getWorld(id) {
  return request({
    url: '/admin/world/getInfo/' + id,
    method: 'get'
  })
}

// 新增世界
export function addWorld(data) {
  return request({
    url: '/admin/world/add',
    method: 'post',
    data: data
  })
}

// 修改世界
export function updateWorld(data) {
  return request({
    url: '/admin/world/edit',
    method: 'put',
    data: data
  })
}

// 删除世界
export function delWorld(id) {
  return request({
    url: '/admin/world/remove/' + id,
    method: 'delete'
  })
}
