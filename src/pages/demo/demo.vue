<template>
  <div class="demo" @touchmove.prevent>

    <!--日期选择-->
    <el-date-picker
      v-model="time"
      size="small"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>

    <!--导出按钮-->
    <a :href="excelUrl" class="excel animate-hover" @click="showConfirm" target="_blank">导出Excel</a>

    <!--搜索-->
    <search @search="search" placeholerTxt="请输入" ref="search"></search>

    <!--翻页器-->
    <page-detail ref="pageDetail" :pageDtail="pageDetail" @addPage="addPage"></page-detail>

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
        check: false
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
        this.$refs.confirm.showConfirm('上架', '你确定？')
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
      }
    },
    components: {
      PageDetail,
      Search,
      Confirm,
      AdminSelect
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
