<template>
  <div id="find_cinema_item">
    <!-- <div>{{cinema.cname}}</div>
    <div>{{cinema.caddress}}</div>
    <button v-for="(elem,i) of time" :key="i">
      <span> {{elem.time_start}}</span>
      <span> {{elem.price_e}}元 </span>
    </button>
    <br>
    <hr> -->
    <div class="cinema_item">
      <div class="cname" @click="goCinema">{{cinema.cname}}</div>
      <div class="caddress">{{cinema.caddress}}</div>
      <div class="tag cf">
        <div class="tag_icon" v-for="(elem,i) of strSplit(cinema.tag)" :key="i">{{elem}}</div>
      </div>
      <div class="prefe">
        <div class="hui">惠</div>
        <div class="content">{{cinema.prefe}}</div>
      </div>
      <!-- 时间的排列 -->
      <div class="time">
        <ul class="cf" :style="{width:ulWidth+'px'}">
          <li class="time_block" v-for="(elem,j) of time" :key="j" @click="goSeat" :data-cmid="elem.cmid">
            <h3 class="h_1">{{elem.time_start}}</h3>
            <h3 class="h_2">{{elem.d23}}</h3>
            <h3 class="h_3">{{elem.price_e}}</h3>
          </li>
        </ul>
      </div>
      <div class="lowest">{{cinema.lowest}}元起</div>
    </div>
  </div>
</template>
<script>
//从movieLi 跳转过来时，要把 city_id (vuex获取),mid(movieLi)获取过来
export default {
  data(){
    return{
      ulWidth:800,
    }
  },
  methods:{
    //跳转到seat.vue
    goSeat(e){
      var cmid=e.currentTarget.dataset.cmid;
      var uid=this.$store.getters.getUid;
      //1 如果登录了，跳转到seat.vue
      console.log(uid);
      if(uid!=""){
        this.$store.commit("changeCmid",cmid);
        this.$router.push(`/seat`)
      }else{
        //2 如果没登录,先登录，在跳转
        this.$messagebox.confirm("是否立即登录")
        .then(action=>{
          this.$router.push('/login')
        })
        .catch(err=>{return;})
      }
    },
    //---------跳转到影院界面,同时把cid,cname,保存到vuex---------
    goCinema(){
      this.$router.push("/cinema");
      //--vuex--
      // this.$store.commit("changeMname",this.elem.mname)
      this.$store.commit("changeCid",this.cinema.cid)
      this.$store.commit("changeCname",this.cinema.cname)
    },
    getUlWidth(){
      //-----直接在created:里写，使用getComputedStyle报错，但是有效果；
      var li=document.getElementsByClassName("time_block")[0];
      var style=getComputedStyle(li);
      // console.log(li);
      var num=this.time.length;
      var oneWidth=parseFloat(style.width)+parseFloat(style["margin-right"]);
      this.ulWidth=num*oneWidth+5;
      // console.log(style.width);
      // console.log(style["margin-right"]);
    },
    //split函数，用于切割字符串形成数组
    strSplit(str){
      var arr=str.split("，");
      // console.log(arr)
      return arr;
    }
  },
  //把dom的操作函数的调用，写在这里面
  //-----------------------------//
  //最经常使用的模式是为你的组件获取数据（使用created创建的），并修改DOM，通常集成非Vue库
  //-----------------------------//
  mounted(){
   this.getUlWidth();
  },
  created(){
    // this.getUlWidth();
    // console.log(this.cinema);  //打印父组件传过来的数值
    // console.log(this.time);    //
  },  
  props:{
    cinema:{default:""},
    time:{default:""}
  },
}
</script>
<style>
  @import url('../../assets/css/findCinemaItem.css');
</style>