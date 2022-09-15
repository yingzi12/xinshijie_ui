import request from '@/utils/request'

// 查询用户详细
export function getUser(id) {
  return request({
    url: '/admin/user/getInfo',
    method: 'get'
  })
}

export function updateUserBasic(data) {
  return request({
    url: '/admin/user/editBasic',
    method: 'put',
    data: data
  })
}

export function resetPwd(data) {
  return request({
    url: '/admin/user/resetPwd',
    method: 'put',
    data: data
  })
}

export function sendEmail(email) {
  return request({
    url: '/admin/user/sendUpdateCheckEmail?email='+email,
    method: 'get',
  })
}
