<template>
  <div class="goods-detail">
    <base-panel :isShowPageDetails="false">
      <div slot="content" class="detail-wrapper">
        <header>
          <i></i>
          <div>新建商品</div>
        </header>
        <form>
          <section>
            <p class="left key-point">商品标题</p>
            <input class="middle title-input animate-hover" type="text" maxlength="40" placeholder="请输入">
            <p class="right">最长限40字</p>
          </section>
        </form>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  export default {
    name: 'GoodsDetail',
    components: {
      BasePanel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/base'

  input::-webkit-input-placeholder { /* WebKit browsers */
    color: $color-ccc
    font-size: 14px
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $color-ccc
    font-size: 14px
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $color-ccc
    font-size: 14px
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: $color-ccc
    font-size: 14px
  }

  .key-point
    &
      position :relative
    &:before
      content : '*'
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: $color-main
      position :absolute
      top:1px
      left :-7px

  .goods-detail
    fill-box(absolute)
    z-index :90
    background :$color-background

    .detail-wrapper
      padding:30px 0 40px
      header
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        layout(row)
        align-items :center
        i
          width :6px
          height :20px
          background :$color-main
          margin-right :30px
      form
        padding :0 38px
        section
          margin-top :30px
          layout(row)
          align-items :center
          font-family: PingFangSC-Regular;
          font-size :14px
          .left
            color: #2A2A2A;
            width :96px
          .middle
            background: #FFFFFF;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            &.title-input
              width :450px
              height :44px
              padding :0 10px
              color: $color-text-main
          .right
            color: #ACACAC;
            margin-left :10px

</style>
