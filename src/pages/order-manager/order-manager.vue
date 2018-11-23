<template>
  <div class="order-manager">
    <base-panel>
      <div slot="content" class="order-manager-wrapper">
        <header>
          <section>
            <p>时间范围</p>
            <data-picker ref="dataPicker" @change="dataChange"></data-picker>
          </section>
          <section class="city">
            <admin-select ref="location" @setValue="setValue"></admin-select>
          </section>
          <section>
            <p>订单号</p>
            <search @search="search" placeholerTxt="请输入" ref="search"></search>
          </section>
          <section>
            <a :href="excelUrl" class="excel animate-hover" target="_blank">导出Excel</a>
          </section>
        </header>
        <ul>
          <li v-for="(item, index) in tabList" :class="item.isActive ? 'active' : ''" @click="changeTabHandle(item, index)">
            <i></i>
            <em></em>
            <p>{{item.title}}{{isUserPage?'user':''}}</p>
          </li>
        </ul>
        <dl>
          <dd v-for="(item, index) in '1234567890'">
            <order-item></order-item>
          </dd>
        </dl>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'
  import AdminSelect from 'components/admin-select/admin-select'
  import DataPicker from 'components/data-picker/data-picker'
  import OrderItem from './order-item/order-item'
  const TAB_LIST = [
    {title: '全部', isActive: true},
    {title: '待付款', isActive: false},
    {title: '待发货', isActive: false},
    {title: '待收货', isActive: false},
    {title: '已完成', isActive: false},
    {title: '已关闭', isActive: false}
  ]
  export default {
    name: 'OrderManagerMerchant',
    components: {
      BasePanel,
      Search,
      AdminSelect,
      DataPicker,
      OrderItem
    },
    data() {
      return {
        excelUrl: '',
        tabList: TAB_LIST,
        page: 1,
        limit: 10
      }
    },
    created() {
      this._initPageParams()
      this._getOrderList()
    },
    methods: {
      // 初始化页面
      _initPageParams() {
        this.page = 1
        this.excelUrl = ''
        this._clearSearchText()
        this._clearLocation()
        this._clearDateTime()
        this._resetTabStatus()
      },
      _getOrderList() {
        // todo
      },
      // 城市选择器
      setValue(location) {
        const {province, city, area} = location
        console.log(province, city, area)
      },
      _clearLocation() {
        this.$refs.location && this.$refs.location.clearLocationInfo()
      },
      // 日期选择
      dataChange(time) {
        console.log(time)
      },
      _clearDateTime() {
        this.$refs.dataPicker && this.$refs.dataPicker.clearTime()
      },
      // 搜索
      search() {
        console.log('search')
      },
      _clearSearchText() {
        this.$refs.search && this.$refs.search.clearTxt()
      },
      // tab栏
      changeTabHandle(item, index) {
        this.tabList.forEach((it, idx) => {
          it.isActive = idx === index
        })
      },
      _resetTabStatus() {
        this.tabList.forEach((it, idx) => {
          it.isActive = idx === 0
        })
      },
      // 翻页
      navToPage(page) {
        this.page = page
      }
    },
    computed: {
      // 判断是否为折扣页面
      isUserPage() {
        return this.$route.path.includes('user')
      },
      OrderType() {
        return this.isUserPage ? '1' : '2' // 1折扣商品 2播豆商品 todo
      }
    },
    watch: {
      // 路由跳转
      $route() {
        this._initPageParams()
        this._getOrderList()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .common-wrapper
    margin-right: 10px
    overflow :hidden
    layout(row,block,nowrap)
    align-items :center

  .order-manager
    position :relative
    layout()
    flex:1
    .order-manager-wrapper
      position :relative
      & > header
        padding: 0 30px
        height: 100px
        layout(row)
        align-items: center
        font-family: $font-family-regular
        & > section
          layout(row)
          align-items :center
          margin-right :40px
          & > p
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0;
            line-height: 14px;
            margin-right :10px

      & > ul
        padding: 0 30px
        layout(row)
        border-bottom: 1px solid #CCCCCC;
        li
          position :relative
          height :46px
          width :120px
          background: #FAFAFA;
          border: 1px solid #CCCCCC;
          box-sizing :border-box
          border-bottom :none
          border-right: none
          layout()
          justify-content :center
          align-items :center
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #222222;
          cursor :pointer
          transition: background 0.4s ease-out
          &:last-child
            border-right: 1px solid #CCCCCC;
          &:hover
            background :$color-white
          &.active
            background :$color-white
          & > i
            z-index :2
            position :absolute
            top:-1px
            left :-1px
            width :0
            height :4px
            background $color-main
          &.active > i
            transition: all 0.4s ease-out
            width :120px
          &.active > em
            z-index :2
            position :absolute
            top:45px
            left :0px
            width :100%
            height :2px
            background :$color-white

      & > dl
        padding: 26px 30px
        & > dd
          margin-bottom :15px

</style>
