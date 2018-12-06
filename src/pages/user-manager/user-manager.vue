<template>
  <div class="merchant-manager">
    <base-panel :showNull="showNull" :pageDetails="pageDetails" @navToPage="navToPage">
      <div slot="content">
        <div class="search-top">
          <p class="top-title">手机号</p>
          <search @search="search" placeholerTxt="请输入手机号" ref="search"></search>
        </div>
        <div class="list-content">
          <div class="list-head">
            <div class="list-head-item" v-for="(item, index) in listArr" :key="index" :class="item.className">{{item.title}}</div>
          </div>
          <div class="list-item" v-for="(item, index) in manageList" :key="index">
            <div class="list-item-row" v-for="(item1, index1) in listArr" :key="index1" :class="item1.className">
              <span class="dot-box green-dot" v-if="index1 == 6 && item[item1.name] === '已开通'"></span>
              <span class="dot-box red-dot" v-else-if="index1 == 6"></span>
              <span v-if="index1 !== 0">{{item[item1.name]}}</span>
              <img v-if="index1 === 0"class="avatar" :src="item[item1.name]" />
            </div>
          </div>
        </div>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'
  import { Customer } from 'api'

  const LIST = [
    {name: 'avatar', title: '用户头像', className: 'flex1'},
    {name: 'nickname', title: '用户昵称', className: 'flex1-p20'},
    {name: 'sex', title: '性别', className: 'flex1'},
    {name: 'region', title: '地区', className: 'flex1-p20'},
    {name: 'mobile', title: '手机号', className: 'flex1'},
    {name: 'credits', title: '播豆', className: 'flex1'},
    {name: 'isGiftPack', title: '大礼包', className: 'flex1'},
    {name: 'createdAt', title: '注册时间', className: 'flex1'}
  ]
  export default {
    name: 'merchantManager',
    data() {
      return {
        listArr: LIST,
        manageList: [],
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
      _getList(data) {
        const {page, limit} = this
        Customer.getCustomerList({limit, page, ...data}).then(res => {
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
      Search
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .flex1-p20
    flex: 1
    padding-right :20px
  .flex0-8
    flex: 0.8

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
        layout(row,block,nowrap)
        align-items :center
        span
          no-wrap-plus()
        .dot-box
          margin-right: 8px
          width: 6px
          height: 6px
          border-radius: 50%
          display: inline-block
          white-space :nowrap
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
          object-fit :cover
        &.flex1
          flex: 1
        &.flex2
          flex: 2
          margin-right: 100px
        &.red-item
          color: $color-main

</style>
