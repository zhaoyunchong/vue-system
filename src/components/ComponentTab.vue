<template>
  <div class="tabs">
    <el-tag
      @click="changeMenu(tag)"
      :key="tag.name"
      size="50"
      v-for="tag in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      :effect="$route.name == tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.close(tag)
    },
    ...mapMutations({
      close: 'closeTab'
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  }
}
</script>
<style lang="scss">
.tabs {
  padding: 20px;
  cursor: pointer;
  .el-tag {
    margin-right: 15px;
  }
}
</style>
