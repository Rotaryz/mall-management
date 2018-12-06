<template>
  <dl class="order-manager-detail">
    <dt>
      <header>
        <i></i>
        <h3>订单信息</h3>
      </header>
      <ul>
        <li>订单号：<span>{{orderNo}}</span></li>
        <li>下单时间：<span>{{orderTime}}</span></li>
        <li>支付时间：<span>{{payTime}}</span></li>
      </ul>
      <ul>
        <li>交易流水号：<span>{{exchangeNo}}</span></li>
        <li>实付金额：<span>{{money}}</span></li>
        <li>订单状态：<span>{{orderStatus}}</span></li>
      </ul>
    </dt>
    <dt>
      <header>
        <i></i>
        <h3>收货信息</h3>
      </header>
      <ul>
        <li>收货人：<span>{{consignee}}</span></li>
        <li>手机号：<span>{{mobile}}</span></li>
        <li>所在地区：<span>{{addressArea}}</span></li>
      </ul>
      <ul>
        <li>详细地址：<span>{{addressDetail}}</span></li>
      </ul>
    </dt>
    <dt>
      <header>
        <i></i>
        <h3>收货信息</h3>
      </header>
      <nav>
        <ul class="header">
          <li>商品名称</li>
          <li>价格</li>
          <li>数量</li>
        </ul>
        <ul class="container">
          <li class="container-item" v-for="(item, index) in goodsInfo">
            <section class="goods-wrapper goods-item">
              <img class="goods-image" :src="item.imageURL"/>
              <span class="goods-name">{{item.goodsName}}</span>
            </section>
            <span class="money goods-item">{{item.money}}</span>
            <span class="number goods-item">{{item.number}}</span>
          </li>
        </ul>
      </nav>
    </dt>
    <dt>
      <header>
        <i></i>
        <h3>物流信息</h3>
      </header>
      <ul>
        <li>快递公司：<span>{{expressCompany}}</span></li>
        <li>快递单号：<span>{{expressNo}}</span></li>
      </ul>
    </dt>
    <dd @click="backHandle">返回</dd>
  </dl>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'OrderManagerDetail',
    data() {
      return {
        orderNo: '123456789012345678',
        orderTime: '2018-09-01 15:22:17',
        payTime: '2018-09-01 15:22:17',
        exchangeNo: '1234567890',
        money: '3360.00',
        orderStatus: '待收货',
        addressArea: '广东广州海珠区',
        addressDetail: `新港街道新港中路397号TIT创意园 翡冷翠小镇 A9`,
        consignee: `林莫辰`,
        mobile: `19766203418`,
        expressCompany: '顺丰',
        expressNo: '123456789012345678',
        goodsInfo: [
          {
            imageURL: 'http://musicugc.qianqian.com/ugcdiy/pic/15be740121443b5a0f83fbd8104aadf5.jpg',
            goodsName: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
            money: `播豆1680+168.00`,
            number: `1`
          },
          {
            imageURL: 'http://musicugc.qianqian.com/ugcdiy/pic/15be740121443b5a0f83fbd8104aadf5.jpg',
            goodsName: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
            money: `播豆1680+168.00`,
            number: `1`
          },
          {
            imageURL: 'http://musicugc.qianqian.com/ugcdiy/pic/15be740121443b5a0f83fbd8104aadf5.jpg',
            goodsName: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
            money: `播豆1680+168.00`,
            number: `1`
          }
        ]
      }
    },
    methods: {
      // 返回上级页面路由
      _routerBack() {
        this.$router.back()
      },
      backHandle() {
        this._routerBack()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'


    .order-manager-detail
      layout()
      font-family: PingFangSC-Light;
      font-size: 18px;
      color: #333333;
      line-height: 18px;
      & > dt
        margin: 22px
        background: #FFFFFF
        box-shadow: 0 1px 6px 0 rgba(0, 8, 39, 0.10)
        overflow: hidden
        border-radius: 6px
        padding-bottom :10px
        & > header
          padding :39px 0 30px
          layout(row)
          i
            width:6px
            height :20px
            background :$color-main
            margin-right:30px
        & > ul
          font-size: 14px
          layout(row)
          padding-bottom :30px
          li
            flex: 1
            margin-left :42px
            span
              color: #2A2A2A
        & > nav
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
          line-height: 14px;
          margin :0 28px 30px
          border: 1px solid #E8E8E8;
          .header
            height :40px
            background: #FAFAFA;
            box-shadow: 0 1px 0 0 #EDEFEF;
            layout(row,block,nowrap)
            align-items :center
            & > li
              flex: 1
              margin-left :39px
          .container
            overflow :hidden
            .container-item
              layout(row,block,nowrap)
              align-items :center
              border-bottom :1px solid #E8E8E8
              &:last-child
                border-bottom :none
              .goods-item
                flex: 1
                overflow :hidden
                margin-left :39px
              .goods-wrapper
                layout(row,block,nowrap)
                align-items :center
                .goods-image
                  width :40px
                  height: 40px
                  box-sizing :border-box
                  margin-left :9px
                  margin-right :10px
                  margin-top:30px
                  margin-bottom :30px
                  border: 1px solid #E8E8E8;
                  border-radius: 2px;
                  object-fit :cover
                .goods-name
                  width :60%
                  line-height:1.2
                  margin :30px 0
                  no-wrap-plus()
      & > dd
        width :96px
        height :40px
        margin : 40px auto 30px
        background: #FF533C;
        border-radius: 3px;
        font-size: 16px;
        text-align :center
        color: #FFFFFF;
        line-height: @height
        cursor :pointer
</style>
