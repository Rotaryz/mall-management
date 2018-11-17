const env = process.env
const version = ``

const LOCAL_URL = {
  api: 'http://local.com'
}

const DEV_URL = {
  api: 'http://exchange-mall-api.jerryf.cn',
  upload: 'http://exchange-mall-api.jerryf.cn',
  // upload: 'https://zhidian-api.jkweixin.net/v1' + version // todo
}

const TEST_URL = {
  api: 'https://exchange-mall-api.jkweixin.net' + version,
  // upload: 'https://exchange-mall-api.jkweixin.net' + version,
  upload: 'https://zhidian-api.jkweixin.net/v1' + version // todo
}

const PROD_URL = {
  api: 'https://exchange-mall-api.jkweixin.com' + version,
  upload: 'https://exchange-mall-api.jkweixin.com' + version
}

export const BASE_URL = env.NODE_ENV === 'production' ? PROD_URL : env.NODE_ENV === 'test' ? TEST_URL : env.NODE_ENV === 'dev' ? DEV_URL : LOCAL_URL

export const ERR_OK = 0
