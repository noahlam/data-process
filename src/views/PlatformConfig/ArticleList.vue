<template>
  <div class="v-wrap articleListWrap">
    <div class="v-title-box">
      <h3 class="v-title">文章列表</h3>
    </div>
    <el-row class="mainBtn">
      <router-link to="/platformConfig/articleContent">
        <el-button class="v-button" icon="el-icon-plus" type="primary">添加</el-button>
      </router-link>
      <el-button class="v-button" icon="el-icon-close" type="danger" @click="toAllDelete">批量删除</el-button>
    </el-row>
    <el-table :data="listData" v-loading="mainLoading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"> </el-table-column>
      <el-table-column align="center" prop="articleTitle" label="标题"> </el-table-column>
      <el-table-column align="left"  prop="articleContent" label="内容" width="600px">
        <template slot-scope="scope">
          <!--<div class="textHidden" v-html="scope.row.articleContent"></div>-->
          <div class="textHidden">{{removeHTMLTag(scope.row.articleContent)}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          {{scope.row.createTime ? $moment(scope.row.createTime).format('YYYY.MM.DD HH:mm') : ''}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="150px">
        <template slot-scope="scope">
          <router-link :to="`/platformConfig/articleContent?articleId=${scope.row.articleId}`">
            <el-button size="small" type="primary" plain>编辑</el-button>
          </router-link>
          <el-button size="small" type="danger" plain @click="toSingleDelete(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default{
  data () {
    return {
      listData: [],
      multiSelectList: [], // 多选
      mainLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      let reqData = {
        currentPage: 1,
        showCount: 10000
      }
      this.mainLoading = true
      let res = await this.$post('admin/article/list.do', reqData)
      this.mainLoading = false
      if (parseInt(res.code) === 1) {
        this.listData = res.data.articleArray || []
      } else {
        this.$message.error(res.message)
      }
    },
    handleSelectionChange (val) {
      this.multiSelectList = val
    },
    // 转换html 为文本
    removeHTMLTag (html) {
      let htmlTagReg = /<(\/)?[^>].*?>/g
      // console.log('数据', html.replace(htmlTagReg, ''))
      return html.replace(htmlTagReg, '').trim()
    },
    // 单个删除
    toSingleDelete (articleId) {
      let articleIdArray = []
      articleIdArray.push({
        articleId
      })
      this.toDeleteData(articleIdArray, 1)
    },
    // 多个删除
    toAllDelete () {
      if (!this.multiSelectList.length) {
        this.$message.error('请选择数据')
        return false
      }
      let articleIdArray = []
      this.multiSelectList.map(item => {
        articleIdArray.push({
          articleId: item.articleId
        })
      })
      this.toDeleteData(articleIdArray)
    },
    // 删除数据
    toDeleteData (articleIdArray, isSingle) {
      let text = isSingle ? '是否删除此篇文章？' : `是否删除选中的${articleIdArray.length}篇文章？`
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'
            let res = await this.$post('admin/article/delete.do', {articleIdArray: JSON.stringify(articleIdArray)})
            instance.confirmButtonLoading = false
            instance.confirmButtonText = '确定'
            if (parseInt(res.code) === 1) {
              this.$message.success('删除成功')
              this.getList()
            } else {
              this.$message.error(res.message)
            }
            done()
          } else {
            done()
          }
        }
      }).then(() => {
        return true
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .articleListWrap{
    .mainBtn{
      padding: 20px 0 10px;
    }
    .textHidden{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      word-break: break-all;
      /*display: flex;*/
      width: 560px;
      /*img{*/
        /*max-width: 100px;*/
      /*}*/
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  /*.articleListWrap{
    .textHidden{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      word-break: break-all;
      display: flex;
      width: 400px;
      img{
        !*display: none;*!
        max-width: 100px !important;
        max-height: 60px !important;
      }
      p{
        margin: 0 !important;
      }
    }
  }*/

</style>
