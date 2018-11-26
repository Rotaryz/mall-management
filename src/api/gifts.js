import {defaultProcess} from './api-utils'

export default {
  /**
   * 大礼包列表
   * @returns {*}
   */
  getGiftsList (data, loading = true) {
    let url = '/api/admin/gift_packs'
    return defaultProcess('get', url, data, loading)
  },
  /**
   * 大礼包详情
   * @returns {*}
   */
  giftsDetail (data, loading = true) {
    let url = `api/admin/gift_packs/${data}`
    return defaultProcess('get', url, {}, loading)
  },
  /**
   * 开启/关闭大礼包
   * @returns {*}
   */
  handleGifts (data, loading = true) {
    let url = `api/admin/gift_packs/update_open_state/${data.id}`
    return defaultProcess('post', url, data, loading)
  },
  /**
   * 删除大礼包
   * @returns {*}
   */
  deleteGifts (data, loading = true) {
    let url = `api/admin/gift_packs/${data}`
    return defaultProcess('delete', url, {}, loading)
  },
  /**
   * 创建大礼包
   * @returns {*}
   */
  createGifts (data, loading = true) {
    let url = '/api/admin/gift_packs'
    return defaultProcess('post', url, data, loading)
  },
  /**
   * 商品列表
   * @returns {*}
   */
  getGoodsList (data, loading = true) {
    let url = '/api/admin/goods'
    return defaultProcess('get', url, data, loading)
  }
}