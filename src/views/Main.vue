<template>
  <el-container style="height:100%">
    <el-aside width="auto">
      <component-aside></component-aside>
    </el-aside>
    <el-container>
      <el-header>
        <component-header></component-header>
      </el-header>
      <component-tab></component-tab>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ComponentHeader from '@/components/ComponentHeader.vue'
import ComponentAside from '@/components/ComponentAside.vue'
import ComponentTab from '@/components/ComponentTab.vue'
export default {
  data() {
    return {}
  },
  components: {
    ComponentAside,
    ComponentHeader,
    ComponentTab
  }
}
</script>
<style scoped>
.el-header {
  background-color: #333;
  color: white;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
