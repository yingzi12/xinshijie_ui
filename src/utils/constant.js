import {reactive, ref} from "vue";

export  const worldStatusMap = new Map([
    [1, "待发布"],
    [2, "锁定"],
    [3, "隐藏"],
    [4, "删除"],
    [5, "正常"]
]);
export  const worldStatus= reactive([
    {id:1, name:"待发布"},
    {id:2, name:"锁定"},
    {id:3, name:"隐藏"},
    {id:4, name:"删除"},
    {id:5, name:"正常"}
]);
export  const applyStatusMap=new Map([
    [1, "待审核"],
    [2, "审核通过"],
    [3, "拒绝"],
    [4, "取消申请"],
])
export  const applyStatus=reactive([
    {id:1,name: "待审核"},
    {id:2, name:"审核通过"},
    {id:3,name: "拒绝"},
    {id:4,name: "取消申请"},
])
export const storyTypesMap=new Map([
    [6,"科学"],
    [1,"武侠"],
    [2,"仙侠"],
    [3,"魔幻"],
    [4,"奇幻"],
    [5,"其他"]
])

export const storyTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
export const storyKind=reactive([{id:1,name:"主线"},{id:2,name:"支线"},{id:3,name:"杂谈"},{id:3,name:"异想"}])
export const worldTypesMap=new Map([
    [6,"科学"],
    [1,"武侠"],
    [2,"仙侠"],
    [3,"魔幻"],
    [4,"奇幻"],
    [5,"其他"],
])
export const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
export const worldSource=reactive([{id:1,name:"原创"},{id:2,name:"电影"},{id:3,name:"小说"},{id:4,name:"游戏"},{id:5,name:"动漫"},{id:5,name:"电视剧"},{id:6,name:"其他"}])
export const storyStatusMap = new Map([
    [0, "全部"],
    [1, "草稿"],
    [2, "待审核"],
    [3, "正常"],
    [5, "审核不通过"],
    [4, "删除"],
    [6, "隐藏"],
    [7, "锁定"],
]);
export const storyStatusSelection = [
    {id:0,value: "全部"},
    {id:1, value:"草稿"},
    {id:2, value:"待审核"},
    {id:3, value:"正常"},
    {id:5, value:"审核不通过"},
    {id:4,value: "删除"},
    {id:6,value: "隐藏"},
    {id:7, value:"锁定"}
];
export const storyStatus=reactive([
    {id:3,name:"正常"},
    {id:4,name:"删除"},
    {id:5,name:"审核不通过"},
    {id:6,name:"隐藏"},
    {id:7,name:"锁定"}

])
export const discussTypesMap = new Map([
    [1, "自由讨论"],
    [2, "建议"],
    [3, "内容错误"],
    [4, "内容缺失"],
    [5, "过多重复"],
    [6, "内容不相关"],
    [7, "其他"],

]);
export const discussTypes = ref([
    {id:1,name:"自由讨论"},
    {id:2,name:"建议"},
    {id:3,name:"内容错误"},
    {id:4,name:"内容缺失"},
    {id:5,name:"过多重复"},
    {id:6,name:"内容不相关"},
    {id:7,name:"其他"},
]);
export const discussStatusMap = new Map([
    [1, "待处理"],
    [2, "已处理"],
    [3, "关闭"],
])

export const discussStatus =ref([
    {id:1, name:"待处理"},
    {id:2, name:"已处理"},
    {id:3, name:"关闭"},
])
export const draftElementStatusMap = new Map([
    [7, "草稿"],
    [1, "待审核"],
    [3, "不通过"],
    [2, "通过"],
    [4, "删除"],
    [5, "超时发布自动拒绝"],
    [6, "超时审核自动通过"],
]);

export const draftElementStatus =reactive([
    {id:7,name: "草稿"},
    {id:1, name:"待审核"},
    {id:3,name: "不通过"},
    {id:2,name: "通过"},
    {id:4, name:"删除"},
    {id:5, name:"超时发布自动拒绝"},
    {id:6,name: "超时审核自动通过"},
]);
export const elementStatusMap = new Map([
    [1, "正常"],
    [3, "待审核"],
    [2, "锁定"],
    [4, "删除"],
]);
export const elementStatus =reactive([
    {id:1, name:"正常"},
    {id:3,name: "待审核"},
    {id:2,name: "锁定"},
    {id:4, name:"删除"},
]);