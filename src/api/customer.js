import {defaultProcess} from './api-utils'

export default {
  /**
   * 客户列表
   * @returns {*}
   */
  getCustomerList(data, loading = false) {
    let url = '/api/admin/customers'
    return defaultProcess('get', url, data, loading, resolveListData)
  }
}

const DEFAULT_IMG = 'https://zhidian-img.jkweixin.com/2018%2F11%2F27%2F1543300586996-pic-head%402x.png'
function resolveListData(res) {
  let data = res.data.map(item => {
    return {
      avatar: item.avatar || DEFAULT_IMG,
      nickname: item.nickname,
      sex: item.sex === 2 ? '女' : item.sex === 1 ? '男' : '未知',
      region: '补地区广东广州',
      mobile: item.mobile,
      credits: '补播豆2000',
      isGiftPack: item.is_gift_pack ? '已开通' : '未开通', // todo
      createdAt: ('' + item.created_at).split(' ')[0]
    }
  })
  res.data = data
  return res
}
