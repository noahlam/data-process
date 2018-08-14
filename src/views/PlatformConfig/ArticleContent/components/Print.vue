<template>
    <el-button class="v-button" @click="toPrint">打印</el-button>
    <!--<div v-show="show" id="printable" v-html="this.content"></div>-->
    <!--<iframe id="printable" frameborder="0" allowtransparency="true">
      {{this.content}}
    </iframe>-->
</template>

<script>
export default {
  name: 'print',
  props: {
    content: '',
    formData: {}
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    toPrint () {
      this.writeIframe()
      // let newstr = this.content // 得到需要打印的元素HTML
      // let oldstr = document.body.innerHTML // 保存当前页面的HTML
      // document.body.innerHTML = newstr
      // window.print()
      // localStorage.setItem('articleContent', JSON.stringify(this.formData))
      // document.body.innerHTML = oldstr
      // window.location.reload()
    },
    writeIframe () {
      let iframe = document.createElement('iframe')
      let f = document.body.appendChild(iframe)
      iframe.id = 'myIframe'
      iframe.style.position = 'absolute'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.top = '-10px'
      iframe.style.left = '-10px'
      // iframe.style = 'position:absolute;width:0;height:0;top:-10px;left:-10px;'

      let w = f.contentWindow || f.contentDocument
      let doc = f.contentDocument || f.contentWindow.document
      doc.open()
      doc.write(this.content)
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
      }
    }
  }
}
</script>
