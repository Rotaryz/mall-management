<template>
  <div class="goods-detail">
    <base-panel :isShowPageDetails="false">
      <div slot="content" class="detail-wrapper">
        <header>
          <i></i>
          <div>{{pageTitle}}</div>
        </header>
        <form>
          <section>
            <p class="left key-point">商品标题</p>
            <div class="middle title">
              <div class="before"></div>
              <input type="text" maxlength="40" v-model="title">
              <div class="after"></div>
            </div>
            <p class="right">最长限40字</p>
          </section>
          <section class="pictures">
            <p class="left key-point pictures">商品图片</p>
            <div class="middle pictures">
              <nav>
                <figure v-for="(item, index) in goodsImagesLen" :key="index">
                  <label>
                    <input type="file" accept="image/*" multiple @change="_fileChange($event, index, 'goodsImages')">
                    <i></i>
                    <span>选择图片</span>
                    <img class="img" v-if="goodsImages[index]":src="goodsImages[index].imageURL"/>
                  </label>
                  <img v-if="goodsImages[index]" src="./icon-del@2x.png" @click.stop="deleteImgHandle(index, 'goodsImages')"/>
                </figure>
              </nav>
              <p>上传图片的最佳尺寸：1:1，其他尺寸会影响页效果，格式png，jpeg，jpg，大小不超过2M，商品图片一共可以上传5张，默认第一张为主图封面</p>
            </div>
          </section>
          <section class="pictures">
            <p class="left key-point pictures">详情图片</p>
            <div class="middle pictures">
              <nav>
                <figure v-for="(item, index) in detailImagesLen" :key="index">
                  <label>
                    <input type="file" accept="image/*" multiple @change="_fileChange($event, index, 'detailImages')">
                    <i></i>
                    <span>选择图片</span>
                    <img class="img" v-if="detailImages[index]" :src="detailImages[index].imageURL" />
                  </label>
                  <img v-if="detailImages[index]" src="./icon-del@2x.png" @click.stop="deleteImgHandle(index, 'detailImages')"/>
                </figure>
              </nav>
              <p>上传图片的格式png，jpeg，jpg，大小不超过2M，图片一共可以上传15张</p>
            </div>
          </section>
          <section>
            <p class="left key-point">商品库存</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number" v-model="store">
              <div class="after"></div>
            </div>
            <p class="right">件</p>
          </section>
          <section>
            <p class="left key-point">商品原价</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number" v-model="originPrice">
              <div class="after"></div>
            </div>
            <p class="right">元</p>
          </section>
          <section v-if="isMoneyPage">
            <p class="left key-point">商家折扣</p>
            <div class="middle select">
              <common-select
                ref="merchantSelect"
                :select="merchantSelect"
                :wrapperSize="{height:44, width:148}"
                @selectType="selectType($event, 'userSelect', this)"
                @setValue="setValue($event, 'merchantDiscount')"
              >
              </common-select>
            </div>
            <div class="right"><p>{{merchantDisPrice}}</p>元</div>
          </section>
          <section v-else>
            <p class="left">播豆</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number" v-model="credits">
              <div class="after"></div>
            </div>
            <p class="right">个</p>
          </section>
          <section v-if="isMoneyPage">
            <p class="left key-point">用户折扣</p>
            <div class="middle select">
              <common-select
                ref="userSelect"
                :select="userSelect"
                :wrapperSize="{height:44, width:148}"
                @selectType="selectType($event, 'merchantSelect', this)"
                @setValue="setValue($event, 'userDiscount')"
              ></common-select>
            </div>
            <div class="right"><p>{{userDisPrice}}</p>元</div>
          </section>
          <section v-else>
            <p class="left">价格</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number" v-model="platformPrice" :disabled="allowPlatformPriceReg">
              <div class="after"></div>
            </div>
            <p class="right">元</p>
            <p class="ext">价格默认‘0’，若增加价格，该商品则以播豆+金额形式结算</p>
          </section>
          <section>
            <p class="left" :class="isMoneyPage? 'key-point' : ''">商品佣金</p>
            <div class="middle common">
              <div class="before"></div>
              <input type="number" :disabled="allowCreditsReg" v-model="commission">
              <div class="after"></div>
            </div>
            <p class="right">%</p>
            <p class="ext">{{isMoneyPage?'根据用户购买的价格结算佣金' : '根据用户购买的价格结算佣金（注:商品不添加价格，商品佣金不可用）'}}</p>
          </section>
          <ul class="select-group">
            <li @click="isPutAway = !isPutAway">
              <div :class="isPutAway ? 'active' : ''">
                <div class="icon" :class="isPutAway ? 'active' : ''"></div>
              </div>
              <p>上架</p>
            </li>
            <li  @click="isRecommend = !isRecommend">
              <div>
                <div class="icon" :class="isRecommend ? 'active' : ''"></div>
              </div>
              <p>推荐</p>
            </li>
          </ul>
          <ul class="btn-group">
            <li @click="cancelHandle">取消</li>
            <li @click="reviewHandle">预览</li>
            <li class="red" @click="submitHandle">确定</li>
          </ul>
        </form>
        <goods-review ref="goodReview" :goodsInfo.sync="goodsInfo"></goods-review>
      </div>
    </base-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import CommonSelect from 'components/common-select/common-select'
  import GoodsReview from './goods-review/goods-review'
  import {Goods} from 'api'
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
  const IMG_NUMBER = {
    goodsImages: 5,
    detailImages: 15
  }
  const RATE = /^[0-9]\d*$/
  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$|^(0|0.0|0.00)$/

  export default {
    name: 'GoodsDetail',
    components: {
      BasePanel,
      CommonSelect,
      GoodsReview
    },
    data() {
      return {
        userSelect: [
          {
            select: false,
            show: false,
            children: [{content: '1折', data: DEFAULT_SELECT_OPTIONS}]
          }
        ],
        merchantSelect: [{
          select: false,
          show: false,
          children: [{content: '1折', data: DEFAULT_SELECT_OPTIONS}]
        }],
        pageTitle: '新建商品',
        isPutAway: true, // 是否上架
        isRecommend: true, // 是否推荐
        goodsImages: [],
        detailImages: [],
        title: '',
        store: '', // 库存
        originPrice: '', // 原价
        commission: '',
        userDiscount: 1,
        merchantDiscount: 1,
        platformPrice: '', // 平台价格
        credits: '', // 播豆,积分
        goodsId: ''
      }
    },
    created() {
      this._getGoodsDetail()
    },
    methods: {
      _getGoodsDetail() {
        let goodsId = this.$route.query.goodsId
        this.goodsId = goodsId
        if (!goodsId) return
        document.title = document.title.replace('新建', '编辑')
        this.pageTitle = this.pageTitle.replace('新建', '编辑')
        Goods.getGoodsDetail({goodsId}).then(res => {
          Object.assign(this.$data, res.data)
          this.userSelect[0].children[0].content = `${this.userDiscount}折`
          this.merchantSelect[0].children[0].content = `${this.merchantDiscount}折`
        })
      },
      // 下拉选择
      setValue(obj, flag) {
        // flag 对应的 userDiscount | merchantDiscount
        this[flag] = obj.status
      },
      selectType(obj, otherRefs) {
        // otherRefs对方的refs
        this.$refs[otherRefs].clickHide(0)
      },
      // 删除图片
      deleteImgHandle(index, flag) {
        // flag 对应的 goodsImages | detailImages
        this[flag].splice(index, 1)
      },
      // 上传图片
      _fileChange(e, index, flag) {
        // 检查是否有文件
        let arr = Array.from(e.target.files)
        if (arr.length < 1) return
        this.$loading.show('图片上传中...')
        this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then((resArr) => {
          this.$loading.hide()
          let imagesArr = []
          resArr.forEach(item => {
            if (item.error !== this.$ERR_OK) {
              return this.$toast.show(item.message)
            }
            let obj = {
              id: 0,
              imageId: item.data.id,
              imageURL: item.data.url
            }
            imagesArr.push(obj)
          })
          // 图片的处理
          // flag对应data里面的key值，数据对接建议用映射关系
          // flag 对应的 goodsImages | detailImages
          let newImagesArr = this[flag]
          let howMany = newImagesArr.length ? imagesArr.length : 0
          newImagesArr.splice(index, howMany, ...imagesArr)
          this[flag] = newImagesArr.slice(0, IMG_NUMBER[flag])
        })
      },
      // 返回上级页面路由
      _routerBack() {
        this.$router.back()
      },
      // 确认
      submitHandle() {
        if (!this._checkForm()) return
        let data = {
          ...this.$data,
          type: this.isMoneyPage ? '1' : '2'
        }
        if (this.goodsId) {
          Goods.updateGoods(data).then(res => {
            this.$toast.show('修改成功!')
            this._routerBack()
          })
        } else {
          Goods.createGoods(data).then(res => {
            this.$toast.show('创建成功!')
            this._routerBack()
          })
        }
      },
      _checkForm() {
        let arr = [
          {value: this.titleReg, txt: '请输入商品标题'},
          {value: this.goodsImagesReg, txt: '请至少上传一张商品图片'},
          {value: this.detailImagesReg, txt: '请至少上传一张详情图片'},
          {value: this.storeReg, txt: '库存数量应大于0的整数'},
          {value: this.originPriceReg, txt: '请输入正确的商品原价(2位小数)'},
          {value: this.userDiscountReg, txt: '用户折扣应设置为1至9折'},
          {value: this.merchantDiscountReg, txt: '商家折扣应设置为1至9折'},
          {value: this.platformPriceReg, txt: '价格为小于商品原价的正数(2位小数)'},
          {value: this.creditsReg, txt: '播豆数量不能小于0的整数'},
          {value: this.commissionReg, txt: '佣金应设置为0至100(2位小数)'}
        ]
        return this._checkAction(arr)
      },
      _checkAction(arr) {
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      },
      // 预览
      reviewHandle() {
        this.$refs.goodReview && this.$refs.goodReview.show()
      },
      // 取消
      cancelHandle() {
        this._routerBack()
      }
    },
    watch: {
      // 清空佣金栏
      allowCreditsReg(val) {
        val && (this.commission = '')
      },
      // 清空价格栏
      allowPlatformPriceReg(val) {
        val && (this.platformPrice = '')
      }
    },
    computed: {
      // 判断是否为折扣商品
      isMoneyPage() {
        return this.$route.path.includes('money')
      },
      // 表单验证
      userDisPrice() {
        return (this.originPrice * this.userDiscount / 10).toFixed(2)
      },
      merchantDisPrice() {
        return (this.originPrice * this.merchantDiscount / 10).toFixed(2)
      },
      goodsImagesLen() {
        return Math.min(this.goodsImages.length + 1, IMG_NUMBER['goodsImages'])
      },
      detailImagesLen() {
        return Math.min(this.detailImages.length + 1, IMG_NUMBER['detailImages'])
      },
      titleReg() {
        return this.title
      },
      goodsImagesReg() {
        return this.goodsImages.length
      },
      detailImagesReg() {
        return this.detailImages.length
      },
      storeReg() {
        return +this.store > 0 && RATE.test(this.store)
      },
      originPriceReg() {
        return +this.originPrice > 0 && MONEYREG.test(this.originPrice)
      },
      commissionReg() {
        return +this.commission >= 0 && +this.commission <= 100 && MONEYREG.test('' + +this.commission)
      },
      userDiscountReg() {
        return +this.userDiscount > 0 && +this.userDiscount < 10
      },
      merchantDiscountReg() {
        return +this.merchantDiscount > 0 && +this.merchantDiscount < 10
      },
      platformPriceReg() {
        let flag = true
        if (!this.isMoneyPage) {
          flag = +this.platformPrice >= 0 && +this.platformPrice < +this.originPrice && MONEYREG.test('' + +this.platformPrice)
        }
        return flag
      },
      creditsReg() {
        let flag = true
        if (!this.isMoneyPage) {
          flag = +this.credits > 0 && RATE.test(this.credits)
        }
        return flag
      },
      // 能否编辑价格栏
      allowPlatformPriceReg() {
        let flag = false
        if (!this.isMoneyPage) {
          flag = +this.credits <= 0
        }
        return flag
      },
      // 能否编辑播豆栏
      allowCreditsReg() {
        let flag = false
        if (!this.isMoneyPage) {
          flag = +this.platformPrice <= 0
        }
        return flag
      },
      // 商品信息
      goodsInfo() {
        return {...this.$data, isMoneyPage: this.isMoneyPage}
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
          &.pictures
            align-items :flex-start
          .left
            color: #2A2A2A
            width :96px
          .left.pictures
            margin-top :15px
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
              figure
                position :relative
                margin-bottom :14px
                margin-right :14px
                cursor :pointer
                img
                  display :block
                  width :18px
                  height: @width
                  position :absolute
                  right :-1px
                  top:1px
                  background :red
                  z-index :10
                label
                  width :90px
                  height :90px
                  box-sizing :border-box
                  display :block
                  position:relative
                  border: 1px dashed #D9D9D9;
                  border-radius: 2px;
                  layout()
                  justify-content :center
                  align-items :center
                  cursor :pointer
                  .img
                    position :absolute
                    width :90px
                    height :90px
                    top:-1px
                    left: -1px
                    border: 1px solid #E8E8E8;
                    border-radius: 2px;
                    object-fit :cover
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
          user-select :none
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
          user-select :none
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
