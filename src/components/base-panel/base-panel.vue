<template>
  <div class="base-panel" :style="styles">
    <header></header>
    <slot></slot>
    <footer>

    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      styles: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-panel
    margin: 22px
    background: #FFFFFF
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    overflow :hidden
    border-radius: 6px
    flex: 1
</style>
