import request from '@/utils/request'

// 查询世界评论列表
export function listComment(query) {
  return request({
    url: '/admin/comment/list',
    method: 'get',
    params: query
  })
}
export function listCommentAdmin(query) {
  return request({
    url: '/admin/comment/listAdmin',
    method: 'get',
    params: query
  })
}
// 查询世界评论详细
export function getWorldComment(id) {
  return request({
    url: '/admin/comment/getWorldComment/' + id,
    method: 'get'
  })
}

// 查询世界评论详细
export function getComment(id) {
  return request({
    url: '/admin/comment/getInfo/' + id,
    method: 'get'
  })
}

// 新增世界评论
export function addComment(data) {
  return request({
    url: '/admin/comment/add',
    method: 'post',
    data: data
  })
}

// 修改世界评论
export function updateComment(data) {
  return request({
    url: '/admin/comment/edit',
    method: 'put',
    data: data
  })
}

// 删除世界评论
export function delComment(id) {
  return request({
    url: '/admin/comment/remove/' + id,
    method: 'delete'
  })
}
