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
export function getWorldComment(id) {
  return request({
    url: '/wiki/comment/getWorldComment/' + id,
    method: 'get'
  })
}

// 查询世界评论详细
export function getComment(id) {
  return request({
    url: '/wiki/comment/getInfo/' + id,
    method: 'get'
  })
}
