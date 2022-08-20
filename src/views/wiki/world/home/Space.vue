<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-row>
            <el-button round>Round</el-button>
            <el-button type="primary" round>Primary</el-button>
            <el-button type="success"  round>Success</el-button>
          </el-row>
        </el-col>
        <el-col :span="8">
          <router-link to='/world/order'>
            <el-button type="success" round style="float:right;">更多</el-button>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-space wrap>
        <div v-for="i in 18" :key="i">
          <el-card :body-style="{ padding: '10px' ,width:'190px',height:'300px'}">
            <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
            />
            <div style="padding: 14px">
              <h1>Yummy hamburger</h1>
              <div class="bottom">
                <time class="time">{{ currentDate }}</time>
                <el-button text class="button">Operating</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-space>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
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
</style>
