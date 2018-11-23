import request from '../common/js/request'
import {defaultProcess} from './api-utils'
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
    return defaultProcess('post', url, data, loading, _resolveLoginInfoData)
  },
  getManagerInfo (data, loading = false) {
    let url = `/api/admin/profile`
    return defaultProcess('get', url, data, loading, _resolveManagerInfoData)
  }
}

const DEFAULT_LOGO = `https://zhidian-img.jkweixin.com/2018%2F11%2F23%2F1542945169074-logo.jpg`
const DEFAULT_NAME = 'SUPER'
function _resolveManagerInfoData(res) {
  res.data = _formatInfo(res.data)
  return res
}
function _resolveLoginInfoData(res) {
  res.data.info = _formatInfo(res.data.info)
  return res
}

function _formatInfo(data) {
  return {
    appId: data.application_id,
    appName: data.application_name,
    avatar: data.avatar || DEFAULT_LOGO,
    name: data.name || DEFAULT_NAME,
    mobile: data.mobile,
    email: data.email,
    status: data.status
  }
}
