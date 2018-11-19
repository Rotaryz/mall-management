<template>
  <div class="goods-detail">
    goods-detail
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: ''
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .goods-detail
    fill-box(absolute)
    z-index :90
    background :$color-background
</style>
