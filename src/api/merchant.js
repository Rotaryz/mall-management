import {defaultProcess} from './api-utils'

export default {
  getList(data, loading = false) {
    let url = '/api/admin/merchants'
    return defaultProcess('get', url, data, loading, resolveListData)
  }
}
const DEFAULT_LOGO = `https://zhidian-img.jkweixin.com/2018%2F11%2F23%2F1542945169074-logo.jpg`
const DEFAULT_IMG = 'https://zhidian-img.jkweixin.com/2018%2F11%2F27%2F1543300586996-pic-head%402x.png'
const DEFAULT_VALUE = '未知'
function resolveListData(res) {
  let data = res.data.map(item => {
    let store = item.store || {}
    return {
      logo: store.logo || DEFAULT_IMG,
      shopName: store.name || DEFAULT_VALUE,
      managerName: store.store_owner || DEFAULT_VALUE,
      mobile: store.store_owner_mobile || DEFAULT_VALUE,
      region: store.region || DEFAULT_VALUE,
      address: store.address || DEFAULT_VALUE,
      isGiftPack: store.is_gift_pack ? '已开通' : '未开通',
      createdAt: ('' + store.created_at).split(' ')[0] || DEFAULT_VALUE,
      shopQrCode: DEFAULT_LOGO // todo
    }
  })
  res.data = data
  return res
}
