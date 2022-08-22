import request from '@/utils/request'

// 查询元素分类列表
export function listCategory(query) {
  return request({
    url: '/wiki/elementCategory/list',
    method: 'get',
    params: query
  })
}

export function getElementCategory(eid) {
  return request({
    url: '/wiki/elementCategory/getElementCategory/' + eid,
    method: 'get'
  })
}

// 查询元素分类详细
export function getCategory(id) {
  return request({
    url: '/wiki/elementCategory/getInfo/' + id,
    method: 'get'
  })
}

// 新增元素分类
export function addCategory(data) {
  return request({
    url: '/wiki/elementCategory/add',
    method: 'post',
    data: data
  })
}

// 修改元素分类
export function updateCategory(data) {
  return request({
    url: '/wiki/elementCategory/edit',
    method: 'put',
    data: data
  })
}

// 删除元素分类
export function delCategory(id) {
  return request({
    url: '/wiki/elementCategory/remove/' + id,
    method: 'delete'
  })
}
