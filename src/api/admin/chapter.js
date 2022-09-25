import request from '@/utils/request'

// 查询元素列表
export function listChapter(query) {
  return request({
    url: '/admin/chapter/list',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getChapter(sid,scid) {
  return request({
    url: '/wiki/chapter/getInfo?sid=' + sid+'&scid='+scid,
    method: 'get'
  })
}

// 新增元素
export function addChapter(data) {
  return request({
    url: '/admin/chapter/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateChapter(data) {
  return request({
    url: '/admin/chapter/edit',
    method: 'put',
    data: data
  })
}

// 修改元素
export function updateChapterName(data) {
  return request({
    url: '/admin/chapter/updateName',
    method: 'put',
    data: data
  })
}
//发布元素
export function updatePush(sid,scid) {
  return request({
    url: '/admin/chapter/updatePush?sid=' + sid+'&scid='+scid,
    method: 'get',
  })
}
// 删除元素
export function delChapter(sid,scid) {
  return request({
    url: '/admin/chapter/delById?sid=' + sid+'&scid='+scid,
    method: 'delete'
  })
}
