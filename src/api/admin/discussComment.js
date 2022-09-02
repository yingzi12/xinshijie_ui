import request from '@/utils/request'

// 查询元素列表
export function listDisscussComment(query) {
  return request({
    url: '/admin/disscussComment/listDisscussComment',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDisscussDetails(wid,dcid) {
  return request({
    url: '/wiki/disscussComment/getInfo?wid=' + wid+'&dcid='+dcid,
    method: 'get'
  })
}

// 新增元素
export function addDisscussComment(data) {
  return request({
    url: '/admin/disscussComment/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDisscussComment(data) {
  return request({
    url: '/admin/disscussComment/edit',
    method: 'put',
    data: data
  })
}
// 删除元素
export function delDisscussComment(wid,dcid) {
  return request({
    url: '/admin/disscussComment/remove?wid=' + wid+'&dcid='+dcid,
    method: 'delete'
  })
}
