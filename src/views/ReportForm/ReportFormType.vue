<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表类型</h3>
    </div>
    <el-button class="addButton" type="primary" style="width:150px;" icon="el-icon-plus" @click="open()">添加报表类型</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="编号"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="报表类型"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="open()">编辑</el-button>
            <el-button type="danger"  size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  name: 'reportFormType',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎'
      }, {
        date: '2016-05-04',
        name: '王小虎'
      }, {
        date: '2016-05-01',
        name: '王小虎'
      }, {
        date: '2016-05-03',
        name: '王小虎'
      }]
    }
  },
  methods: {
    open () {
      this.$prompt('请填写报表类型', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '内容不能为空'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你输入的值是: ' + value
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .listWrap{
    .mainBtn{
      padding: 20px 0 20px;
      border-top: 1px solid $border-base;
    }
    .showLongContent{
      width: 100%;
      margin: 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
    .dialogContent{
      margin: 0 10px;
    }
  }
  .formWrap{
    padding: 40px 0 10px;
  }
  .refuseDialog{
    p{
      margin: 6px 0 0;
      text-align: right;
      color: $color-danger;
    }
    h4{
      font-weight: normal;
      font-size: 16px;
      margin: 0 0 6px;
    }

  }
  .addButton{
    margin-top:10px;
    margin-bottom:10px;
  }

</style>
