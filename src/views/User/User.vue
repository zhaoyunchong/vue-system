<template>
  <div class="manage">
    <el-dialog :title="operateType == 'add' ? '新增用户' : '更新用户'" :visible.sync="isShow">
      <common-form :formLabel="operateFormLabel" :form="operateForm"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary">新增+</el-button>
      <common-form inLine :formLabel="formLabel" :form="searchForm">
        <el-button type="primary">搜索</el-button>
      </common-form>
    </div>
    <common-table @del="delUser" @edit="editUser" @changePage="getList" :tableData="tableData" :tableLabel="tableLabel" :config="config"></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/ComponentForm.vue'
import CommonTable from '@/components/ComponentTable.vue'

export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShow: false,
      operateType: '',
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期'
        },
        {
          prop: 'addr',
          label: '地址',
          width: 300
        }
      ],
      config: {
        page: 1,
        total: 20,
        loading: true
      },
      searchForm: {
        keyword: ''
      },
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名:'
        },
        {
          model: 'age',
          label: '年龄:'
        },
        {
          model: 'sex',
          label: '性别:',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期:',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址:',
          width: 300
        }
      ],
      formLabel: [
        {
          model: 'keyword',
          label: '',
          options: []
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    confirm() {
      if (this.operateType == 'edit') {
        this.$http.post('/api/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
      console.log(this.operateForm)
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let id = row.id
          this.$http
            .get('/api/user/del', {
              params: {
                id
              }
            })
            .then(res => {
              console.log(res)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getList() {
      this.config.loadding = true
      this.$http
        .get('/api/user/getUser', {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexLabel = item.sex == 0 ? '女' : '男'
            return item
          })
          this.config.total = res.data.count
          this.config.loading = false
          // console.log(this.tableData)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
</style>
