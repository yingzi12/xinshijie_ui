<template>
  <div style="margin:0 auto; width:1248px;">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
        @select="handleSelect"
    >
      <el-menu-item disabled><el-image style="width: 100%;height:55px" :src="logo2" fit="fill"></el-image></el-menu-item>
      <el-menu-item index="/index" ><span style="font-size: 30px;font-weight:bold;">首页</span></el-menu-item>
      <el-menu-item index="/world/index" ><span style="font-size: 30px;font-weight:bold;">世界树</span></el-menu-item>
      <el-menu-item index="/user/index" ><span style="font-size: 30px;font-weight:bold;">家园</span></el-menu-item>
      <el-menu-item index="/wiki/help" ><span style="font-size: 30px;font-weight:bold;">帮助</span></el-menu-item>
      <div class="flex-grow" />
      <!--      <el-button v-if="!isLogin" text style="margin-top: 10px"><router-link :to="{path:'/login'}">登录</router-link></el-button>-->
      <!--      <el-button v-if="!isLogin"  text style="margin-top: 10px"><router-link :to="{path:'/register'}">注册</router-link></el-button>-->
      <!--      <el-button v-if="isLogin" text style="margin-top: 10px">{{ username }}</el-button>-->
      <!--      <el-button v-if="isLogin" text style="margin-top: 10px">退出</el-button>-->
    </el-menu>
  </div>
  <el-divider  style="margin:0px"/>
  <div class="center">
    <div>
     <h3 class="title">密码找回</h3>
    <el-form  ref="ruleFormRef"
             :model="ruleForm"
             :rules="rules"
             label-width="120px" class="login-form">
      <el-form-item label="邮箱">
        <el-input  type="email"
                   placeholder="请输入电子邮箱"
                   v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">发送重置密码邮件</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
  <!--  底部  -->
  <div>
    <el-divider style="margin: 0px"/>
    <el-row :gutter="20">
      <el-col :span="2"> </el-col>
      <el-col :span="20" style="margin: 0px">
        <div class="tiaozhuan" style="margin: 0px;text-align: center;">
          <el-space  spacer="|">
            <!--           <div v-for="i in 2" :key="i">-->
            <!--             <el-button> button {{ i }} </el-button>-->
            <!--           </div>-->
            <div><router-link to="">关于心世界</router-link></div>
            <div><router-link to="">联系我们</router-link></div>
            <div> <router-link to="">帮助中心</router-link></div>
            <div><router-link to="">提交建议</router-link></div>
            <div><router-link to="">举报中心</router-link></div>
            <div> <router-link to="">漏洞提交</router-link></div>
          </el-space>
        </div>
        <div style="margin: 0px;text-align: center;"> <p  style="margin: 0px;">Copyright © 2002-2022 www.xingshijie.com All Rights Reserved 版权所有 心世界信息科技有限公司</p></div>
        <div style="margin: 0px;text-align: center;"> <p  style="margin: 0px;">世界观，背景，故事，设定，小说</p></div>
        <div style="margin: 0px;text-align: center;"><p style="margin: 0px;">本站所收录的作品、社区话题、用户评论、用户上传内容或图片等均属用户个人行为。如前述内容侵害您的权益，欢迎举报投诉，一经核实，立即删除，本站不承担任何责任</p></div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref} from 'vue'
import {  sendPasswordEmail } from "@/api/wiki/user";
import {Action, ElMessage, ElMessageBox, FormInstance, FormRules} from "element-plus";
import {useRouter} from "vue-router";

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const ruleForm = reactive({
  email: ''
})

const rules = reactive<FormRules>({
  email: [
    {
      required: true,
      message: '请输入电子邮箱',
      trigger: 'change',
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      sendPasswordEmail(ruleForm.email).then(response => {
        ElMessage.success("发送验证邮件成功，请去邮箱查看")
        router.push("/login");
      })
    } else {
      //console.log('error submit!', fields)
    }
  })
}

</script>


<style lang='scss' scoped>
//.login {
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  height: 100%;
//  //background-image: url("../assets/images/login-background.jpg");
//  background-size: cover;
//}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
//
//.login-form {
//  border-radius: 6px;
//  background: #ffffff;
//  width: 400px;
//  padding: 25px 25px 5px 25px;
//  .el-input {
//    height: 40px;
//    input {
//      height: 40px;
//    }
//  }
//  .input-icon {
//    height: 39px;
//    width: 14px;
//    margin-left: 0px;
//  }
//}
//.login-tip {
//  font-size: 13px;
//  text-align: center;
//  color: #bfbfbf;
//}
//.login-code {
//  width: 33%;
//  height: 40px;
//  float: right;
//  img {
//    cursor: pointer;
//    vertical-align: middle;
//  }
//}
//.el-login-footer {
//  height: 40px;
//  line-height: 40px;
//  position: fixed;
//  bottom: 0;
//  width: 100%;
//  text-align: center;
//  color: #fff;
//  font-family: Arial;
//  font-size: 12px;
//  letter-spacing: 1px;
//}
//.login-code-img {
//  height: 40px;
//  padding-left: 12px;
//}
p{
  color: #a6a6a6;
  font: 12px/20px PingFangSC-Regular,-apple-system,Simsun;
  height: 20px;
  overflow: hidden;
}

.tiaozhuan {
  color: #1a1a1a;
  font-family: PingFangSC-Regular,-apple-system,Simsun;
  font-size: 12px;
  line-height: 27px;
  margin-right: 16px;
}
.flex-grow {
  flex-grow: 1;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
