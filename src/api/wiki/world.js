import request from '@/utils/request'

// 查询世界列表
export function listWorld(query) {
  return request({
    url: '/wiki/world/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getWorld(id) {
  return request({
    url: '/wiki/world/getInfo/' + id,
    method: 'get'
  })
}

// 新增世界
export function addWorld(data) {
  return request({
    url: '/wiki/world/add',
    method: 'post',
    data: data
  })
}

// 修改世界
export function updateWorld(data) {
  return request({
    url: '/wiki/world/edit',
    method: 'put',
    data: data
  })
}

// 删除世界
export function delWorld(id) {
  return request({
    url: '/wiki/world/remove/' + id,
    method: 'delete'
  })
}
