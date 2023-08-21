<template>
    <div>
        <quill-editor theme="snow"></quill-editor>
    </div>
</template>

<script>
import Quill from 'quill';

export default {
    mounted() {
        this.initQuill();
    },
    methods: {
        initQuill() {
            this.quill = new Quill(this.$refs.quillContainer, {
                // 在这里设置编辑器的选项
            });
            this.quill.on('text-change', this.handleTextChange);
        },
        handleTextChange() {
            // 编辑内容变化时的处理逻辑
        },
    },
    beforeDestroy() {
        if (this.quill) {
            this.quill.off('text-change', this.handleTextChange);
        }
    },
};
</script>

<style>
/* 在这里添加样式 */
</style>
