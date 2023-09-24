<template>
  <div class="home">
    <QuillEditor :value.sync="value" />
  </div>
</template>

<script>
import QuillEditor from "@/components/Editor/index.vue";

export default {
  name: "Home",
  components: {
    QuillEditor,
  },
  data() {
    return {
      value: ``,
    };
  },
};
</script>
