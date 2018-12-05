<template>
  <div class="goods-manager" >
    <base-panel ref="basePanel" :showNull="showNull" :pageDetails="pageDetails" @navToPage="navToPage">
      <div slot="content" class="goods-manager-wrapper">
        <header>
          <p>商品名</p>
          <section>
            <search @search="search" placeholerTxt="请输入" ref="search"></search>
          </section>
          <router-link :to="'goods-detail'" class="btn" append>
            <div>
              <img class="g" src="./icon-add@2x.png" alt="">
              <p>新建商品</p>
            </div>
          </router-link>
        </header>
        <dl>
          <dt>
            <nav class="common-wrapper" v-for="(item, index) in listArr" :key="item.title + index" :style="item.wrapperStyle" >
              <div v-if="item.subclass.includes('sort')" @click="sortHandle(item)">
                <p>{{item.title}}</p>
                <i :class="item.subclass">
                  <span class="sort-item sort-top" :class="item.subclass"></span>
                  <span class="sort-item sort-end" :class="item.subclass"></span>
                </i>
              </div>
              <p v-else>{{item.title}}</p>
            </nav>
          </dt>
          <dd v-for="(it, idx) in manageList" :key="idx">
            <nav class="common-wrapper" :style="item.wrapperStyle" v-for="(item, index) in listArr" :key="index">
              <i v-if="item.subclass.includes('dot')" :class="it.isPutAway? 'green-dot': 'red-dot'"></i>
              <div v-if="item.subclass === 'figure'" :class="item.subclass">
                <img class="icon" :src="it[item.icon]"/>
                <span :class="item.subclass">{{it[item.name]}}</span>
              </div>
              <div v-else-if="item.subclass === 'btn-group'" :class="item.subclass">
                <p :class="it[item.name] ? '' : 'red'" @click="editorHandle(it)">修改</p>
                <i></i>
                <p class="red" @click="upDownHandle(it)">{{it[item.name]?'下架':'上架'}}</p>
                <i></i>
                <p :class="it[item.name] ? '' : 'red'" @click="delHandle(it)" >删除</p>
              </div>
              <span v-else>{{it[item.name]}}</span>
            </nav>
          </dd>
        </dl>
        <confirm ref="confirm" @confirm="confirmHandle"></confirm>
        <confirm ref="confirmOneBtn" :oneBtn="true"></confirm>
      </div>
    </base-panel>
  </div>

</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'
  import Confirm from 'components/confirm/confirm'
  import {Goods} from 'api'

  let C_LIST = [
    {name: 'title', icon: 'imageUrlThumb', title: '商品名称', wrapperStyle: 'flex:3;padding-right:90px', subclass: 'figure'},
    {name: 'credits', type: '', title: '播豆', wrapperStyle: 'flex: 1.3', subclass: ''},
    {name: 'originPrice', type: '', title: '价格', wrapperStyle: 'flex: 1.3', subclass: ''},
    {name: 'browseCount', type: 'browse_count', title: '浏览量', wrapperStyle: 'flex: 1.2', subclass: 'sort'},
    {name: 'saleCount', type: 'sale_count', title: '销量', wrapperStyle: 'flex: 1.2', subclass: 'sort'},
    {name: 'store', type: 'store', title: '库存', wrapperStyle: 'flex: 1.2', subclass: ''},
    {name: 'isPutAwayStr', type: '', title: '商品状态', wrapperStyle: 'flex: 1.1', subclass: 'green-dot'},
    {name: 'createdAt', type: '', title: '创建时间', wrapperStyle: 'flex: 1.2', subclass: ''},
    {name: 'isPutAway', type: '', title: '操作', wrapperStyle: 'flex: 2', subclass: 'btn-group'}
  ]

  let M_LIST = [
    {name: 'title', icon: 'imageUrlThumb', title: '商品名称', wrapperStyle: 'flex:3;padding-right:90px', subclass: 'figure'},
    {name: 'originPrice', type: '', title: '价格', wrapperStyle: 'flex: 1.1', subclass: ''},
    {name: 'merchantDiscount', type: '', title: '商家折扣', wrapperStyle: 'flex: 1', subclass: ''},
    {name: 'userDiscount', type: '', title: '用户折扣', wrapperStyle: 'flex: 1', subclass: ''},
    {name: 'browseCount', type: 'browse_count', title: '浏览量', wrapperStyle: 'flex: 1.1', subclass: 'sort'},
    {name: 'saleCount', type: 'sale_count', title: '销量', wrapperStyle: 'flex: 1.1', subclass: 'sort'},
    {name: 'store', type: 'store', title: '库存', wrapperStyle: 'flex: 1.1', subclass: ''},
    {name: 'isPutAwayStr', type: '', title: '商品状态', wrapperStyle: 'flex: 1', subclass: 'dot'},
    {name: 'createdAt', type: '', title: '创建时间', wrapperStyle: 'flex: 1.2', subclass: ''},
    {name: 'isPutAway', type: '', title: '操作', wrapperStyle: 'flex: 2', subclass: 'btn-group'}
  ]
  export default {
    name: 'GoodsManager',
    components: {
      BasePanel,
      Search,
      Confirm
    },
    data() {
      return {
        listArr: [],
        manageList: [],
        showNull: false,
        page: 1,
        limit: 1,
        currentGoods: null,
        confirmType: '',
        pageDetails: {
          total: 1, // 总数量
          per_page: 1, // 每一页的条数
          total_page: 1 // 总页数
        },
        sortType: {}
      }
    },
    created() {
      this._initPageParams()
      this._getGoodsList()
    },
    methods: {
      // 初始化页面
      _initPageParams() {
        this.listArr = this.isMoneyPage ? M_LIST : C_LIST
        this._clearSearchText()
        this._initPage()
        this._resetListStatus()
      },
      // 搜索
      search(text) {
        if (text) {
          this._getGoodsList({keywords: text.trim()})
        } else {
          this._getGoodsList()
        }
      },
      _clearSearchText() {
        this.$refs.search && this.$refs.search.clearTxt()
      },
      // 获取列表
      _getGoodsList(data) {
        const {page, limit} = this
        const type = this.GoodsType
        Goods.getGoodsList({page, limit, type, order_by: this.sortType, ...data}).then(res => {
          this.showNull = +res.meta.total <= 0
          this.manageList = res.data
          this.pageDetails = {
            total: res.meta.total,
            per_page: res.meta.per_page,
            total_page: res.meta.last_page
          }
        })
      },
      // 翻页
      navToPage(page) {
        this.page = page
        this._getGoodsList()
      },
      _initPage() {
        this.$refs.basePanel && this.$refs.basePanel.initPage()
      },
      // 排序
      sortHandle(item) {
        this._resetListStatus(item.type)
        let data = {}
        if (item.subclass.includes(`top-active`)) {
          item.subclass = 'sort bottom-active' // 下面亮灯:从大倒下
          data[item.type] = 'desc'
          this.sortType = data
        } else {
          item.subclass = 'sort top-active' // 上面亮灯:从小到大
          data[item.type] = 'asc'
          this.sortType = data
        }
        this._getGoodsList()
      },
      _resetListStatus(type) {
        if (!type) {
          this.sortType = {}
        }
        this.listArr.forEach(item => {
          if (type !== item.type && item.subclass.includes('sort')) {
            item.subclass = 'sort'
          }
        })
      },
      // 上下架
      upDownHandle(item) {
        let data = {
          goodsId: item.goodsId,
          status: item.isPutAway ? '0' : '1' // 1上架 0下架
        }
        Goods.updateStatus(data).then(res => {
          this.$toast.show('操作成功')
          this._getGoodsList()
        }).catch(res => {
          if (res.code === 10) { // code=10下线异常错误码
            this.$refs.confirmOneBtn.showConfirm(res.message)
          } else {
            this.$toast.show(res.message)
          }
        })
      },
      // 修改
      editorHandle(item) {
        if (item.isPutAway) return
        this.$router.push(this.$route.path + `/goods-detail?goodsId=${item.goodsId}&pagination=${this.page}`)
      },
      // 删除
      delHandle(item) {
        if (item.isPutAway) return
        this.$refs.confirm.showConfirm(`是否删除${item.title}?`)
        this.currentGoods = item
        this.confirmType = 'delete'
      },
      // confirm
      confirmHandle() {
        let data = {
          goodsId: this.currentGoods.goodsId
        }
        switch (this.confirmType) {
          case 'delete' :
            Goods.delete(data).then(res => {
              this.$toast.show('删除成功')
              this._getGoodsList()
            })
            break
          default:
            break
        }
      }
    },
    computed: {
      // 判断是否为折扣页面
      isMoneyPage() {
        return this.$route.path.includes('money')
      },
      GoodsType() {
        return this.isMoneyPage ? '1' : '2' // 1折扣商品 2播豆商品
      }
    },
    watch: {
      // 路由跳转
      $route() {
        this._initPageParams()
        this._getGoodsList()
      }
    },
    filters: {
      // 排序样式
      allowSelect(item) {
        let styles = item.wrapperStyle
        if (item.subclass === 'sort') {
          styles += ` cursor: pointer`
        }
        return styles
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .common-wrapper
    margin-right: 10px
    overflow :hidden
    layout(row,block,nowrap)
    align-items :center

  .goods-manager
    position :relative
    layout()
    flex:1
    .goods-manager-wrapper
      position :relative
      padding: 0 30px
      & > header
        height: 100px
        layout(row)
        align-items: center
        font-family: $font-family-regular
        & > p
          font-size: 14px
          color: $color-text-main
          margin-right :10px
        .btn
          margin-left: 40px
          width: 90px
          height: 28px
          overflow: hidden
          border-radius: 4px
          & > div
            color: $color-white
            background: $color-main
            width: 100%
            height: 100%
            cursor: pointer
            text-align: center
            & > img
              display: inline-block
              width: 10px
              height: @width
              transform: scale(1)
              transition: transform 0.3s ease-out
              line-height: 28px
            & > p
              display: inline-block
              line-height: 28px
              font-size: 12px
              transition: font-size 0.3s ease-out
            &:hover > p
              font-size: 13px
            &:hover > img
              transform: scale(1.2)
      & > dl
        & > dt
          width: 100%
          box-sizing: border-box
          height: 50px
          background: $color-FAFAFA
          display: flex
          align-items: center
          padding-left: 40px
          border-bottom: 1px solid $color-E1E4E5
          user-select :none
          & > nav
            font-family: $font-family-medium
            color: $color-text-main
            font-size: $font-size-14
            & > div
              layout(row)
              align-items :center
              cursor: pointer
              & > i.sort
                display: flex
                flex-direction: column
                justify-content: space-between
                height: 19px
                margin-left: 10px
                .sort-item
                  border: 4px solid #999999
                  transition: all 0.4s
                .sort-top
                  border-top: 4px solid transparent
                  border-left: 4px solid transparent
                  border-right: 4px solid transparent
                  &.top-active
                    border: 4px solid $color-main
                    border-top: 4px solid transparent
                    border-left: 4px solid transparent
                    border-right: 4px solid transparent
                    transition: all 0.4s
                .sort-end
                  border-bottom: 4px solid transparent
                  border-left: 4px solid transparent
                  border-right: 4px solid transparent
                  &.bottom-active
                    border: 4px solid $color-main
                    border-bottom: 4px solid transparent
                    border-left: 4px solid transparent
                    border-right: 4px solid transparent
                    transition: all 0.4s
        & > dd
          height: 60px
          box-shadow: 0 1px 0 0 #EFEFEF
          display: flex
          align-items: center
          padding-left: 40px
          & > nav
            font-family: $font-family-regular
            color: $color-text-sub
            font-size: $font-size-14
            line-height: 18px
            & > i
              margin-right: 8px
              width: 6px
              height: 6px
              border-radius: 50%
              display: inline-block
              &.green-dot
                background: #26bd26
              &.red-dot
                background: #f6252D
            & > span
              no-wrap()
            div.figure
              overflow: hidden
              layout(row,block,nowrap)
              align-items :center
              & > .icon
                display :inline-block
                width: 40px
                height: 40px
                box-sizing: border-box
                border: 1px solid #d9d9d9
                border-raidus: 2px
                margin-left: 8px
                vertical-align :middle
                object-fit: cover
              & > span
                flex: 1
                overflow :hidden
                padding :0 10px
                no-wrap-plus()
            div.btn-group
              layout(row)
              align-items :center
              user-select :none
              p
                cursor: default
                color: #999
                &.red
                  color: $color-main
                  cursor: pointer
              i
                width :1px
                height :14px
                background :$color-text-sub
                margin :0 9px
                opacity :0.5

</style>
