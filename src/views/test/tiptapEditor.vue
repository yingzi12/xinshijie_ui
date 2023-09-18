<template>
    <div className="table-editor">
        <div className="table-header">
            <table>
                <thead>
                <tr>
                    <th>Column 1</th>
                    <th>Column 2</th>
                    <!-- Add more columns as needed -->
                </tr>
                </thead>
            </table>
        </div>
        <editor-content :editor="editor"/>
    </div>
</template>

<script setup>
import StarterKit from '@tiptap/starter-kit'
import {Editor} from '@tiptap/vue-3'
import {ref, watchEffect, onBeforeUnmount} from 'vue'

const modelValue = ref('')
const editor = new Editor({
    extensions: [
        StarterKit,
    ],
    content: modelValue.value,
    onUpdate: () => {
        // Update modelValue when the content changes
        modelValue.value = editor.getHTML()
    },
})

watchEffect(() => {
    // Update editor content when modelValue changes
    if (editor.getHTML() !== modelValue.value) {
        editor.commands.setContent(modelValue.value, false)
    }
})

onBeforeUnmount(() => {
    editor.destroy()
})

// Expose variables for template
const tableEditor = {
    editor,
    modelValue,
}
</script>

<style scoped>
/* Your styles here */
</style>
