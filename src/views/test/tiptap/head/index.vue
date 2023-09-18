<template>
    <div class="editor" v-if="editor">
        <!-- 编辑器顶部菜单栏 -->
        <menu-bar class="editor__header" :editor="editor" />

        <!-- 编辑器内容区域 -->
        <editor-content class="editor__content" :editor="editor" />

<!--        <div class="editor__footer">-->
<!--            <div :class="`editor__status editor__status&#45;&#45;${status}`">-->
<!--                <template v-if="status === 'connected'">-->
<!--                    {{ editor.storage.collaborationCursor.users.length }} user{{ editor.storage.collaborationCursor.users.length === 1 ? '' : 's' }} online in {{ room }}-->
<!--                </template>-->
<!--                <template v-else>-->
<!--                    offline-->
<!--                </template>-->
<!--            </div>-->
<!--            <div class="editor__name">-->
<!--                &lt;!&ndash; 更改当前用户的名称 &ndash;&gt;-->
<!--                <button @click="setName">-->
<!--                    {{ currentUser.name }}-->
<!--                </button>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
// 导入必要的包和组件
import { TiptapCollabProvider } from '@hocuspocus/provider'
import CharacterCount from '@tiptap/extension-character-count'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
// 暂时去掉协同编辑
// import Collaboration from '@tiptap/extension-collaboration'
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
// 暂时去掉协同编辑
// import * as Y from 'yjs'
import MenuBar from './MenuBar.vue'

// // 从变量中获取房间号
// const variables = {
//     collabRooms: "10, 11, 12", // 用逗号分隔的房间号字符串
// };
//
// // 随机从列表中选择一个元素
// const getRandomElement = list => {
//     return list[Math.floor(Math.random() * list.length)]
// }
//
// // 随机获取房间号
// const getRandomRoom = () => {
//     const roomNumbers = variables.collabRooms?.trim()?.split(',') ?? [10, 11, 12]
//     return getRandomElement(roomNumbers.map(number => `rooms.${number}`))
// }
const CustomDocument = Document.extend({
    content: 'heading block*',
})

export default {
    components: {
        EditorContent,
        MenuBar,
    },

    data() {
        return {
            // currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
            //     name: this.getRandomName(),
            //     color: this.getRandomColor(),
            // },
            provider: null,
            editor: null,
            status: 'connecting',
            // room: getRandomRoom(),
        }
    },

    mounted() {
    //     // 创建 Yjs 文档
    //     const ydoc = new Y.Doc()
    //
    //     // 创建 Tiptap 协作提供程序
    //     this.provider = new TiptapCollabProvider({
    //         appId: '7j9y6m10',
    //         name: this.room,
    //         document: ydoc,
    //     })
    //
    //     // 监听协作状态事件
    //     this.provider.on('status', event => {
    //         this.status = event.status
    //     })
    //
        // 创建 Tiptap 编辑器
        this.editor = new Editor({
            extensions: [
                CustomDocument,
                StarterKit.configure({
                    history: false,
                }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        if (node.type.name === 'heading') {
                            return 'What’s the title?'
                        }

                        return 'Can you add some further context?'
                    },
                }),
                Highlight,
                TaskList,
                TaskItem,
                // Collaboration.configure({
                //     document: ydoc,
                // }),
                // CollaborationCursor.configure({
                //     provider: this.provider,
                //     user: this.currentUser,
                // }),
                CharacterCount.configure({
                    limit: 10000,
                }),
            ],
            content: `请输入内容`,
        })

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
    //
    methods: {
    //     // 设置当前用户的名称
    //     setName() {
    //         const name = (window.prompt('Name') || '')
    //             .trim()
    //             .substring(0, 32)
    //
    //         if (name) {
    //             return this.updateCurrentUser({
    //                 name,
    //             })
    //         }
    //     },
    //
    //     // 更新当前用户的属性
    //     updateCurrentUser(attributes) {
    //         this.currentUser = { ...this.currentUser, ...attributes }
    //         this.editor.chain().focus().updateUser(this.currentUser).run()
    //
    //         localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    //     },
    //
    //     // 获取随机颜色
    //     getRandomColor() {
    //         return getRandomElement([
    //             '#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D',
    //         ])
    //     },
    //
    //     // 获取随机用户名
    //     getRandomName() {
    //         return getRandomElement([
    //             'Lea Thompson', 'Cyndi Lauper', 'Tom Cruise', 'Madonna', 'Jerry Hall', 'Joan Collins', 'Winona Ryder', 'Christina Applegate', 'Alyssa Milano', 'Molly Ringwald', 'Ally Sheedy', 'Debbie Harry', 'Olivia Newton-John', 'Elton John', 'Michael J. Fox', 'Axl Rose', 'Emilio Estevez', 'Ralph Macchio', 'Rob Lowe', 'Jennifer Grey', 'Mickey Rourke', 'John Cusack', 'Matthew Broderick', 'Justine Bateman', 'Lisa Bonet',
    //         ])
    //     },
    },

    // 组件销毁时清理
    beforeUnmount() {
        this.editor.destroy()
        this.provider.destroy()
    },
}
</script>

<style lang="scss">
.editor {
  background-color: #FFF;
  border: 3px solid #0D0D0D;
  border-radius: 0.75rem;
  color: #0D0D0D;
  display: flex;
  flex-direction: column;
  max-height: 26rem;

  &__header {
    align-items: center;
    background: #0d0d0d;
    border-bottom: 3px solid #0d0d0d;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
  }

  &__content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1.25rem 1rem;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    align-items: center;
    border-top: 3px solid #0D0D0D;
    color: #0D0D0D;
    display: flex;
    flex: 0 0 auto;
    flex-wrap: wrap;
    font-size: 12px;
    font-weight: 600;
    justify-content: space-between;
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  /* Some information about the status */
  &__status {
    align-items: center;
    border-radius: 5px;
    display: flex;

    &::before {
      background: rgba(#0D0D0D, 0.5);
      border-radius: 50%;
      content: ' ';
      display: inline-block;
      flex: 0 0 auto;
      height: 0.5rem;
      margin-right: 0.5rem;
      width: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #B9F18D;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      border-radius: 0.4rem;
      color: #0D0D0D;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 0.25rem 0.5rem;

      &:hover {
        background-color: #0D0D0D;
        color: #FFF;
      }
    }
  }
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  margin-left: -1px;
  margin-right: -1px;
  pointer-events: none;
  position: relative;
  word-break: normal;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  border-radius: 3px 3px 3px 0;
  color: #0D0D0D;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  left: -1px;
  line-height: normal;
  padding: 0.1rem 0.3rem;
  position: absolute;
  top: -1.4em;
  user-select: none;
  white-space: nowrap;
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    border-radius: 0.5rem;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  mark {
    background-color: #FAF594;
  }

  img {
    height: auto;
    max-width: 100%;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    border-left: 2px solid rgba(#0D0D0D, 0.1);
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0D0D0D, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
