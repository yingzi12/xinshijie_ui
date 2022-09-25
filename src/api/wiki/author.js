import request from '@/utils/request'

export function listAuthor(sid) {
  return request({
    url: '/admin/author/list?sid=' + sid,
    method: 'get'
  })
}

export function getStoryAuthor(sid) {
  return request({
    url: '/admin/author/getStoryAuthor?sid=' + sid,
    method: 'get'
  })
}

//
export function getAuthor(sid) {
  return request({
    url: '/admin/author/getInfo?sid='+sid,
    method: 'get'
  })
}


