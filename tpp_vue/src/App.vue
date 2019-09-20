<template>
 <div class="app-container">
   <!-- 因为页面布局的问题，暂时取消transition 过渡 -->
   <!-- <transition name="slide-left"> -->
      <!-- <router-view></router-view> -->
      <!--  缓存保存：套一层keep-alive -->
      <keep-alive key="con">
        <router-view v-if="$route.meta.keepAlive" class="child-view" key="keep"></router-view>
      </keep-alive>
   <!-- </transition> -->
   <!-- <transition name="slide-left"> -->
      <router-view v-if="!$route.meta.keepAlive" class="child-view" key="not"></router-view>   
   <!-- </transition> -->

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

/* 注释，不需要写这些 */
html{
  /* height:100%; */
  overflow: auto;
}
body{
  min-height:100%;
  position: relative;
  overflow-x: hidden;
} 

/* 过渡中设置绝对定位 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 1000ms;
  position: absolute;     /* 运行过程中变为绝对定位，否则页面一定会乱 */
}
/* 进入前 */
.slide-right-enter { 
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
/* 出去后 */
.slide-right-leave-to {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
/*  */
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
/*  */
.slide-left-leave-to {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}

/* 
.component-fade-enter{
  transform:translate(100vw,0)
}
.component-fade-leave-to{
  transform:translate(-100vw,0)
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: all 1s ease;
  position:absolute;
} */

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
