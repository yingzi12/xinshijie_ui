import request from '@/utils/request'

// 查询元素列表
export function listElement(query) {
  return request({
    url: '/wiki/element/list',
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
export function diff(data) {
  return request({
    url: '/wiki/diff/test',
    method: 'post',
    data: data
  })
}
