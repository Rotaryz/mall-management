import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const HelloWorld = () => import('pages/hello-world/hello-world')
const OtherPages = () => import('pages/other-pages/other-pages')
const Demo = () => import('pages/demo/demo')
const Login = () => import('pages/login/login')
const Home = () => import('pages/home/home')
const OrderManager = () => import('pages/order-manager/order-manager')
const OrderManagerDetail = () => import('pages/order-manager-detail/order-manager-detail')
const UserManager = () => import('pages/user-manager/user-manager')
const MerchantManager = () => import('pages/merchant-manager/merchant-manager')
const GoodsManager = () => import('pages/goods-manager/goods-manager')
const GoodsDetail = () => import('pages/goods-detail/goods-detail')
const UserGifts = () => import('pages/user-gifts/user-gifts')
const BusinessGifts = () => import('pages/business-gifts/business-gifts')
const NewUserGifts = () => import('pages/new-user-gifts/new-user-gifts')
const NewBusinessGifts = () => import('pages/new-business-gifts/new-business-gifts')

Vue.use(Router)

const route = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'user-manager',
          component: UserManager,
          meta: {
            title: '用户管理'
          }
        },
        {
          path: 'merchant-manager',
          component: MerchantManager,
          meta: {
            title: '商家管理'
          }
        },
        {
          path: 'goods-manager/credits',
          component: GoodsManager,
          meta: {
            title: '播豆商品'
          }
        },
        {
          path: 'goods-manager/money',
          component: GoodsManager,
          meta: {
            title: '折扣商品'
          }
        },
        {
          path: 'goods-manager/credits/goods-detail',
          component: GoodsDetail,
          meta: {
            title: '新建折扣商品'
          }
        },
        {
          path: 'goods-manager/money/goods-detail',
          component: GoodsDetail,
          meta: {
            title: '新建播豆商品'
          }
        },
        {
          path: 'order-manager/user',
          component: OrderManager,
          meta: {
            title: '用户订单'
          }
        },
        {
          path: 'order-manager/merchant',
          component: OrderManager,
          meta: {
            title: '商家订单'
          }
        },
        {
          path: 'order-manager/user/order-detail',
          component: OrderManagerDetail,
          meta: {
            title: '用户订单详情'
          }
        },
        {
          path: 'order-manager/merchant/order-detail',
          component: OrderManagerDetail,
          meta: {
            title: '商家订单详情'
          }
        },
        {
          path: 'hello-world',
          component: HelloWorld,
          meta: {
            title: 'one'
          }
        },
        {
          path: 'other-pages',
          component: OtherPages,
          meta: {
            title: 'tab-two'
          }
        },
        {
          path: '/gifts/user-gifts',
          component: UserGifts,
          meta: {
            title: '用户大礼包'
          }
        },
        {
          path: '/gifts/business-gifts',
          component: BusinessGifts,
          meta: {
            title: '商家大礼包'
          }
        },
        {
          path: '/gifts/user-gifts/new-user-gifts',
          component: NewUserGifts,
          meta: {
            title: '用户大礼包'
          }
        },
        {
          path: '/gifts/user-gifts/new-business-gifts',
          component: NewBusinessGifts,
          meta: {
            title: '用户大礼包'
          }
        },
        {
          path: 'demo',
          component: Demo,
          meta: {
            title: 'demo'
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登陆'
      }
    }
  ]
})

const DEFAULT_TITLE = '智店积分商城'
const DEFAULT_ROUTE = '/user-manager'
const OAUTH_ROUTE = '/login' // 授权页面

route.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  if (to.path === '/') {
    const token = storage.get('token', '')
    if (token) {
      next({path: DEFAULT_ROUTE, replace: true})
    } else {
      next({path: OAUTH_ROUTE, replace: true})
    }
  }
  next()
})

export default route
