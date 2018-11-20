<template>
  <div class="goods-detail">
    <base-panel :isShowPageDetails="false">
      <div slot="content" class="detail-wrapper">
        <header>
          <i></i>
          <div>新建商品</div>
        </header>
        <form>
          <section>
            <p class="left key-point">商品标题</p>
            <div class="middle title">
              <div class="before"></div>
              <input type="text" maxlength="40">
              <div class="after"></div>
            </div>
            <p class="right">最长限40字</p>
          </section>
          <section>
            <p class="left key-point">商品图片</p>
            <div class="middle pictures">
              <nav>
                <label v-for="(item, index) in '123456789012345'" :key="index">
                  <i></i>
                  <span>选择图片</span>
                  <input type="file" accept="image/*" multiple>
                </label>
              </nav>
              <p>上传图片的最佳尺寸：1:1，其他尺寸会影响页效果，格式png，jpeg，jpg，大小不超过2M，商品图片一共可以上传5张，默认第一张为主图封面</p>
            </div>
          </section>
          <section>
            <p class="left key-point">商品库存</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number">
              <div class="after"></div>
            </div>
            <p class="right">件</p>
          </section>
          <section>
            <p class="left key-point">商品原价</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number">
              <div class="after"></div>
            </div>
            <p class="right">元</p>
          </section>
          <section>
            <p class="left key-point">商家折扣</p>
            <div class="middle select">
              <common-select :select="merchantSelect" :wrapperSize="{height:44, width:148}" @setValue="setType"></common-select>
            </div>
            <div class="right"><p>100.00</p>元</div>
          </section>
          <section>
            <p class="left key-point">用户折扣</p>
            <div class="middle select">
              <common-select :select="userSelect" :wrapperSize="{height:44, width:148}" @setValue="setType"></common-select>
            </div>
            <div class="right"><p>100.00</p>元</div>
          </section>
          <section>
            <p class="left key-point">商品佣金</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number">
              <div class="after"></div>
            </div>
            <p class="right">%</p>
            <p class="ext">根据用户购买的价格结算佣金</p>
          </section>
          <ul class="select-group">
            <li @click="test = !test">
              <div :class="test ? 'active' : ''">
                <div class="icon" :class="test ? 'active' : ''"></div>
              </div>
              <p>上架</p>
            </li>
            <li  @click="test2 = !test2">
              <div>
                <div class="icon" :class="test2 ? 'active' : ''"></div>
              </div>
              <p>推荐</p>
            </li>
          </ul>
          <ul class="btn-group">
            <li>取消</li>
            <li>预览</li>
            <li class="red">确定</li>
          </ul>
        </form>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import CommonSelect from 'components/common-select/common-select'
  const DEFAULT_SELECT_OPTIONS = [
    {title: '1折', status: '1'},
    {title: '2折', status: '2'},
    {title: '3折', status: '3'},
    {title: '4折', status: '4'},
    {title: '5折', status: '5'},
    {title: '6折', status: '6'},
    {title: '7折', status: '7'},
    {title: '8折', status: '8'},
    {title: '9折', status: '9'}
  ]
  export default {
    name: 'GoodsDetail',
    components: {
      BasePanel,
      CommonSelect
    },
    data() {
      return {
        userSelect: [{
          select: false,
          show: false,
          children: [{content: '1折', data: DEFAULT_SELECT_OPTIONS}]
        }],
        merchantSelect: [{
          select: false,
          show: false,
          children: [{content: '1折', data: DEFAULT_SELECT_OPTIONS}]
        }],
        test: false,
        test2: false
      }
    },
    methods: {
      setType(val, idx) {
        console.log(val, idx)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  @import '~common/stylus/base'

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

  .key-point
    &
      position :relative
    &:before
      content : '*'
      font-family: PingFangSC-Regular
      font-size: 14px
      color: $color-main
      position :absolute
      top:1px
      left :-7px

  .goods-detail
    fill-box(absolute)
    z-index :90
    background :$color-background


    .detail-wrapper
      padding:30px 0 40px
      header
        font-family: PingFangSC-Medium
        font-size: 16px
        color: #333333
        letter-spacing: 0
        line-height: 16px
        layout(row)
        align-items :center
        i
          width :6px
          height :20px
          background :$color-main
          margin-right :30px
      form
        padding :0 38px
        section
          margin-top :30px
          layout(row)
          align-items :center
          font-family: PingFangSC-Regular
          font-size :14px
          .left
            color: #2A2A2A
            width :96px
          .middle.title
            input-animate(450,44)
            & > input
              text-indent :15px
          .middle.common
            input-animate(148,44)
            & > input
              text-indent :15px
          .middle.pictures
            flex: 1
            layout()
            & > p
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #ACACAC;
              line-height: 14px;
            & > nav
              layout(row)
              label
                display :block
                position:relative
                width :90px
                height :90px
                background: #FFFFFF;
                border: 1px dashed #D9D9D9;
                border-radius: 2px;
                margin-bottom :14px
                margin-right :14px
                layout()
                justify-content :center
                align-items :center
                cursor :pointer
                i
                  width :30px
                  height :@width
                  position :relative
                  &:before
                    content: ''
                    width :100%
                    height :2px
                    background :#ddd
                    col-center()
                  &:after
                    content: ''
                    width :2px
                    height :100%
                    background :#ddd
                    row-center()
                span
                  margin-top :10px
                  font-size: 12px;
                  color: #ACACAC;
                input
                  fill-box(absolute)
                  display :none
          .right
            color: #ACACAC
            margin-left :10px
            layout(row)
            & > p
              color: $color-main
              margin-right :3px
          .ext
            color: #ACACAC
            margin-left: 30px
        ul.select-group
          margin-top :30px
          margin-left :96px
          layout(row)
          li
            layout(row)
            align-items :center
            cursor :pointer
            margin-right :32px
            div
              width :16px
              height :@width
              border: 1px solid $color-sub-line
              border-radius :4px
              transition : all 0.2s ease-in
              box-sizing: border-box
              position:relative
              &.active
                border-color: $color-main
              & > .icon
                position :absolute
                width :16px
                height :@width
                top:-1px
                left:-1px
                transition : all 0.2s ease-in
                opacity :0
                background :url("./icon-pick@2x.png") no-repeat center/100% 100%
                &.active
                  opacity :1
            p
              margin-left :6px
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #666666;
              line-height: 14px;
        ul.btn-group
          margin-top :50px
          margin-left :96px
          layout(row)
          li
            cursor :pointer
            width :96px
            height:40px
            text-align :center
            line-height :@height
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            margin-right: 20px
            font-size: 16px;
            color: $color-text-main
            &.red
              color: $color-white
              background :$color-main
              border-color:$color-main
</style>
