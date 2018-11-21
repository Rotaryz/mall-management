<template>
    <dl class="order-item">
      <dt>
        <ul class="left">
          <li class="p-l-39 li-left">订单号: {{title.orderNo}}</li>
          <li class="p-l-80">下单时间: {{title.orderTime}}</li>
        </ul>
        <p class="right p-l-86">下单客户: {{title.orderCustomer}}</p>
      </dt>
      <dd>
        <nav class="left" >
          <ul class="left" v-for="(item,index) in goodsInfo" :key="index">
            <li class="p-l-39 li-left" :class="index !== goodsInfo.length - 1 ? 'bottom-border': ''">
              <div :style="{backgroundImage: 'url(' + item.imageURL + ')'}"></div>
              <span>{{item.goodsName}}</span>
            </li>
            <li class="p-l-80" :class="[index !== goodsInfo.length - 1 ? 'bottom-border': '', goodsInfo.length > 1 ? 'right-border' : '']">
              <span class="money">{{item.money}}</span>
              <span class="number">数量x{{item.number}}</span>
            </li>
          </ul>
        </nav>
        <section class="right p-l-86">
          <span class="common money">实付金额：{{orderInfo.money}}</span>
          <span class="common">订单状态：{{orderInfo.orderStatus}}</span>
          <ul class="common">
            <li>{{orderInfo.address}}</li>
            <li>收货人：{{orderInfo.consignee}}</li>
            <li>手机号：{{orderInfo.mobile}}</li>
          </ul>
          <div class="common">
            <!--<span class="btn">发货</span>-->
            <router-link tag="p" to="order-detail" append="" class="btn">查看详情</router-link>
          </div>
        </section>
      </dd>
    </dl>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'OrderItem',
    data() {
      return {
        title: {
          orderNo: `1234567890123456`,
          orderTime: `2018-11-03 18:00:00`,
          orderCustomer: `林莫辰`
        },
        orderInfo: {
          money: '168.00',
          orderStatus: '待发货',
          address: '广东广州海珠区新港街道新港中路397号TIT创意园 翡冷翠小镇 A9',
          consignee: `林莫辰`,
          mobile: `19766203418`
        },
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .left
    flex: 1
  .right
    flex: 1.1
  .li-left
    flex: 1 !important
  .p-l-39
    padding-left :39px
  .p-l-80
    padding-left : 80px
  .p-l-86
    padding-left : 86px

  .order-item
    background: #FFFFFF;
    border: 1px solid #EFEFEF;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    dt
      height :40px
      background: #FAFAFA;
      box-shadow: 0 1px 0 0 #EDEFEF;
      layout(row)
      align-items :center
      box-sizing :border-box
      ul
        layout(row)
        align-items :center
        li
          flex: 1
    dd
      layout(row)
      & > nav
        & > ul
          layout(row)
          & > li
            layout(row,block,nowrap)
            align-items :center
            flex: 1
            box-sizing :border-box
            &.right-border
              border-right : 1px solid #EFEFEF;
            &.bottom-border
              border-bottom : 1px solid #EFEFEF;
            & > div
              width :40px
              height: 40px
              box-sizing :border-box
              margin-left :9px
              margin-right :10px
              border: 1px solid #E8E8E8;
              border-radius: 2px;
              background-repeat :no-repeat
              background-size: cover
              background-position :center center
            & > span
              flex: 1
              line-height :1.2
              margin-top :30px
              margin-bottom:30px
            .money
              flex: 2
      & > section
        layout(row)
        align-items :center
        .common
          flex: 1
          padding-right :10px
        .money
          flex: 1.2
        ul.common
          flex: 1.7
          padding-right :100px
          line-height :1.3
          padding-top:12px
          padding-bottom :14px
        div
          layout(row)
          color:$color-main
          .btn
            cursor :pointer
          span
            border-right: 1px solid rgba(0,0,0,0.3)
            padding-right :10px
            margin-right :10px
</style>
