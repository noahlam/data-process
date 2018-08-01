<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">用户列表</h3>
    </div>
    <div class="input-value">
      <span>用户ID:</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:200px;">
      </el-input>
      <span>手机号:</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:200px;">
      </el-input>
      <span>姓名:</span>
      <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable
        style="width:200px;">
      </el-input>
      <el-button class="addButton" type="primary" icon="el-icon-plus" style="margin-left:20px;">搜索</el-button>
      <el-button class="addButton" icon="el-icon-plus">清空</el-button>
    </div>
    <el-button class="addButton" style="width:150px;" icon="el-icon-delete" type="danger" plain>批量删除</el-button>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="用户ID"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="手机号"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓别"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope" style="width:100px;">
            <router-link to="/userList/userSetting">
              <el-button type="primary" size="small" plain>查看</el-button>
            </router-link>
            <el-button type="danger"  size="small" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      input10: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
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
  .input-value span{
    font-size:16px;
    color:#666666;
    margin-left:20px;
  }
</style>
