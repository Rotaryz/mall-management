<template>
  <div class="navigation">
    <header>
      <img src="./pic-logo@2x.png" class="icon">
      <p class="header-name hand">商家管理平台</p>
    </header>
    <dl @click="checkTab(index)" v-for="(item, index) in navList" :key="index">
      <dt class="nav-item-wrapper" :class="item.isSelected && !item.children.length ? 'active' : ''">
        <img :src="item.icon" alt="">
        <p>{{item.title}}</p>
        <div class="arrow-right" :class="item.isSelected && item.children.length ? 'active' : ''"></div>
      </dt>
      <dd class="nav-item-wrapper child-wrapper" :style="item.isSelected ? {height: item.showHeight * item.children.length +'px'} : ''" @click.stop>
        <p class="child" v-for="(it, idx) in item.children" :key="idx" @click="selectPage(idx)" :class="item.childrenIndex === idx ? 'active' : ''">{{it.title}}</p>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
  const HEIGHT = 69
  const NAVLIST = [
    {
      title: '用户管理',
      url: '/data-overview',
      icon: require('./icon-data@2x.png'),
      childrenIndex: 0,
      isSelected: false,
      showHeight: HEIGHT,
      children: []
    },
    {
      title: '商家管理',
      url: '/member-list',
      icon: require('./icon-shop_select@2x.png'),
      childrenIndex: 0,
      isSelected: false,
      showHeight: HEIGHT,
      children: []
    },
    {
      title: '商品管理',
      url: '/agent-order',
      icon: require('./icon-client_select@2x.png'),
      childrenIndex: 0,
      isSelected: false,
      children: [
        {
          title: '折扣商品',
          url: '/agent-order'
        },
        {
          title: '播豆商品',
          url: '/retail-order'
        }
      ],
      showHeight: HEIGHT
    },
    {
      title: '订单管理',
      icon: require('./icon-goods_select@2x.png'),
      url: '/commodity',
      childrenIndex: 0,
      isSelected: false,
      children: [
        {
          title: '用户订单',
          url: '/commodity'
        },
        {
          title: '商家订单',
          url: ''
        }
      ],
      showHeight: HEIGHT
    },
    {
      title: '大礼包',
      icon: require('./icon-activity_select@2x.png'),
      url: '/activity',
      childrenIndex: 0,
      isSelected: false,
      children: [
        {
          title: '用户礼包',
          url: '/commodity'
        },
        {
          title: '商家礼包',
          url: ''
        }
      ],
      showHeight: HEIGHT
    }
  ]
  export default {
    name: '',
    data() {
      return {
        navList: NAVLIST,
        preTabIndex: 0
      }
    },
    methods: {
      checkTab(index) {
        if (this.preTabIndex === index) return
        this.navList[this.preTabIndex].isSelected = false
        this.preTabIndex = index
        this.navList[index].isSelected = true
      },
      selectPage(idx) {
        this.navList[this.preTabIndex].childrenIndex = idx
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $color-menu-line = #3B3B43
  $tab-height = 58px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .t-a
    text-align: center

  .navigation
    background: #202230
    width: 200px
    min-height: 100vh
    header
      layout(row)
      height: 80px
      align-items: center
      justify-content: center
      border-bottom: 1px solid $color-menu-line
      img
        height: 24px
        width: @height
        margin-right: 4.4px
      p
        font-size: 20px
        color: #fff
        font-family: PingFangSC-Semibold
    dl
      dt
        &:hover
          background: rgba(255, 255, 255, 0.1)
      .nav-item-wrapper
        layout(row, block, nowrap)
        align-items: center
        width: 100%
        height: $tab-height
        overflow: hidden
        &:last-child
          border-bottom: 1px solid $color-menu-line
        &.child-wrapper
          height: 0
          transition: height 0.3s
          layout()
        &.active
          border-left: 5px solid #4985fc
          background: rgba(255, 255, 255, 0.1)
        img
          height: 19px
          width: @height
          margin: 0 10px 0 30px
        p
          color: #fff
          font-family: 'PingFangSC-Light'
          font-size: 16px
          flex: 1
          overflow: hidden
          background: rgba(255, 255, 255, 0)
          transition : background 0.2s
          &.active
            border-left: 5px solid #4985fc
            background: rgba(255, 255, 255, 0.1)
          &.child
            width: 100%
            layout()
            align-items: center
            justify-content: center
            flex: 1
          &.child:hover
            background: rgba(255, 255, 255, 0.1)
        .arrow-right
          height: 10px
          width: 10px
          icon-image('icon-arrow_right')
          justify-self: flex-end
          margin-right: 30px
          transform rotate(0deg)
          transition: transform 0.2s
          &.active
            transform rotate(90deg)
</style>
