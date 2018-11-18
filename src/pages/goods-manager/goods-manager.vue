<template>
  <base-panel>
    <div slot="content" class="goods-manager">
      <header>
        <p>商品名</p>
        <section>
          <search></search>
        </section>
        <router-link :to="navUrl" class="btn">
          <div>
            <img src="./icon-add@2x.png" alt="">
            <p>新建商品</p>
          </div>
        </router-link>
      </header>
      <dl>
        <dt></dt>
        <dd></dd>
      </dl>
      <router-view></router-view>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'

  export default {
    components: {
      BasePanel,
      Search,
    },
    data() {
      return {
        pageType: '',
        navUrl: '',
      }
    },
    created() {
      this.pageType = this.$route.path
      this.navUrl = this.pageType + '/goods-detail'
    },
    watch: {
      $route(to, from) {
        this.pageType = to.path
        this.navUrl = this.pageType + '/goods-detail'
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .goods-manager
    padding: 0 30px
    height: 500px
    & > header
      height: 100px
      layout(row)
      align-items: center
      font-family: $font-family-regular
      & > p
        font-size: 14px
        color: $color-text-main
      .btn
        margin-left: 40px
        width: 90px
        height: 28px
        overflow: hidden
        border-radius: 4px
        & > div
          color: $color-white
          background: $color-main
          width: 100%
          height: 100%
          cursor: pointer
          text-align: center
          & > img
            display: inline-block
            width: 10px
            height: @width
            transform: scale(1)
            transition: transform 0.3s ease-out
            line-height: 28px
          & > p
            display: inline-block
            line-height: 28px
            font-size: 12px
            transition: font-size 0.3s ease-out
          &:hover > p
            font-size: 13px
          &:hover > img
            transform: scale(1.2)
    & > dl
      & > dt
        height: 50px
        background: #FAFAFA;
        border-bottom: 1px solid #efefef
      & > dd
        height: 60px
        background: #FFFFFF;
        box-shadow: 0 1px 0 0 #EFEFEF;
</style>
