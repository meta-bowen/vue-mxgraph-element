import request from '@/utils/request'

// 查询graph模板列表
export function listTemplate(query) {
  return request({
    url: '/template/list',
    method: 'get',
    params: query
  })
}

// 查询graph模板详细
export function getTemplate(id) {
  return request({
    url: '/template/' + id,
    method: 'get'
  })
}

// 新增graph模板
export function addTemplate(data) {
  return request({
    url: '/template',
    method: 'post',
    data: data
  })
}

// 修改graph模板
export function updateTemplate(data) {
  return request({
    url: '/template',
    method: 'put',
    data: data
  })
}

// 删除graph模板
export function delTemplate(id) {
  return request({
    url: '/template/' + id,
    method: 'delete'
  })
}
