<template>
  <div class="demo">
    <h1 @click="toastTest">toast</h1>
    <hr>
    <h1>截图上传</h1>
    <input type="file" @change="_fileChange($event, 'images')" accept="image/*"/>
    <hr>
    <h1>直接上传</h1>
    <input type="file" @change="_fileChange($event, 'images-only')" accept="image/*"/>
    <img v-if="testSrc" style="width: 100%" :src="testSrc" alt="">
    <hr>
    <h1>点播上传</h1>
    <input type="file" @change="_fileChange($event, 'video')" accept="video/*"/>
    <video v-if="testVideo" :src="testVideo" style="width: 100vw"></video>
    <hr>
    <h1>二维码</h1>
    <button @click="createQrCode">生成二维码</button>
    <router-link tag="h1" to="/hello-world/other-pages">跳其他页面</router-link>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        testSrc: '',
        testVideo: ''
      }
    },
    created() {
      this.$loading.show()
      setTimeout(() => {
        this.$loading.hide()
      }, 1500)
      // this._getWxSdk()
    },
    methods: {
      toastTest() {
        this.$toast.show('asdaskh撒谎打开手机大厦快点哈达克阿萨大大撒旦djasd')
      },
      createQrCode() {
        let str = JSON.stringify({ 'code': 8297128291, 'store_id': 8 }) // todo
        let img = this.$createQrCode.png(str) // png
        // img = this.$createQrCode.svg(str) // svg
        this.testSrc = img
        // this.$createQrCode.pngAsync(str, pic => { // 异步 todo
        //   this.testSrc = pic
        // })
      },
      _fileChange(e, type) {
        let arr = Array.from(e.target.files)
        if (arr.length <= 0) {
          return
        }
        switch (type) {
          case 'images' :
            this.$refs.cropper.show(arr[0])
            break
          case 'images-only' :
            this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, arr).then((resArr) => {
              this.$loading.hide()
              let arr = []
              resArr.map(item => {
                if (item.error !== this.$ERR_OK) {
                  return this.$toast.show(item.message)
                }
                let obj = {
                  image_id: item.data.id,
                  image_url: item.data.url,
                  id: 0
                }
                arr.push(obj)
              })
              this.testSrc = arr[0].image_url
            })
            break
          case 'video' :
            this.$loading.show('视频上传中...')
            this.$vod.uploadFiles(arr[0], curr => {
              this.$loading.showCurr(curr)
            }).then(res => {
              this.$loading.hide()
              if (res.error !== this.$ERR_OK) {
                this.$toast.show(res.message)
                return
              }
              this.testVideo = res.vod.videoUrl
            })
            break
          default:
            break
        }
      },
      async cropperConfirm(e) {
        this.$loading.show()
        let resArr = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [e.file])
        let res = resArr[0]
        if (res.error !== this.$ERR_OK) {
          return this.$toast.show(res.message)
        }
        let obj = {
          image_id: res.data.id,
          image_url: res.data.url,
          id: 0
        }
        this.testSrc = obj.image_url
        this.$loading.hide()
        this.$refs.cropper.cancel()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
</style>
