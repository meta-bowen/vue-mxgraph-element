import request from '@/utils/request'

// 查询虚拟机管理列表
export function listVm(query) {
  return request({
    url: '/vm/list',
    method: 'get',
    params: query
  })
}

// 查询虚拟机管理详细
export function getVm(id) {
  return request({
    url: '/vm/' + id,
    method: 'get'
  })
}

// 新增虚拟机管理
export function addVm(data) {
  return request({
    url: '/vm',
    method: 'post',
    data: data
  })
}

// 修改虚拟机管理
export function updateVm(data) {
  return request({
    url: '/vm',
    method: 'put',
    data: data
  })
}

// 删除虚拟机管理
export function delVm(id) {
  return request({
    url: '/vm/' + id,
    method: 'delete'
  })
}
