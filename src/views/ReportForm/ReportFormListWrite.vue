<template>
  <div class="v-wrap listWrap">
    <div class="v-title-box">
      <h3 class="v-title">报表详情</h3>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">基础信息</span>
        <div class="top-bottom-20px">
          <i>*</i><code>报表类型:</code>
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="top-bottom-20px">
          <i>*</i><code>报表名称:</code>
          <el-input v-model="value1" style="width:350px;"></el-input>
        </div>
        <div class="top-bottom-20px">
          <code style="margin-right:50px;">副标题:</code>
          <el-input v-model="value1" style="width:350px;"></el-input>
        </div>
        <div class="top-bottom-20px">
          <code style="margin-right:65px;">单位:</code>
          <el-input v-model="value1" style="width:300px;"></el-input>
        </div>
        <div class="top-bottom-20px">
          <code style="margin-right:30px;">备注/说明:</code>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            style="width:400px;">
          </el-input>
        </div>
        <div class="button-top-bottom">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">报表数据</span>
        <div class="top-bottom-20px">
          <code>Excel导入:</code>
          <el-select v-model="value4" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="top-bottom-20px">
          <code>表格数据</code><br>
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
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger"  size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="button-top-bottom">
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">移动端生成图表</span>
        <div class="top-bottom-20px">
          <el-button class="addButton" type="primary" style="width:150px;" icon="el-icon-plus">添加图表</el-button>
        </div>
        <div class="top-bottom-20px">
          <code>图表名称:</code>
          <el-input v-model="value1" style="width:350px;"></el-input>
        </div>
        <div class="top-bottom-20px">
          <code>图表选择:</code>
          <el-select v-model="value4" clearable placeholder="请选择" style="width:350px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin:20px 0">
          <code>数据源</code><br>
          <code>横轴</code>
          <code>x</code>
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="value1"
            style="width:200px;margin-top:10px;">
          </el-input>
          <code>-</code>
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="value1"
            style="width:200px;">
          </el-input>
          <br>
          <code>纵轴</code>
          <code>y</code>
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="value1"
            style="width:200px;margin-top:10px;">
          </el-input>
          <code>-</code>
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="value1"
            style="width:200px;">
          </el-input>
        <div class="button-top-bottom">
          <el-button>预览</el-button>
          <el-button>取消</el-button>
        </div>
        <div style="margin-top:100px;">
          <el-button type="primary">保存</el-button>
        </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value4: '',
      value1: '',
      textarea: '',
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
  i{
    color:red;
    margin-right:5px;
  }
  code{
    font-size:15px;
    color:#666666;
    margin-right:25px;
  }
  .top-bottom-20px{
    margin-top:10px;
    margin-bottom:10px;
  }
  .button-top-bottom{
    margin-top:40px;
    margin-bottom:20px;
  }
</style>
<style>
  .el-textarea .el-textarea__inner{
    height:100px;
  }
</style>
