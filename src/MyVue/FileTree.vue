<template>
  <ul class="file-tree">
    <li v-for="item in items" :key="item.id" @click="toggle(item, $event)">
      <div :class="['tree-item', { expanded: item.expanded, selected: selectedFileIds.includes(item.id) }]">
        <span class="icon">{{ item.type === 'folder' ? (item.expanded ? '📂' : '📁') : '📄' }}</span>
        <span class="name">{{ item.name }}</span>
      </div>
      <FileTree v-if="item.children && item.expanded" :items="item.children" />
    </li>
  </ul>
</template>

<script>

import { ref } from 'vue';
export const selectedFileIds = ref([]);
export const selectedFileIdsName = ref([]);
export const selectedFileBox = ref([]);
export default {
  name: 'FileTree',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedFileIds,
      selectedFileIdsName,
      selectedFileBox

    };
  },
  methods: {
    toggle(item, event) {
      if (item.type === 'folder') {
        item.expanded = !item.expanded;
        event.stopPropagation();
      } else {
        const index = this.selectedFileIds.indexOf(item.id);
        if (index === -1) {//TODO:待优化，之后用对象数组
          this.selectedFileIds.push(item.id);
          this.selectedFileIdsName.push(item.name);
          this.selectedFileBox.push(item.box);
        } else {
          this.selectedFileIds.splice(index, 1);
          this.selectedFileIdsName.splice(index, 1);
          this.selectedFileBox.splice(index, 1);
        }
        console.log(selectedFileIds.value);
        console.log(this.selectedFileIds);
        event.stopPropagation();
      }
    }
  }
}
</script>

<style scoped>
.file-tree {
  list-style-type: none;
  padding-left: 15px;
  color: var(--b3-theme-on-background);
}

.tree-item:hook {
  background-color: var(--b3-list-hover);
}

.tree-item {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
}

.tree-item .icon {
  margin-right: 5px;
}

.tree-item.expanded {
  background-color: var(--b3-theme-primary-lightest);
}

.name {
  margin-right: auto;
}

.tree-item.selected {
  background-color: var(--b3-theme-primary-lightest);
  /* 加圆角 */
  border-radius: 5px;
  /* 你可以根据需要调整颜色 */
}
</style>