<template>
  <div style="margin: 20px">
      <a href=""></a>
  </div>
  <!--  轮播图-->
  <div style="margin-bottom: 10px">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <el-image style="width: 100%;height: 300px" :src="test" fit="fill"></el-image>
        <h3 text="2xl" justify="center">这是一个测试 这是一个测试这是一个测试这是一个测试</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--  广告-->
  <div style="margin-bottom: 10px">
    <el-row :gutter="20">
      <el-col
          v-for="(world, index) in worldEditList"
          :key="world"
          :span="6"
      >
        <el-card class="dddd" :body-style="{ padding: '0px',width:'100%' }">
          <el-image style="width:100%; height: 100px" :src="imgUrl+world.imgUrl" fit="fill" @click="handleSee(world.wid)"/>
          <div style="padding: 1px;margin: 0px;text-align: center">
            <a class="biaoti" style="font-size:16px;margin: 0px" :href='"/world/details?wid="+world.wid +"&wname="+world.wname'><span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;font-weight:650;" >{{ world.wname }}<el-tag v-if="world.source=='原创'">原创</el-tag></span></a>
            <p class="shuoming" style="font-size:14px;margin: 0px;"><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;font-weight:400;color:#999999;font-size: x-small;">{{ world.intro }}</span></p>
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
          <el-button type="primary" round @click="handleList">优秀</el-button>
          <el-button type="success"  round @click="handleList">最新</el-button>
        </el-col>
        <el-col :span="8">
          <div style="float:right;"> <a href="/world/list">更多</a> </div>
<!--            <el-button type="success" round style="float:right;" @click="handleList">更多</el-button>-->
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "world in worldNewList" :key="world.wid" class="el-col" style="text-align: center">
          <el-card :body-style="{ padding: '10px' }"  class="demo-image">
            <div style="display: inline-block">
              <el-image style="width: 100px; height: 100px;text-align: center;" fit="fill"
                        @click="handleSee(world.wid)"
                        :src="imgUrl+world.imgUrl"
                        class="image"
              />
            </div>
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <a class="biaoti" :href='"/world/details?wid="+world.wid +"&wname="+world.wname ' ><span class="head-title">{{ world.wname }}<el-tag v-if="world.source === '原创'">原创</el-tag></span></a>
                <p class="shuoming"><span class="head-intro">{{ world.intro }}</span></p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  <!--  活跃-->
  <div>
    <div style="margin:10px;margin-top:15px;">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-button round>活跃</el-button>
          <el-button type="primary" round @click="handleList">本周</el-button>
          <el-button type="success"  round @click="handleList">本月</el-button>
        </el-col>
        <el-col :span="8">
          <div style="float:right;"> <a href="/world/list">更多</a> </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "world in activeList" :key="world.wid" class="el-col" style="text-align: center">
          <el-card :body-style="{ padding: '10px' }"  class="demo-image">
            <div style="display: inline-block">
              <el-image style="width: 100px; height: 100px;text-align: center;" fit="fill"
                        @click="handleSee(world.wid)"
                        :src="imgUrl+world.imgUrl"
                        class="image"
              />
            </div>
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <a class="biaoti" :href='"/world/details?wid="+world.wid+"&wname="+world.wname' >
                  <span class="head-title">{{ world.wname }}
                  <el-tag v-if="world.source=='原创'">原创</el-tag></span>
                </a>
                <p class="shuoming"><span class="head-intro">{{ world.intro }}</span></p>
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
          <div style="float:right;"> <a href="/world/list">更多</a> </div>
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
                          @click="handleSee(worldKey1.id)"
                          :src="imgUrl+worldKey1.imgUrl"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                    <div>
                      <a class="biaoti" :href='"/world/details?wid="+worldKey1.wid+"&wname="+worldKey1.wname ' >
                         <span class="head-title">{{ worldKey1.wname }}
                          <el-tag v-if="worldKey1.source ==='原创'">原创</el-tag></span>
                      </a>
                    </div>
                    <div class="head-intro-div">
                        <span class="text-multi-line-hidden head-intro"  >{{ worldKey1.intro }}</span>
                    </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(worldKey1.id)">详细</el-button>
            </el-card>
          </div>
          <div style="padding: 1px;margin: 0px;text-align: center">
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          @click="handleSee(worldKey2.id)"
                          :src="imgUrl+worldKey2.imgUrl"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <div>
                  <a class="biaoti" :href='"/world/details?wid="+worldKey2.wid +"&wname="+worldKey2.wname' >
                         <span class="head-title">{{ worldKey2.wname }}
                          <el-tag v-if="worldKey2.source ==='原创'">原创</el-tag></span>
                  </a>
                </div>
                    <div class="head-intro-div">
                        <span class="text-multi-line-hidden  head-intro"  >{{ worldKey2.intro }}</span>
                    </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(worldKey2.id)">详细</el-button>
            </el-card>
          </div>
        </el-col >
<!--        中间-->
        <el-col :span="16">
          <el-row>
            <el-col
                style="margin-bottom: 10px"
                v-for="(world, index) in boutiqueList"
                :key="world.wid"
                :span="8"
            >
              <el-card :body-style="{ margin: '0px' }">
                <el-row>
                  <el-col :span="8">
                    <el-image style="width: 66px; height: 88px" :src="imgUrl+world.imgUrl" fit="fill" @click="handleSee(world.wid)" />
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <a class="biaoti" :href='"/world/details?wid="+world.wid +"&wname="+world.wname' >
                         <span class="head-title">{{ world.wname }}
                          <el-tag v-if="world.source ==='原创'">原创</el-tag></span>
                      </a>
                    </div>
                    <p class="zuozhe">{{ world.createTime }}</p>
                    <p class="zuozhe">{{ world.createName }}</p>
                  </el-col>
                </el-row>
                <p class="shuoming" @click="handleSee(world.wid)">{{world.intro}}</p>
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
                          @click="handleSee(worldKey3.id)"
                          :src="imgUrl+worldKey3.imgUrl"
                          class="image"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/world/details?wid="+worldKey3.wid+"&wname="+worldKey3.wname ' >
                         <span class="head-title">{{ worldKey3.wname }}
                          <el-tag v-if="worldKey3.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                    <div class="head-intro-div">
                        <span class="text-multi-line-hidden head-intro" style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;" >{{ worldKey3.intro }}</span>
                    </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(worldKey3.id)">详细</el-button>
            </el-card>
          </div>
          <div >
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <el-image style="width: 100px; height: 130px" fit="fill"
                          @click="handleSee(worldKey4.id)"
                          :src="imgUrl+worldKey4.imgUrl"
                          class="image"
                />
              </div>
              <div>
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/world/details?wid="+worldKey4.wid+"&wname="+worldKey4.wname ' >
                         <span class="head-title">{{ worldKey4.wname }}
                          <el-tag v-if="worldKey4.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                    <div class="head-intro-div">
                        <span  class="text-multi-line-hidden head-intro" style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;" >{{ worldKey4.intro }}</span>
                   </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(worldKey4.id)">详细</el-button>
            </el-card>
          </div>
        </el-col >

      </el-row>
    </div>
  </div>

</template>

<script setup>
import {  reactive,inject, ref, toRefs} from 'vue'
import test from '@/assets/images/test.png'
import { getRecommendWorld } from "@/api/wiki/recommendWorld";
import { useRouter} from "vue-router";
// import {getRecommendWorld} from "../api/wiki/recommendWorld";
const router = useRouter()

const imgUrl = inject("$imgUrl")

// const url =
//     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const loading = ref(true);


//重要推荐 4个
const worldKey1 = ref({});
const worldKey2 = ref({});
const worldKey3 = ref({});
const worldKey4 = ref({});


const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

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
function handleSee(id){
  router.push("/world/details?wid="+id);
}

function handleList(){
  router.push("/world/list");
}
//编辑推荐 4个
const worldEditList = ref([]);
function getEditList() {
  getRecommendWorld(2).then(response => {
    loading.value = false;
    worldEditList.value = response.data;
    total.value = response.total;
  });
}
//最新
//随机推荐 18个
const worldNewList = ref([]);
function getNewList() {
  getRecommendWorld(5).then(response => {
    loading.value = false;
    worldNewList.value = response.data;
    total.value = response.total;
  });
}

//随机推荐4个
function getRandomList() {
  getRecommendWorld(8).then(response => {
    loading.value = false;
    worldKey1.value = response.data[0];
    worldKey2.value = response.data[1];
    worldKey3.value = response.data[2];
    worldKey4.value = response.data[3];
    total.value = response.total;
  });
}
//精品 9个
const boutiqueList = ref([]);
function getBoutiqueList() {
  getRecommendWorld(17).then(response => {
    loading.value = false;
    boutiqueList.value = response.data;
    total.value = response.total;
  });
}

const activeList = ref([]);
function getActiveList() {
  getRecommendWorld(11).then(response => {
    loading.value = false;
    activeList.value = response.data;
    total.value = response.total;
  });
}
getNewList();
getEditList();
getRandomList();
getBoutiqueList();
getActiveList();
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

.text-multi-line-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
