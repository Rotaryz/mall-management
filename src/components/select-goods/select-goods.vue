<template>
  <base-modal :isShow="show">
    <div slot="content" class="confirm-content" :class="showActive ? 'model-active' : 'model-un-active'">
      <div class="top">
        <div class="title">选择商品</div>
        <div class="search">
          <input class="input" type="text" @input="searchGoods" placeholder="请输入商品名称">
          <span class="before"></span>
          <span class="after"></span>
        </div>
      </div>
      <div class="list-header">
        <div class="header-key" v-for="item in headerList">
          <span class="contxt">{{item}}</span>
        </div>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="(item, index) in arr">
          <div class="item">
            <span class="checkbox hand" :class="{'checked':arr[index].checked}" @click="goodsCheck(index)"></span>
          </div>
          <div class="item flex1">
            <img class="head" src="./goods.jpg" alt="">
            <span class="name">随便写点字</span>
          </div>
          <span class="item">168.8</span>
          <div class="counter item">
            <span class="sub text hand" @click="subCount(index)">-</span>
            <input type="number" class="number text" v-model="item.count">
            <span class="add  text hand" @click="addCount(index)">+</span>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <span @click="cancel" class="btn cancel hand">取消</span>
        <span @click="confirm" class="btn confirm hand">确定</span>
      </div>
    </div>
  </base-modal>
</template>

<script type="text/ecmascript-6">
  import BaseModal from 'components/base-modal/base-modal'

  const COUNTREG = /^[1-9]\d*$/
  export default {
    components: {
      BaseModal
    },
    data() {
      return {
        show: false,
        timeout: true,
        showActive: false, // 控制出场离场动画
        headerList: ['勾选', '商品名称', '商品价格', '商品数量'],
        goodsCount: '1',
        arr: [
          {checked: false, count: 1, name: 'a'},
          {checked: false, count: 1, name: 'b'},
          {checked: false, count: 1, name: 'c'},
          {checked: false, count: 1, name: 'd'},
          {checked: false, count: 1, name: 'e'},
          {checked: false, count: 1, name: 'f'}
        ],
        selectArr: []
      }
    },
    destroyed() {
      this.timeout && clearTimeout(this.timeout)
    },
    methods: {
      showGoodsList() {
        this.show = true
        this.showActive = true
      },
      searchGoods() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          console.log('search')
        }, 1000)
      },
      goodsCheck(index) {
        this.arr[index].checked = !this.arr[index].checked
      },
      subCount(index) {
        if (this.arr[index].count > 0) {
          this.arr[index].count--
        }
      },
      addCount(index) {
        this.arr[index].count++
      },
      confirm() {
        if (!this.timeout) return
        this.selectArr = this.arr.filter(item => {
          return item.checked === true
        })
        if (!this._testCount(this.selectArr)) {
          this.$toast.show('商品数量必须为整数，请从新选择数量')
          return
        }
        setTimeout(() => {
          this.show = false
        }, 100)
        this.showActive = false
        this.timeout = false // 防止重复点击
        this.$emit('selectGoods', this.selectArr)
        setTimeout(() => {
          this.timeout = true
        }, 500)
      },
      cancel() {
        setTimeout(() => {
          this.show = false
        }, 100)
        this.showActive = false
      },
      _testCount(arr) {
        let allRight = arr.every((item, index) => {
          return COUNTREG.test(item.count)
        })

        return allRight
      }
    },
    watch: {
      $route() {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  input::-webkit-input-placeholder { /* WebKit browsers */
    color: $color-ccc
    font-size: 14px
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $color-ccc
    font-size: 14px
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $color-ccc
    font-size: 14px
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: $color-ccc
    font-size: 14px
  }

  .confirm-content
    width: 780px
    height: 455px
    background: $color-white
    border-radius: 3px
    box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.6)
    .top
      padding: 0 30px
      height: 62px
      display: flex
      justify-content: space-between
      align-items: center
      border-bottom: 1px solid $color-DADADA
      color: $color-text-main
      .title
        font-size: 16px
      .search
        input-animate(224, 34)
        .input
          text-indent: 5px
    .list-header
      flex: 1
      background: $color-FAFAFA
      height: 50px
      line-height: 50px
      font-family: $font-family-medium
      display: flex
      text-align: left
      justify-content: space-between
      padding-left: 36px
      color: $color-text-main
      font-size: 14px
      .header-key
        flex: 1
        overflow: hidden
        &:nth-of-type(2)
          flex: 1.8
        &:last-child
          text-indent: 23px

    .list-content
      height: 240px
      overflow-y: scroll
      .list-item
        height: 60px
        flex: 1
        color: $color-text-sub
        font-size: 14px
        display: flex
        align-items: center
        justify-content: space-between
        padding-left: 2vw
        box-sizing: border-box
        border-bottom: 0.5px solid $color-line
        text-align: left
        padding-left: 36px
        .checkbox
          display: block
          width: 16px
          height: 16px
          border: 1px solid $color-DADADA
        .checked
          background: url('./group.png') no-repeat;
          background-size: cover
          border: 0
        .item
          flex: 1
          no-wrap()
          display: flex
          align-items: center
          line-height: 18px
          position: relative
          .head
            width: 40px
            height: 40px
            margin-right: 10px
            border: 1px solid #E8E8E8
            border-radius: 2px
          .name
            width: 180px
            word-break: break-all
            white-space: pre-wrap
            display: -webkit-box
            overflow: hidden
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
        .counter
          display: flex
          align-items: center
          .text
            color: $color-text-sub
            font-size: 12px
            height: 22px
            line-height: 19px
            text-align: center
            display: block
            font-family: $font-family-medium
            border: 1px solid $color-text-D9
            box-sizing: border-box
            border-radius: 1px
            margin-right: 5px
            user-select: none
          .sub
            font-size: 17px
            width: 22px
          .number
            width: 50px
            color: $color-text-sub
          .add
            width: 22px
            color: $color-white
            background: $color-text-sub

          .main
            color: $color-text-main
        .flex1
          flex: 1.8
    .btn-group
      text-align: center
      display: flex
      justify-content: center
      user-select :none
      padding: 30px 0
      .btn
        width: 96px
        height: 40px
        line-height: 40px
        border-radius: 3px
        border: 1px solid $color-text-D9
      .cancel
        border-right: 1px solid $color-line
      .confirm
        border-right: 1px solid $color-main
        background: $color-main
        color: $color-white
        margin-left: 20px

  .model-active
    animation: layerFadeIn .3s

  .model-un-active
    animation: hideFadeIn .4s

  @keyframes layerFadeIn {
    0% {
      opacity: 0
      transform: scale(.5)
    }
    100% {
      opacity: 1
      transform: scale(1)
    }
  }

  @keyframes hideFadeIn {
    0% {
      opacity: 1
      transform: scale(1)
    }
    100% {
      transform: scale(.5)
      opacity: 0
    }
  }
</style>
