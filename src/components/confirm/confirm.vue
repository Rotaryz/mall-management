<template>
  <base-modal :isShow="show">
    <div slot="content" class="confirm-content" :class="showActive ? 'model-active' : 'model-un-active'">
      <!--<div class="title">{{title}}</div>-->
      <div class="text">{{text}}</div>
      <div class="btn-group">
        <span @click="cancel" class="btn cancel">取消</span>
        <span @click="confirm" class="btn confirm">确定</span>
      </div>
    </div>
  </base-modal>
</template>

<script type="text/ecmascript-6">
  import BaseModal from 'components/base-modal/base-modal'

  export default {
    components: {
      BaseModal
    },
    data() {
      return {
        title: '',
        text: '',
        show: false,
        timeout: true,
        showActive: false
      }
    },
    destroyed() {
      this.timeout && clearTimeout(this.timeout)
    },
    methods: {
      showConfirm(text, title) {
        this.text = text
        this.title = title
        this.show = true
        this.showActive = true
      },
      confirm() {
        if (this.timeout) {
          setTimeout(() => {
            this.show = false
          }, 100)
          this.showActive = false
          this.timeout = false // 防止重复点击
          this.$emit('confirm')
          setTimeout(() => {
            this.timeout = true
          }, 500)
        }
      },
      cancel() {
        setTimeout(() => {
          this.show = false
        }, 100)
        this.showActive = false
        this.$emit('cancel')
      }
    },
    watch: {
      $route() {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .confirm-content
    width: 356px
    height: 200px
    background: $color-white
    border-radius: 3px
    box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.6)
    text-align: center
    .btn-group
      text-align: center
      display: flex
      justify-content: center
      user-select :none
      .btn
        width: 96px
        height: 40px
        line-height: 40px
        border-radius: 3px
        border: 1px solid $color-text-D9
      .cancel
        border-right: 1px solid $color-line
      .confirm
        border-right: 1px solid $color-main
        background: $color-main
        color: $color-white
        margin-left: 20px
    .title
      font-size: $font-size-16
      font-family: $font-family-medium
      height: 44px
      line-height: 44px
      padding: 0 15px
    .text
      font-size: $font-size-16
      color: $color-text-main
      height: 126px
      display: flex
      align-items: center
      justify-content: center
      padding: 0 15px
      padding-top: 10px

  .model-active
    animation: layerFadeIn .3s

  .model-un-active
    animation: hideFadeIn .4s

  @keyframes layerFadeIn {
    0% {
      opacity: 0
      transform: scale(.5)
    }
    100% {
      opacity: 1
      transform: scale(1)
    }
  }

  @keyframes hideFadeIn {
    0% {
      opacity: 1
      transform: scale(1)
    }
    100% {
      transform: scale(.5)
      opacity: 0
    }
  }
</style>
