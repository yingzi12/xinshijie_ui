import request from '@/utils/request'

export function getRecommendWorld(recType) {
    return request({
        url: '/wiki/recommendWorld/list?recType=' + recType,
        method: 'get'
    })
}
