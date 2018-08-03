<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">用户列表</h3>
    </div>
    <el-form :model="formData" label-width="70px" class="v-form" @submit.native.prevent>
      <el-row>
        <el-col :span="6">
          <el-form-item label="用户ID" >
            <el-input v-model="formData.pageId" :maxlength="10" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号" >
            <el-input v-model="formData.name" :maxlength="50" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" >
            <el-input v-model="formData.name" :maxlength="50" @keyup.enter.native="toSearch"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="toSearch">查询</el-button>
            <el-button icon="el-icon-delete" @click="toClear">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="mainBtn">
      <el-button class="v-button" icon="el-icon-close" type="danger">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="page_id" label="用户ID" width="120px"> </el-table-column>
      <el-table-column align="center" prop="name" label="手机号"> </el-table-column>
      <el-table-column align="center" prop="name" label="姓名"> </el-table-column>
      <el-table-column align="center" prop="name" label="昵称"> </el-table-column>
      <el-table-column align="center" prop="name" label="性别"> </el-table-column>
      <el-table-column align="center" prop="name" label="部门"> </el-table-column>

      <el-table-column align="center" prop="date" label="状态" width="120px">
        <template slot-scope="scope">
          <span>待审核</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="150px">
        <template slot-scope="scope">
          <router-link :to="`/user/userSetting`"><el-button size="small" type="primary" plain>查看</el-button></router-link>
          <el-button size="small" type="danger" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data () {
    return {
      formData: {},
      listData: [{}],
      multiSelectList: [], // 多选
      mainLoading: false
    }
  },
  methods: {
    toSearch () {},
    toClear () {},
    handleSelectionChange (val) {
      this.multiSelectList = val
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .listWrap{
    .mainBtn{
      padding: 20px 0 10px;
    }
  }
</style>
