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
            <div class="list-item-row" v-for="(item1, index1) in listArr" :key="index1" :class="item1.className">
              <span class="dot-box green-dot" v-if="index1 == 6"></span>
              <span class="dot-box red-dot" v-if="index1 == 6"></span>
              <span v-if="index1 != 0">{{item1.title}}</span>
              <!--<img src="./logo.jpg" class="avatar" v-if="index1 == 0">-->
              <div class="avatar" :style="{backgroundImage: 'url(' + './logo.jpg' +')'}" v-if="index1 == 0"></div>
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
    {name: '', title: '用户头像', className: 'flex1'},
    {name: '', title: '用户昵称', className: 'flex1'},
    {name: '', title: '性别', className: 'flex1'},
    {name: '', title: '地区', className: 'flex1'},
    {name: '', title: '手机号', className: 'flex1'},
    {name: '', title: '播豆', className: 'flex1'},
    {name: '', title: '大礼包', className: 'flex1'},
    {name: '', title: '注册时间', className: 'flex1'}
  ]
  export default {
    name: 'merchantManager',
    data() {
      return {
        listArr: LIST,
        manageList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        page: 1,
        limit: 10,
        mobile: '',
        startAt: '',
        endAt: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let data = {
          page: this.page,
          limit: this.limit
          // mobile: this.mobile,
          // start_at: this.startAt,
          // end_at: this.endAt
        }
        Customer.getCustomerList(data).then(res => {
          // console.log(res)
        })
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
          background-repeat :no-repeat
          background-position :center center
          background-size :cover
        &.flex1
          flex: 1
        &.flex2
          flex: 2
          margin-right: 100px
        &.red-item
          color: $color-main

</style>
