<template>
  <div class="v-wrap homeWrap">
    <h2>数据统计</h2>
    <div class="boxWrap">
      <div class="topBox">
        <div class="imgBox">
          <img src="./assets/icon_device.png" alt="">
        </div>
      </div>
      <span class="text"><span class="v-red">{{ num }}</span>个</span>
      <span class="text">报表类型</span>
      sb
    </div>

  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      num: 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      let res = await this.$post('admin/mobileUser/getIndex.do', {})
      if (parseInt(res.code) === 1) {
        this.num = res.toDaySendTemplateSmsNum
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
  .boxWrap{
    width: 300px;
    /*height: 150px;*/
    padding: 16px 30px ;
    border: 1px solid $border-base;
    border-radius: 4px;
    display: flex;
    align-items: center;
    .topBox{
      display: flex;
      align-items: center;
      /*padding-bottom: 10px;*/
      .imgBox{
        width: 80px;
        height: 80px;
        margin: 0 30px 0 10px;
        background: $color-primary;
        border-radius: 50%;
      }
      img{
        width: 80px;
        height: 80px;
      }
      .content{
        margin: 0;
        font-size: $font-main-title;
        font-weight: normal;
        color: $text-primary;
      }
    }
    .text{
      font-size: $font-min-title;
      color: $text-second;
      margin-left:5px;
    }
    .vred{
      color:red;
    }
  }

</style>
