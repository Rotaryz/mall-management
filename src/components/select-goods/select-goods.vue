<template>
  <base-modal :isShow="show">
    <div slot="content" class="confirm-content" :class="showActive ? 'model-active' : 'model-un-active'" >
      <div class="top">
        <div class="title">选择商品</div>
        <div class="search">
          <input class="input" type="text" @input="searchGoods" v-model="searchText" placeholder="请输入商品名称">
          <span class="before"></span>
          <span class="after"></span>
        </div>
      </div>
      <div class="list-header">
        <div class="header-key" v-for="item in headerList">
          <span class="contxt">{{item}}</span>
        </div>
      </div>
      <div class="goods-box" ref="goodsBox" @mousewheel="boxWheel">
        <div class="list-content" ref="content">
          <div class="list-item" v-for="(item, index) in arr">
            <div class="item">
              <span class="checkbox hand" :class="{'checked': item.checked, 'no-handle': item.noHandle}" @click="goodsCheck(index, item)"></span>
            </div>
            <div class="item flex1">
              <img class="head" :src="item.image_url_thumb" alt="">
              <!--<div class="head" :style="{backgroundImage: 'url('+item.image_url_thumb+')'}"></div>-->
              <span class="name">{{item.title}}</span>
            </div>
            <span class="item">{{item.original_price}}</span>
            <div class="counter item">
              <span class="sub text hand" @click="subCount(index)">-</span>
              <input type="number" class="number text" v-model="item.stock">
              <span class="add  text hand" @click="addCount(index)">+</span>
            </div>
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
  import {Gifts} from 'api'

  const COUNTREG = /^[1-9]\d*$/
  const LIMIT = 10
  export default {
    props: {
      goodsArr: {
        type: Array,
        default: () => {
          return []
        }
      },
      hasId: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      giftsStock: {
        default: () => {
          return 0
        }
      }
    },
    data() {
      return {
        show: false,
        timeout: true,
        showActive: false, // 控制出场离场动画
        headerList: ['勾选', '商品名称', '商品价格', '商品数量'],
        arr: this.goodsArr,
        selectArr: [],
        searchText: '',
        hasMore: true,
        page: 1,
        canAddMore: true
      }
    },
    destroyed() {
      this.timeout && clearTimeout(this.timeout)
    },
    created() {
      this._getGoodsList()
    },
    methods: {
      _getGoodsList(keywords) {
        this.showActive = true
        this.show = true
        Gifts.getGoodsList({page: 1, limit: LIMIT, on_line: 1, keywords})
          .then(res => {
            this.page = 1
            if (res.data.length < LIMIT) this.hasMore = false
            // 过滤库存大于0的商品
            let resArr = res.data.filter(item => {
              return item.goods_sku[0].goods_sku_stock > 0
            })
            let arr = resArr.map(item => {
              item.stock = 1
              item.checked = false
              return item
            })
            if (!this.goodsArr.length) { // 如果没有已选择商品，直接赋值
              this.arr = res.data
              return
            }
            // 查找已选商品
            this.goodsArr.map(item => {
              let index = arr.findIndex(val => {
                return val.goods_sku[0].id === item.goods_sku_id
              })
              if (index > -1) {
                arr[index].stock = item.stock
                arr[index].checked = item.checked
                arr[index].noHandle = item.checked
                arr[index].goods_sku_id = arr[index].goods_sku[0].id
              }
            })
            this.arr = arr
          })
      },
      boxWheel(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          let boxBottom = this.$refs.goodsBox && this.$refs.goodsBox.getBoundingClientRect().bottom
          let contentBottom = this.$refs.content && this.$refs.content.getBoundingClientRect().bottom
          let d = -e.detail / 3 || e.wheelDelta / 120
          // 滚动到底部加载更多
          if (contentBottom === boxBottom && d < 0 && this.canAddMore) {
            this.canAddMore = false
            this.pullDown()
          }
        }, 300)
      },
      pullDown() {
        if (!this.hasMore) return
        this.page++
        Gifts.getGoodsList({page: this.page, limit: LIMIT, on_line: 1, keyword: this.searchText})
          .then(res => {
            if (res.data.length < LIMIT) this.hasMore = false
            this.canAddMore = true
            // 过滤库存大于0的商品
            let resArr = res.data.filter(item => {
              return item.goods_sku[0].goods_sku_stock > 0
            })
            let arr = resArr.map(item => {
              item.stock = 1
              item.checked = false
              return item
            })
            if (!this.goodsArr.length) { // 如果没有已选择商品，就直接合并
              this.arr = this.arr.concat(arr)
              return
            }
            // 查找已选商品
            this.goodsArr.map(item => {
              let index = arr.findIndex(val => {
                return val.goods_sku[0].id === item.goods_sku_id
              })
              if (index > -1) {
                arr[index].stock = item.stock
                arr[index].checked = item.checked
                arr[index].noHandle = item.checked
                arr[index].goods_sku_id = arr[index].goods_sku[0].id
              }
            })
            this.arr = this.arr.concat(arr)
          })
      },
      showGoodsList() {
        this.show = true
      },
      searchGoods() {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this._getGoodsList(this.searchText)
        }, 1000)
      },
      goodsCheck(index, item) {
        if (item.noHandle) return
        this.arr = this.arr.map((item, i) => {
          if (index === i) {
            item.checked = !item.checked
          }
          return item
        })
      },
      subCount(index) {
        this.arr = this.arr.map((item, i) => {
          if (index === i) {
            if (item.stock > 1) {
              item.stock--
            }
          }
          return item
        })
      },
      addCount(index) {
        this.arr = this.arr.map((item, i) => {
          // 通过大礼包库存判断选择商品库存是否超过库存量
          if (index === i) {
            if (this.giftsStock && (item.stock < Math.floor(item.goods_sku[0].goods_sku_stock / this.giftsStock))) {
              item.stock++
            } else if (!this.giftsStock && item.stock < item.goods_sku[0].goods_sku_stock) {
              item.stock++
            } else {
              this.$toast.show('已达到商品最大库存数')
            }
          }
          return item
        })
      },
      confirm() {
        if (!this.timeout) return
        this.selectArr = this.arr.filter(item => {
          return item.checked === true
        })
        if (this._testCount(this.selectArr)) {
          this.$toast.show(this._testCount(this.selectArr))
          return
        }
        this.selectArr = this.arr.filter(item => {
          item.goods_sku_id = item.goods_sku[0].id
          item.goods_id = item.id
          item.id = 0
          item.origin_sku_stock = item.goods_sku[0].goods_sku_stock
          return item.checked === true
        })
        setTimeout(() => {
          this.show = false
        }, 100)
        this.showActive = false
        this.timeout = false // 防止重复点击
        this.$emit('selectGoods', this.selectArr)
        setTimeout(() => {
          this.timeout = true
          this.$emit('hideGoodsList')
        }, 500)
      },
      cancel() {
        setTimeout(() => {
          this.show = false
          this.$emit('hideGoodsList')
        }, 200)
        this.showActive = false
      },
      _testCount(arr) {
        for (let item of arr) {
          if (this.giftsStock && (item.stock > Math.floor(item.goods_sku[0].goods_sku_stock / this.giftsStock))) {
            return `商品【${item.title}】的数量不能大于库存数${item.goods_sku[0].goods_sku_stock}`
          } else if (!this.giftsStock && item.stock > item.goods_sku[0].goods_sku_stock) {
            return `商品【${item.title}】的数量不能大于库存数${item.goods_sku[0].goods_sku_stock}`
          } else if (!COUNTREG.test(item.stock)) {
            return '商品数量必须为整数，请从新选择数量'
          }
        }
        return false
      }
    },
    components: {
      BaseModal
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
      padding-right: 17px
      font-family: $font-family-medium
      display: flex
      text-align: left
      justify-content: space-between
      padding-left: 36px
      color: $color-text-main
      font-size: 14px
      .header-key
        width: 155px
        overflow: hidden
        &:nth-of-type(2)
          width: 280px
        &:last-child
          text-indent: 23px
    .goods-box
      height: 240px
      overflow-y: scroll
    .list-content
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
        .no-handle
          background-image: url('./ungroup.png');
        .item
          width: 155px
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
            overflow: hidden
            object-fit: cover
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
          width: 280px
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
