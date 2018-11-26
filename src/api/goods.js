import {defaultProcess, commonProcess} from './api-utils'

export default {
  createGoods (data, loading = true) {
    let url = '/api/admin/goods'
    data = _formatCreateGoodsData(data)
    return defaultProcess('post', url, data, loading)
  },
  getGoodsList (data, loading = false) {
    let url = '/api/admin/goods'
    return defaultProcess('get', url, data, loading, _resolveGoodsListData)
  },
  getGoodsDetail (data, loading = false) {
    let url = `/api/admin/goods/${data.goodsId}`
    return defaultProcess('get', url, data, loading, _resolveGoodsDetailData)
  },
  // 上下架
  updateStatus (data, loading = true, toast = false) {
    let url = `/api/admin/goods/updateShelfState/${data.goodsId}`
    return commonProcess('post', url, {}, loading, toast)
  },
  delete (data, loading = true) {
    let url = `/api/admin/goods/${data.goodsId}`
    return defaultProcess('delete', url, data, loading)
  },
  // 编辑
  updateGoods (data, loading = true) {
    let url = `/api/admin/goods/${data.goodsId}`
    data = _formatCreateGoodsData(data)
    return defaultProcess('put', url, data, loading)
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
      isPutAwayStr: +item.on_line ? '已上架' : '已下架',
      isPutAway: +item.on_line,
      originPrice: item.original_price,
      userDiscount: item.customer_discount,
      merchantDiscount: item.store_discount,
      credits: item.planting_beans,
      platformPrice: item.price,
      browseCount: item.browse_count,
      saleCount: item.sale_count,
      store: (item.goods_sku[0] && item.goods_sku[0].goods_sku_stock) || '',
      createdAt: item.created_at,
      goodsId: item.id
    }
  })
  res.data = data
  return res
}
// 解析商品详情数量
function _resolveGoodsDetailData(res) {
  let resData = res.data
  let goodsImages = resData.goods_images.map(item => {
    return {
      id: item.id,
      imageId: item.image_id,
      imageURL: item.image_url
    }
  })
  let detailImages = resData.goods_banner_images.map(item => {
    return {
      id: item.id,
      imageId: item.image_id,
      imageURL: item.image_url
    }
  })
  let sku0 = resData.goods_sku[0] || {}
  let data = {
    title: resData.title,
    isPutAway: +resData.on_line,
    originPrice: +resData.original_price,
    userDiscount: +resData.customer_discount,
    merchantDiscount: +resData.store_discount,
    credits: +resData.planting_beans || '',
    platformPrice: +sku0.price || '',
    store: +sku0.goods_sku_stock || '',
    goodsId: resData.id,
    isRecommend: +resData.is_recommended,
    commission: +resData.commission_rate || '',
    skuId: +sku0.id || 0,
    saleCount: +resData.sale_count,
    goodsImages,
    detailImages
  }
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
        'id': data.skuId || '0',
        'image_id': data.goodsImages[0].imageId,
        'customer_discount': data.userDiscount,
        'store_discount': data.merchantDiscount,
        'original_price': data.originPrice,
        'planting_beans': data.credits,
        'price': data.platformPrice || 0,
        'goods_specs': '',
        'goods_specs_str': '',
        'usable_stock': data.store
      }
    ]
  }
  return data
}
