import request from '@/utils/request'

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/admin/user/getInfo',
    method: 'get'
  })
}

