<template>
  <div class="demo" @touchmove.prevent>

    <!--日期选择-->
    <data-picker @change="dataChange"></data-picker>

    <!--导出按钮-->
    <a :href="excelUrl" class="excel animate-hover" @click="showConfirm" target="_blank">导出Excel</a>

    <!--搜索-->
    <search @search="search" placeholerTxt="请输入" ref="search"></search>

    <!--翻页器-->
    <page-detail ref="pageDetail" :pageDetail="pageDetail" @addPage="addPage"></page-detail>

    <!--弹窗-->
    <confirm
      ref="confirm"
      @confirm="confirm"
      @cancel="cancel" >
    </confirm>

    <!--地区选择-->
    <admin-select :isUse="!check" ref="city" @setValue="setValue"></admin-select>

  </div>
</template>

<script type="text/ecmascript-6">
  import PageDetail from 'components/page-detail/page-detail'
  import Search from 'components/search/search'
  import Confirm from 'components/confirm/confirm'
  import AdminSelect from 'components/admin-select/admin-select'
  import DataPicker from 'components/data-picker/data-picker'

  export default {
    name: 'DEMO',
    data() {
      return {
        time: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        excelUrl: '',
        pageDetail: {
          total: 100, // 总数据量
          per_page: 10, // 每页多少数据
          total_page: 10 // 总页数
        },
        showPop: true,
        showActive: false,
        check: false,
        focus: false
      }
    },
    created() {
    },
    methods: {
      search() {
        console.log('search')
      },
      beginPage() {
        this.$refs.pageDetail.beginPage()
      },
      addPage(num) {
        console.log(num)
      },
      showConfirm(e) {
        e.preventDefault()
        this.$refs.confirm.showConfirm('你确定？')
      },
      confirm() {
        console.log('confirm')
      },
      cancel() {
        console.log('cancel')
      },
      setValue(city) {
        this.city = city
        console.log(city)
      },
      dataChange(time) {
        console.log(time)
      }
    },
    components: {
      PageDetail,
      Search,
      Confirm,
      AdminSelect,
      DataPicker
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

</style>
