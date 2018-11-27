import {defaultProcess} from './api-utils'

export default {
  getList(data, loading = false) {
    let url = '/api/admin/merchants'
    return defaultProcess('get', url, data, loading, resolveListData)
  }
}
const DEFAULT_LOGO = `https://zhidian-img.jkweixin.com/2018%2F11%2F23%2F1542945169074-logo.jpg`
const DEFAULT_IMG = 'https://zhidian-img.jkweixin.com/2018%2F11%2F27%2F1543300586996-pic-head%402x.png'
function resolveListData(res) {
  let data = res.data.map(item => {
    let store = item.store || {}
    return {
      logo: store.logo || DEFAULT_IMG,
      shopName: store.name,
      managerName: store.store_owner,
      mobile: store.store_owner_mobile,
      region: store.region,
      address: store.address,
      isGiftPack: store.is_gift_pack ? '已开通' : '未开通',
      createdAt: '2018-10-22代补',
      shopQrCode: DEFAULT_LOGO // todo
    }
  })
  res.data = data
  return res
}
