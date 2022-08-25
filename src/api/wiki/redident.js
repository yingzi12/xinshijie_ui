import request from '@/utils/request'

// 查询居民数列表
export function listRedident(query) {
  return request({
    url: '/wiki/redident/list',
    method: 'get',
    params: query
  })
}

// 查询居民数详细
export function getRedident(id) {
  return request({
    url: '/wiki/redident/getInfo/' + id,
    method: 'get'
  })
}
