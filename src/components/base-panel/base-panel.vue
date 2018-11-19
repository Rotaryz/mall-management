<template>
  <div class="base-panel" :style="styles">
    <section class="base-panel-content" :style="slotStyles">
      <slot name="content"></slot>
      <div class="blank" v-if="showNull">
        <img class="blank-icon" src="./icon-null@2x.png"/>
        <div class="blank-title">暂无相关数据</div>
      </div>
    </section>
    <footer v-if="isShowPageDetails">
      <page-detail :pageDtail="pageDetails" @addPage="addPage"></page-detail>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import pageDetail from 'components/page-detail/page-detail'

  export default {
    components: {
      pageDetail
    },
    props: {
      styles: {
        type: String,
        default: ''
      },
      slotStyles: {
        type: String,
        default: ''
      },
      isShowPageDetails: {
        type: Boolean,
        default: true
      },
      showNull: {
        type: Boolean,
        default: false
      },
      pageDetails: {
        type: Object,
        default: () => {
          return {
            total: 1, // 总数量
            per_page: 1, // 一页条数
            total_page: 1 // 总页数
          }
        }
      }
    },
    methods: {
      addPage(page) {
        this.$emit('navToPage', page)
      }
    }
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
    flex:1
    layout()
    & > footer
      height: 121px
      layout(row)
      justify-content: center
      align-items: center
      padding: 0 30px 0 39px
    .base-panel-content
      flex:1
      position :relative
      min-height :400px
      .blank
        row-center()
        top: 55%
        text-align: center
        .blank-icon
          width: 140px
          height: 89px
          margin-bottom: 30px
        .blank-title
          color: #999

</style>
