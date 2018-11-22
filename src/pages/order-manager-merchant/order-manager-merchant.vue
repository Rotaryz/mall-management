<template>
  <div class="order-manager">
    <base-panel>
      <div slot="content" class="order-manager-wrapper">
        <header>
          <section>
            <p>时间范围</p>
            <data-picker @change="dataChange"></data-picker>
          </section>
          <section class="city">
            <admin-select :isUse="!check" ref="city" @setValue="setValue"></admin-select>
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
            <p>{{item.title}}</p>
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
  import OrderItem from 'components/order-item/order-item'
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
        check: false,
        city: '',
        excelUrl: '',
        tabList: TAB_LIST
      }
    },
    methods: {
      setValue(city) {
        this.city = city
        console.log(city)
      },
      dataChange(time) {
        console.log(time)
      },
      search() {
        console.log('search')
      },
      changeTabHandle(item, index) {
        this.tabList.forEach((it, idx) => {
          it.isActive = idx === index
        })
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
