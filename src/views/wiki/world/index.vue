<template>
<!--  轮播图-->
  <div>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
<!--  推荐-->
  <div>
    <el-row :gutter="20">
      <el-col
          v-for="(o, index) in 4"
          :key="o"
          :span="6"
      >
        <el-card class="dddd" :body-style="{ padding: '0px',width:'100%' }">
          <el-image style="width:100%; height: 100px" :src="url" :fit="fit" />
          <div style="padding: 1px;margin: 0px">
            <p style="font-size:16px;line-height:28px;margin: 0px"><span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;font-weight:650;">最具有脑洞的世界</span></p>
            <p style="font-size:14px;line-height:28px;margin: 0px"><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;font-weight:400;color:#999999;font-size: x-small;">用最大的想象力,完全超出过去所有的世界</span></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <div>
    <div style="margin:10px;margin-top:15px;">
      <el-row :gutter="24">
        <el-col :span="16">
            <el-button round>Round</el-button>
            <el-button type="primary" round>Primary</el-button>
            <el-button type="success"  round>Success</el-button>
        </el-col>
        <el-col :span="8">
          <router-link to='/world/order'>
            <el-button type="success" round style="float:right;">更多</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "i in 18" :key="i" class="el-col">
          <el-card :body-style="{ padding: '10px' }">
            <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
            />
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途</span></p>
                <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海</span></p>
              </div>
              <div style="margin-top: 2px;color:#A3A6AD">
                <span><BootstrapIcon icon="chat-dots" size="1x" flip-v />11111</span>
                <span><BootstrapIcon icon="pencil-square" size="1x" flip-v />111</span>
                <span><BootstrapIcon icon="hand-thumbs-up" size="1x" flip-v />11111</span>
                <span><BootstrapIcon icon="eye" size="1x" flip-v />11111</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listWorld } from "@/api/wiki/world";
import { useRouter} from "vue-router";
const router = useRouter()
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const wname=ref('');
const loading = ref(true);
const worldList = ref([]);
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: undefined,
    types: null,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const search = ref('')
//查看详细
function handleSee(row){
  router.push("/world/details?wid="+row.id);
}
/** 查询世界列表 */
function getList() {
  listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    loading.value = false;
    worldList.value = response.rows;
    total.value = response.total;
  });
}
getList();
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.dddd {
  align-self: center;
  padding: 0px 0px 0px 0px;
  box-sizing: border-box;
  width: 100%;
}
p{
 margin: 0px;
}
</style>
