import Vue from 'vue'
import Router from 'vue-router'
//import Layout from '@/components/Layout'
import IndexPage from '../pages/index'
import DetailPage from '../pages/Detail'
// 四个detail页面使用element-ui前端框架实现基本的元素展示 
import DetailTotalsPage from '../pages/detail/totals'
import DetailAnalysisPage from '../pages/detail/analysis'
import DetailBoardCasePage from '../pages/detail/boardcase'
import DetailForeCastPage from '../pages/detail/forecast'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
        path: '/',
        name: 'IndexPage',
        component: IndexPage
    },
    {
        path : '/detail',
        component : DetailPage,
        redirect : "/detail/totals",
        children : [
            {
                path : 'totals',
                component : DetailTotalsPage
            },
            {
                path : 'analysis',
                component : DetailAnalysisPage
            },
            {
                path : 'boardcase',
                component : DetailBoardCasePage
            },
            {
                path : 'forecast',
                component : DetailForeCastPage
            }
        ]
    }
  ]
})
