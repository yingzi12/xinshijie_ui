import request from '@/utils/request'

export function getWorldManage(id) {
  return request({
    url: '/wiki/manage/getWorldManage?wid=' + id,
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
