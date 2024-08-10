import router from './router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from './store'
import { asyncRoutes } from '@/router'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nProgress.done()
    } else {
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(roles.menus) // 数组 不确定 可能是8个 1个 0个
        // console.log(asyncRoutes) // 数组 8个
        const filterRoutes = asyncRoutes.filter(item => {
          // return true/false
          return roles.menus.includes(item.name)
        }) // 筛选后的路由
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }]) // 添加动态路由信息到路由表
        // router添加动态路由之后 需要转发一下
        next(to.path) // 目的是让路由拥有信息 router的已知缺陷
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nProgress.done()
    }
  }
})

router.afterEach(() => {
  nProgress.done()
})
