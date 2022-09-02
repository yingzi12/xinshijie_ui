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

export function countCategory(wid) {
  return request({
    url: '/wiki/category/count/' + wid,
    method: 'get'
  })
}

export function getTree(wid) {
  return request({
    url: '/wiki/category/getTree?wid=' + wid,
    method: 'get'
  })
}
