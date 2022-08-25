import request from '@/utils/request'

// 查询元素分类列表
export function listCategory(query) {
  return request({
    url: '/admin/category/list',
    method: 'get',
    params: query
  })
}

// 查询元素分类详细
export function getCategory(id) {
  return request({
    url: '/admin/category/getInfo/' + id,
    method: 'get'
  })
}

// 新增元素分类
export function addCategory(data) {
  return request({
    url: '/admin/category/add',
    method: 'post',
    data: data
  })
}

// 修改元素分类
export function updateCategory(data) {
  return request({
    url: '/admin/category/editName',
    method: 'put',
    data: data
  })
}

// 删除元素分类
export function delCategory(id) {
  return request({
    url: '/admin/category/remove/' + id,
    method: 'delete'
  })
}
