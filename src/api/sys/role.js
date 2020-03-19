import request from '@/utils/request'

export function listData(params) {
  return request({
    url: '/admin/role/page',
    method: 'post',
    params
  })
}

export function createRole(params) {
  return request({
    url: '/admin/role/save',
    method: 'post',
    data: params
  })
}

export function updateRole(params) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data: params
  })
}

export function deleteRole(id) {
  return request({
    url: `/admin/role/delete/${id}`,
    method: 'delete'
  })
}