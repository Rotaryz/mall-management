<template>
    <div class="goods-manager">
      <h1>商品管理</h1>
      <router-link to="/goods-detail">去商品详情</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    watch: {
      $route(to, from) {
        console.log(to.query.pageType)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

</style>
