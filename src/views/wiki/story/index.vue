<template>
  <div style="margin: 20px">
    <a href=""></a>
  </div>
  <!--  轮播图-->
  <div style="margin-bottom: 10px">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item >
        <el-image style="width: 100%;height: 300px" :src="image11" fit="fill"></el-image>
        <h3 text="2xl" justify="center">宝石之国</h3>
      </el-carousel-item>
      <el-carousel-item >
        <el-image style="width: 100%;height: 300px" :src="image1" fit="fill"></el-image>
        <h3 text="2xl" justify="center">银河之心</h3>
      </el-carousel-item>
      <el-carousel-item >
        <el-image style="width: 100%;height: 300px" :src="image2" fit="fill"></el-image>
        <h3 text="2xl" justify="center">黑暗荣耀</h3>
      </el-carousel-item>
      <el-carousel-item >
        <el-image style="width: 100%;height: 300px" :src="image12" fit="fill"></el-image>
        <h3 text="2xl" justify="center">生存还是毁灭</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--  广告-->
  <div style="margin-bottom: 10px">
    <el-row :gutter="20">
      <el-col
          v-for="(story, index) in storyEditList"
          :key="story"
          :span="6"
      >
        <el-card class="dddd" :body-style="{ padding: '0px',width:'100%' }">
          <img
              style="height:150px"
              @click="handleSee(story.wid)"
              class="image"
              :src="imgUrl+story.imgUrl || empty" @error.once="e => { e.target.src = empty }"
          />
          <div style="padding: 1px;margin: 0px;text-align: center">
            <a class="biaoti" style="font-size:16px;margin: 0px" :href='"/story/details?wid="+story.wid +"&wname="+story.wname+"&sid="+story.id+"&sname="+story.sname'><span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;font-weight:650;" >{{ story.sname }}<el-tag v-if="story.source=='原创'">原创</el-tag></span></a>
            <p class="shuoming" style="font-size:14px;margin: 0px;"><span style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;font-weight:400;color:#999999;font-size: x-small;">{{ story.intro }}</span></p>
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
          <div style="float:right;"> <a href="/story/listAll">更多</a> </div>
          <!--            <el-button type="success" round style="float:right;" @click="handleList">更多</el-button>-->
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "story in storyNewList" :key="story.wid" class="el-col" style="text-align: center">
          <el-card :body-style="{ padding: '10px' }"  class="demo-image">
            <div style="display: inline-block">
              <img
                  @click="handleSee(story.wid)"
                  class="image"
                  :src="imgUrl+story.imgUrl || empty" @error.once="e => { e.target.src = empty }"
              />
            </div>
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <a class="biaoti" :href='"/story/details?wid="+story.wid +"&wname="+story.wname+"&sid="+story.id+"&sname="+story.sname ' ><span class="head-title">{{ story.sname }}<el-tag v-if="story.source === '原创'">原创</el-tag></span></a>
                <p class="shuoming"><span class="head-intro">{{ story.intro }}</span></p>
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
          <div style="float:right;"> <a href="/story/listAll">更多</a> </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20" class="el-row" type="flex" >
        <el-col :span="4" v-for = "story in activeList" :key="story.wid" class="el-col" style="text-align: center">
          <el-card :body-style="{ padding: '10px' }"  class="demo-image">
            <div style="display: inline-block">
              <img
                  @click="handleSee(story.wid)"
                  class="image"
                  :src="imgUrl+story.imgUrl || empty" @error.once="e => { e.target.src = empty }"
              />
            </div>
            <div >
              <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                <a class="biaoti" :href='"/story/details?wid="+story.wid+"&wname="+story.wname+"&sid="+story.id+"&sname="+story.sname' >
                  <span class="head-title">{{ story.sname }}
                  <el-tag v-if="story.source=='原创'">原创</el-tag></span>
                </a>
                <p class="shuoming"><span class="head-intro">{{ story.intro }}</span></p>
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
          <div style="float:right;"> <a href="/story/listAll">更多</a> </div>
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
                <img
                    @click="handleSee(storyKey1.wid)"
                    class="image"
                    :src="imgUrl+storyKey1.imgUrl || empty" @error.once="e => { e.target.src = empty }"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/story/details?wid="+storyKey1.wid+"&wname="+storyKey1.wname+"&sid="+storyKey1.id+"&sname="+storyKey1.sname ' >
                         <span class="head-title">{{ storyKey1.sname }}
                          <el-tag v-if="storyKey1.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                  <div class="head-intro-div">
                    <span class="text-multi-line-hidden head-intro"  >{{ storyKey1.intro }}</span>
                  </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(storyKey1.id)">详细</el-button>
            </el-card>
          </div>
          <div style="padding: 1px;margin: 0px;text-align: center">
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">

                <img
                    @click="handleSee(storyKey2.wid)"
                    class="image"
                    :src="imgUrl+storyKey2.imgUrl || empty" @error.once="e => { e.target.src = empty }"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/story/details?wid="+storyKey2.wid +"&wname="+storyKey2.wname+"&sid="+storyKey2.id+"&sname="+storyKey2.sname' >
                         <span class="head-title">{{ storyKey2.sname }}
                          <el-tag v-if="storyKey2.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                  <div class="head-intro-div">
                    <span class="text-multi-line-hidden  head-intro"  >{{ storyKey2.intro }}</span>
                  </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(storyKey2.id)">详细</el-button>
            </el-card>
          </div>
        </el-col >
        <!--        中间-->
        <el-col :span="16">
          <el-row>
            <el-col
                style="margin-bottom: 10px"
                v-for="(story, index) in boutiqueList"
                :key="story.wid"
                :span="8"
            >
              <el-card :body-style="{ margin: '0px' }">
                <el-row>
                  <el-col :span="8">
                    <img
                        @click="handleSee(story.wid)"
                        class="image"
                        :src="imgUrl+story.imgUrl || empty" @error.once="e => { e.target.src = empty }"
                    />
                  </el-col>
                  <el-col :span="16">
                    <div>
                      <a class="biaoti" :href='"/story/details?wid="+story.wid +"&wname="+story.wname+"&sid="+story.id+"&sname="+story.sname' >
                         <span class="head-title">{{ story.sname }}
                          <el-tag v-if="story.source ==='原创'">原创</el-tag></span>
                      </a>
                    </div>
                    <p class="zuozhe">{{ story.createTime }}</p>
                    <p class="zuozhe">{{ story.createName }}</p>
                  </el-col>
                </el-row>
                <p class="shuoming" @click="handleSee(story.wid)">{{story.intro}}</p>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <!--        右边-->
        <el-col  style="text-align: center" :span="4">
          <div style="padding: 1px;margin: 0px;text-align: center">
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">

                <img
                    @click="handleSee(storyKey3.wid)"
                    class="image"
                    :src="imgUrl+storyKey3.imgUrl || empty" @error.once="e => { e.target.src = empty }"
                />
              </div>
              <div >
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/story/details?wid="+storyKey3.wid+"&wname="+storyKey3.wname+"&sid="+storyKey3.id+"&sname="+storyKey3.sname ' >
                         <span class="head-title">{{ storyKey3.sname }}
                          <el-tag v-if="storyKey3.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                  <div class="head-intro-div">
                    <span class="text-multi-line-hidden head-intro" style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;" >{{ storyKey3.intro }}</span>
                  </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(storyKey3.id)">详细</el-button>
            </el-card>
          </div>
          <div >
            <el-card :body-style="{ padding: '10px' }">
              <div style="display: inline-block">
                <img
                    @click="handleSee(storyKey4.wid)"
                    class="image"
                    :src="imgUrl+storyKey4.imgUrl || empty" @error.once="e => { e.target.src = empty }"
                />
              </div>
              <div>
                <div id="u10366-1_text" class="text u10366_text" style="/* visibility: inherit; */">
                  <div>
                    <a class="biaoti" :href='"/story/details?wid="+storyKey4.wid+"&wname="+storyKey4.wname +"&sid="+storyKey4.id+"&sname="+storyKey4.sname' >
                         <span class="head-title">{{ storyKey4.sname }}
                          <el-tag v-if="storyKey4.source ==='原创'">原创</el-tag></span>
                    </a>
                  </div>
                  <div class="head-intro-div">
                    <span  class="text-multi-line-hidden head-intro" style="font-family:'PingFangSC-Regular', 'PingFang SC', sans-serif;  color:#999999; font-size: x-small;" >{{ storyKey4.intro }}</span>
                  </div>
                </div>
              </div>
              <el-button size="small" @click="handleSee(storyKey4.id)">详细</el-button>
            </el-card>
          </div>
        </el-col >

      </el-row>
    </div>
  </div>

</template>

<script setup>
import {  reactive,inject, ref, toRefs} from 'vue'
import image1 from '@/assets/images/1.jpeg'
import image2 from '@/assets/images/2.jpeg'
import image11 from '@/assets/images/11.jpeg'
import image12 from '@/assets/images/12.jpeg'
import { getRecommendStory } from "@/api/wiki/recommendStory";
import { useRouter} from "vue-router";
import empty from "@/assets/images/empty.png";

const router = useRouter()

const imgUrl = inject("$imgUrl")

// const url =
//     'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
const loading = ref(true);


//重要推荐 4个
const storyKey1 = ref({});
const storyKey2 = ref({});
const storyKey3 = ref({});
const storyKey4 = ref({});


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
  router.push("/story/details?wid="+id);
}

function handleList(){
  router.push("/story/listAll");
}
//编辑推荐 4个
const storyEditList = ref([]);
function getEditList() {
  getRecommendStory(2).then(response => {
    loading.value = false;
    storyEditList.value = response.data;
    total.value = response.total;
  });
}
//最新
//随机推荐 18个
const storyNewList = ref([]);
function getNewList() {
  getRecommendStory(5).then(response => {
    loading.value = false;
    storyNewList.value = response.data;
    total.value = response.total;
  });
}

//随机推荐4个
function getRandomList() {
  getRecommendStory(8).then(response => {
    loading.value = false;
    storyKey1.value = response.data[0];
    storyKey2.value = response.data[1];
    storyKey3.value = response.data[2];
    storyKey4.value = response.data[3];
    total.value = response.total;
  });
}
//精品 9个
const boutiqueList = ref([]);
function getBoutiqueList() {
  getRecommendStory(17).then(response => {
    loading.value = false;
    boutiqueList.value = response.data;
    total.value = response.total;
  });
}

const activeList = ref([]);
function getActiveList() {
  getRecommendStory(11).then(response => {
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
.image {
  width: 100%;
  display: block;
  object-fit: fill;
  text-align: center;
}
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
