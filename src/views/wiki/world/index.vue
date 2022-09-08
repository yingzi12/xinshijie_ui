<template>
  <!--  轮播图-->
  <div style="margin-bottom: 10px">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
<!--        <div style="width: 100%">-->
        <el-image style="width: 100%;height: 300px" :src="test" fit="fill"></el-image>
        <h3 text="2xl" justify="center">{{ 这是一个测试 }}</h3>
<!--        </div>-->
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--  广告-->
  <div style="margin-bottom: 10px">
    <el-row :gutter="20">
      <el-col
          v-for="(o, index) in 4"
          :key="o"
          :span="6"
      >
        <el-card class="dddd" :body-style="{ padding: '0px',width:'100%' }">
          <el-image style="width:100%; height: 100px" :src="url" :fit="fill" />
          <div style="padding: 1px;margin: 0px;text-align: center">
            <p class="biaoti" style="font-size:16px;line-height:28px;margin: 0px"><span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;font-weight:650;">最具有脑洞的世界</span></p>
            <p style="font-size:14px;line-height:28px;margin: 0px"><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;font-weight:400;color:#999999;font-size: x-small;">用最大的想象力,完全超出过去所有的世界</span></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <!--  推荐-->
  <div>
    <div style="margin:10px;margin-top:15px;">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-button round>推荐</el-button>
          <el-button type="primary" round>优秀</el-button>
          <el-button type="success"  round>最新</el-button>
        </el-col>
        <el-col :span="8">
          <router-link to='/world/order'>
            <el-button type="success" round style="float:right;"  @click="handleList">更多</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "i in 18" :key="i" class="el-col" style="text-align: center">
          <el-card :body-style="{ padding: '10px' }"  class="demo-image">
            <div style="display: inline-block">
              <el-image style="width: 100px; height: 100px;text-align: center;" fit="fill"
                        :src="url"
                        class="image"
              />
            </div>
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <p class="biaoti" ><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途星海征途征途</span></p>
                <p class="shuoming"><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海,我们的征程是星辰大海,我们的征程是星辰大海</span></p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  <!--  优秀-->
  <div>
<!--    标题-->
    <div style="margin:10px;margin-top:15px;">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-button round>精品</el-button>
        </el-col>
        <el-col :span="8">
          <router-link to='/world/order'>
            <el-button type="success" round style="float:right;" @click="handleList">更多</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
<!--        左边-->
        <el-col  style="text-align: center" :span="4">
          <div style="padding: 1px;margin: 0px;text-align: center">
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途星海征途征途</span></p>
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海,我们的征程是星辰大海,我们的征程是星辰大海</span></p>
                </div>
              </div>
              <el-button text>详细</el-button>
            </el-card>
          </div>
          <div style="padding: 1px;margin: 0px;text-align: center">
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途星海征途征途</span></p>
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海,我们的征程是星辰大海,我们的征程是星辰大海</span></p>
                </div>
              </div>
              <el-button text>详细</el-button>
            </el-card>
          </div>
        </el-col >
<!--        中间-->
        <el-col :span="16">
          <el-row>
            <el-col
                style="margin-bottom: 10px"
                v-for="(j, index) in 9"
                :key="j"
                :span="8"
            >
              <el-card :body-style="{ margin: '0px' }">
                <el-row>
                  <el-col :span="8">
                    <el-image style="width: 66px; height: 88px" :src="url" fit="fill" />
                  </el-col>
                  <el-col :span="16">
                    <h3 class="biaoti" >这是名称这是名称</h3>
                    <p class="zuozhe">2020-11-11 11:11:11</p>
                    <p class="zuozhe">这是作者</p>
                  </el-col>
                </el-row>
                <p class="shuoming">这一个说明这一个说明这一个说明这一个说明这一个说明这一个说明这一个说明</p>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
<!--        右边-->
        <el-col  style="text-align: center" :span="4">
          <div style="padding: 1px;margin: 0px;text-align: center">

            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途星海征途征途</span></p>
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海,我们的征程是星辰大海,我们的征程是星辰大海</span></p>
                </div>
              </div>
              <el-button text>详细</el-button>
            </el-card>
          </div>
          <div >
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;color:#333333;">星海征途星海征途征途</span></p>
                  <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;">我们的目标是星辰大海,我们的征程是星辰大海,我们的征程是星辰大海</span></p>
                </div>
              </div>
              <el-button text>详细</el-button>
            </el-card>
          </div>
        </el-col >

      </el-row>
    </div>
  </div>

</template>

<script setup>
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import test from '@/assets/images/test.png'
import { listWorld } from "@/api/wiki/world";
import { useRouter} from "vue-router";
const router = useRouter()
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const {  proxy  } = getCurrentInstance();
const url =
    'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
function handleList(){
  router.push("/world/list");
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
.shuoming{
  color: #666;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 40px;
  margin-bottom: 10px;
  overflow: hidden;
}
.biaoti{
  overflow: hidden;
  white-space: nowrap;
}
h3{
  font: 16px/21px PingFangSC-Regular,HelveticaNeue-Light,Helvetica Neue Light,Microsoft YaHei,"sans-serif";
  height: 21px;
  margin-bottom: 8px;
  margin-top: 0px;
  overflow: hidden;
}
.zuozhe{
  font-family: PingFangSC-Regular,-apple-system,Simsun;
  font-size: 12px;
}
</style>
