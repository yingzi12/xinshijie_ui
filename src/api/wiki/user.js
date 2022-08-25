import request from '@/utils/request'

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/wiki/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/wiki/user/getInfo/' + id,
    method: 'get'
  })
}
