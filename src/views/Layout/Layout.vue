<template>
  <div class="appWrapper">
    <nav-bar class="navBar" />
    <div class="mainContainer">
      <side-bar class="sidebarContainer" />
      <div class="mainContent">
        <transition name="fade" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/views/Layout/NavBar'
import SideBar from '@/views/Layout/SideBar'
export default {
  name: 'layout',
  components: {
    NavBar,
    SideBar
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~@/styles/common.scss';
  .appWrapper{
    width: 100%;
    height: 100vh;
    background: $background-color;
    .navBar{
      height: 60px;
      width: 100%;
    }
    .mainContainer{
      height: calc( 100vh - 60px );
      width: 100%;
      display: flex;
      .mainContent{
        flex: 1;
        height: 100%;
        padding: 0 20px;
        overflow: auto;
      }
    }

  }
</style>
