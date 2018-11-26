<template>
  <base-panel :pageDetails="pageDetails" @navToPage="navToPage">
    <div slot="content" class="user-gifts">
      <div class="header-btn hand" @click="createNew">新建大礼包</div>
      <div class="content-list">
        <div class="list-header">
          <div class="header-key" :class="item.class" v-for="(item, index) in data">
            <span class="contxt">{{item.title}}</span>
          </div>
        </div>
        <div class="list-content">
          <div class="list-item" v-for="(item, index) in arr">
            <div :class="val.class" v-for="(val, i) in data" >

              <span class="overflow" v-if="val.show === 'second'">{{item.price}}</span>
              <span class="overflow" v-if="val.show === 'three'">{{item.stock}}</span>
              <span class="overflow" v-if="val.show === 'four'">{{item.type === 1? '用户大礼包': '商家大礼包'}}</span>

              <div :class="val.class" v-if="val.show === 'first'">
                <img class="head" :src="item.image_url_thumb" alt="">
                <span class="title">{{item.title}}</span>
              </div>
              <span class="overflow" v-if="!val.show">{{item.created_at}}</span>
              <span class="before" v-if="val.show === 'status'" :class="{'green': item.is_open === 1}">{{item.is_open === 1 ? '已开启' : '已关闭'}}</span>

              <div :class="val.class" v-if="val.show === 'last'">
                <span class="handle-item hand" :class="{'grey':item.is_open === 1}" @click="goEdit(item)">修改</span>
                <span class="handle-item hand" v-if="item.is_open === 0" @click="showPop('open', item)">开启</span>
                <span class="handle-item hand" v-if="item.is_open === 1" @click="showPop('close', item)">关闭</span>
                <span class="handle-item hand" :class="{'grey': item.is_open}" @click="showPop('delete', item)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirm"></confirm>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Confirm from 'components/confirm/confirm'
  import {Gifts} from 'api'

  const LIMIT = 10
  export default {
    name: 'user-gifts',
    data() {
      return {
        pageType: '',
        data: [
          {title: '大礼包名称', class: 'item  flex1', name: '', show: 'first'},
          {title: '价格', class: 'item', name: '', show: 'second'},
          {title: '库存', class: 'item', name: '', show: 'three'},
          {title: '类型', class: 'item', name: '', show: 'four'},
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
          total_page: 10 // 总页数
        },
        hasOther: true,
        handleItem: '',
        page: 1
      }
    },
    created() {
      this.getGiftsList(this.page)
    },
    methods: {
      getGiftsList(page) {
        Gifts.getGiftsList({type: 1, page, limit: LIMIT})
          .then((res) => {
            this.arr = res.data
            this.pageDetails = {
              total: res.meta.total,
              per_page: res.meta.per_page,
              total_page: res.meta.last_page
            }
          })
      },
      showPop(type, item) { // 确认弹窗
        this.handleItem = item
        switch (type) {
          case 'open':
            if (this.hasOther) {
              this.popType = 'open1'
              this.$refs.confirm.showConfirm('已有开启的大礼包，请关闭')
            } else {
              this.popType = 'open2'
              this.$refs.confirm.showConfirm('确定要开启大礼包吗？')
            }
            break
          case 'close':
            this.popType = 'close'
            this.$refs.confirm.showConfirm('确定要关闭大礼包吗？')
            break
          case 'delete':
            this.popType = 'delete'
            if (item.is_open) return
            this.$refs.confirm.showConfirm('确定要删除大礼包吗？')
            break
        }
      },
      confirm() {
        if (this.popType === 'open1') {
          Gifts.handleGifts({id: this.handleItem.id, status: 1})
            .then(res => {
              this.$toast.show('开启成功')
              this.getGiftsList(this.page)
            })
        } else if (this.popType === 'close') {
          Gifts.handleGifts({id: this.handleItem.id, status: 0})
            .then(res => {
              this.$toast.show('关闭成功')
              this.getGiftsList(this.page)
            })
        } else if (this.popType === 'delete') {
          Gifts.deleteGifts(this.handleItem.id)
            .then(res => {
              this.$toast.show('删除成功')
              this.getGiftsList(this.page)
            })
        }
      },
      goEdit(item) {
        if (+item.is_open === 1) return
        this.$router.push({path: '/gifts/user-gifts/new-user-gifts', query: {id: item.id}})
      },
      navToPage(page) { // 翻页
        this.page = page
        this.getGiftsList(page)
      },
      createNew() { // 新建大礼包
        this.$router.push({path: '/gifts/user-gifts/new-user-gifts'})
      }
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
      font-family: $font-family-regular
      border-radius: 4px
      background: $color-main
      color: $color-white
      text-align: center
      line-height: 28px
      transition: all 0.3s
      &:hover
        font-size: 13px
    .content-list
      flex: 1
      font-size: 14px
      margin-top: 35px
      .list-header
        flex: 1
        background: $color-FAFAFA
        height: 50px
        line-height: 50px
        font-family: $font-family-medium
        display: flex
        text-align: left
        justify-content: space-between
        padding-left: 2vw
        border-bottom: 1px solid $color-E1E4E5
        color: $color-text-main
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
              word-break: break-all
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
              cursor: inherit
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
