<template>
  <transition name="fade">
    <section class="base-modal" v-show="isShow" :style="styles">
      <slot name="content"></slot>
    </section>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      styles: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-modal
    position :fixed
    background: rgba(50, 50, 58, 0.60)
    top: 0
    bottom: 0
    right: 0
    left: $menu-width
    z-index: 888
    layout()
    justify-content :center
    align-items :center
</style>
