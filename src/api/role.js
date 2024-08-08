import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}
