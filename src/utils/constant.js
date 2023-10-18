// export  const storyStatusMap = new Map([
//     [1, "草稿"],
//     [2, "待审核"],
//     [3, "正常"],
//     [4, "删除"],
//     [5, "审核不通过"],
//     [6, "隐藏"],
//     [7, "锁定"],
// ]);
export  const worldStatus = new Map([
    [1, "待发布"],
    [2, "锁定"],
    [3, "隐藏"],
    [4, "删除"],
    [5, "正常"]
]);

export  const storyTypesMap=new Map([
    [6,"科学"],
    [1,"武侠"],
    [2,"仙侠"],
    [3,"魔幻"],
    [4,"奇幻"],
    [5,"其他"]
])
export  const applyStatusMap=new Map([
    [1, "待审核"],
    [2, "审核通过"],
    [3, "拒绝"],
    [4, "取消申请"],
])
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
