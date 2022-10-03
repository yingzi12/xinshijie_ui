import request from '@/utils/request'


// 查询收藏详细
export function getHarding(id) {
  return request({
    url: '/wiki/harding/getInfo/' + id,
    method: 'get'
  })
}

export function getInfoBySid(sid) {
  return request({
    url: '/wiki/harding/getInfoBySid?sid=' + sid,
    method: 'get'
  })
}
