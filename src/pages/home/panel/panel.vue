<template>
  <div class="panel">
    <div class="content">
      <header>
        <section class="userInfo-wrapper" @mouseenter="showLogoutHandle" @mouseleave="hideLogoutHandle">
          <img class="img" :src="userInfo.avatar" />
          <p>{{userInfo.name}}</p>
          <em></em>
          <transition name="fade">
            <article class="logout-wrapper" v-show="showLogout">
              <div class="empty"></div>
              <section class="logout" @click.stop="logoutHandle">
                <i></i>
                <p>退出登录</p>
              </section>
            </article>
          </transition>
        </section>
      </header>
      <section class="router-content" v-if="isShowPage">
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'HOME_PANEL',
    data() {
      return {
        showLogout: false,
        showModal: false,
        isShare: false,
        isShowPage: true,
        userInfo: window.$storage.get('info', {})
      }
    },
    created() {
    },
    methods: {
      logoutHandle() {
        window.$storage.remove('token')
        this.$router.replace('/login')
      },
      showLogoutHandle() {
        this.showLogout = true
      },
      hideLogoutHandle() {
        this.showLogout = false
      }
    },
    watch: {
      $route(to) {
        if (!to.meta.isShare) return
        this.isShowPage = false
        this.$nextTick(() => {
          this.isShowPage = true
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $common-height = 76px
  $width-triangle = 4px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .fade-enter-active, .fade-leave-active
    transition: all 0.2s

  .fade-enter, .fade-leave-to
    transition: opacity .2s ease-in-out

  .panel
    position: relative
    overflow: auto
    padding-left: 200px
    box-sizing: border-box
    flex: 1
    .content
      position: relative
      min-width: 1410px
      min-height: 100vh
      overflow: auto
      common-scroll-bar()
      layout()
      & > header
        layout(row)
        justify-content: flex-end
        height: $common-height
        background: #fff
        border-bottom-1px(#eee)
        z-index :1000
        .userInfo-wrapper
          position: relative
          layout(row)
          min-height: $common-height
          align-items: center
          padding: 0 26.8px
          cursor: pointer
          &:hover > em
            transform: rotate(180deg)
          &:hover
            background: #f5f7fb
          & > p
            font-family: PingFangSC-Regular
            font-size: 14px
            color: #666
            padding: 0 4px 0 13px
          & > .img
            width: 43px
            height: @width
            border-radius: 50%
            background: #eee
            object-fit :cover
            border: 3px solid #FFFFFF;
            box-shadow: 0 2px 4px 0 rgba(51, 51, 51, 0.10)
          & > em
            height: 0
            border: $width-triangle solid #424242
            border-bottom: $width-triangle solid transparent
            border-left: $width-triangle solid transparent
            border-right: $width-triangle solid transparent
            position: relative
            top: 2px
            transform-origin $width-triangle 2px
            transform: rotate(0deg)
            transition: all 0.2s
          .logout-wrapper
            position: absolute
            left: 0
            right: 10px
            top: $common-height
            & > div
              height: 5px
            .logout
              height: 50px
              width: 100%
              background: #fff
              layout(row)
              justify-content: center
              align-items: center
              box-shadow: 0 3px 8px 0 rgba(12, 6, 14, 0.20)
              border-radius: 6px
              & > p
                font-family: PingFangSC-Regular
                font-size: 16px
                color: #666
                margin-left: 30px
              & > i
                height: 22px
                width: @height
                background-repeat: no-repeat
                background-position: center center
                background-size: 100% 100%
                background-image url("./icon-exit@2x.png")

      .router-content
        flex: 1
        overflow: auto
        layout()
</style>
