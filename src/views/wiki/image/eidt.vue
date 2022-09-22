<template>
  <el-upload
      class="avatar-uploader"
      :action="uploadImgUrl"
      name="upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >
    <img style="height: 100px;width: 80px" v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import {inject, ref} from "vue";
import {ElMessage, UploadProps} from "element-plus";

const baseUrl = inject("$baseUrl")
const imgUrl = inject("$imgUrl")

const imageUrl = ref('')
const imageUrlPath = ref('')

const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  imageUrlPath.value=uploadFile.response.fileName
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
// interface Image {
//   imgUrl: string,
// }
// const props = defineProps<Image>()
//
// if(props.imgUrl != '' && props.imgUrl != undefined){
//   imageUrl.value = imgUrl+props.imgUrl
//   imageUrlPath.value=props.imgUrl
// }
// 传递参数到index
defineExpose({  imageUrl,imageUrlPath})
</script>

<style scoped>

</style>
