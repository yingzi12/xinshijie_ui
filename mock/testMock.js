const Mock = require('mockjs')
let id = Mock.mock('@id')

let obj = Mock.mock({
    id:'@id'
})


var obj2 = Mock.mock({
    id:"@id()",
    username:"@cname()",
    date:"@date()",
    avator:"@image('300x300','red','#fff','avator')",
    description:"@paragraph()",
    ip:"@ip()",
    email:"@email()"
})

