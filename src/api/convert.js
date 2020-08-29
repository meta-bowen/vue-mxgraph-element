import request from '@/utils/request'

// 转换为png
export function toPng(data) {
    return request({
      url: '/convert/toPng',
      method: 'post',
      data: data
    })
}
