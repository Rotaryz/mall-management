<template>
  <div class="navigation">
    <header>
      <img src="./pic-logo@2x.png" class="icon">
      <p class="header-name hand">兑换商城</p>
    </header>
    <dl class="nav-wrapper" v-for="(item, index) in navList" :key="index">
      <router-link tag="dt" :to="item.url" class="nav-item-wrapper">
        <img class="icon" :src="$route.path === item.url ? item.iconSelected: item.icon" alt="">
        <p class="text">{{item.title}}</p>
        <div class="arrow-right" :style="$route.path === item.url? 'transform rotate(90deg)' : ''"></div>
      </router-link>
      <dd class="child-wrapper" :style="$route.path === item.url ? {height: item.showHeight * item.children.length +'px'} : ''" @click.stop>
        <p class="text" v-for="(it, idx) in item.children" :key="idx" :class="item.childrenIndex === idx ? 'active' : ''">{{it.title}}</p>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
  const HEIGHT = 60 + 10
  const NAVLIST = [
    {
      title: '用户管理',
      url: '/user-manager',
      icon: require('./icon-user@2x.png'),
      iconSelected: require('./icon-user_select@2x.png'),
      childrenIndex: 0,
      showHeight: HEIGHT,
      children: [],
    },
    {
      title: '商家管理',
      url: '/hello-world',
      icon: require('./icon-shop@2x.png'),
      iconSelected: require('./icon-shop_select@2x.png'),
      childrenIndex: 0,
      showHeight: HEIGHT,
      children: [],
    },
    {
      title: '商品管理',
      url: '/goods-manager',
      icon: require('./icon-goods@2x.png'),
      iconSelected: require('./icon-goods_select@2x.png'),
      childrenIndex: 0,
      children: [
        {
          title: '折扣商品',
          url: '/goods-manager?pageType=money',
        },
        {
          title: '播豆商品',
          url: '/goods-manager?pageType=integrals',
        },
      ],
      showHeight: HEIGHT,
    },
    {
      title: '订单管理',
      icon: require('./icon-indent@2x.png'),
      iconSelected: require('./icon-indent_select@2x.png'),
      url: '/order-manager',
      childrenIndex: 0,
      children: [
        {
          title: '用户订单',
          url: '/order-manager?pageType=user',
        },
        {
          title: '商家订单',
          url: '/order-manager?pageType=merchant',
        },
      ],
      showHeight: HEIGHT,
    },
    {
      title: '大礼包',
      icon: require('./icon-gifts@2x.png'),
      iconSelected: require('./icon-gifts_select@2x.png'),
      url: '/demo',
      childrenIndex: 0,
      children: [
        {
          title: '用户礼包',
          url: '',
        },
        {
          title: '商家礼包',
          url: '',
        },
      ],
      showHeight: HEIGHT,
    },
  ]
  export default {
    name: '',
    data() {
      return {
        navList: NAVLIST,
        preTabIndex: 0,
      }
    },
    // created() {
    //   this._initNavList()
    // },
    // methods: {
    //   _initNavList() {
    //     let url = this.$route.fullPath
    //     this.navList.forEach((item, index) => {
    //       item.isSelected = false
    //       if (item.url === url) {
    //         item.isSelected = true
    //       }
    //       item.children.forEach(it => {
    //         if (it.url === url) {
    //           item.isSelected = true
    //         }
    //       })
    //       this.preTabIndex = index
    //     })
    //   },
    //   checkTab(index) {
    //     let flag = this.$route.fullPath === this.navList[index].url
    //     if (this.preTabIndex === index && flag) {
    //       return
    //     }
    //     this.navList[this.preTabIndex].isSelected = false
    //     this.preTabIndex = index
    //     this.navList[index].isSelected = true
    //     // 路由跳转
    //     let url = ''
    //     let currentNav = this.navList[index]
    //     if (this.navList[index].children.length) {
    //       let childrenIndex = currentNav.childrenIndex
    //       url = currentNav.children[childrenIndex].url
    //       this.$router.push(url)
    //     } else {
    //       url = currentNav.url
    //       this.$router.push(url)
    //     }
    //   },
    //   selectPage(idx) {
    //     let flag = this.$route.fullPath === this.navList[this.preTabIndex].url
    //     if (this.navList[this.preTabIndex].childrenIndex === idx && flag) return
    //     this.navList[this.preTabIndex].childrenIndex = idx
    //     // 路由跳转
    //     this.$router.push(this.navList[this.preTabIndex].children[idx].url)
    //   },
    // },
    // watch: {
    //   $route(to) {
    //   }
    // }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-height = 60px
  $color-menu-tag = #FF533C
  $color-menu-text = #6E748B
  $color-menu-text-active = #fff
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .text
    color: $color-menu-text
    font-family: PingFangSC-Regular
    font-size: 16px
    flex: 1
    overflow: hidden
    background: rgba(255, 255, 255, 0)
    box-sizing: border-box
    border-left: 5px solid transparent
    transition : all .2s
    margin :5px 0

  .navigation
    position: fixed
    top: 0
    left: 0
    background: #222742
    box-shadow: 3px 0 4px 0 rgba(0, 8, 39, 0.30)
    width: $menu-width
    min-height: 100vh
    z-index: 1000
    overflow-y: auto
    header
      layout(row)
      height: 80px
      align-items: center
      justify-content: center
      border-bottom: 1px solid $color-menu-line
      img
        height: 24px
        width: @height
        margin-right: 12.6px
      p
        font-size: 20px
        color: #fff
        font-family: PingFangSC-Semibold
        letter-spacing: 6px
    .nav-wrapper
      cursor :pointer
      .nav-item-wrapper
        layout(row, block, nowrap)
        align-items: center
        width: 100%
        height: $tab-height
        overflow: hidden
        box-sizing: border-box
        border-left: 5px solid transparent
        transition : all .2s
        &:hover
          background: rgba(255, 255, 255, 0.1)
        .icon
          height: 19px
          width: @height
          margin: 0 10px 0 30px
        .arrow-right
          height: 10px
          width: 10px
          icon-image('icon-pressed')
          justify-self: flex-end
          margin-right: 30px
          transform rotate(0deg)
          transition: transform 0.2s

        .child-wrapper
          height: 0
          transition: height 0.3s
          border: none
          layout()
          overflow :hidden
          .text
            width: 100%
            layout()
            align-items: center
            justify-content: center
            flex: 1
            &:hover
              background: rgba(255, 255, 255, 0.1)

      .router-link-active
        background: rgba(255, 255, 255, 0.1)
        border-left: 5px solid $color-menu-tag
        background: rgba(255, 255, 255, 0.1)
        & > .arrow-right
          icon-image('icon-pressed_select')
        & > .text
          color: $color-menu-text-active

</style>
