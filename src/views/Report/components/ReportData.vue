<template>
  <div class="wrap">

    <div class="upload">
      <input type="file" class="fileSelect" value="111" @change="importData" ref="file">

      <el-button type="primary">
        <i class="el-icon-upload2 icon"></i>Excel导入
      </el-button>

    </div>

    <div class="mtb20" v-if="showTable">表格数据</div>

    <HotTable :settings="settings" v-if="showTable"></HotTable>

    <div :class="{mtb20:!showTable}">
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
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    settings: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    showTable () {
      return this.settings.data.length
    }
  },
  methods: {
    // 下一步
    gotoNext () {
      this.$emit('next', '3')
    },
    // 取消
    onCancel () {
      this.$confirm('确定要放弃保存吗?', '提示').then(() => {
        history.back()
      }).catch(() => {
      })
    },
    importData () {
      let f = this.$refs['file'].files[0]
      var reader = new FileReader()
      reader.onload = e => {
        this.settings.data = []
        var data = e.target.result
        let res = XLSX.read(data, {type: 'binary'})
        let sheetName = res.Sheets[res.SheetNames[0]]
        let table = XLSX.utils.sheet_to_json(sheetName, {header: 'A', raw: true, defval: ' '})
        this.settings.data = table
        this.getAxisData()
      }
      reader.readAsBinaryString(f)
    },
    // 获取 2 轴的数据
    getAxisData () {
      this.data.axisXKeys = []
      this.data.axisYKeys = []
      Object.keys(this.settings.data[0]).forEach(key => this.data.axisXKeys.push(key))
      for (let i = 1; i <= this.settings.data.length; i++) {
        this.data.axisYKeys.push(i)
      }
      // console.log(xs, ys)
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .w400 {
    width: 400px;
  }

  .mtb20 {
    margin: 20px 0;
  }

  .upload {
    position: relative;
    width: 118px;
    height: 40px;
    overflow: hidden;
    /*border: 1px solid #000;*/
  }

  .fileSelect {
    position: absolute;
    top: 0;
    left: 0;
    width: 118px;
    height: 40px;
    opacity: 0;
    z-index: 1;
  }
</style>
