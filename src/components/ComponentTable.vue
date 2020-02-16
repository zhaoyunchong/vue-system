<template>
  <div class="common-table" v-loading="config.loading">
    <el-table :data="tableData" height="90%">
      <el-table-column label="序号" width="85">
        <!-- 作用域插槽 将里面封装的数据暴露出来 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px"> {{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip stripe v-for="item in tableLabel" :key="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page" @current-change="changePage">
      <!-- current-change 第一个参数默认是当前页数 -->
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  data() {
    return {
      i: 0
    }
  },
  methods: {
    handleEdit(row) {
      this.$emit('edit', row)
    },
    handleDelete(row) {
      this.$emit('del', row)
    },
    changePage(page) {
      this.$emit('changePage', page)
    }
  },
  mounted() {
    console.log(this.tableData, 111)
  }
}
</script>
<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  background-color: #fff;
}
.pager {
  position: absolute;
  bottom: 12%;
  right: 20px;
}
</style>
