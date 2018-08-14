<template>
  <div ref="printContent">
    <div class="line">
      报表名称: {{data.reportFormName}}
    </div>

    <div class="line">
      报表类型: {{getReportTypeString()}}
    </div>

    <div v-html="tableString"></div>

    <div class="line" v-if="data.reportFormRemark">
      备注/说明: {{data.reportFormRemark}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrintReport',
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    types: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tableString: ''
    }
  },
  created () {
    this.renderTable()
  },
  mounted () {
    this.toPrint()
  },
  methods: {
    // 回显 报表类型
    getReportTypeString () {
      let cur = this.types.find(i => i.reportFormTypeId === this.data.reportFormTypeId)
      return cur ? cur.reportFormTypeName : ''
    },
    // 渲染表格
    renderTable () {
      let str = `<style>
        .line {
            padding: 10px 0;
         }
        .dataTable {
          box-sizing: border-box;
          overflow-x: scroll;
        }

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
