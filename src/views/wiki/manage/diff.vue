<template>
  <el-container class="layout-container-demo" >
    <h1>文件差异对比</h1>
    <div class="mergely-full-screen-5">
      <div class="mergely-resizer">
        <div id="mergely"></div>
      </div>
    </div>
  </el-container>
</template>

<script>
import jQuery from 'jquery'
import 'mergely'
import 'codemirror'
import 'mergely/lib/mergely.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/search/searchcursor.js'

jQuery(document).ready(function () {
  // set editor content
  jQuery('#mergely').mergely({
    lhs: function(setValue) {
      setValue('the quick red fox\njumped over the hairy dog');
    },
    rhs: function(setValue) {
      setValue('the quick brown fox\njumped over the lazy dog');
    }
  });
});
</script>

<style scoped>

</style>
