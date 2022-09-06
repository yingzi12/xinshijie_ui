import request from '@/utils/request'

// 查询元素列表
export function listDiscussComment(query) {
  return request({
    url: '/wiki/discussComment/list',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDiscussComment(dcid) {
  return request({
    url: '/wiki/discussComment/getInfo?dcid='+dcid,
    method: 'get'
  })
}
