import Vue from 'vue'
import storage from 'storage-controller'
import base from 'common/mixins/base'
import { ERR_OK } from 'common/js/config'
import * as handle from './cos/handle'
import { fileType } from './cos/file-config'
import * as cos from './cos/cos'
import RouterViewCommon from 'components/router-view-common'
import Toast from 'components/toast'
import Loading from 'components/loading'
import createQrCode from './create-qr-code'

// 定义插件
const AppPlugin = {
  install: function () {
    Vue.mixin(base)
    Vue.prototype.$ERR_OK = ERR_OK
    Vue.prototype.$handle = handle
    Vue.prototype.$cosFileType = fileType
    Vue.prototype.$cos = cos
    Vue.prototype.$createQrCode = createQrCode
  }
}
// 使用插件
Vue.use(AppPlugin)
Vue.use(Toast)
Vue.use(Loading)
Vue.use(RouterViewCommon)
Window.$storage = storage
