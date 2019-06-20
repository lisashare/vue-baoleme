import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home/Home'
import Ratings from '../components/pages/Home/Ratings'
import Seller from '../components/pages/Home/Seller'
import Goods from '../components/pages/Home/Goods'
Vue.use(Router)

export default new Router({
  module:'hash', //history需要后端设置
  //配置路由表
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        },{
          path: 'seller',
          name: 'seller',
          component: Seller
        }
      ]
    },
    // {
    //   // path:'**', //通配符就没有名字啦
    //   // redirect:'/not-found'
    // }
  ]
})
