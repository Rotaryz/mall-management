<template>
  <div class="search-box">
    <div class="input-box-big">
      <span class="after"></span>
      <form autocomplete="off">
        <input type="text" class="input-box" v-model="txt" :placeholder="placeholerTxt" autocomplete="off">
      </form>
      <span class="before"></span>
    </div>
    <div class="btn-box hand" @click="searchFn">{{btnTxt}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholerTxt: {
        type: String,
        default: '请输入'
      },
      btnTxt: {
        type: String,
        default: '搜 索'
      }
    },
    data() {
      return {
        inputTxt: '',
        txt: ''
      }
    },
    methods: {
      setInput(txt) {
        this.txt = txt
      },
      searchFn() {
        this.$emit('search', this.txt)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  $input-width = 176px
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .search-box
    display: flex
    align-items: center
    .input-box-big
      position: relative
      transition: all 0.4s ease-out
      .input-box
        position: relative
        z-index: 10
        border-width: 1px
        border-style: solid
        border-color: $color-text-D9
        border-right: 0
        width: $input-width
        border-radius: 4px 0 0 4px
        height: 29px
        font-size: $font-size-12
        font-family: $font-family-regular
        color: $color-text-main
        outline: none
        box-sizing: border-box
        text-indent: 8px
        line-height: 28px
        transition: all 0.4s
        background-color: $color-white
        background-clip: content-box
      .after
        border-top: 1px solid transparent
        border-bottom: 1px solid transparent
        position: absolute
        z-index: 5
        height: 27px
        width: 0
        right: 0
        top: 0
        border-radius 4px 0 0 4px
        transition: all 0.4s ease-out
      .before
        border-left: 1px solid transparent
        position: absolute
        z-index: 5
        height: 0
        width: 224px
        bottom: 0
        left: 0
        border-radius 4px 0 0 4px
        transition: all 0.4s ease-out
      &:hover
        .input-box
          border-color: transparent
        .after
          border-color: $color-text-999
          transition: all 0.4s ease-out
          width: $input-width
        .before
          border-color: $color-text-999
          transition: all 0.4s ease-out
          height: 27px



    .input-box::-webkit-input-placeholder { /* WebKit browsers */
      color: $color-ccc
      font-size: 12px
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: $color-ccc
      font-size: 12px
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: $color-ccc
      font-size: 12px
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: $color-ccc
      font-size: 12px
    }
    .btn-box
      background: $color-main
      width: 48px
      height: 29px
      text-align: center
      line-height: 29px
      border-radius: 0 4px 4px 0
      box-sizing: border-box
      font-family: $font-family-regular
      color: $color-white
      font-size: $font-size-12
      transition: font-size 0.4s ease-out
      &:hover
        font-size: 13px


</style>
