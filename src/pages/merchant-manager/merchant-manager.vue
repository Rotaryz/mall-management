<template>
  <div class="merchant-manager">
    <base-panel>
      <div slot="content">
        <div class="search-top">
          <p class="top-title">手机号</p>
          <search placeholerTxt="请输入手机号"></search>
        </div>
        <div class="list-content">
          <div class="list-head">
            <div class="list-head-item" v-for="(item, index) in listArr" :key="index" :class="item.className">{{item.title}}</div>
          </div>
          <div class="list-item" v-for="(item, index) in manageList" :key="index">
            <div class="list-item-row" v-for="(item1, index1) in listArr" :key="index1" :class="item1.className" v-if="index1 != (listArr.length - 1)">
              <span class="dot-box green-dot" v-if="item1.showType === 'dot'"></span>
              <span class="dot-box red-dot" v-if="item1.showType === 'dot'"></span>
              <span v-if="item1.showType !== 'img'">{{item1.title}}</span>
              <img src="./logo.jpg" class="avatar" v-if="item1.showType === 'img'">
            </div>
            <div class="list-item-row red-item flex1 hand" @click="showModal">查看店铺</div>
          </div>
        </div>
      </div>
    </base-panel>
    <base-modal :isShow="coverShow">
      <div slot="content">
        <transition name="fade">
          <div class="qrcode-container" v-if="coverShow">
            <div class="cover-top">
              <div class="top-left">店铺二维码</div>
              <img src="./icon-close@2x.png" class="close-btn hand" @click="hideModal">
            </div>
            <div class="cover-down">
              <img src="./logo.jpg" class="qrcode">
            </div>
          </div>
        </transition>
      </div>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import BaseModal from 'components/base-modal/base-modal'
  import Search from 'components/search/search'

  const LIST = [
    {name: 'logo', title: '门店LOGO', className: 'flex1', showType: 'img'},
    {name: '', title: '门店名称', className: 'flex1'},
    {name: '', title: '店长', className: 'flex1'},
    {name: '', title: '手机号', className: 'flex1'},
    {name: '', title: '地区', className: 'flex1'},
    {name: '', title: '详细地址', className: 'flex2'},
    {name: '', title: '大礼包', className: 'flex1', showType: 'dot'},
    {name: '', title: '开店时间', className: 'flex1'},
    {name: '', title: '操作', className: 'flex1'}
  ]
  export default {
    name: 'merchantManager',
    data() {
      return {
        listArr: LIST,
        manageList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        coverShow: false
      }
    },
    methods: {
      showModal() {
        this.coverShow = true
      },
      hideModal() {
        this.coverShow = false
      }
    },
    components: {
      BasePanel,
      BaseModal,
      Search
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .search-top
    padding-left: 30px
    height: 100px
    display: flex
    align-items: center
    .top-title
      font-family: $font-family-regular
      font-size: $font-size-14
      color: $color-text-main
      margin-right :10px
  .list-content
    padding: 0 30px
    .list-head
      width: 100%
      box-sizing: border-box
      height: 50px
      background: $color-FAFAFA
      display: flex
      align-items: center
      padding-left: 40px
      border-bottom: 1px solid $color-E1E4E5
      .list-head-item
        font-family: $font-family-medium
        color: $color-text-main
        font-size: $font-size-14
        &.flex1
          flex: 1
        &.flex2
          flex: 2
          margin-right: 100px
    .list-item
      height: 60px
      box-shadow: 0 1px 0 0 #EFEFEF
      display: flex
      align-items: center
      padding-left: 40px
      .list-item-row
        font-family: $font-family-regular
        color: $color-text-sub
        font-size: $font-size-14
        line-height: 18px
        .dot-box
          margin-right: 8px
          width: 6px
          height: 6px
          border-radius: 50%
          display: inline-block
        .green-dot
          background: #26bd26
        .red-dot
          background: #f6252D
        .avatar
          width: 40px
          height: 40px
          box-sizing: border-box
          border: 1px solid #d9d9d9
          border-raidus: 2px
          margin-left: 8px
        &.flex1
          flex: 1
        &.flex2
          flex: 2
          margin-right: 100px
        &.red-item
          color: $color-main

  .qrcode-container
    position: absolute
    all-center()
    width: 356px
    height: 274px
    background: $color-white
    box-shadow: 0 0 5px 0 rgba(12,6,14,0.60)
    border-radius: 3px
    .cover-top
      height: 61px
      border-bottom: 1px solid #dadada
      display: flex
      align-items: center
      justify-content: space-between
      .top-left
        font-size: $font-size-16
        font-family: $font-family-light
        color: $color-text-main
        padding-left: 30px
      .close-btn
        width: 18px
        height: 18px
        padding: 20px
        transition: all 0.3s
        &:hover
          transform: rotate(-180deg)
    .cover-down
      height: 213px
      display: flex
      align-items: center
      justify-content: center
      .qrcode
        width: 130px
        height: 130px
        border: 2px solid #ededed
        border-radius: 2px
</style>
