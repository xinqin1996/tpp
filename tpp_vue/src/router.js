import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"



//对下面这些自己创建的组件进行路径的配置
// 每新建一个组件，就在这里导入，并为其创建一个接口
// import Index from './views/Index'
// import Lady from './views/Lady'
// import ShoppingCar from './views/ShoppingCar'
// import NotFound from './views/NotFound'
// import select from './views/select'
import Home from './views/Home'
import SelectCity from './views/city/SelectCity'
import MovieDetail from './views/movie/MovieDetail'
import FindCinema from './views/cinema/FindCinema'
import Cinema from './views/cinema/Cinema'
import Login from "./views/login/Login.vue"
import Reguser from "./views/reguser/Reguser.vue"
import Seat from "./views/seat/Seat.vue"
import Payment from "./views/payment/Payment.vue"
import MyTicket from "./views/my/MyTicket.vue"
import Transition from "./views/demo/Transition.vue"
import Tran2 from "./views/demo/Tran2.vue"

Vue.use(Router)

const router = new Router({    //1 使用ES6的规范，到出一个对象
  routes: [
    // {path:'/hello',component:HelloContainer},         //false 时，页面跳转过去，不会刷新页面   此时使用 <- 返回，不会刷新页面，会回到前一个的scrollTop位置
    {path:'/',component:Home,meta:{keepAlive:false}},    //false 不需要缓存页面 true需要缓存页面
    {path:'/selectCity',component:SelectCity,meta:{keepAlive:false}},
    {path:'/movieDetail/:mid',component:MovieDetail,props:true,meta:{keepAlive:false}},  //只有电影详情页使用了路由传参，尽量不使用
    {path:'/findCinema',component:FindCinema,meta:{keepAlive:false}},                //findCinema使用了路由，query传参
    {path:'/cinema',component:Cinema,meta:{keepAlive:false}},
    {path:'/login',component:Login,meta:{keepAlive:false}},
    {path:'/reguser',component:Reguser,meta:{keepAlive:false}},
    {path:'/seat',component:Seat,meta:{keepAlive:false}},
    {path:'/payment',component:Payment,meta:{keepAlive:false}},
    {path:'/myticket',component:MyTicket,meta:{keepAlive:false}},
    {path:'/tran',component:Transition,meta:{keepAlive:false}},
    {path:'/tran2',component:Tran2,meta:{keepAlive:false}},
    // {path:'/',component:Index},
    // {path:'/lady',component:Lady},
    // {path:'/shoppingCar',component:ShoppingCar},
    // {path:'/select',component:select},
    // {path:'*',component:NotFound}, 
  ],
  // 缓存保存
  mode: 'history',     //history // hash
  // 在缓存状态下，页面返回将回到离开时的位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if(from.meta.keepAlive){
        from.meta.savedPosition=document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0} 
    }
  }
  //注释：位置确实记录上了(加缓存，返回不刷新页面)，也就是说，返回不触发created，所以有些页面需要返回触发的东西都写在activated里面
  //activated() 在进入页面时触发函数，在缓存下也触发

  //1 获取路由地址
  // console.log(this.$route.path)
  // console.log(window.location.href)
  //2 返回前一个页面 
  // history.back();回到上一页
})
router.beforeEach( (to,from,next)=>{  //路由守卫，在页面跳转时打印路由的from和to
  // console.log(from)
  console.log("router.js正在打印to的信息，并允许跳转next()",to) 
  next();
})
export default router;
