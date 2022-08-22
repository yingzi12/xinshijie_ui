import request from '@/utils/request'

//
export function listManage(query) {
  return request({
    url: '/wiki/manage/list',
    method: 'get',
    params: query
  })
}

export function getWorldManage(id) {
  return request({
    url: '/wiki/manage/getWorldManage/' + id,
    method: 'get'
  })
}

//
export function getManage(id) {
  return request({
    url: '/wiki/manage/getInfo/' + id,
    method: 'get'
  })
}

//
export function addManage(data) {
  return request({
    url: '/wiki/manage/add',
    method: 'post',
    data: data
  })
}

//
export function updateManage(data) {
  return request({
    url: '/wiki/manage/edit',
    method: 'put',
    data: data
  })
}

//Manage
export function delManage(id) {
  return request({
    url: '/wiki/manage/remove/' + id,
    method: 'delete'
  })
}
