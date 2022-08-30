import request from '@/utils/request'

// 查询元素列表
export function listDraft(query) {
  return request({
    url: '/admin/draftElement/list',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDraftDetails(wid,deid) {
  return request({
    url: '/admin/draftElement/getInfo?wid=' + wid+'&deid='+deid,
    method: 'get'
  })
}
export function getDiff(newId,oldId) {
  return request({
    url: '/admin/diff/content?newId=' + newId+'&oldId='+oldId,
    method: 'get'
  })
}


// 新增元素
export function addDraft(data) {
  return request({
    url: '/admin/draftElement/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDraft(data) {
  return request({
    url: '/admin/draftElement/edit',
    method: 'put',
    data: data
  })
}
//发布元素
export function updatePush(wid,eid) {
  return request({
    url: '/admin/draftElement/updatePush?wid=' + wid+'&eid='+eid,
    method: 'get',
  })
}
// 删除元素
export function delDraft(wid,eid) {
  return request({
    url: '/admin/draftElement/remove?wid=' + wid+'&eid='+eid,
    method: 'delete'
  })
}
