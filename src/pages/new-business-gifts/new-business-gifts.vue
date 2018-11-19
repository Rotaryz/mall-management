<template>
  <base-panel :isShowPageDetails="false">
    <div slot="content" class="create-new">
      <h3 class="title">新建大礼包</h3>
      <div class="msg-content">
        <div class="item">
          <span class="label">标题</span>
          <input class="title-text" v-model="msg.titleText" type="text">
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label">库存</span>
          <input class="title-text" v-model="msg.titleText" type="text">
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label">价格</span>
          <input class="title-text" v-model="msg.titleText" type="text">
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label">播豆</span>
          <input class="title-text" v-model="msg.titleText" type="text">
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label">佣金</span>
          <input class="title-text" v-model="msg.titleText" type="text">
          <em class="tip">最长限40字</em>
        </div>

      </div>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'

  export default {
    name: 'new-business-gifts',
    data() {
      return {
        msg: {
          titleText: ''
        }
      }
    },
    methods: {
      navToPage(page) {
        console.log(page)
      }
    },
    watch: {
    },
    components: {
      BasePanel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .create-new
    display: flex
    flex: 1
    flex-direction: column
    font-family: $fontFamilyRegular
    padding: 30px 0 50px
    .title
      font-size: $font-size-16
      font-family: $font-family-medium
      padding-left: 20px
      position: relative
      &:before
        content: ''
        background: $color-main
        width: 6px
        height: 20px
        position: absolute
        left: 0
        col-center()
    .msg-content
      padding-top: 10px
      font-size: 14px
      color: $color-text-assist
      .item
        padding: 15px 30px
        display: flex
        align-items: center
        .label
          width: 100px
          position: relative
          color: $color-text-2A
          &:before
            content: '*'
            color: $color-main
        .title-text
          width: 450px
          height: 44px
          border-radius: 4px
          color: $color-text-2A
          border: 1px solid $color-text-D9
          line-height: 44px
          padding-left: 4px
        .tip
          margin-left: 20px
          font-style: normal



</style>
