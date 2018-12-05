<template>
  <div class="merchant-manager">
    <base-panel :showNull="showNull" :pageDetails="pageDetails" @navToPage="navToPage">
      <div slot="content">
        <div class="search-top">
          <p class="top-title">手机号</p>
          <search @search="search" placeholerTxt="请输入" ref="search"></search>
        </div>
        <div class="list-content">
          <div class="list-head">
            <div class="list-head-item" v-for="(item, index) in listArr" :key="index" :class="item.className">{{item.title}}</div>
          </div>
          <div class="list-item" v-for="(item, index) in manageList" :key="index">
            <div class="list-item-row" v-for="(item1, index1) in listArr" :key="index1" :class="item1.className" v-if="index1 != (listArr.length - 1)">
              <span class="dot-box green-dot" v-if="item1.showType === 'dot' && item[item1.name] === '已开通'"></span>
              <span class="dot-box red-dot" v-else-if="item1.showType === 'dot'"></span>
              <span v-if="item1.showType !== 'img'">{{item[item1.name]}}</span>
              <img v-if="index1 === 0" class="avatar" :src="item[item1.name]"/>
            </div>
            <div class="list-item-row red-item flex1 hand" @click="showModal(item)">查看店铺</div>
          </div>
        </div>
      </div>
    </base-panel>
    <base-modal :isShow="coverShow">
      <div slot="content">
        <div class="qr-code-container" :class="showActive ? 'model-active' : 'model-un-active'">
          <div class="cover-top">
            <div class="top-left">店铺二维码</div>
            <img src="./icon-close@2x.png" class="close-btn hand" @click="hideModal">
          </div>
          <figure class="cover-down">
            <img class="qr-code" :src="currentMerchant.shopQrCode"/>
          </figure>
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import BaseModal from 'components/base-modal/base-modal'
  import Search from 'components/search/search'
  import { Merchant } from 'api'

  const LIST = [
    {name: 'logo', title: '门店LOGO', className: 'flex1', showType: 'img'},
    {name: 'shopName', title: '门店名称', className: 'flex1-p20'},
    {name: 'managerName', title: '店长', className: 'flex1-p20'},
    {name: 'mobile', title: '手机号', className: 'flex1'},
    {name: 'region', title: '地区', className: 'flex1-p20'},
    {name: 'address', title: '详细地址', className: 'flex1-p20'},
    {name: 'isGiftPack', title: '大礼包', className: 'flex1', showType: 'dot'},
    {name: 'createdAt', title: '开店时间', className: 'flex1'},
    {name: '操作', title: '操作', className: 'flex1'}
  ]
  export default {
    name: 'merchantManager',
    data() {
      return {
        listArr: LIST,
        manageList: [],
        coverShow: false,
        showActive: false,
        timer: null,
        currentMerchant: {},
        page: 1,
        limit: 10,
        showNull: false,
        pageDetails: {
          total: 1, // 总数量
          per_page: 1, // 每一页的条数
          total_page: 1 // 总页数
        }
      }
    },
    created() {
      this._getList()
    },
    methods: {
      showModal(item) {
        if (this.timer) return
        this.currentMerchant = item
        this.coverShow = true
        this.showActive = true
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
        }, 500)
      },
      hideModal() {
        if (this.timer) return
        this.coverShow = false
        this.showActive = false
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.timer = null
          this.currentMerchant = {}
        }, 500)
      },
      // 获取列表
      _getList(data) {
        const {page, limit} = this
        Merchant.getList({limit, page, ...data}).then(res => {
          this.manageList = res.data
          this.showNull = +res.meta.total <= 0
          if (!this.showNull) {
            this.pageDetails = {
              total: res.meta.total,
              per_page: res.meta.per_page,
              total_page: Math.ceil(res.meta.total / res.meta.per_page)
            }
          } else {
            this.pageDetails = {
              total: 1,
              per_page: 1,
              total_page: 1
            }
          }
        })
      },
      // 翻页
      navToPage(page) {
        this.page = page
        this._getList()
      },
      _initPage() {
        this.$refs.basePanel && this.$refs.basePanel.initPage()
      },
      // 搜索
      search(text) {
        if (text) {
          this._getList({mobile: text.trim()})
        } else {
          this._getList()
        }
      },
      _clearSearchText() {
        this.$refs.search && this.$refs.search.clearTxt()
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

  .flex1-p20
    flex: 1
    padding-right :20px

  .merchant-manager
    position :relative
    layout()
    flex:1

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
          object-fit: cover
        &.flex1
          flex: 1
        &.flex2
          flex: 2
          margin-right: 100px
        &.red-item
          color: $color-main

  .qr-code-container
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
      user-select :none
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
      .qr-code
        width: 130px
        height: 130px
        border: 2px solid #ededed
        border-radius: 2px
        object-fit :cover
</style>
