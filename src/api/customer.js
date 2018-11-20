import request from '../common/js/request'

export default {
  /**
   * 客户列表
   * @returns {*}
   */
  getCustomerList(data, loading = true) {
    let url = '/api/admin/customers'
    return request.get(url, data, loading)
  }
}
