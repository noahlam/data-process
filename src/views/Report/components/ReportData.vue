<template>
  <div class="wrap">

    <div class="upload">
      <input type="file" class="fileSelect" value="111" @change="importData" ref="file">
      <!--<div class="uploadButton">-->
        <!--<i class="el-icon-upload2 icon"></i>Excel导入-->
      <!--</div>-->

    </div>

    <div class="mtb20" v-if="showTable">表格数据</div>

    <HotTable :settings="settings" v-if="showTable"></HotTable>

    <div class="mtb20">
      <el-button type="primary" @click="gotoNext">下一步</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>

  </div>
</template>
<script>
import HotTable from '@handsontable/vue'
import XLSX from 'xlsx'
import 'handsontable/languages/zh-CN'
export default {
  components: {HotTable},
  data () {
    return {
      showTable: false,
      settings: {
        data: [],
        language: 'zh-CN',
        autoWrapRow: true,
        mergeCells: true,
        minRows: 1,
        manualColumnResize: true,
        manualRowResize: true,
        manualColumnMove: true,
        manualRowMove: true,
        rowHeaders: true,
        contextMenu: true,
        colHeaders: true
      }
    }
  },
  methods: {
    // 下一步
    gotoNext () {},
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {})
    },
    importData () {
      alert('111')
      let that = this
      let f = this.$refs['file'].files[0]
      var reader = new FileReader()
      reader.onload = function (e) {
        var data = e.target.result
        let res = XLSX.read(data, {type: 'binary'})
        let sheetName = res.Sheets[res.SheetNames[0]]
        let table = XLSX.utils.sheet_to_json(sheetName, {header: 1, raw: true})
        that.settings.data = table
        console.log(table)
        that.$nextTick(_ => {
          that.showTable = true
        })
      }
      reader.readAsBinaryString(f)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {width: 400px;}
  .mtb20 {margin: 20px 0;}
  .upload{
    position: relative;
    width: 118px;
    height: 40px;
    overflow: hidden;
  }
  .fileSelect {
    width: 118px;
    height: 40px;
    opacity: 1;
  }
  .fileSelect::after{
    content:'';
  }
  .uploadButton{
    width: 118px;
    height: 40px;
    background: #f00;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
