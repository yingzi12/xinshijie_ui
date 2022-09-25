import request from '@/utils/request'

// 查询世界列表
export function listStory(query) {
  return request({
    url: '/admin/story/list',
    method: 'get',
    params: query
  })
}

export function listStoryAdmin(query) {
  return request({
    url: '/admin/story/listAdmin',
    method: 'get',
    params: query
  })
}

// 查询世界详细
export function getStory(id) {
  return request({
    url: '/admin/story/getInfo/' + id,
    method: 'get'
  })
}

// 查询世界详细
export function getStoryAdmin(id) {
  return request({
    url: '/admin/story/getInfoAdmin/' + id,
    method: 'get'
  })
}
// 新增世界
export function addStory(data) {
  return request({
    url: '/admin/story/add',
    method: 'post',
    data: data
  })
}

// 修改世界
export function updateStory(data) {
  return request({
    url: '/admin/story/edit',
    method: 'put',
    data: data
  })
}

// 删除世界
export function delStory(id) {
  return request({
    url: '/admin/story/remove/' + id,
    method: 'delete'
  })
}
// 发布
export function issue(wid) {
  return request({
    url: '/admin/story/issue?sid=' + wid,
    method: 'get'
  })
}
