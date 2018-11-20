<template>
  <base-panel :isShowPageDetails="false">
    <div slot="content" class="create-new">
      <h3 class="title">新建大礼包</h3>
      <div class="msg-content">
        <div class="item">
          <span class="label">标题</span>
          <div class="hover-input">
            <span class="before"></span>
            <span class="after"></span>
            <input v-model="msg.title" class="title-text" type="text" oninput="if(value.length > 40)value = value.slice(0, 40)">
          </div>
          <em class="tip">最长限40字</em>
        </div>
        <div class="item">
          <span class="label top">Banner</span>
          <div class="box">
            <label>
              <div class="update-image hand">
                <span class="text">选择图片</span>
                <input class="sub-img" type="file" @change="_fileChange($event, 'banner')" accept="image/*" multiple>
                <div class="img" v-if="bannerSrc" :style="{backgroundImage: 'url(' + bannerSrc + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <img v-if="bannerSrc" @click.stop="deleteImg($event, 'banner')" class="delete" src="./icon-del.png" alt="">
              </div>
            </label>
            <em class="tip">上传图片的最佳尺寸：4:3，其他尺寸会影响页效果，格式png，jpeg，jpg，大小不超过2M。</em>
          </div>
        </div>
        <div class="item">
          <span class="label top">图片详情</span>
          <div class="box">
            <label>
              <div class="update-image hand">
                <span class="text">选择图片</span>
                <input class="sub-img" type="file" @change="_fileChange($event, 'detail')" accept="image/*" multiple>
                <div class="img" v-if="detailSrc" :style="{backgroundImage: 'url(' + detailSrc + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
                <img v-if="detailSrc" @click.stop="deleteImg($event, 'detail')" class="delete" src="./icon-del.png" alt="">
              </div>
            </label>

            <em class="tip">上传图片的格式png，jpeg，jpg，大小不超过2M。</em>
          </div>
        </div>
        <div class="item">
          <span class="label">库存</span>
          <div class="hover-short-input">
            <span class="before"></span>
            <span class="after"></span>
            <input class="title-text short" v-model="msg.giftpack_stock" type="text">
          </div>
          <span class="unit">个</span>
          <em class="tip">如果已售罄不显示大礼包</em>
        </div>
        <div class="item">
          <span class="label">价格</span>
          <div class="hover-short-input">
            <span class="before"></span>
            <span class="after"></span>
            <input class="title-text short" v-model="msg.price" type="text">
          </div>
          <span class="unit">元</span>
        </div>
        <div class="item">
          <span class="label">播豆</span>
          <div class="hover-short-input">
            <span class="before"></span>
            <span class="after"></span>
            <input class="title-text short" v-model="msg.planting_beans" type="text">
          </div>
          <span class="unit">个</span>
          <em class="tip">0表示不赠送播豆</em>
        </div>
        <div class="item">
          <span class="label">佣金</span>
          <div class="hover-short-input">
            <span class="before"></span>
            <span class="after"></span>
            <input class="title-text short" v-model="msg.commission_rate" type="text">
          </div>
          <span class="unit">%</span>
          <em class="tip">根据用户购买的价格结算佣金</em>
        </div>
        <div class="line"></div>
        <div class="gifts-handle">
          <div class="top">
            <span class="label">赠品</span>
            <span class="add-goods hand" @click="addGoods">添加</span>
          </div>
          <div class="goods">
            <div class="list-header">
              <div class="header-key" :class="item.class" v-for="(item, index) in data">
                <span class="contxt">{{item.title}}</span>
              </div>
            </div>
          </div>
          <div class="list-content">
            <div class="list-item" v-for="(item, index) in arr">
              <div class="item flex1">
                <img class="head" src="./goods.jpg" alt="">
                <span class="name">随便写点字</span>
              </div>
              <span class="item">100</span>
              <div class="counter item">
                <span class="sub text hand" @click="subCount(index)">-</span>
                <input type="number" readonly class="number text" v-model="item.count">
                <span class="add text hand" @click="addCount(index)">+</span>
              </div>
              <span class="item main hand" @click="deleteGoods(index)">删除</span>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <span @click="toBack" class="btn cancel hand">取消</span>
          <span @click="submitGifts" class="btn confirm hand">确定</span>
        </div>
      </div>
      <select-goods ref="goodsList" @selectGoods="selectGoods" ></select-goods>
      <confirm ref="confirm" @confirm="delGoods"></confirm>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import SelectGoods from 'components/select-goods/select-goods'
  import Confirm from 'components/confirm/confirm'

  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/
  const RATE = /^[0-9]\d*$/
  export default {
    name: 'new-user-gifts',
    data() {
      return {
        msg: {
          title: '',
          giftpack_banner_images: [],
          giftpack_images: [],
          giftpack_stock: '',
          price: '',
          planting_beans: '',
          commission_rate: '',
          giftpack_goods_skus: [],
          image_id: '' // 封面图id
        },
        data: [
          {title: '商品名称', class: 'item flex1', show: 'name'},
          {title: '价格', class: 'item', text: '100'},
          {title: '数量', class: 'item', show: 'counter', value: '1'},
          {title: '操作', class: 'item main', text: '删除'}
        ],
        arr: [
          {count: 1, name: 'a'},
          {count: 1, name: 'b'}
        ],
        bannerSrc: '',
        detailSrc: '',
        disabledCover: false,
        willDelGoods: ''
      }
    },
    methods: {
      _fileChange(e, type) { // 上传图片
        let arr = Array.from(e.target.files)
        if (arr.length < 1) {
          return
        }
        switch (type) {
          case 'banner' :
            this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then((resArr) => {
              this.$loading.hide()
              if (resArr[0].error !== this.$ERR_OK) {
                return this.$toast.show(resArr[0].message)
              }
              let obj = {
                image_id: resArr[0].data.id,
                image_url: resArr[0].data.url,
                id: 0
              }
              console.log(resArr)
              this.msg.image_id = resArr[0].data.id
              this.bannerSrc = resArr[0].data.image_url_thumb
              this.msg.giftpack_banner_images[0] = obj
            })
            break
          case 'detail' :
            this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then((resArr) => {
              this.$loading.hide()
              if (resArr[0].error !== this.$ERR_OK) {
                return this.$toast.show(resArr[0].message)
              }
              let obj = {
                image_id: resArr[0].data.id,
                image_url: resArr[0].data.url,
                id: 0
              }
              this.detailSrc = resArr[0].data.image_url_thumb
              this.msg.giftpack_images[0] = obj
            })
            break
        }
      },
      deleteImg(e, type) {
        e.preventDefault()
        switch (type) {
          case 'banner':
            this.bannerSrc = ''
            this.msg.image_id = ''
            this.msg.giftpack_banner_images = []
            break
          case 'detail':
            this.detailSrc = ''
            this.msg.giftpack_images = []
            break
        }
      },
      selectGoods(goodsArr) { // 添加大礼包商品
        let arrTemp = goodsArr
        this.arr = this.arr.map((item, index) => {
          goodsArr.map((val, i) => {
            if ((item && item.name) === (val && val.name)) {
              arrTemp.splice(i, 1)
              item.count += val.count
            }
          })
          return item
        })
        this.msg.giftpack_goods_skus = this.arr.concat(arrTemp)
        this.arr = this.arr.concat(arrTemp)
      },
      addGoods() {
        this.$refs.goodsList.showGoodsList()
      },
      subCount(index) {
        if (this.arr[index].count > 1) {
          this.arr[index].count--
        }
      },
      addCount(index) {
        this.arr[index].count++
      },
      deleteGoods(index) { // 删除大礼包商品
        this.willDelGoods = index
        this.$refs.confirm.showConfirm('确定删除此商品吗？')
      },
      delGoods() {
        this.arr.splice(this.willDelGoods, 1)
      },
      submitGifts() { // 提交大礼包
        if (this.disabledCover) return
        this.disabledCover = true
        console.log(this.msg)
        this.checkForm()
      },
      toBack() { // 取消新建大礼包
        this.$router.back()
      },
      checkForm() {
        let arr = [
          {value: this.titleReg, txt: '请填写标题'},
          {value: this.bannerReg, txt: '请选择Banner图'},
          {value: this.detailReg, txt: '请选择大礼包详情图'},
          {value: this.stockReg, txt: '请输入合法的库存数量'},
          {value: this.priceReg, txt: '请输入合法的价格'},
          {value: this.beansReg, txt: '请输入合法的播豆数量'},
          {value: this.rateReg, txt: '请输入正整数提成比例'},
          {value: this.goodsListReg, txt: '请添加赠品'}
        ]
        let res = this._testPropety(arr)
        if (res) {
          this.$toast.show('保存成功')
        }
        // setTimeout(() => {
        //   this.$router.back()
        // }, 1500)
      },
      _testPropety(arr) {
        for (let i = 0, j = arr.length; i < j; i++) {
          if (!arr[i].value) {
            this.$toast.show(arr[i].txt)
            this.disabledCover = false
            return false
          }
          if (i === j - 1 && arr[i].value) {
            return true
          }
        }
      }
    },
    computed: {
      titleReg() {
        return this.msg.title
      },
      bannerReg() {
        return this.msg.image_id
      },
      detailReg() {
        return this.msg.giftpack_images.length > 0
      },
      stockReg() {
        return this.msg.giftpack_stock && COUNTREG.test(this.msg.giftpack_stock)
      },
      priceReg() {
        return this.msg.price && MONEYREG.test(this.msg.price)
      },
      beansReg() {
        return this.msg.planting_beans && COUNTREG.test(this.msg.planting_beans)
      },
      rateReg() {
        return this.msg.commission_rate && RATE.test(this.msg.commission_rate)
      },
      goodsListReg() {
        return this.msg.giftpack_goods_skus.length > 0
      }
    },
    components: {
      BasePanel,
      SelectGoods,
      Confirm
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
        .hover-input
          input-animate(450, 44, $color-text-999, 4px)
        .hover-short-input
          input-animate(146, 44, $color-text-999, 4px)
        .top
          margin-top: -70px
        .unit
          color: $color-sub
          margin-left: 10px
        .title-text
          color: $color-text-2A
          border: 1px solid $color-text-D9
          line-height: 44px
          text-indent: 10px
        .short
          width: 146px
        .tip
          margin-left: 20px
          font-style: normal
        .update-image
          width: 90px
          height: @width
          display: inline-block
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
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
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
            display: none
          .img
            width: 100%
            height: 100%
            position: absolute
            left: -1px
            top: -1px
            z-index: 1
            border: 1px solid #fff
            border-radius: 2px
            background: #fff
          .delete
            width: 18px
            height: 18px
            position: absolute
            right: 0
            top: 0
            z-index: 1
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
            user-select: none
        .goods
          padding-top: 15px
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
            border-bottom-1px($color-E1E4E5)
            color: $color-text-main
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
            color: $color-text-sub
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
                width: 40px
                height: 40px
                margin-right: 10px
                border: 1px solid $color-ccc
                border-radius: 2px
              .name
                width: 260px
                word-break: break-all
                white-space: pre-wrap
                display: -webkit-box
                overflow: hidden
                -webkit-line-clamp: 2
                -webkit-box-orient: vertical
            .counter
              display: flex
              align-items: center
              .text
                color: $color-text-sub
                font-size: 12px
                height: 22px
                line-height: 19px
                text-align: center
                display: block
                font-family: $font-family-medium
                border: 1px solid $color-text-D9
                box-sizing: border-box
                border-radius: 1px
                margin-right: 5px
                user-select: none
              .sub
                font-size: 17px
                width: 22px
              .number
                width: 50px
                color: $color-text-sub
              .add
                width: 22px
                color: $color-white
                background: $color-text-sub

            .main
              color: $color-main
              user-select: none
            .flex1
              flex: 1.8
      .btn-group
        text-align: center
        display: flex
        user-select: none
        margin-top: 45px
        padding-left: 100px
        .btn
          width: 96px
          height: 40px
          line-height: 40px
          border-radius: 3px
          color: $color-text-main
          border: 1px solid $color-text-D9
        .confirm
          color: $color-white
          margin-left: 20px
          background: $color-main

</style>
