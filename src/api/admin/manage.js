import request from '@/utils/request'

export function getWorldManage(id) {
  return request({
    url: '/admin/manage/getWorldManage?wid=' + id,
    method: 'get'
  })
}

//
export function getInfo(wid) {
  return request({
    url: '/admin/manage/getInfo?wid='+wid,
    method: 'get'
  })
}

//
export function addManage(data) {
  return request({
    url: '/admin/manage/add',
    method: 'post',
    data: data
  })
}

//
export function updateManage(data) {
  return request({
    url: '/admin/manage/edit',
    method: 'put',
    data: data
  })
}

//Manage
export function delManage(id,wid) {
  return request({
    url: '/admin/manage/remove?id=' + id+'&wid='+wid,
    method: 'delete'
  })
}
