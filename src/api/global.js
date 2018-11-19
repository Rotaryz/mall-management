import request from '../common/js/request'

export default {
  /**
   * 获取微信JSSDK配置
   * @returns {*}
   */
  jssdkConfig (data, loading = false) {
    let url = '/api/wechat/jssdk'
    return request.get(url, data, loading)
  },
  login (data, loading = true) {
    let url = '/api/admin/login'
    return request.post(url, data, loading)
  }
}
