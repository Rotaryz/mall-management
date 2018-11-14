<template>
  <div class="home" @touchmove.prevent>
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from 'components/navigation/navigation'
  export default {
    name: 'HOME',
    components: {
      Navigation
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .home
    layout(row,block,nowrap)
</style>
