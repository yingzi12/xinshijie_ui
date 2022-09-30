import request from '@/utils/request'

export function listAuthor(sid) {
  return request({
    url: '/wiki/author/list?sid=' + sid,
    method: 'get'
  })
}

export function getStoryAuthor(sid) {
  return request({
    url: '/wiki/author/getStoryAuthor?sid=' + sid,
    method: 'get'
  })
}

//
export function getAuthor(sid) {
  return request({
    url: '/wiki/author/getInfo?sid='+sid,
    method: 'get'
  })
}


