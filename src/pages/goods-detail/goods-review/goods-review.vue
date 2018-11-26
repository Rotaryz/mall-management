<template>
  <base-modal v-show="isShow">
    <div slot="content" class="review-wrapper">
      <header>预览效果</header>
      <section class="wrapper">
        <figure class="goods-images" v-if="goodsImage" :style="{backgroundImage: 'url(' + goodsImage.imageURL +')'} ">
          <div>2<span>/</span>5</div>
        </figure>
        <article class="content">
          <div class="title">{{goodsInfo.title}}MIJIA/米家 米家IH电饭煲 4L 3-4人小型家用智能全自动小米电饭锅</div>
          <div class="number">
            <div>剩余{{goodsInfo.store}}件</div>
            <div>{{goodsInfo.isMoneyPage ? '销量':'已兑'}}{{goodsInfo.saleCount}}件</div>
          </div>
          <div class="price">
            <ul class="p-wrapper">
              <li class="unit" v-if="hasPrice">¥</li>
              <li class="money" v-if="hasPrice">{{goodsInfo.platformPrice}}</li>
              <li class="credits">{{hasPrice&&hasCredits?'+':''}}{{hasCredits?goodsInfo.credits:''}}</li>
              <li class="c-text" v-if="hasCredits">播豆</li>
            </ul>
            <div class="origin">¥{{goodsInfo.originPrice}}</div>
          </div>
        </article>
        <div class="h-10"></div>
        <dl class="detail-wrapper">
          <dt class="title">商品详情</dt>
          <dd v-for="(item,index) in detailImages" :key="index">
            <img style="width: 100%" :src="item.imageURL" alt="">
          </dd>
        </dl>
      </section>
      <footer @click="hide">确定</footer>
    </div>
  </base-modal>
</template>

<script type="text/ecmascript-6">
  import BaseModal from 'components/base-modal/base-modal'
  export default {
    name: 'GOODS_REVIEW',
    components: {
      BaseModal
    },
    props: {
      goodsInfo: {
        type: Object,
        default: {
        }
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    },
    computed: {
      goodsImage() {
        return this.goodsInfo.goodsImages[0]
      },
      detailImages() {
        return this.goodsInfo.detailImages
      },
      hasCredits() {
        return this.goodsInfo.credits && +this.goodsInfo.credits > 0
      },
      hasPrice() {
        return this.goodsInfo.platformPrice && +this.goodsInfo.platformPrice > 0
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $wrapper-width = 356px
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .h-10
    height :10px
    background: #F5F5F9;

  .review-wrapper
    height :900px
    width :$wrapper-width
    background :$color-white
    box-shadow: 0 0 5px 0 rgba(12,6,14,0.60);
    border-radius: 3px;
    layout()
    header
      height :60.5px
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #000000;
      text-align: center;
      line-height: @height
    footer
      cursor :pointer
      height :50px
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      line-height: @height
      background :$color-main
    .wrapper
      flex: 1
      overflow :auto
      position :relative
      &::-webkit-scrollbar
        position :absolute
        width: 8px
        height: 10px
      &::-webkit-scrollbar-thumb
        background-color: rgba(0, 0, 0, .15)
        border-radius: 10px
      &::-webkit-scrollbar-thumb:hover
        background-color: rgba(0, 0, 0, .3)
      &::-webkit-scrollbar-track
        box-shadow: inset 0 0 6px rgba(0, 0, 0, .15)
        border-radius: 10px
      .goods-images
        width :$wrapper-width
        height :@width
        background-position :center center
        background-size: cover
        background-repeat :no-repeat
        position :relative
        div
          height :20px
          position :absolute
          right :14.8px
          bottom :10.5px
          background: rgba(0,0,0,0.3);
          border-radius: 9.49px;
          text-align :center
          line-height :@height
          font-family: DINAlternate-Bold;
          font-size: 12px;
          color: #FFFFFF;
          padding :0 6px
          vertical-align :bottom
          &:first-letter
            font-size: 14px
            letter-spacing :1px
          span
            position :relative
            top:-1px
      .content
        padding :13px 11px 18.5px
        .title
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #1F1F1F;
          line-height: 1.2
          no-wrap-plus()
          text-align :justify
          word-break :break-all
        .number
          layout(row,block,nowrap)
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #6E6E6E;
          line-height: 12px;
          margin-top :8.8px
          div:last-child
            margin-left :17.5px
        .price
          margin-top :17px
          layout(row,block,nowrap)
          align-items :flex-end
          .p-wrapper
            layout(row,block,nowrap)
            color: $color-main
            align-items :center
            .unit
              font-family: PingFangSC-Medium;
              font-size: 12px;
              margin-right 1.1px
            .money
              font-family: DINAlternate-Bold;
              font-size: 18px;
            .credits
              margin-right 1.1px
              font-family: DINAlternate-Bold;
              font-size: 18px;
            .c-text
              font-family: PingFangSC-Regular;
              font-size: 16px;
          .origin
            margin-left :7px
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #B1B1B1;
            text-decoration :line-through
      .detail-wrapper
        .title
          padding :14px 11px 12px
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #1F1F1F;
          line-height: 14px;
        dd
          box-sizing :border-box
</style>
