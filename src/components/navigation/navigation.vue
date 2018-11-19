<template>
  <div class="navigation">
    <header>
      <img src="./pic-logo@2x.png" class="icon">
      <p>兑换商城</p>
    </header>
    <dl v-for="(item, index) in navList" :key="index">
      <dt @click="navHandle(item, index)" :class=" '' | isActive(item)">
        <img :src="item.isLight ? item.iconSelected : item.icon" alt="">
        <p>{{item.title}}</p>
        <i :class="item.children.length ? 'rotate' : ''"></i>
      </dt>
      <dd :style="'' | childrenActive(item)">
        <template v-for="(it, idx) in item.children">
          <p :key="idx" :class=" '' | isActive(it)" @click="navHandle(it, idx, item)">{{it.title}}</p>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
  const HEIGHT = 60 + 10
  const NAV_LIST = [
    {
      title: '用户管理',
      url: '/user-manager',
      icon: require('./icon-user@2x.png'),
      iconSelected: require('./icon-user_select@2x.png'),
      childrenIndex: 0,
      showHeight: HEIGHT,
      isRouter: true,
      isLight: false,
      children: []
    },
    {
      title: '商家管理',
      url: '/hello-world',
      icon: require('./icon-shop@2x.png'),
      iconSelected: require('./icon-shop_select@2x.png'),
      childrenIndex: 0,
      isRouter: true,
      isLight: false,
      children: []
    },
    {
      title: '商品管理',
      url: '/goods-manager',
      icon: require('./icon-goods@2x.png'),
      iconSelected: require('./icon-goods_select@2x.png'),
      childrenIndex: 0,
      isRouter: false,
      isLight: false,
      children: [
        {
          title: '折扣商品',
          url: '/goods-manager/money',
          isRouter: true,
          isLight: false
        },
        {
          title: '播豆商品',
          url: '/goods-manager/credits',
          isRouter: true,
          isLight: false
        }
      ]
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
          url: '/order-manager/user',
          isRouter: true,
          isLight: false
        },
        {
          title: '商家订单',
          url: '/order-manager/merchant',
          isRouter: true,
          isLight: false
        }
      ]
    },
    {
      title: '大礼包',
      icon: require('./icon-gifts@2x.png'),
      iconSelected: require('./icon-gifts_select@2x.png'),
      url: '',
      childrenIndex: 0,
      isRouter: false,
      isLight: false,
      children: [
        {
          title: '用户礼包',
          url: '',
          isRouter: true,
          isLight: false
        },
        {
          title: '商家礼包',
          url: '',
          isRouter: true,
          isLight: false
        }
      ]
    }
  ]
  export default {
    name: '',
    data () {
      return {
        navList: NAV_LIST,
        preTabIndex: 0
      }
    },
    created () {
      this._initNavList()
    },
    methods: {
      navHandle (item, index, father) {
        // 重置路由器
        this._resetNavStatus(this.navList)
        // 设置父级
        if (father) {
          father.isLight = true
          father.childrenIndex = index
        }
        // 设置自身
        if (item.isRouter) {
          this.$router.push(item.url)
        }
        item.isLight = true
        // 设置子路由
        if (item.children) {
          let children = item.children
          let childrenIndex = item.childrenIndex
          let currentChildren = children[childrenIndex]
          if (children.length) {
            currentChildren.isLight = true
          }
          if (currentChildren && currentChildren.isRouter) {
            this.$router.push(currentChildren.url)
          }
        }
      },
      _resetNavStatus (arr) {
        arr.map(item => {
          item.isLight = false
          item.children.map(it => {
            it.isLight = false
          })
        })
        if (arr.children && arr.children.length) {
          this._resetNavStatus(arr.children)
        }
      },
      _initNavList () {
        let path = this.$route.fullPath
        this._resetNavLight(this.navList, path)
      },
      _resetNavLight(arr, path) {
        let index = arr.findIndex(item => path.includes(item.url))
        let fullIdx = arr.findIndex(item => path === item.url)
        let current = {}
        if (fullIdx > -1 || index > -1) {
          current = fullIdx > -1 ? arr[fullIdx] : arr[Math.max(0, index)]
        }
        current.isLight = true
        if (index !== -1 && current.children && current.children.length) {
          return this._resetNavLight(current.children, path)
        }
      }
    },
    filters: {
      childrenActive(val, item) {
        let styles = val
        if (item.children.length && item.isLight) {
          styles = `height:${item.children.length * HEIGHT}px`
        }
        return styles
      },
      isActive (val, item) {
        let cname = val
        if (item.isLight) {
          cname = 'active'
        }
        if (item.isLight && item.children && item.children.length) {
          cname += ' no-border'
        }
        return cname
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $tab-height = 60px
  $color-menu-tag = #FF533C
  $color-menu-text = #6E748B
  $color-menu-text-active = #fff
  $color-menu-bg-active = rgba(255, 255, 255, 0.1)
  $color-menu-bg = rgba(255, 255, 255, 0)
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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
    user-select: none
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
    dl
      font-family: PingFangSC-Regular
      color: $color-menu-text
      font-size: 16px
      cursor: pointer
      dt
        layout(row, block, nowrap)
        align-items: center
        width: 100%
        height: $tab-height
        overflow: hidden
        background: $color-menu-bg
        box-sizing: border-box
        border-left: 5px solid transparent
        transition: all .2s
        &:hover
          background: $color-menu-bg-active
        &.active
          border-left: 5px solid $color-menu-tag
          background: $color-menu-bg-active
          &.no-border
            border-color: transparent
          & > p
            color: $color-white
          & > i
            icon-image('icon-pressed_select')
            &.rotate
              transform: rotate(90deg)
        p
          flex: 1
          overflow: hidden
          background: rgba(255, 255, 255, 0)
          box-sizing: border-box
          border-left: 5px solid transparent
          transition: all .2s
        img
          height: 19px
          width: @height
          margin: 0 10px 0 30px
        i
          height: 10px
          width: 10px
          icon-image('icon-pressed')
          justify-self: flex-end
          margin-right: 30px
          transform rotate(0deg)
          transition: transform 0.2s
      dd
        height: 0
        transition: height 0.3s
        layout()
        overflow: hidden
        p
          width: 100%
          layout()
          background: $color-menu-bg
          align-items: center
          justify-content: center
          flex: 1
          box-sizing :border-box
          border-left: 5px solid transparent
          margin: 5px 0
          transition: all .2s
          &:hover
            background: $color-menu-bg-active
          &.active
            border-left: 5px solid $color-menu-tag
            background: $color-menu-bg-active
            color: $color-white
</style>
