import {defaultProcess} from './api-utils'

export default {
  createGoods (data, loading = true) {
    let url = '/api/admin/goods'
    data = _formatCreateGoodsData(data)
    return defaultProcess('post', url, data, loading)
  },
  getGoodsList (data, loading = false) {
    let url = '/api/admin/goods'
    return defaultProcess('get', url, data, loading, _resolveGoodsListData)
  }
}

// 解析商品列表数据
function _resolveGoodsListData(res) {
  let data = res.data.map(item => {
    return {
      title: item.title,
      imageURL: item.image_url,
      imageUrlThumb: item.image_url_thumb,
      type: item.type,
      isPutAway: +item.on_line ? '已上架' : '已下架',
      originPrice: item.original_price,
      userDiscount: item.customer_discount,
      merchantDiscount: item.store_discount,
      credits: item.planting_beans,
      platformPrice: item.price,
      browseCount: item.browse_count,
      saleCount: item.sale_count,
      store: item.goods_sku[0].goods_sku_stock,
      createdAt: item.created_at
    }
  })
  res.data = data
  return res
}

// 格式化创建商品数据
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
    'image_id': data.goodsImages[0].imageId,
    'usable_stock': data.store,
    'goods_skus': [
      {
        'id': data.goodsImages[0].id,
        'image_id': data.goodsImages[0].imageId,
        'customer_discount': data.userDiscount,
        'store_discount': data.merchantDiscount,
        'original_price': data.originPrice,
        'planting_beans': data.credits,
        'price': data.originPrice,
        'goods_specs': '',
        'goods_specs_str': '',
        'usable_stock': data.store
      }
    ]
  }
  return data
}
