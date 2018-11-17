<template>
  <el-date-picker
    v-model="time"
    size="small"
    type="daterange"
    class="border"
    :class="{'animate-border':focus}"
    range-separator="~"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @focus="pickerFocus"
    @blur="pickerBlur"
    @change="change"
  >
  </el-date-picker>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        time: '',
        focus: false
      }
    },
    methods: {
      pickerFocus() {
        this.focus = true
      },
      pickerBlur() {
        this.focus = false
      },
      change(time) {
        this.$emit('change', time)
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  @import '~common/stylus/mixin'

  .border
    position: relative
    &:after
      content: ''
      border-top: 0.5px solid transparent
      border-bottom: 0.5px solid transparent
      position: absolute
      z-index: 5
      height: 100%
      width: 0
      right: 0
      top: -1px
      box-sizing: content-box
      transition: all 0.3s ease-out
      border-radius: 4px
    &:before
      content: ''
      border-right: 1px solid transparent
      border-left: 1px solid transparent
      position: absolute
      z-index: 5
      height: 0
      width: 100%
      bottom: 0
      left: -1px
      box-sizing: content-box
      transition: all 0.3s ease-out
      border-radius: 4px
    &:hover
      border-color: transparent
      &:after
        border-top: 1px solid $color-text-999
        border-bottom: 1px solid $color-text-999
        transition: all 0.3s ease-out
        width: 100%
      &:before
        border-right: 1px solid $color-text-999
        border-left: 1px solid $color-text-999
        transition: all 0.3s ease-out
        height: 100%
  .animate-border
    border-color: $color-text-D9
    color: $color-main
</style>
