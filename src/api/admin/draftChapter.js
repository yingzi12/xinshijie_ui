import request from '@/utils/request'

// 查询元素列表
export function listDraftChapter(query) {
  return request({
    url: '/admin/draftChapter/list',
    method: 'get',
    params: query
  })
}

// 查询元素列表
export function listDraftChapterAdmin(query) {
  return request({
    url: '/admin/draftChapter/listAdmin',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDraftChapter(sid,dscid,isDel) {
  return request({
    url: '/admin/draftChapter/getInfo?sid=' + sid+'&dscid='+dscid+'&isDel='+isDel,
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
export function addDraftChapter(data) {
  return request({
    url: '/admin/draftChapter/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDraftChapter(data) {
  return request({
    url: '/admin/draftChapter/edit',
    method: 'put',
    data: data
  })
}

// 删除元素
export function delDraftChapter(wid,dscid) {
  return request({
    url: '/admin/draftChapter/delById?sid=' + wid+'&dscid='+dscid,
    method: 'get'
  })
}

// 查询元素列表
export function listAudit(query) {
  return request({
    url: '/admin/draftChapter/listAudit',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDraftChapterAdmin(sid,dscid) {
  return request({
    url: '/admin/draftChapter/getInfoAdmin?sid=' + sid+'&dscid='+dscid,
    method: 'get'
  })
}
// 审核元素
export function audit(data) {
  return request({
    url: '/admin/draftChapter/audit',
    method: 'post',
    data: data
  })
}
export function issueClose(sid,dscid) {
  return request({
    url: '/admin/draftChapter/issueClose?sid=' + sid+'&dscid='+dscid,
    method: 'get'
  })
}
export function issue(sid,dscid) {
  return request({
    url: '/admin/draftChapter/issue?sid=' + sid+'&dscid='+dscid,
    method: 'get'
  })
}
