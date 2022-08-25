import request from '@/utils/request'

// 查询元素列表
export function listElement(query) {
  return request({
    url: '/admin/element/listElementWorld',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getElementDetails(wid,eid) {
  return request({
    url: '/wiki/element/getInfo?wid=' + wid+'&eid='+eid,
    method: 'get'
  })
}

// 新增元素
export function addElement(data) {
  return request({
    url: '/admin/element/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateElement(data) {
  return request({
    url: '/admin/element/edit',
    method: 'put',
    data: data
  })
}
//发布元素
export function updatePush(wid,eid) {
  return request({
    url: '/admin/element/updatePush?wid=' + wid+'&eid='+eid,
    method: 'get',
  })
}
// 删除元素
export function delElement(wid,eid) {
  return request({
    url: '/admin/element/remove?wid=' + wid+'&eid='+eid,
    method: 'delete'
  })
}
