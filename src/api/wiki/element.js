import request from '@/utils/request'

// 查询元素列表
export function listElement(query) {
  return request({
    url: '/wiki/element/list',
    method: 'get',
    params: query
  })
}

// // 查询元素详细
// export function getElement(id) {
//   return request({
//     url: '/wiki/element/getInfo/' + id,
//     method: 'get'
//   })
// }

// 查询元素详细
export function getElementDetails(id) {
  return request({
    url: '/wiki/element/getInfo/' + id,
    method: 'get'
  })
}

// 新增元素
export function addElement(data) {
  return request({
    url: '/wiki/element/add',
    method: 'post',
    data: data
  })
}

// 修改元素
export function updateElement(data) {
  return request({
    url: '/wiki/element/edit',
    method: 'put',
    data: data
  })
}

// 删除元素
export function delElement(id) {
  return request({
    url: '/wiki/element/remove/' + id,
    method: 'delete'
  })
}
