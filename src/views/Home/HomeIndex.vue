<template>
  <div class="v-wrap homeWrap">
    <h2>数据统计</h2>
    <el-row class="contentWrap" type="flex"  justify="space-between">
      <el-col :span="7">
        <router-link to="/" class="item reportType">
          <div class="imgBox"></div>
          <div class="content">
            <p>报表类型</p>
            <strong>{{dataObj.reportFormTypeNum || 0}}</strong>
          </div>
        </router-link>
      </el-col>
      <el-col :span="7">
        <router-link to="/" class="item reportNum">
          <div class="imgBox"></div>
          <div class="content">
            <p>报表数</p>
            <strong>{{dataObj.reportFormNum || 0}}</strong>
          </div>
        </router-link>
      </el-col>
      <el-col :span="7">
        <router-link to="/" class="item reportUser">
          <div class="imgBox"></div>
          <div class="content">
            <p>已授权用户数</p>
            <strong>{{dataObj.authMemberNum || 0}}</strong>
          </div>
        </router-link>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      dataObj: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      let res = await this.$post('admin/index.do', {})
      if (parseInt(res.code) === 1) {
        this.dataObj = res.data
      } else {
        this.$message.error(res.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .homeWrap{
    /*width: 1200px;*/
    margin: 20px auto;
    padding: 0 40px;
    h2 {
      margin: 0;
      padding: 10px 0 ;
      font-size: $font-main-title;
      color: $text-primary;
      font-weight: normal;
      line-height: 60px;
    }
  }
  .contentWrap{
    margin-top: 10px;
    max-width: 1100px;
    .item{
      display: flex;
      align-items: center;
      height: 140px;
      border-radius: 8px;
      border: 1px solid $border-base;
      background: #fff;
      transition: 0.4s;
      &:hover {
        background: $table-background-hover;
      }
      .imgBox{
        margin: 0 30px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        border: 4px solid $border-base;
        background-size: 44px;
        background-position: center;
        background-repeat: no-repeat;
      }
      .content{
        flex: 1;
        p{
          margin: 0 0 10px 0;
          font-size: $font-size-base;
          color: $text-third;
        }
        strong{
          font-size: 28px;
          color: $text-second;
        }
      }
      &.reportType{
        .imgBox{
          background-color: #FF8D63;
          background-image: url("./assets/type.png");
        }
        strong{
          color: #FF8D63;
        }
      }
      &.reportNum{
        .imgBox{
          background-color: #80C2EF;
          background-image: url("./assets/reportNum.png");
        }
        strong{
          color: #80C2EF;
        }
      }
      &.reportUser{
        .imgBox{
          background-color: #B29ED7;
          background-image: url("./assets/user.png");
        }
        strong{
          color: #B29ED7;
        }
      }
    }
  }

</style>
