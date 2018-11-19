<template>
  <div class="admin-select">
    <div class="select-item" v-for="(item,index) in select" :key="index"
         @click.stop="selectType(item.type, index)">
      <div class="admin-big-box" :style="sizeStyle" :class="{'input-height':item.select}" v-for="(items,idx) in item.children" :key="idx">
        <div class="admin-select-box input-height-item" :style="sizeStyle" :class="{'admin-select-box-active': item.show}">{{items.content}}
          <img src="./icon-dropdown@2x.png" class="city-tap-top" :class="{'city-tap-top-active': item.select}">
          <transition name="fade">
            <ul class="select-child" v-show="item.select" @mouseleave="leaveHide(index)" @mouseenter="endShow">
              <li class="select-child-item" :style="{height: itemHeight + 'px', lineHeight: itemHeight + 'px'}" v-for="(child, chIdx) in items.data" :key="chIdx" @click.stop="setValue(child,index,idx)">
                {{child.title}}
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      select: {
        type: Array,
        default: () => [{
          select: false,
          show: false,
          children: [{content: '全部', data: []}]
        }]
      },
      isUse: {
        type: Boolean,
        default: true
      },
      itemHeight: {
        type: Number,
        default: 40
      },
      wrapperSize: {
        type: Object,
        default: () => {
          return {height: 44, width: 148}
        }
      }
    },
    mounted() {
      window.onclick = () => {
        this.select.map((item) => {
          item.select = false
          return item
        })
      }
    },
    data() {
      return {
        setTime: ''
      }
    },
    methods: {
      clickHide(index) {
        this.select[index].select = false
      },
      endShow() {
        clearTimeout(this.setTime)
      },
      leaveHide(index) {
        this.setTime = setTimeout(() => {
          this.clickHide(index)
        }, 1500)
      },
      selectType(type, index) {
        if (!this.isUse) {
          return
        }
        this.select[index].select = !this.select[index].select
        this.select.forEach((item, idx) => {
          if (idx !== index) {
            item.select = false
          }
        })
        this.select[index].show = true
        this.$emit('selectType', type, this.select)
      },
      setValue(value, index, idx) {
        this.select[index].select = false
        this.select[index].children[idx].content = value.title
        this.$emit('setValue', value, idx)
      }
    },
    computed: {
      sizeStyle() {
        const {width, height} = this.wrapperSize
        return `width:${width}px;height:${height}px;line-height:${height}px`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  .admin-select
    display: flex

  .select-item
    display: flex
    align-items: center
    position: relative
    &:first-child
      margin-left: 0px
    .title
      color: $color-text-main
      font-size: $font-size-14
      margin-left: 20px
  .admin-big-box
    cursor: pointer
    box-sizing: border-box
    border-radius: 4px
    font-size: $font-size-14
    color: $color-text-main
    position: relative
    border-animate($color-text-999)
    .admin-select-box
      min-width: 48px
      border-radius: 4px
      border: 0.5px solid $color-text-D9
      padding: 0 31px 0 15px
      line-height: 28px
      box-sizing: border-box
      white-space: nowrap
      font-size: $font-size-12
      position: relative
      color: $color-text-sub
      &:hover
        color: $color-text-main
      .city-tap-top
        width: 9px
        col-center()
        right: 16px
        transform-origin: 50% 0%
        transform: rotate(0deg) translateY(-50%)
        transition: transform 0.3s
      .city-tap-top-active
        transform-origin: 50% 0%
        transform: rotate(180deg) translateY(-50%)
        transition: transform 0.3s
      .select-child
        left: 0
        background: $color-white
        z-index: 300
        position: absolute
        width: 100%
        border-radius: 3px
        box-shadow: 0 1px 5px 0 rgba(12, 6, 14, 0.20)
        margin-top: 4px
        max-height: 228px
        overflow-y: auto
        &::-webkit-scrollbar
          width: 10px
          height: 10px
          background-color: #F5F5F5
        &::-webkit-scrollbar-track
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1)
          border-radius: 10px
          background-color: #F5F5F5

        /*定义滑块 内阴影+圆角*/
        &::-webkit-scrollbar-thumb
          border-radius: 10px
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1)
          background-color: #ccc

    &.fade-enter, &.fade-leave-to
      opacity: 0
    &.fade-enter-to, &.fade-leave-to
      transition: opacity .3s ease-in-out
    .select-child-item
      white-space: nowrap
      color: $color-text-main
      padding: 0 10px
      text-align: left
      height: 26px
      line-height: 26px
      font-size: $font-size-14
      &:hover
        background: $color-FAFAFA
    .admin-select-box-active
      color: $color-text-main
</style>
