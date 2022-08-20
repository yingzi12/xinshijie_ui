<template>
  <router-view />
</template>

<script >
   var json1='{\n' +
       '  "success":true,\n' +
       '  "data":{\n' +
       '      "value":[\n' +
       '\t     {"name":"张三","age":1},\n' +
       '\t\t {"name":"李四","age":2}\n' +
       '\t  ]\n' +
       '  }\n' +
       '}'


   var json2='{\n' +
       '  "success":true,\n' +
       '  "data":[\n' +
       '\t     {"name":"张三","age":1},\n' +
       '\t\t {"name":"李四","age":2}\n' +
       '\t  ]\n' +
       '}'

   var obj1=JSON.parse(json1)
   var obj2=JSON.parse(json2)

   console.log(obj1.data.value)
   console.log(obj2.data)
</script>
