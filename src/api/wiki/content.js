import request from '@/utils/request'

// 查询元素内容列表
export function listContent(query) {
  return request({
    url: '/wiki/elementCategory/list',
    method: 'get',
    params: query
  })
}

export function getElementContent(eid) {
  return request({
    url: '/wiki/elementCategory/getElementContent/' + eid,
    method: 'get'
  })
}

// 查询元素内容详细
export function getContent(id) {
  return request({
    url: '/wiki/elementContent/getInfo/' + id,
    method: 'get'
  })
}
