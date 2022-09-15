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
// 查询用户详细
export function checkEmail(key,check) {
  return request({
    url: '/wiki/user/updateCheckEmail?key=' + key+"&check="+check,
    method: 'get'
  })
}
// 查询用户详细
export function sendPasswordEmail(email) {
  return request({
    url: '/wiki/user/sendCheckPassword?email=' +email,
    method: 'get'
  })
}

export function resetPwd(data) {
  return request({
    url: '/wiki/user/restPasswort',
    method: 'put',
    data: data
  })
}
