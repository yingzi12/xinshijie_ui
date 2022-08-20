import Mock from 'mockjs'

Mock.mock('/api/goodslist','get',{
    status:200,
    message:'获取商品列表成功！',
    data:[1,2,3,6]
})
