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
        <section></section>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'
  import AdminSelect from 'components/admin-select/admin-select'
  import DataPicker from 'components/data-picker/data-picker'
  export default {
    name: 'OrderManagerMerchant',
    components: {
      BasePanel,
      Search,
      AdminSelect,
      DataPicker
    },
    data() {
      return {
        check: false,
        city: '',
        excelUrl: ''
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
      padding: 0 30px
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
</style>
