<template>
  <div class="sideMenuWrap" v-if="menuList && menuList.length">
    <el-menu
      :default-active="$route.path"
      background-color="#3d4762"
      text-color="#ccc"
      active-text-color="#5399f7"
      :default-openeds="currentOpen"
      class="menuBox">
      <template v-for="(firstItem, index) in menuList" >
        <router-link v-if="firstItem.noDropDown" :key="index" :to="firstItem.redirect">
          <el-menu-item :index="firstItem.redirect" class="el-submenu-title" :class="{'is-active' : isActiveFirst(firstItem)}">
            <div class="titleBox">
              <!--<i class="icon" :class="firstItem.meta.icon ? firstItem.meta.icon : 'el-icon-star-off'"></i>-->
              <span class="titleTop">{{firstItem.name}}</span>
            </div>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :key="index" :index="String(index)">
          <template slot="title">
            <div class="titleBox">
              <!--<i class="icon" :class="firstItem.meta.icon ? firstItem.meta.icon : 'el-icon-star-off'"></i>-->
              <span class="titleTop">{{firstItem.name}}</span>
            </div>
          </template>
          <template v-for="(secondItem, secondIndex) in firstItem.children" v-if="!secondItem.hidden">
            <router-link  :key="secondIndex" :to="secondItem.meta.menuId">
              <el-menu-item :index="secondItem.meta.menuId" :key="secondIndex" :class="{'is-active': isActiveSecond(secondItem)}">
                {{secondItem.name}}
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { asyncRouterMap } from '@/router/index'
export default {
  name: 'side-bar',
  data () {
    return {}
  },
  computed: {
    menuList () {
      return asyncRouterMap
      // return []
    },
    currentOpen () {
      const list = this.menuList
      let arr = []
      list.map((item, i) => {
        arr.push(String(i))
      })
      return arr
    }
  },
  methods: {
    // 一级目录的选中
    isActiveFirst (data) {
      if (this.$route.path === data.redirect) {
        return true
      }
      let isActive = false
      data.children.map(item => {
        if (item.meta.menuId === this.$route.path) {
          isActive = true
        }
      })
      return isActive
    },
    // 二级目录的选中
    isActiveSecond (secondItem) {
      if (this.$route.path === secondItem.meta.menuId) {
        return true
      }
      let isActive = false
      if (secondItem.meta.childrenList && secondItem.meta.childrenList.length) {
        secondItem.meta.childrenList.map(item => {
          if (item === this.$route.path) {
            isActive = true
          }
        })
      }
      return isActive
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .sideMenuWrap{
    flex: 0 0 180px;
    background: $module-color;
    overflow: hidden;
  }
  .menuBox{
    height: calc( 100vh - 80px );
    overflow-y: auto;
    border: none;
    .titleBox{
      margin: 0 10px 0 30px;
      height: 50px;
      /*border-top: 1px solid $border-base;*/
      line-height: 50px;
    }
    .icon{
      line-height: 50px;
      font-size: $font-min-title;
      color: $color-primary;
    }
    .el-menu-item{
      min-width: auto;
      height: 50px;
      background: #323a56 !important;
      &.is-active{
        color: #5399f7 !important;
        /*border-right: 3px solid $color-primary;*/
        /*background: #323a56 !important;*/
      }
      &:hover{
        background: #31394e !important;
      }
    }
    .el-submenu-title{
      background: #3d4762 !important;
    }
    .el-submenu{
      .el-menu-item{
        padding-left: 50px !important;
      }
      .el-icon-arrow-down{
        font-size: 16px;
      }
      /*&.is-opened {
        .titleBox{
          border-bottom: 1px solid $border-base;
        }
      }*/
    }
  }

</style>
<style lang="scss" rel="stylesheet/scss">
  .sideMenuWrap{
    .el-submenu__icon-arrow{
      font-size: 16px;
      right: 30px;
    }
    .el-submenu__title{
      height: 50px;
      line-height: 50px;
    }
  }
</style>
