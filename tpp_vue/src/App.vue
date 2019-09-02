<template>
 <div class="app-container">
      <!-- <router-view></router-view> -->
      <!--  缓存保存：套一层keep-alive -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
 </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  watch:{
    '$route' (to,from){
      console.log("App.vue正在监听路由，打印下个页面的路由：",to)
    }
  },
  name: 'App',
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))));
      sessionStorage.removeItem('store');
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
   .app-container{
      /* app.vue 自定义的属性 */
     /* padding-top:40px; */
     /* padding-bottom:50px; */
     padding:0;
     overflow-x:hidden;
   }

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;

}
</style>
