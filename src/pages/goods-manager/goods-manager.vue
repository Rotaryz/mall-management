<template>
  <div class="goods-manager" >
    <base-panel>
      <div slot="content" class="goods-manager-wrapper">
        <header>
          <p>商品名</p>
          <section>
            <search></search>
          </section>
          <router-link :to="navUrl" class="btn">
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
              <i v-if="item.subclass.includes('dot')" :class="item.subclass"></i>
              <div v-if="item.subclass === 'figure'" :class="item.subclass">
                <img src="./logo.jpg">
                <span :class="item.subclass">{{item.text}}</span>
              </div>
              <div v-else-if="item.subclass === 'btn-group'" :class="item.subclass">
                <p @click="upHandle(it)">修改</p>
                <i></i>
                <p class="red" @click="downHandle(it)">下架</p>
                <i></i>
                <p @click="delHandle(it)">删除</p>
              </div>
              <span v-else>{{item.text}}</span>
            </nav>
          </dd>
        </dl>
        <confirm ref="confirm"></confirm>
      </div>
    </base-panel>
    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
  import BasePanel from 'components/base-panel/base-panel'
  import Search from 'components/search/search'
  import Confirm from 'components/confirm/confirm'

  const LIST = [
    {text: '在西库利亚那城，两个男人为一个寡妇发生的流血事件引起了整治风波。爱情、死亡、美丽的鲁加娜、塔兰泰拉、塔拉鲁奇亚是酒', title: '商品名称', wrapperStyle: 'flex:3;padding-right:90px', subclass: 'figure'},
    {text: '9999.99', type: '', title: '价格', wrapperStyle: 'flex: 1.1', subclass: ''},
    {text: '9折', type: '', title: '商家折扣', wrapperStyle: 'flex: 1', subclass: ''},
    {text: '1折', type: '', title: '用户折扣', wrapperStyle: 'flex: 1', subclass: ''},
    {text: '9999999', type: 'view', title: '浏览量', wrapperStyle: 'flex: 1.1', subclass: 'sort'},
    {text: '999999', type: 'sales', title: '销量', wrapperStyle: 'flex: 1.1', subclass: 'sort'},
    {text: '999999', type: 'store', title: '库存', wrapperStyle: 'flex: 1.1', subclass: 'sort'},
    {text: '已上架', type: '', title: '商品状态', wrapperStyle: 'flex: 1', subclass: 'green-dot'},
    {text: '2018-03-15', type: '', title: '创建时间', wrapperStyle: 'flex: 1.2', subclass: ''},
    {text: '操作', type: '', title: '操作', wrapperStyle: 'flex: 2', subclass: 'btn-group'}
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
        navUrl: '',
        listArr: LIST,
        manageList: new Array(10).fill(1)
      }
    },
    created() {
      this.navUrl = this.$route.path + '/goods-detail'
    },
    methods: {
      sortHandle(item) {
        this._resetListStatus(item.type)
        if (item.subclass.includes(`top-active`)) {
          item.subclass = 'sort bottom-active'
        } else {
          item.subclass = 'sort top-active'
        }
      },
      _resetListStatus(type) {
        this.listArr.forEach(item => {
          if (type !== item.type && item.subclass.includes('sort')) {
            item.subclass = 'sort'
          }
        })
      },
      downHandle(it) {
        this.$refs.confirm.showConfirm('', '已关联XXX大礼包了，无法下架')
      },
      upHandle(it) {
        // this.$refs.confirm.show({text: '已关联XXX大礼包了，无法up架'})
      },
      delHandle(it) {
        // this.$refs.confirm.show({text: '已关联XXX大礼包了，无法del架'})
      }
    },
    filters: {
      allowSelect(item) {
        let styles = item.wrapperStyle
        if (item.subclass === 'sort') {
          styles += ` cursor: pointer`
        }
        return styles
      }
    },
    watch: {
      $route(to) {
        this.navUrl = to.path + '/goods-detail'
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
        padding: 0 30px
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
              & > img
                width: 40px
                height: 40px
                box-sizing: border-box
                border: 1px solid #d9d9d9
                border-raidus: 2px
                margin-left: 8px
                vertical-align :middle
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
