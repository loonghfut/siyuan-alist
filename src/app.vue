<template>

</template>



<script>
import { ref } from 'vue';
import FileTree from './MyVue/FileTree.vue';
import { serNum } from '@/index';
import * as filetree from '@/FileTreeApi';
import { selectedFileIdsName, selectedFileIds } from './MyVue/FileTree.vue';
export const selectedOption = ref("");
export default {
//TODO:通过opentab打开笔记本md文件
  name: 'App',
  components: {
    FileTree
  },
  props: {
    plugin: Object // 接收 plugin 对象
  },
  // setup() {
  // },

  async mounted() {
   
  },
  methods: {
    async refreshPage1() {
      this.loading = true;
      this.serNum = serNum;
      const value2 = await filetree.getFileTreeData();
      console.log(value2);
      this.fileTreeData = value2
      this.loading = false;
    },
    async refreshPage() {
      this.loading = true;
      this.serNum = serNum;
      // filetree.ceshi();
      const value2 = await filetree.getFileTreeData();
      console.log(value2);
      this.fileTreeData = value2
      this.options = await filetree.listNotebooks()
      // console.log(fileTreeData);
      // console.log(fileTreeData.value);
      this.loading = false;
    },
    onOptionChange() {
      // 选择选项后执行的函数
      console.log('选择的笔记本:', this.selectedOption);
      this.refreshPage1();
    }
  },
  data() {
    return {
      serNum,
      fileTreeData: ref([]),
      selectedFileIdsName,
      selectedFileIds,
      filetree,
      plugin: this.plugin,
      selectedOption,
      options: [],
      loading: false
    };
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--b3-theme-on-background);
  /* background-color: #1e1e1e;
  min-height: 98%; */
  padding: 10px;
}

.tree-container {
  margin-left: -20px;
  /* 设置整体左移 */
  justify-content: flex-start;
  /* 或 'center'、'space-between' 等 */
  align-items: flex-start;
  /* 防止在垂直方向的溢出 */
  overflow: hidden;
  /* 隐藏不必要的滚动条 */

}

.title {
  color: var(--b3-theme-on-background);
  font-size: 20px;
  margin-bottom: 20px;
}

.header-container {
  display: flex;
  /* 使用 Flexbox 布局 */
  align-items: center;
  /* 垂直居中对齐元素 */
}

.title {
  margin-right: 15px;
  /* 给标题和按钮之间添加一点间隔 */
}

.MY-refresh-button {
  background: none;
  /* 按钮背景色 */
  color: var(--b3-theme-on-background);
  /* 按钮文字颜色 */
  /* 加个边框 */
  border: 1px solid var(--b3-theme-on-background);
  /* 字体大小 */
  font-size: 13px;
  margin-bottom: 20px;
  border-radius: 5px;
  /* 圆角效果 */
  /* padding: 2px 2px; 内边距 */
  cursor: pointer;
  /* 鼠标移动到按钮上时变为手型 */
  transition: background-color 0.3s ease;
  /* 添加过渡效果 */
  margin-left: auto;
  /* 靠右侧边 */

}

.MY-refresh-button:hover {
  background-color: var(--b3-list-hover);
  /* 悬停时的背景色 */
}

.info-container {
  background-color: var(--b3-theme-surface);
  /* 深色背景 */
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
}

.info-item {
  font-size: 16px;
  color: var(--b3-theme-on-background);;
  /* 浅色文本 */
}

.info-value {
  font-weight: bold;
  color: #61afef;
  /* 亮色值 */
}

.MY-select-box {
  background-color: var(--b3-theme-surface);
  color: var(--b3-theme-on-background);
  border: 1px solid var(--b3-theme-on-background);
  /* padding: 5px; */
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 20px;
  margin-right: 6px;
}

.MY-select-box option {
  background-color: var(--b3-theme-surface);;
  color: var(--b3-theme-on-background);;
}

.MY-select-label {
  margin-right: 10px;
}

.MY-pull-note-button {
  background: none;
  /* 按钮背景色 */
  color: var(--b3-theme-on-background);
  /* 按钮文字颜色 */
  /* 加个边框 */
  border: 1px solid var(--b3-theme-on-background);
  /* 字体大小 */
  font-size: 13px;
  margin-bottom: 5px;
  border-radius: 5px;
  /* 圆角效果 */
  /* padding: 2px 2px; 内边距 */
  cursor: pointer;
  /* 鼠标移动到按钮上时变为手型 */
  transition: background-color 0.3s ease;
  /* 添加过渡效果 */
  margin-left: auto;

}

.MY-pull-note-button:hover {
  background-color: var(--b3-list-hover);
  /* 悬停时的背景色 */
}

</style>
