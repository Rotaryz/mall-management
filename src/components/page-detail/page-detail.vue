<template>
  <div class="total">
    <div>{{pageDtail.per_page}}条/页，共{{pageDtail.total}}条数据</div>
    <div class="page">
      <div class="page-icon" @click="subtract" :style="{'cursor': isHand.handLeft}" @mouseenter="notAllowed">
      </div>
      <!--{{page}}/{{pageDtail.total_page}}-->
      <div class="pade-detail">
        <span class="page-child hand" v-show="showFirst" @click="getPage(1)">1</span>
        <span v-show="preClipped" class="page-hide-more"></span>
        <span class="page-child hand" :class="{'page-child-active': page === num}" @click="getPage(num)" v-for="(num, index) in indexs" :key="index">
          {{num}}
        </span>
        <span v-show="backClipped" class="page-hide-more"></span>
        <span class="page-child hand" v-show="showEnd" :class="{'page-child-active': page === pageDtail.total_page}" @click="getPage(pageDtail.total_page)">{{pageDtail.total_page}}</span>
      </div>
      <div class="page-icon page-icon-two" @click="addPage" @mouseenter="notAllowed" :style="{'cursor': isHand.handRight}">
      </div>
      <div class="page-box" :class="{'input-height': pageDetail}">
        <div class="border-page page-total input-height-item animate-hover" @click.stop="showPageDetail">
          {{page}}/{{pageDtail.total_page}}
          <span class="page-tap">
                <i class="page-top" :class="{'page-bottom':pageDetail}"></i>
              </span>
          <transition name="fade">
            <ul class="page-list" v-show="pageDetail">
              <li class="page-item"
                  v-for="item in pageDtail.total_page"
                  :key="item"
                  :class="{'page-item-active': pageIndex === item}"
                  @click.stop="detailPage(item)">
                {{item}}/{{pageDtail.total_page}}
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="input-box">
        跳至
        <div class="input-box-big">
          <span class="after"></span>
          <input type="number" class="border-page" v-model="pageInput"/>
          <span class="before"></span>
        </div>
        页
      </div>
      <!--<div class="border-page input-height-item" @click="goPage" @mouseenter="notAllowed" :style="{'cursor': isHand.handGo}">跳转</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-detail',
    props: {
      pageDtail: {
        type: Object,
        default: () => {
          return {
            total: 30, // 总数量
            per_page: 10, // 一页条数
            total_page: 5 // 总页数
          }
        }
      },
      pagination: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        pageDetail: false,
        pageInput: '',
        isHand: {handLeft: 'pointer', handRight: 'pointer', handGo: 'pointer'},
        pageIndex: 0,
        page: this.pagination,
        backClipped: true,
        preClipped: false,
        showFirst: false,
        showEnd: true
      }
    },
    computed: {
      indexs() {
        let ret = []
        if (this.pageDtail.total_page <= 9 && this.pageDtail.total_page > 0) {
          for (let i = 1; i <= this.pageDtail.total_page; i++) {
            this.showEnd = false
            this.backClipped = false
            ret.push(i)
          }
          return ret
        } else if (this.pageDtail.total_page === 0) {
          this.showEnd = false
          this.backClipped = false
          return [1]
        }
        if (this.page < 4) {
          this.backClipped = true
          this.showFirst = false
          this.preClipped = false
          this.showEnd = true
          for (let i = 1; i <= 4; i++) {
            ret.push(i)
          }
        } else if (this.page === 4) {
          this.backClipped = true
          this.showFirst = false
          this.preClipped = false
          for (let i = 1; i <= 6; i++) {
            ret.push(i)
          }
        } else if (this.page > 4 && this.page < this.pageDtail.total_page - 2) {
          this.showFirst = true
          this.preClipped = true
          this.showEnd = true
          this.backClipped = true
          for (let i = this.page - 2; i <= this.page + 2; i++) {
            ret.push(i)
          }
        } else if (this.page === this.pageDtail.total_page - 3) {
          this.showFirst = true
          this.showEnd = false
          this.backClipped = false
          this.preClipped = true
          for (let i = this.pageDtail.total_page - 3; i <= this.pageDtail.total_page; i++) {
            ret.push(i)
          }
        } else if (this.page > this.pageDtail.total_page - 3) {
          this.showFirst = true
          this.showEnd = false
          this.backClipped = false
          this.preClipped = true
          for (let i = this.pageDtail.total_page - 3; i <= this.pageDtail.total_page; i++) {
            ret.push(i)
          }
        }
        return ret
      }
    },

    created() {
      window.onkeydown = (e) => {
        if (e.keyCode === 13) {
          if (this.pageInput !== '') {
            if (this.pageInput > this.pageDtail.total_page) {
              this.pageInput = this.pageDtail.total_page
            } else if (this.pageInput * 1 <= 0) {
              this.pageInput = 1
            }
            this.pageInput = Math.floor(this.pageInput * 1)
            this.page = this.pageInput
            this.$emit('addPage', this.page)
          }
        }
      }
      window.onclick = () => {
        this.hidePageDetail()
      }
    },
    methods: {
      getPage(page) {
        this.page = page
        this.$emit('addPage', this.page)
      },
      subtract() {
        if (this.page > 1) {
          this.page--
          this.$emit('addPage', this.page)
        }
        this.notAllowed()
      },
      notAllowed() {
        this.page === 1 ? this.isHand.handLeft = 'not-allowed' : this.isHand.handLeft = 'pointer'
        this.page === this.pageDtail.total_page ? this.isHand.handRight = 'not-allowed' : this.isHand.handRight = 'pointer'
        this.pageInput === '' ? this.isHand.handGo = 'not-allowed' : this.isHand.handGo = 'pointer'
      },
      addPage() {
        if (this.page < this.pageDtail.total_page) {
          this.page++
          this.$emit('addPage', this.page)
        }
      },
      showPageDetail() {
        this.pageDetail = !this.pageDetail
      },
      detailPage(page) {
        this.page = page
        this.pageIndex = page
        setTimeout(() => {
          this.hidePageDetail()
        }, 100)
        this.$emit('addPage', this.page)
      },
      hidePageDetail() {
        this.pageDetail = false
        this.focus = false
      },
      goPage() {
        if (this.pageInput !== '') {
          this.pageInput = Math.floor(this.pageInput * 1)
          if (this.pageInput > this.pageDtail.total_page) {
            this.pageInput = this.pageDtail.total_page
          } else if (this.pageInput * 1 <= 0) {
            this.pageInput = 1
          }
          this.page = this.pageInput
          this.$emit('addPage', this.page)
        }
      },
      beginPage(page = 1) {
        this.pageInput = ''
        this.page = page
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .total
    width: 100%
    height: 30px
    display: flex
    align-items: center
    justify-content: space-between
    align-items: center
    color: $color-text-main
    font-size: $font-size-14
    .page
      display: flex
      align-items: center
      .pade-detail
        align-items: center
        display: flex
        text-align: center
        .page-child
          padding: 0 6.5px
          min-width: 26px
          height: 26px
          box-sizing: border-box
          border-radius: 3px
          border: 0.5px solid $color-ccc
          font-size: $font-size-12
          color: $color-text-main
          line-height: 26px
          margin-right: 8px
          position: relative
          transition: all 0.3s ease-out
          &:after
            content: ''
            border-top: 0.5px solid transparent
            border-bottom: 0.5px solid transparent
            position: absolute
            z-index: 5
            height: 100%
            width: 0
            right: 0
            top: -0.5px
            box-sizing: content-box
            transition: all 0.3s ease-out
            border-radius: 3px
          &:before
            content: ''
            border-right: 0.5px solid transparent
            border-left: 0.5px solid transparent
            position: absolute
            z-index: 5
            height: 0
            width: 100%
            bottom: 0
            left: 0
            box-sizing: content-box
            transition: all 0.3s ease-out
            border-radius: 3px
        .page-child-active
          border: 0.5px solid transparent
          transition: all 0.3s ease-out
          color: $color-FF533C
          &:after
            border-color: $color-4985FC
            transition: all 0.3s ease-out
            width: 100%
          &:before
            border-color: $color-4985FC
            transition: all 0.3s ease-out
            height: 100%

        .page-hide-more
          width: 20px
          height: 4px
          display: inline-block
          margin-right: 8px
          icon-image('icon-spot')

      .page-icon
        cursor: pointer
        icon-image('icon-before')
        margin-right: 8px
        height: 25px
        width: 25px
        transition: all 0.3s
        &:hover
          transition: all 0.3s
          icon-image('icon-before_hover')
      .page-icon-two
        transition: all 0.3s
        icon-image('icon-later')
        &:hover
          transition: all 0.3s
          icon-image('icon-later_hover')
      .border-page
        display: flex
        line-height: 26px
        border-radius: 3px
        margin: 0 10px
        border: 0.5px solid $color-ccc
        font-size: $font-size-12
      div.border-page
        margin-right: 0
        padding: 0 15px
        height: 26px
        line-height: 28px
        cursor: pointer
      div.page-total
        cursor: pointer
        padding-right: 24px
        position: relative
        margin: 0
        border-animate($color-text-999, 3px)
        .page-tap
          position: absolute
          right: 0
          top: 0
          height: 26px
          display: inline-block
          width: 24px
          .page-top
            position: absolute
            left: 50%
            top: 50%
            margin-left: -4px
            margin-top: -5.5px
            width: 8px
            height: 11px
            background: url("./icon-pressed_down.png")
            background-size: 100% 100%
            transition: all 0.2s
            transform: rotate(0deg)
          .page-bottom
            transform: rotate(180deg)
        .page-list
          position: absolute
          width: 100%
          left: 0
          box-shadow: 0 1px 5px 0 rgba(12, 6, 14, 0.20)
          text-align: center
          background: $color-white
          border-radius: 3px
          bottom: 30px
          font-size: $font-size-12
          color: $color-text-sub
          max-height: 290px
          overflow-y: auto
          &.fade-enter, &.fade-leave-to
            opacity: 0
          &.fade-enter-to, &.fade-leave-to
            transition: all .3s ease-in-out
          .page-item
            cursor: pointer
            height: 29px
            line-height: 29px
            &:hover
              background: $color-FAFAFA
          .page-item-active
            background: $color-FAFAFA
      .input-box-big
        position: relative
        margin: 0 8px
        transition: all 0.4s ease-out
        input.border-page
          position: relative
          z-index: 10
          height: 26px
          width: 46px
          margin: 0
          text-align: center
          transition: all 0.4s ease-out
        .after
          border-top: 0.5px solid transparent
          border-bottom: 0.5px solid transparent
          position: absolute
          z-index: 5
          height: 28px
          width: 0
          right: 0
          top: -1px
          box-sizing: content-box
          border-radius 4px
          transition: all 0.4s ease-out
        .before
          border-right: 0.5px solid transparent
          border-left: 0.5px solid transparent
          position: absolute
          z-index: 5
          height: 0
          width: 48px
          bottom: 0
          left: -1px
          box-sizing: content-box
          border-radius 4px
          transition: all 0.4s ease-out
        &:hover
          .border-page
            transition: all 0.4s ease-out
            border: 0.5px solid transparent
          .after
            border-color: $color-text-999
            transition: all 0.4s ease-out
            width: 48px
          .before
            border-color: $color-text-999
            transition: all 0.4s ease-out
            height: 28px
      .input-box
        white-space: nowrap
        display: flex
        height: 29px
        align-items: center
        margin-right: 8px
      .page-box
        min-width: 64px
        height: 26px
        margin-right: 10px
</style>
