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
export function getDraftDetails(wid,deid,isDel) {
  return request({
    url: '/admin/draftElement/getInfo?wid=' + wid+'&deid='+deid+'&isDel='+isDel,
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
    url: '/admin/draftElement/issue?wid=' + wid+'&deid='+eid,
    method: 'get',
  })
}
// 删除元素
export function delDraft(wid,deid) {
  return request({
    url: '/admin/draftElement/delById?wid=' + wid+'&deid='+deid,
    method: 'get'
  })
}

// 查询元素列表
export function listAudit(query) {
  return request({
    url: '/admin/draftElement/listAudit',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDraftDetailsAdmin(wid,eid,isDel) {
  return request({
    url: '/admin/draftElement/getInfoAdmin?wid=' + wid+'&deid='+eid+'&isDel='+isDel,
    method: 'get'
  })
}
// 审核元素
export function auditDraft(data) {
  return request({
    url: '/admin/draftElement/audit',
    method: 'post',
    data: data
  })
}
export function issueClose(wid,deid) {
  return request({
    url: '/admin/draftElement/issueClose?wid=' + wid+'&deid='+deid,
    method: 'get'
  })
}
export function issue(wid,deid) {
  return request({
    url: '/admin/draftElement/issue?wid=' + wid+'&deid='+deid,
    method: 'get'
  })
}
