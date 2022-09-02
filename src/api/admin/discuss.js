import request from '@/utils/request'

// 查询元素列表
export function listDisscuss(query) {
  return request({
    url: '/admin/disscuss/listDisscussWorld',
    method: 'get',
    params: query
  })
}

// 查询元素详细
export function getDisscussDetails(wid,did) {
  return request({
    url: '/wiki/disscuss/getInfo?wid=' + wid+'&did='+did,
    method: 'get'
  })
}

// 新增元素
export function addDisscuss(data) {
  return request({
    url: '/admin/disscuss/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateDisscuss(data) {
  return request({
    url: '/admin/disscuss/edit',
    method: 'put',
    data: data
  })
}
// 删除元素
export function delDisscuss(wid,did) {
  return request({
    url: '/admin/disscuss/remove?wid=' + wid+'&did='+did,
    method: 'delete'
  })
}
