import request from '@/utils/request'

// 查询graph信息列表
export function listInfo(query) {
  return request({
    url: '/info/list',
    method: 'get',
    params: query
  })
}

// 查询graph信息详细
export function getInfo(id) {
  return request({
    url: '/info/' + id,
    method: 'get'
  })
}

// 新增graph信息
export function addInfo(data) {
  return request({
    url: '/info',
    method: 'post',
    data: data
  })
}

// 修改graph信息
export function updateInfo(data) {
  return request({
    url: '/info',
    method: 'put',
    data: data
  })
}

// 删除graph信息
export function delInfo(id) {
  return request({
    url: '/info/' + id,
    method: 'delete'
  })
}
