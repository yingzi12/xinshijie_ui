import request from '@/utils/request'

export function getWorldAuthor(id) {
  return request({
    url: '/admin/author/getWorldAuthor?wid=' + id,
    method: 'get'
  })
}

//
export function getInfo(wid) {
  return request({
    url: '/admin/author/getInfo?wid='+wid,
    method: 'get'
  })
}

//
export function addAuthor(data) {
  return request({
    url: '/admin/author/add',
    method: 'post',
    data: data
  })
}

//
export function updateAuthor(data) {
  return request({
    url: '/admin/author/edit',
    method: 'put',
    data: data
  })
}

//Manage
export function delAuthor(id,wid) {
  return request({
    url: '/admin/author/remove?id=' + id+'&wid='+wid,
    method: 'delete'
  })
}
