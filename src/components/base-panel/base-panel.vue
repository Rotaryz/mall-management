<template>
  <div class="base-panel" :style="styles">
    <slot name="content"></slot>
    <footer v-if="isShowPageDetails">
      <page-detail :pageDtail="pageDetails" @addPage="addPage"></page-detail>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import pageDetail from 'components/page-detail/page-detail'

  export default {
    components: {
      pageDetail,
    },
    props: {
      styles: {
        type: String,
        default: '',
      },
      isShowPageDetails: {
        type: Boolean,
        default: true
      },
      pageDetails: {
        type: Object,
        default: () => {
          return {
            total: 1, // 总数量
            per_page: 1, // 一页条数
            total_page: 1, // 总页数
          }
        },
      },
    },
    methods: {
      addPage(page) {
        this.$emit('navToPage', page)
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .base-panel
    margin: 22px
    background: #FFFFFF
    box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
    overflow: hidden
    border-radius: 6px
    flex: 1
    & > footer
      height: 121px
      layout(row)
      justify-content :center
      align-items :center
      padding : 0 30px 0 39px

</style>
