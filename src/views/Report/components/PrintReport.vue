<template>
  <div ref="printContent" class="wrap">
    <div class="line">
      报表名称: {{data.reportFormName}}
    </div>

    <div class="line">
      <!--报表类型: {{getReportTypeString()}}-->
      单位: {{data.reportFormUnit}}
    </div>

    <div v-html="tableString"></div>

    <div class="line" v-if="data.reportFormRemark">
      备注/说明: {{data.reportFormRemark}}
    </div>

    <ChartToImage v-for="(item,index) in data.reportFormItemArray"
           :key="index"
           :data="item"
            @renderOk="renderOk"
           :report="data">
    </ChartToImage>
  </div>
</template>

<script>
import ChartToImage from './ChartToImage'
export default {
  components: {ChartToImage},
  name: 'PrintReport',
  props: {
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      tableString: '',
      renderOkChartNum: 0
    }
  },
  created () {
    this.renderTable()
  },
  mounted () {
    // setTimeout(this.toPrint, 3000)
  },
  methods: {
    renderOk () {
      this.renderOkChartNum++
      if (this.renderOkChartNum === this.data.reportFormItemArray.length) {
        this.toPrint()
      }
    },
    // 渲染表格
    renderTable () {
      let str = `<style>
        .dataTable td {
          border: 1px solid #ccc;
          height: 25px;
          line-height: 25px;
          padding: 0 5px;
          min-width: 50px !important;
          max-width: 200px;
        }
      </style>`
      str += '<table class="dataTable" border="1" cellpadding="0" cellspacing="0">'
      this.data.reportDataContent.map(item => {
        str += '<tr>'
        Object.keys(item).forEach(key => {
          str += `<td>${item[key]}</td>`
        })
        str += '</tr>'
      })
      str += '</table>'
      this.tableString = str
    },
    // 构造打印页面
    toPrint () {
      let printContent = this.$refs.printContent.innerHTML
      let iframe = document.createElement('iframe')
      let f = document.body.appendChild(iframe)
      iframe.id = 'myIframe'
      iframe.style = 'position:absolute;width:0;height:0;top:-10px;left:-10px;'

      let w = f.contentWindow || f.contentDocument
      let doc = f.contentDocument || f.contentWindow.document
      doc.open()
      doc.write(printContent)
      doc.close()
      this.toPrintFrame(w)

      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 100)
    },
    toPrintFrame (frameWindow) {
      try {
        setTimeout(() => {
          frameWindow.focus()
          try {
            if (!frameWindow.document.execCommand('print', false, null)) {
              frameWindow.print()
            }
          } catch (e) {
            frameWindow.print()
          }
          frameWindow.close()
        }, 10)
      } catch (err) {
        console.log('err', err)
      } finally {
        this.$emit('cb')
      }
    }
  }
}
</script>

<style scoped>
  .wrap{
    /*width: 590px;*/
  }
</style>
