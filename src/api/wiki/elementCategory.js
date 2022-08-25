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
