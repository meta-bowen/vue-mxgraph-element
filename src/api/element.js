import request from '@/utils/request'

// 查询graph元素列表
export function listElement(query) {
  return request({
    url: '/element/list',
    method: 'get',
    params: query
  })
}

// 查询graph元素详细
export function getElement(id) {
  return request({
    url: '/element/' + id,
    method: 'get'
  })
}

// 新增graph元素
export function addElement(data) {
  return request({
    url: '/element',
    method: 'post',
    data: data
  })
}

// 修改graph元素
export function updateElement(data) {
  return request({
    url: '/element',
    method: 'put',
    data: data
  })
}

// 删除graph元素
export function delElement(id) {
  return request({
    url: '/element/' + id,
    method: 'delete'
  })
}
