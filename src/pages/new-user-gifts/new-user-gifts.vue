<template>
  <base-panel :isShowPageDetails="false">
    <div slot="content" class="create-new">
      <h3 class="title">新建大礼包</h3>
      <div class="msg-content">
        <div class="item">
          <span class="label">标题</span>
          <input v-model="msg.titleText" placeholder="请输入标题"  class="title-text animate-hover" type="text">
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label">Banner</span>
          <div class="box">
            <div class="update-image hand">
              <span class="text">选择图片</span>
              <input class="sub-img" type="file" accept="image/*" multiple>
            </div>
            <em class="tip">上传图片的最佳尺寸：4:3，其他尺寸会影响页效果，格式png，jpeg，jpg，大小不超过2M。</em>
          </div>
        </div>
        <div class="item">
          <span class="label">图片详情</span>
          <div class="box">
            <div class="update-image">
              <span class="text">选择图片</span>
              <input class="sub-img" type="file" accept="image/*" multiple>
            </div>
            <em class="tip">上传图片的格式png，jpeg，jpg，大小不超过2M。</em>
          </div>
        </div>
        <div class="item">
          <span class="label">库存</span>
          <input class="title-text short" v-model="msg.titleText" type="text" placeholder="请输入库存">
          <span class="unit">个</span>
          <em class="tip">大礼包已售罄隐藏购买入口</em>
        </div>
        <div class="item">
          <span class="label">价格</span>
          <input class="title-text short" v-model="msg.titleText" type="text" placeholder="请输入价格">
          <span class="unit">元</span>
        </div>
        <div class="item">
          <span class="label">播豆</span>
          <input class="title-text short" v-model="msg.titleText" type="text" placeholder="请输入播豆">
          <span class="unit">个</span>
          <em class="tip">0表示不赠送播豆</em>
        </div>
        <div class="item">
          <span class="label">佣金</span>
          <input class="title-text short" v-model="msg.titleText" type="text" placeholder="请输入佣金">
          <span class="unit">%</span>
          <em class="tip">根据用户购买的价格结算佣金</em>
        </div>
        <div class="line"></div>
        <div class="gifts-handle">
          <div class="top">
            <span class="label">赠品</span>
            <span class="add-goods">添加</span>
          </div>
          <div class="goods">
            <div class="list-header border-bottom-1px">
              <div class="header-key" :class="item.class" v-for="(item, index) in data">
                <span class="contxt">{{item.title}}</span>
              </div>
            </div>
          </div>
          <div class="list-content">
            <div class="list-item" v-for="(item, index) in data">
              <div :class="val.class" v-for="(val, i) in data" >
                <div :class="val.class" v-if="val.show === 'first'">
                  <img class="head" src="./goods.jpg" alt="">
                  <span class="title">随便写点字</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'

  export default {
    name: 'business-gifts',
    data() {
      return {
        msg: {
          titleText: ''
        },
        data: [
          {title: '商品名称', class: 'flex1', type: 'first'},
          {title: '价格', class: ''},
          {title: '数量', class: ''},
          {title: '操作', class: ''}
        ]
      }
    },
    methods: {
    },
    watch: {
    },
    components: {
      BasePanel
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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
      padding: 0 30px
      padding-top: 10px
      font-size: 14px
      color: $color-text-assist
      .item
        padding: 15px 0
        display: flex
        align-items: center
        .label
          width: 100px
          position: relative
          color: $color-text-2A
          &:before
            content: '*'
            color: $color-main
        .unit
          color: $color-sub
          margin-left: 10px
        .title-text
          width: 450px
          height: 44px
          border-radius: 4px
          color: $color-text-2A
          border: 1px solid $color-text-D9
          line-height: 44px
          padding-left: 10px
          box-sizing: border-box
        .short
          width: 146px
          margin-left: 30px
        .tip
          margin-left: 20px
          font-style: normal
        .update-image
          width: 90px
          height: @width
          border: 1px dashed $color-text-D9
          border-radius: 2px
          position: relative
          .text
            font-size: 12px
            color: $color-text-assist
            width: 100%
            text-align: center
            position: absolute
            left: 0
            bottom: 16px
          &:before,&:after
            content: ''
            width: 30px
            height: 2px
            background: #DDD
            row-center()
            top: 33px
          &:after
            width: 2px
            height: 30px
            top: 20px
          .sub-img
            position: absolute
            width: 100%
            height: 100%
            opacity: 0
            cursor: pointer
        .box .tip
          display: block
          margin-top: 14px
          margin-left: 0
      .line
        padding: 15px 0
        border-bottom: 1px solid $color-E1E4E5
      .gifts-handle
        padding: 15px 0
        .top
          padding: 15px 0
          padding-left: 7px
          display: flex
          align-items: center
          .label
            width: 100px
            color: $color-text-2A
          .add-goods
            width: 52px
            height: 28px
            line-height: 28px
            font-size: 12px
            text-align: center
            color: $color-main
            border: 1px solid $color-main
            border-radius: 4px
        .goods
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

</style>
