import request from '@/utils/request'

// 查询元素列表
export function listDiscussComment(query) {
  return request({
    url: '/admin/discussComment/list',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDiscussDetails(wid,dcid) {
  return request({
    url: '/admin/discussComment/getInfo?wid=' + wid+'&dcid='+dcid,
    method: 'get'
  })
}

// 新增元素
export function addDiscussComment(data) {
  return request({
    url: '/admin/discussComment/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDiscussComment(data) {
  return request({
    url: '/admin/discussComment/edit',
    method: 'put',
    data: data
  })
}
// 删除元素
export function delDiscussComment(dcid) {
  return request({
    url: '/admin/discussComment/remove?wid=' + wid+'&dcid='+dcid,
    method: 'delete'
  })
}
