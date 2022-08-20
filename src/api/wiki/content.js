import request from '@/utils/request'

// 查询元素内容列表
export function listContent(query) {
  return request({
    url: '/wiki/content/list',
    method: 'get',
    params: query
  })
}

// 查询元素内容详细
export function getContent(id) {
  return request({
    url: '/wiki/content/getInfo/' + id,
    method: 'get'
  })
}

// 新增元素内容
export function addContent(data) {
  return request({
    url: '/wiki/content/add',
    method: 'post',
    data: data
  })
}

// 修改元素内容
export function updateContent(data) {
  return request({
    url: '/wiki/content/edit',
    method: 'put',
    data: data
  })
}

// 删除元素内容
export function delContent(id) {
  return request({
    url: '/wiki/content/remove/' + id,
    method: 'delete'
  })
}
