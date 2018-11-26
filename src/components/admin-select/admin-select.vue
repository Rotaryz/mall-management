<template>
  <div class="admin-select">
    <div class="select-item" v-for="(item,index) in city" :key="index"
         @click.stop="selectType(item.type, index)">
      <span class="title" :style="index? '' : 'margin:0'">{{titleArr[index]}}</span>
      <div class="admin-big-box" :class="{'input-height':item.select}" v-for="(items,idx) in item.children" :key="idx">
        <div class="admin-select-box input-height-item animate-hover" :class="{'admin-select-box-active': item.show}">{{items.content}}
          <img src="./icon-dropdown@2x.png" class="city-tap-top" :class="{'city-tap-top-active': item.select}">
          <transition name="fade">
            <ul class="select-child" v-show="item.select" @mouseleave="leaveHide(index)" @mouseenter="endShow">
              <li class="select-child-item" v-for="(child, chIdx) in items.data" :key="chIdx" @click.stop="setValue(child,index,idx)">
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
  import regionArr from './city'

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
      }
    },
    data() {
      return {
        setTime: '',
        content: {
          province: '',
          city: '',
          area: ''
        },
        city: [{
          select: false,
          show: false,
          children: [{content: '请选择', data: []}]
        }, {
          select: false,
          show: false,
          children: [{content: '请选择', data: []}]
        }, {
          select: false,
          show: false,
          children: [{content: '请选择', data: []}]
        }],
        titleArr: ['省', '市', '区/县']
      }
    },
    created() {
      this._infoPro()
      window.onclick = () => {
        this.city.forEach((item) => {
          item.select = false
        })
      }
    },
    methods: {
      clearLocationInfo() {
        this.city.map(item => {
          item.children[0].content = '请选择'
        })
      },
      clickHide(index) {
        this.city[index].select = false
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
        this.city[index].select = !this.city[index].select
        this.city.forEach((item, idx) => {
          if (idx !== index) {
            item.select = false
          }
        })
        this.city[index].show = true
        this.$emit('selectType', type, this.city)
      },
      setValue(value, index, idx) {
        this.city[index].select = false
        this.city[index].children[idx].content = value.title
        switch (value.type) {
          case 'pro':
            let index = regionArr.findIndex(child => child.name === value.title)
            if (index !== this.cityIndex || index === 0) {
              this.content.city = ''
              this.city[1].children = [{content: '请选择', data: []}]
            }
            this.cityIndex = index
            this._infoCity(index)
            this.content.province = value.title
            this.city[2].children = [{content: '请选择', data: []}]
            this.content.area = ''
            break
          case 'city' :
            let idx = regionArr[this.cityIndex].sub.findIndex(child => child.name === value.title)
            if (value.title !== this.content.city || idx === 0) {
              this.content.area = ''
              this.city[2].children = [{content: '请选择', data: []}]
            }
            this._infoArea(idx)
            this.content.city = value.title
            break
          case 'area' :
            this.content.area = value.title
            break
        }
        this.$emit('setValue', this.content)
      },
      _infoPro() {
        let arr = []
        for (let value in regionArr) {
          arr.push({title: regionArr[value].name, type: 'pro'})
        }
        this.city[0].children[0].data = arr
      },
      _infoCity(index) {
        let cityArr = regionArr[index].sub
        let arr = []
        for (let value in cityArr) {
          arr.push({title: cityArr[value].name, type: 'city'})
        }
        this.city[1].children[0].data = arr
      },
      _infoArea(index) {
        let areaArr = regionArr[this.cityIndex].sub[index].sub
        let arr = []
        for (let value in areaArr) {
          arr.push({title: areaArr[value].name, type: 'area'})
        }
        this.city[2].children[0].data = arr
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
    margin-left: 10px
    box-sizing: border-box
    border-radius: 4px
    font-size: $font-size-14
    color: $color-text-little
    position: relative
    width: 102px
    height: 28px
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
