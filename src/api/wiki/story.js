import request from '@/utils/request'

// 查询世界列表
export function listStory(query) {
  return request({
    url: '/wiki/story/list',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getStory(id) {
  return request({
    url: '/wiki/story/getInfo/' + id,
    method: 'get'
  })
}
