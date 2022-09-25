import request from '@/utils/request'


// 查询收藏详细
export function getHarding(id) {
  return request({
    url: '/wiki/harding/getInfo/' + id,
    method: 'get'
  })
}

// 新增收藏
export function addHarding(data) {
  return request({
    url: '/wiki/harding/add',
    method: 'post',
    data: data
  })
}


// 删除收藏
export function delHarding(id) {
  return request({
    url: '/wiki/harding/remove/' + id,
    method: 'delete'
  })
}
