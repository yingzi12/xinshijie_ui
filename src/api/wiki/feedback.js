import request from '@/utils/request'

export function addFeedback(data) {
    return request({
        url: '/wiki/feedback/add',
        method: 'post',
        data: data
    })
}
