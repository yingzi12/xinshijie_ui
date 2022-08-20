import request from '@/utils/request'

// 查询元素分类列表
export function listCategory(query) {
  return request({
    url: '/wiki/category/list',
    method: 'get',
    params: query
  })
}

// 查询元素分类详细
export function getCategory(id) {
  return request({
    url: '/wiki/category/getInfo/' + id,
    method: 'get'
  })
}

export function getTree(wid) {
  return request({
    url: '/wiki/category/getTree/' + wid,
    method: 'get'
  })
}

// 新增元素分类
export function addCategory(data) {
  return request({
    url: '/wiki/category/add',
    method: 'post',
    data: data
  })
}

// 修改元素分类
export function updateCategory(data) {
  return request({
    url: '/wiki/category/edit',
    method: 'put',
    data: data
  })
}

// 删除元素分类
export function delCategory(id) {
  return request({
    url: '/wiki/category/remove/' + id,
    method: 'delete'
  })
}
