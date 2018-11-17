<template>
  <base-panel>
    <div style="background: red; height: 1000px">222</div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'

  export default {
    components: {
      BasePanel,
    },
    watch: {
      $route(to, from) {
        console.log(to.query.pageType)
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

</style>
