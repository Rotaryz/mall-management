import _this from '@/main'
import request from 'common/js/request'

// 通用的api请求方式
export function defaultProcess(...args) {
  const [method, url, data, loading, fn] = args
  return new Promise((resolve, reject) => {
    request[method](url, data, loading).then(res => {
      if (loading) {
        _this.$loading.hide()
      }
      if (_this.$ERR_OK !== res.error) {
        _this.$toast.show(res.message)
        return reject
      }
      if (fn) {
        res = fn(res)
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
