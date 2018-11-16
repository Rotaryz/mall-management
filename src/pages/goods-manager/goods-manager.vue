<template>
  <panel></panel>
</template>

<script type="text/ecmascript-6">
  import Panel from 'components/panel/panel'

  export default {
    components: {
      Panel,
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
