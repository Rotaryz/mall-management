<template>
  <div class="home" @touchmove.prevent>
    <navigation></navigation>
    <div class="content">
      <panel>
        <router-view></router-view>
      </panel>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Navigation from 'components/navigation/navigation'
  import Panel from 'pages/home/panel/panel'

  export default {
    name: 'HOME',
    components: {
      Navigation,
      Panel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .home
    layout(row, block, nowrap)
    .content
      overflow: auto
      padding-left: 200px
      box-sizing: border-box
      flex: 1
</style>
