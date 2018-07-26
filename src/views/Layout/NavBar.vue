<template>
  <div class="navBarWrap">
    <router-link to="/index" class="logoBox">
      <img class="logo" src="../../assets/logo.png" alt="Logo" />
    </router-link>
    <el-dropdown  class="userBox" trigger="click" @command="handleCommand">
      <div class="userInfo el-dropdown-link">
        <img src="../../assets/photo.png" alt="">
        <span>{{userInfo.username}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="menuDropWrap">
        <el-dropdown-item command="toLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      currentPath: this.$route.path,
      changeDialogVisible: false,
      saveLoading: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    // 处理 dropdown 菜单
    handleCommand (command) {
      switch (command) {
        case 'toLogout':
          this.toLogout()
          break
        default:
          console.log('none')
      }
    },
    // 退出登录
    async toLogout () {
      this.$store.dispatch('ClearLogout')
      location.reload()
    }
  }
}
</script>

<style  lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .navBarWrap{
    position: relative;
    background: $color-primary;
    color: #fff;
    .logoBox{
      display: inline-block;
      width: 250px;
      height: 100px;
      vertical-align: top;
      text-align: center;
      .logo{
        margin-top: 5px;
        width: 200px;
      }
    }
    /*.navBox{
      display: inline-block;
      border: none;
      li{
        position: relative;
        display: inline-block;
        padding: 0 20px ;
        line-height: 56px;
        height: 57px;
        cursor: pointer;
        text-align: center;
        border-bottom: 3px solid transparent;
        font-size: $font-min-title;
        &.is-active{
          background-color: #4E89EB !important;
          &:after{
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -4px;
            border: 6px solid transparent;
            border-bottom: 6px solid #fff;
          }
        }
        &:hover{
          background-color: #3872D2 !important;
        }
      }
    }*/
    .navBox{
      display: inline-block;
      border: none;
      li{
        position: relative;
        display: inline-block;
        margin: 6px 20px 0;
        padding: 0;
        line-height: 40px;
        height: 40px;
        cursor: pointer;
        text-align: center;
        border-bottom: 1px solid transparent;
        font-size: $font-min-title;
        /*&.is-active{
          background-color: #4E89EB !important;
          &:after{
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -4px;
            border: 6px solid transparent;
            border-bottom: 6px solid #fff;
          }
        }*/
        &:hover {
          background-color: $color-primary !important;
          color: #fff !important;
        }
      }
    }
    .userBox{
      position: absolute;
      top: 0;
      right: 30px;
      line-height: 60px;
      .userInfo{
        cursor: pointer;
        color: #fff;
        img{
          display: inline-block;
          width: 50px;
          height: 50px;
          margin: 5px 10px 0;
          border-radius: 50%;
          vertical-align: top;
        }
        span{
          line-height: 60px;
          font-size: $font-size-base;
        }
      }
      .menuDropWrap{
        li {
          padding: 0 40px !important;
        }
      }
    }
    .changePwsDialog{
      .content{

      }
    }
  }

</style>
