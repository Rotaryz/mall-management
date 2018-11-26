// import request from '../common/js/request'
import {defaultProcess} from './api-utils'

export default {
  /**
   * 客户列表
   * @returns {*}
   */
  getCustomerList(data, loading = true) {
    let url = '/api/admin/customers'
    // return request.get(url, data, loading)
    return defaultProcess('get', url, data, loading)
  }
}
