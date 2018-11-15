<template>
  <div class="panel">
    <header>
      <section class="userInfo-wrapper">
        <p>super</p>
        <div :style="{backgroundImage: 'url(' + image + ')'}"></div>
        <em></em>
        <article class="logout-wrapper"></article>
      </section>
    </header>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {
        image: `http://musicugc.qianqian.com/ugcdiy/pic/15be740121443b5a0f83fbd8104aadf5.jpg`,
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $common-height = 70px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .panel
    min-width: 1410px
    position: relative
    display: flex
    overflow: auto
    min-height: 100vh
    flex-direction: column
    header
      layout(row)
      justify-content: flex-end
      height: $common-height
      background: #fff
      border-bottom-1px(#eee)
      .userInfo-wrapper
        position: relative
        layout(row)
        height: 100%
        align-items: center
        padding: 0 20px
        &:hover > em
          transform: rotate(0deg)
        &:hover
          background: #eee
        p
          font-size: 16px
          color: #000
        div
          width: 40px
          height: @width
          border-radius: 50%
          background: #eee
          background-position: center center
          background-repeat: no-repeat
          background-size: cover
          margin: 0 10px
        em
          height: 0px
          border: 8px solid #999
          border-bottom: 8px solid transparent
          border-left: 8px solid transparent
          border-right: 8px solid transparent
          position: relative
          top: 6px
          transform-origin 7px 3px
          transform: rotate(180deg)
          transition: all 0.2s
        .logout-wrapper
          position: absolute
          top: $common-height
          left: 0
          height: $common-height
          width: 100%
          background: #000
</style>
