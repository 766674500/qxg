import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}

export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
