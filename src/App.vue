<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import 'utils/app-plugins'
  import {Global} from 'api'

  export default {
    name: 'App',
    created() {
      let hasToken = window.$storage.has('token')
      if (hasToken) {
        Global.getManagerInfo().then(res => {
          window.$storage.set('info', res.data)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
