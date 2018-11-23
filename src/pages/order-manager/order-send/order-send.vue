<template>
  <base-modal :isShow="show">
    <form slot="content" class="confirm-content" :class="showActive ? 'model-active' : 'model-un-active'">
      <article class="content-wrapper">
        <h3 class="title">发货</h3>
        <ul class="wrapper">
          <li class="item-wrapper">
            <div class="left">订单号</div>
            <div class="right">123345667899000</div>
          </li>
          <li class="item-wrapper">
            <div class="left">收货人</div>
            <div class="right">123345667899000</div>
          </li>
          <li class="item-wrapper">
            <div class="left">手机号</div>
            <div class="right">123345667899000</div>
          </li>
          <li class="item-wrapper">
            <div class="left">收货地址</div>
            <div class="right">广东省广州海珠区新港街道新港中路397号T.i.T创意园翡冷翠小镇A</div>
          </li>
          <li class="line-wrapper">物流信息</li>
          <li class="item-wrapper">
            <div class="left">快递公司</div>
            <div class="right">
              <common-select
                ref="select"
                :select="selectData"
                :wrapperSize="{height:38, width:390}"
                @setValue="setValue"
              >
              </common-select>
            </div>
          </li>
          <li class="item-wrapper">
            <div class="left">快递单号</div>
            <div class="right"><input type="text" placeholder="请输入" v-model="expressOrder"></div>
          </li>
        </ul>
      </article>
      <div class="btn-group">
        <span @click="cancel" class="btn cancel">取消</span>
        <span @click="confirm" class="btn confirm" :class="allowSubmit?'active':''">发货</span>
      </div>
    </form>
  </base-modal>
</template>

<script type="text/ecmascript-6">
  import BaseModal from 'components/base-modal/base-modal'
  import CommonSelect from 'components/common-select/common-select'
  const DEFAULT_SELECT_OPTIONS = [
    {title: '顺丰', status: '1'},
    {title: '中通', status: '2'},
    {title: '顺丰', status: '1'},
    {title: '中通', status: '2'},
    {title: '顺丰', status: '1'},
    {title: '中通', status: '2'},
    {title: '顺丰', status: '1'},
    {title: '中通', status: '2'},
    {title: '顺丰', status: '1'},
    {title: '中通', status: '2'},
    {title: '顺达', status: '3'}
  ]

  export default {
    components: {
      BaseModal,
      CommonSelect
    },
    data() {
      return {
        title: '',
        text: '',
        show: false,
        timeout: true,
        showActive: false,
        selectData: [
          {
            select: false,
            show: false,
            children: [{content: '请选择', data: DEFAULT_SELECT_OPTIONS}]
          }
        ],
        expressCompany: '',
        expressOrder: ''
      }
    },
    destroyed() {
      this.timeout && clearTimeout(this.timeout)
    },
    methods: {
      setValue(val) {
        this.expressCompany = val.title
      },
      showConfirm() {
        this.show = true
        this.showActive = true
      },
      confirm() {
        if (!this.allowSubmit) {
          return
        }
        if (this.timeout) {
          setTimeout(() => {
            this.show = false
          }, 100)
          this.showActive = false
          this.timeout = false // 防止重复点击
          this.$emit('confirm')
          setTimeout(() => {
            this.timeout = true
          }, 500)
        }
      },
      cancel() {
        setTimeout(() => {
          this.show = false
        }, 100)
        this.showActive = false
        this.$emit('cancel')
      }
    },
    computed: {
      expressCompanyReg() {
        return this.expressCompany
      },
      expressOrderReg() {
        return this.expressOrder
      },
      allowSubmit() {
        return this.expressCompanyReg && this.expressOrderReg
      }
    },
    watch: {
      $route() {
        this.show = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  input::-webkit-input-placeholder { /* WebKit browsers */
    color: $color-ccc
    font-size: 14px
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: $color-ccc
    font-size: 14px
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: $color-ccc
    font-size: 14px
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: $color-ccc
    font-size: 14px
  }

  .confirm-content
    width: 620px
    min-height: 514px
    background: $color-white
    border-radius: 3px
    box-shadow: 0 0 5px 0 rgba(12, 6, 14, 0.6)
    text-align: center
    layout()
    .btn-group
      text-align: center
      display: flex
      justify-content: center
      user-select :none
      padding :38px 0 32px
      .btn
        width: 96px
        height: 40px
        line-height: 40px
        border-radius: 3px
        border: 1px solid $color-text-D9
        box-sizing :border-box
      .cancel
        border-right: 1px solid $color-line
        cursor :pointer
      .confirm
        border-right: 1px solid $color-main
        background: $color-main
        color: $color-white
        margin-left: 20px
        opacity : 0.5
        &.active
          cursor :pointer
          opacity :1
    .content-wrapper
      font-size: $font-size-14
      color: $color-text-main
      flex: 1
      line-height :1
      font-family: PingFangSC-Regular;
      .title
        padding :23px 0
        font-family: PingFangSC-Medium;
        font-size: 16px;
      .wrapper
        border-top:1px solid $color-DADADA
        .line-wrapper
          background :$color-FAFAFA
          font-family: PingFangSC-Medium;
          padding :8px 0
          text-indent :50px
          text-align :left
          border-bottom : 1px solid $color-DADADA
        .item-wrapper
          border-bottom : 1px solid $color-DADADA
          layout(row,block,nowrap)
          align-items :center
          .left
            layout()
            justify-content :center
            align-items :flex-start
            text-indent :50px
            flex: 1
          .right
            position :relative
            border-left: 1px solid $color-DADADA
            color:#999
            flex: 3
            layout()
            justify-content :center
            align-items :flex-start
            padding :18px 46px 18px 48px
            text-align :justify
            word-break :break-all
            line-height :1.2
            input
              width :100%
              height :14px


  .model-active
    animation: layerFadeIn .3s

  .model-un-active
    animation: hideFadeIn .4s

  @keyframes layerFadeIn {
    0% {
      opacity: 0
      transform: scale(.5)
    }
    100% {
      opacity: 1
      transform: scale(1)
    }
  }

  @keyframes hideFadeIn {
    0% {
      opacity: 1
      transform: scale(1)
    }
    100% {
      transform: scale(.5)
      opacity: 0
    }
  }
</style>
