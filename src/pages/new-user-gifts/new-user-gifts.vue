<template>
  <base-panel :isShowPageDetails="false">
    <div slot="content" class="create-new">
      <div class="title">新建大礼包</div>
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
                <input class="sub-img" type="file" @change="_fileChange($event, 'banner')" accept="image/*">
                <img :src="bannerSrc" v-if="bannerSrc"  class="img">
                <!--<div class="img" v-if="bannerSrc" :style="{backgroundImage: 'url(' + bannerSrc + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>-->
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
                <input class="sub-img" type="file" @change="_fileChange($event, 'detail')" accept="image/*">
                <img :src="detailSrc" v-if="detailSrc" class="img">
                <!--<div class="img" v-if="detailSrc" :style="{backgroundImage: 'url(' + detailSrc + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>-->
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
            <input class="title-text short" v-model="msg.gift_packs_stock" type="text">
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
          <div class="goods" v-if="showList">
            <div class="list-header">
              <div class="header-key" :class="item.class" v-for="(item, index) in data">
                <span class="contxt">{{item.title}}</span>
              </div>
            </div>
          </div>
          <div class="list-content" v-if="showList">
            <div class="list-item" v-for="(item, index) in goodsArr" :key="index">
              <div class="item flex1">
                <img class="head" :src="item.image_url_thumb" alt="">
                <!--<div class="head" :style="{backgroundImage: 'url('+item.image_url_thumb+')'}"></div>-->
                <span class="name">{{item.title}}</span>
              </div>
              <span class="item">{{item.original_price}}</span>
              <div class="counter item">
                <span class="sub text hand" @click="subCount(index)">-</span>
                <input type="number" class="number text" v-model="item.stock">
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
      <select-goods ref="goodsList"
                    v-if="showGoodsList"
                    :goodsArr="goodsArr"
                    :hasId="hasId"
                    :giftsStock="msg.gift_packs_stock"
                    @selectGoods="selectGoods"
                    @hideGoodsList="hideGoodsList" >
      </select-goods>
      <confirm ref="confirm" @confirm="delGoods"></confirm>
    </div>
  </base-panel>
</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import SelectGoods from 'components/select-goods/select-goods'
  import Confirm from 'components/confirm/confirm'
  import {Gifts} from 'api'

  const MONEYREG = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
  const COUNTREG = /^[1-9]\d*$/
  const RATE = /^[0-9]\d*$/
  export default {
    name: 'new-user-gifts',
    data() {
      return {
        msg: {
          title: '',
          type: 1, // 用户大礼包
          is_open: 0,
          giftpack_banner_images: [], // 大礼包banner图
          giftpack_images: [], // 大礼包详情图
          gift_packs_stock: '', // 大礼包库存
          price: '',
          planting_beans: '', // 播豆数
          commission_rate: '', // 佣金
          giftpack_goods_skus: [], // 商品列表
          image_id: '' // 封面图id
        },
        data: [
          {title: '商品名称', class: 'item flex1', show: 'name'},
          {title: '价格', class: 'item', text: '100'},
          {title: '数量', class: 'item', show: 'counter', value: '1'},
          {title: '操作', class: 'item main', text: '删除'}
        ],
        goodsArr: [],
        bannerSrc: '',
        detailSrc: '',
        disabledCover: false,
        willDelGoods: '',
        showGoodsList: false,
        giftsId: '',
        hasId: false
      }
    },
    created() {
      // 编辑大礼包时取路由里的大礼包id
      if (this.$route.query.id) {
        this.hasId = true
        this.giftsId = this.$route.query.id
        this._getGiftsDetail()
      }
    },
    methods: {
      _getGiftsDetail() {
        Gifts.giftsDetail(this.giftsId)
          .then(res => {
            let data = res.data
            // 编辑大礼包时初始化数据
            this.msg = {
              title: data.title,
              type: 1,
              is_open: 0,
              giftpack_banner_images: [data.gift_packs_banner_images],
              giftpack_images: [data.gift_packs_images],
              gift_packs_stock: data.stock,
              price: data.price,
              planting_beans: parseInt(data.planting_beans),
              commission_rate: parseInt(data.commission_rate),
              giftpack_goods_skus: data.gift_packs_goods_sku,
              image_id: data.gift_packs_banner_images && data.gift_packs_banner_images.image_id // 封面图id
            }
            this.msg.giftpack_goods_skus = data.gift_packs_goods_sku.map(item => {
              item.image_id = item.goods_sku_image_id
              item.title = item.goods_title
              return item
            })
            this.bannerSrc = data.gift_packs_banner_images && data.gift_packs_banner_images.image_url_thumb
            this.detailSrc = data.gift_packs_images && data.gift_packs_images.image_url_thumb
            this.goodsArr = data.gift_packs_goods_sku.map(item => {
              item.goods_sku_stock = item.origin_sku_stock
              item.checked = true
              return item
            })
          })
      },
      _fileChange(e, type) { // 上传图片
        let arr = Array.from(e.target.files)
        if (arr.length < 1) {
          return
        }
        switch (type) {
          case 'banner' :
            this.$loading.show('图片上传中...')
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
              this.msg.image_id = resArr[0].data.id
              this.bannerSrc = resArr[0].data.image_url_thumb
              this.msg.giftpack_banner_images.splice(0, 1, obj)
            })
            break
          case 'detail' :
            this.$loading.show('图片上传中...')
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
              this.msg.giftpack_images.splice(0, 1, obj)
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
      selectGoods(selectArr) { // 添加大礼包商品
        let arr = this._compareList(this.goodsArr, selectArr)
        let arrTemp = this._compareArr(this.goodsArr, arr)
        this.goodsArr = arr.concat(arrTemp)
        this.msg.giftpack_goods_skus = this.goodsArr
      },
      // 比较数组，对相同的做处理
      _compareList(oldArr, newArr) {
        oldArr.forEach(item => {
          let node = newArr.find(val => val.goods_id === item.goods_id)
          node && (node.id = item.id)
        })
        return newArr
      },
      // 比较数组，去掉旧数组相同的元素
      _compareArr(oldArr, newArr) {
        let indexArr = []
        oldArr.forEach((item, index) => {
          let node = newArr.find(val => val.goods_id === item.goods_id)
          node && indexArr.push(index)
        })
        return oldArr.filter((item, index) => {
          return indexArr.indexOf(index) === -1
        })
      },
      hideGoodsList() {
        document.body.style.overflow = 'auto'
        document.body.style.paddingRight = '0'
        this.showGoodsList = false
      },
      addGoods() {
        // 打开弹窗时禁止body滚动
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '17px'
        this.showGoodsList = true
      },
      subCount(index) {
        if (this.goodsArr[index].stock > 1) {
          this.goodsArr[index].stock--
        }
      },
      addCount(index) {
        let stock = this.goodsArr[index].stock
        let skuStock
        // 编辑大礼包和创建大礼包取字段不同
        if (this.hasId) {
          skuStock = this.goodsArr[index].origin_sku_stock
        } else {
          skuStock = this.goodsArr[index].goods_sku && this.goodsArr[index].goods_sku[0] && this.goodsArr[index].goods_sku[0].goods_sku_stock
        }
        // 计算商品库存和礼包库存相乘
        if (this.msg.gift_packs_stock && (stock < Math.floor(skuStock / this.msg.gift_packs_stock))) {
          this.goodsArr[index].stock++
        } else if (!this.msg.gift_packs_stock && stock < skuStock) {
          this.goodsArr[index].stock++
        } else {
          this.$toast.show('已达到商品最大库存数')
        }
      },
      deleteGoods(index) { // 删除大礼包商品
        this.willDelGoods = index
        this.$refs.confirm.showConfirm('确定删除此商品吗？')
      },
      delGoods() {
        this.goodsArr.splice(this.willDelGoods, 1)
        this.msg.giftpack_goods_skus = this.goodsArr
      },
      submitGifts() { // 提交大礼包
        if (this.disabledCover) return
        this.disabledCover = true
        setTimeout(() => {
          this.disabledCover = false
        }, 500)
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
        let allRight = this._testCount(this.goodsArr)
        let stock = this._testStock()
        if (!allRight) {
          this.$toast.show('商品数量必须为整数，请从新选择数量')
          return
        }
        if (res && stock) {
          if (this.hasId) {
            // 编辑大礼包
            Gifts.editGoodsList(this.msg, this.giftsId)
              .then(res => {
                this.$toast.show('保存成功')
                setTimeout(() => {
                  this.$router.back()
                }, 1500)
              })
          } else {
            // 新建大礼包
            Gifts.createGifts(this.msg)
              .then(res => {
                this.$toast.show('保存成功')
                setTimeout(() => {
                  this.$router.back()
                }, 1500)
              })
          }
        }
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
      },
      _testCount(arr) {
        let allRight = arr.every((item, index) => {
          return COUNTREG.test(item.stock)
        })
        return allRight
      },
      // 遍历计算库存数
      _testStock() {
        let result = this.goodsArr.every((item, index) => {
          if (this.hasId) {
            if (item.stock * this.msg.gift_packs_stock > item.origin_sku_stock) {
              this.$toast.show(`商品【${this.goodsArr[index].title}】库存不足`)
            }
            return item.stock * this.msg.gift_packs_stock < item.origin_sku_stock
          } else {
            if (item.stock * this.msg.gift_packs_stock > item.goods_sku[0].goods_sku_stock) {
              this.$toast.show(`商品【${this.goodsArr[index].title}】库存不足`)
            }
            return item.stock * this.msg.gift_packs_stock < item.goods_sku[0].goods_sku_stock
          }
        })
        return result
      }
    },
    computed: {
      showList() {
        return this.goodsArr.length
      },
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
        return this.msg.gift_packs_stock && COUNTREG.test(this.msg.gift_packs_stock)
      },
      priceReg() {
        return this.msg.price && MONEYREG.test(this.msg.price)
      },
      beansReg() {
        return this.msg.planting_beans && RATE.test(this.msg.planting_beans)
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
      color: $color-text-main
      position: relative
      &:before
        content: ''
        background: $color-main
        width: 6px
        height: 20px
        position: absolute
        left: 0
        col-center()
        border-radius: 0
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
          input-animate(450, 44)
        .hover-short-input
          input-animate(146, 44)
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
            object-fit: cover
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
            font-family: $font-family-regular
            border-radius: 4px
            user-select: none
            transition: all 0.3s
            &:hover
              font-size: 13px
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
                overflow: hidden
                object-fit: cover
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
