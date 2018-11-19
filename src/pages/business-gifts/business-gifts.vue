<template>
  <base-panel>
    <div slot="content" class="goods-manager">

    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'

  export default {
    name: 'business-gifts',
    data() {
      return {
        pageType: ''
      }
    },
    watch: {
      $route(to, from) {
        this.pageType = to.query.pageType
      },
    },
    components: {
      BasePanel,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .goods-manager
    height : 500px

</style>
