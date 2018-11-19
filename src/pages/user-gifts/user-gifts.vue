<template>
  <base-panel :pageDetails="pageDetails" @navToPage="navToPage">
    <div slot="content" class="user-gifts">
      <div class="header-btn hand" @click="createNew">新建大礼包</div>
      <div class="content-list">
        <div class="list-header border-bottom-1px">
          <div class="header-key" :class="item.class" v-for="(item, index) in data">
            <span class="contxt">{{item.title}}</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-item" v-for="(item, index) in arr">
            <div :class="val.class" v-for="(val, i) in data" >

              <span class="overflow" v-if="!val.show">{{val.title}}</span>

              <div :class="val.class" v-if="val.show === 'first'">
                <img class="head" src="./gifts.jpg" alt="">
                <span class="title">随便写点字</span>
              </div>

              <span class="before" v-if="val.show === 'status'" :class="{'green': index%2 === 0}">{{index%2 === 0 ? '已开启' : '已关闭'}}</span>

              <div :class="val.class" v-if="val.show === 'last'">
                <span class="handle-item hand" @click="showPop('open', item)">修改</span>
                <span class="handle-item hand" @click="showPop('close', item)">关闭</span>
                <span class="handle-item hand" :class="{'grey': grey}" @click="showPop('delete', item)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirm" @cancel="cancel"></confirm>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Confirm from 'components/confirm/confirm'

  export default {
    name: 'user-gifts',
    data() {
      return {
        pageType: '',
        data: [
          {title: '大礼包名称', class: 'item  flex1', name: '', show: 'first'},
          {title: '价格', class: 'item', name: ''},
          {title: '库存', class: 'item', name: ''},
          {title: '类型', class: 'item', name: ''},
          {title: '状态', class: 'item', name: '', show: 'status'},
          {title: '创建时间', class: 'item', name: ''},
          {title: '操作', class: 'item list-handle flex2', name: '', show: 'last'}
        ],
        arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        popType: 'open',
        grey: true,
        pageDetails: {
          total: 100, // 总数量
          per_page: 10, // 一页条数
          total_page: 10, // 总页数
        }
      }
    },
    methods: {
      showPop(type) { // 确认弹窗
        this.popType = type
        switch (type) {
          case 'open':
            console.log(this.$refs.confirm)
            this.$refs.confirm.showConfirm('你确定要上架？')
            break
          case 'close':
            this.$refs.confirm.showConfirm('你确定要上架？')
            break
          case 'delete':
            this.$refs.confirm.showConfirm('你确定要上架？')
            break
        }
      },
      confirm() {
        console.log('close')
      },
      cancel() {
        console.log('cancel')
      },
      navToPage(page) { // 翻页
        console.log(page)
      },
      createNew() { // 新建大礼包
        this.$router.push({path: '/gifts/user-gifts/new-user-gifts'})
      }
    },
    watch: {
      $route(to, from) {
        this.pageType = to.query.pageType
      },
    },
    components: {
      BasePanel,
      Confirm
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .user-gifts

    display: flex
    flex: 1
    flex-direction: column
    font-family: $fontFamilyRegular
    padding: 40px 30px
    padding-bottom: 0
    .header-btn
      width: 90px
      height: 28px
      font-size: $font-size-12
      border-radius: 4px
      background: $color-main
      color: $color-white
      text-align: center
      line-height: 28px
    .content-list
      flex: 1
      font-size: 14px
      margin-top: 35px
      .list-header
        flex: 1
        background: $color-FAFAFA
        height: 50px
        line-height: 50px
        font-family: $font-family-regular
        display: flex
        text-align: left
        justify-content: space-between
        padding-left: 2vw
        border-bottom-1px(#E1E4E5)
        color: $color-text-sub
        .header-key
          flex: 1
          overflow: hidden
          padding-right: 10px
        .flex1
          flex: 1.8
        .flex2
          flex: 1.5
          .contxt
            position: relative
      .list-content
        .list-item
          height: 60px
          flex: 1
          display: flex
          align-items: center
          justify-content: space-between
          padding-left: 2vw
          box-sizing: border-box
          border-bottom: 0.5px solid $color-line
          text-align: left
          .item
            flex: 1
            no-wrap()
            display: flex
            align-items: center
            line-height: 18px
            position: relative
            padding-right: 10px
            .head
              width: 54px
              height: 40px
              margin-right: 10px
            .title
              white-space: pre-wrap
              display: -webkit-box
              overflow: hidden
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical

          .overflow
            no-wrap()
          .flex1
            flex: 1.8
          .flex2
            flex: 1.5
          .before
            text-indent: 14px
            display: block
          .before:before
            col-center()
            left: 0
            content: ''
            width: 6px
            height: 6px
            border-radius: 10px
            background: #F6262D
          .green:before
            background: #26BD26
          .list-handle
            color: $color-main
            white-space: nowrap
            .handle-item
              padding: 0 7px
              border-left: 0.5px solid #d3d3d3
              &:first-child
                border-left: 0
                padding-left: 0
            .grey
              color: $color-text-2A

  .create-new
    display: flex
    flex: 1
    flex-direction: column
    font-family: $fontFamilyRegular
    padding: 30px 0 50px
    .title
      font-size: $font-size-16
      font-family: $font-family-medium
      padding-left: 20px
      position: relative
      &:before
        content: ''
        background: $color-main
        width: 6px
        height: 20px
        position: absolute
        left: 0
        col-center()
    .msg-content
      padding-top: 10px
      font-size: 14px
      color: $color-text-assist
      .item
        padding: 15px 30px
        display: flex
        align-items: center
        .label
          width: 100px
          position: relative
          color: $color-text-2A
          &:before
            content: '*'
            color: $color-main
        .title-text
          width: 450px
          height: 44px
          border-radius: 4px
          color: $color-text-2A
          border: 1px solid $color-text-D9
          line-height: 44px
          padding-left: 4px
        .tip
          margin-left: 20px
          font-style: normal



</style>
