import request from 'common/js/request'
import _this from '@/main'

export default {
  createGoods (data, loading = true) {
    let url = '/api/admin/goods'
    data = _formatCreateGoodsData(data)
    return _defaultProcess('post', url, data, loading)
  }
}
// console.log(_defaultProcess)
function _defaultProcess(...args) {
  const [method, url, data, loading] = args
  return new Promise((resolve, reject) => {
    request[method](url, data, loading).then(res => {
      if (loading) {
        _this.$loading.hide()
      }
      if (_this.$ERR_OK !== res.error) {
        _this.$toast.show(res.message)
        return reject
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
function _formatCreateGoodsData(data) {
  let goodsImages = data.goodsImages.map(item => {
    return {
      'id': item.id,
      'image_id': item.imageId
    }
  })
  let bannerImages = data.detailImages.map(item => {
    return {
      'id': item.id,
      'image_id': item.imageId
    }
  })
  data = {
    'title': data.title,
    'subtitle': '',
    'type': data.type,
    'on_line': data.isPutAway ? '1' : '0',
    'original_price': data.originPrice,
    'customer_discount': data.userDiscount,
    'store_discount': data.merchantDiscount,
    'commission_rate': data.commission,
    'planting_beans': data.credits,
    'price': data.platformPrice,
    'is_recommended': data.isRecommend ? '1' : '0',
    'is_multi_specs': '0',
    'goods_category_id': '0',
    'goods_images': goodsImages,
    'goods_banner_images': bannerImages,
    'image_id': goodsImages[0].image_id,
    'goods_skus': [
      {
        'id': '0',
        'image_id': '0',
        'customer_discount': '1',
        'store_discount': '2',
        'original_price': '90',
        'planting_beans': '88',
        'price': '100',
        'goods_specs': '',
        'goods_specs_str': '',
        'usable_stock': '100'
      }
    ]
  }
  return data
}
