import request from '@/utils/request'

// 查询收藏列表
export function listHarding(query) {
  return request({
    url: '/wiki/harding/list',
    method: 'get',
    params: query
  })
}

// 查询收藏详细
export function getHarding(id) {
  return request({
    url: '/wiki/harding/getInfo/' + id,
    method: 'get'
  })
}

// 新增收藏
export function addHarding(data) {
  return request({
    url: '/wiki/harding/add',
    method: 'post',
    data: data
  })
}

// 修改收藏
export function updateHarding(data) {
  return request({
    url: '/wiki/harding/edit',
    method: 'put',
    data: data
  })
}

// 删除收藏
export function delHarding(id) {
  return request({
    url: '/wiki/harding/remove/' + id,
    method: 'delete'
  })
}
