<template>
    <div class="goods-manager">
      <h1 @click="test">1231sdsadsadadad</h1>
      <modal ref="modal"></modal>
    </div>
</template>

<script type="text/ecmascript-6">
  import Modal from 'components/base-modal/base-modal'
  export default {
    components: {
      Modal
    },
    name: '',
    methods: {
      test() {
        this.$refs.modal.show()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

</style>
