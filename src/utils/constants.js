import {reactive} from "vue";

export const storyTypesMap=new Map([
    [6,"科学"],
    [1,"武侠"],
    [2,"仙侠"],
    [3,"魔幻"],
    [4,"奇幻"],
    [5,"其他"]
])

export const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])

