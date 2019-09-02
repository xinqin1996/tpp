import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法
//Vant的导入0
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

//全局定义 指令
Vue.directive('dir2', {
  inserted(el) {
      console.log("在main.js中自定义了指令：打印所在元素element",el);
      // el.style.width="200px"
  }
})

//全局定义 过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})


//引入第三方的组件库 mint ui
// 第1步 ：完整引入mint-ui组件库中的所有组件
import MintUI from 'mint-ui'
// 第2步 ： 单独引入mint-ui组件库中的样式
import 'mint-ui/lib/style.css'
// 第3步 ： 将mint-ui祖册到vue实例中
Vue.use(MintUI)
// 第4步 ： 将字体图标引入到当前项目中,引入第三方的iconfont.css
import  './font/font_1285854_comsztiakwk/iconfont.css'
import  './font/font_ra16fscd53k/iconfont.css'

// 5：引入axios,第三方模块
import axios from "axios";
// 6：配置axios 基础路径
axios.defaults.baseURL="http://127.0.0.1:5050/";
// 7：配置axios 保存session信息
axios.defaults.withCredentials=true;
// 8：注册vue 实例中
//由于axios不支持use 将实例添加vue原型
Vue.prototype.axios=axios;
//main.js
//9:引入Vuex第三方模块
import Vuex from "vuex";
//10:注册Vuex
Vue.use(Vuex);
//11:创建Vuex存储实例对象
var store = new Vuex.Store({
  //共享数据
  state:{
    seatObj:{},
    url:"http://127.0.0.1:5050/",  //定义路径
    uid:"",   //保存用户uid
    cmid:"", //保存电影时间
    toMoivePath:"",
    toLoginPath:"",
    uname:"",
    cid:"",  //给一个初始id 防止服务器端在没有cid时报错
    cname:"",
    mid:"",
    mname:"",
    city_id:7,
    city:"杭州",
    active:"movie",
    activeTwo:"now",
  },   
  //添加修改数据函数
  mutations:{
    selectCity(state,cityInfor){ //更换城市
      state.city_id=cityInfor[0];
      state.city=cityInfor[1];
    },
    changeActive(state,val){     //tabbar点击更换active
      state.active=val;
    },
    changeActiveTwo(state,val){     //tabbar点击更换activeTwo
      state.activeTwo=val;
    },
    changeMid(state,val){
      state.mid=val;
    },
    changeMname(state,val){
      state.mname=val;
    },
    changeCid(state,val){
      state.cid=val;
    },
    changeCname(state,val){
      state.cname=val;
    },
    changeToLoginPath(state,val){
      state.toLoginPath=val;
    },
    changeUid(state,val){
      state.uid=val;
    },
    changeCmid(state,val){
      state.cmid=val;
    },
    changeSeatObj(state,val){
      state.seatObj=val;
    },
    // increment(state){ //购物车数量加1
    //   state.cartCount++;
    // },
    // subItem(state){
    //   state.cartCount--;
    // },
    // clear(state){     //购物车数量清零
    //   state.cartCount=0;
    // }
  },
  //添加获取数据函数
  getters:{
    getCity_id(state){
      return state.city_id;
    },
    getCity(state){
      return state.city;
    },
    getMid(state){
      return state.mid;
    },
    getUid(state){
      return state.uid;
    },
    getToLoginPath(state){
      return state.toLoginPath;
    },
    getSeatObj(state){
      return state.seatObj;
    }
    // this.$store.getters.getUid;  获取数据的语法；
  },
  //添加异步操作数据函数
  actions:{
    //修改数据函数保存mutations clear
    //异步执行操作
    //context 上下文对象=>$store对象
    modifyCount:(context)=>{
      //异步等待500毫秒调用clear函数
      setTimeout(()=>{
        context.commit("clear")
      },500)
    }
    // 调用    -执行actions里面函数
    // this.$store.dispath(' modifyCount ');
  }
});


//全局组件 header
// import MyHeader from './components/Header'
// Vue.component("my-header",MyHeader);
//全局组件 footer
// import MyFooter from './components/Footer'
// Vue.component("my-footer",MyFooter);
//全局组件 City
import City from "./components/City"
Vue.component("my-city",City);

import HeaderNav from "./components/HeaderNav"
Vue.component("my-header-nav",HeaderNav)

import LoadWait from "./components/LoadWait"
Vue.component("my-load-wait",LoadWait)


Vue.config.productionTip = false



// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

//12:将实例对象添加Vue中
new Vue({
  router,
  render: h => h(App),
  store   //!!!!
}).$mount('#app')
