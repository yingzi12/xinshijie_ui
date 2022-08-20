import request from '@/utils/request'

// 查询世界评论列表
export function listComment(query) {
  return request({
    url: '/wiki/comment/list',
    method: 'get',
    params: query
  })
}

// 查询世界评论详细
export function getComment(id) {
  return request({
    url: '/wiki/comment/getInfo/' + id,
    method: 'get'
  })
}

// 新增世界评论
export function addComment(data) {
  return request({
    url: '/wiki/comment/add',
    method: 'post',
    data: data
  })
}

// 修改世界评论
export function updateComment(data) {
  return request({
    url: '/wiki/comment/edit',
    method: 'put',
    data: data
  })
}

// 删除世界评论
export function delComment(id) {
  return request({
    url: '/wiki/comment/remove/' + id,
    method: 'delete'
  })
}
