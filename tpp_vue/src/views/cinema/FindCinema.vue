<template>
  <div id="find_cinema">
    <!-- 加载漏斗组件 -->
    <my-load-wait></my-load-wait>
    <!--1： 头部导航栏部分，为其搭建一个组件 -->   
    <my-header-nav></my-header-nav>
    <van-tabs animated>
      <!-- 这里写的是时间  用假的时间来填充页面-->
      <van-tab v-for="(item,i) of dayList" :title="item" :key="i"> 
        <div class="placeholder"></div>
        <div class="today" v-show="i==0" :class="{'d-none':!isNone}">今天有场次</div>
        <!--2： 把数据传递给子组件 -->
        <find-cinema-item v-for="(cinema,i) of list.cinema" :key="i" :cinema="cinema" :time="list.movie[i]"></find-cinema-item>          
      </van-tab>
    </van-tabs>
    <!--3： 在页面没有数据时，这句话就会显示出来 -->
    <div :class="{'d-none':isNone}" class="noMovie">该城市没有影院在播放该电影，请重新选择城市</div>
  </div>
</template>
<script>
import findCinemaItem from "./FindCinemaItem";
//从movieLi 跳转过来时，要把 city_id (vuex获取),mid(movieLi)获取过来+
export default {
  data(){
    return{
      mid:"",
      list:[],
      isNone:true,
      week:["周日","周一","周二","周三","周四","周五","周六"],
      dayList:[],
  }
  },
  props:{

  },
  computed:{
    city_id(){
      //获取vuex保存的city_id
      return this.$store.state.city_id
    }
  },
  methods:{
    //获取今天的时间
    getDay(num){
      var d2=new Date();
      d2=d2.getTime();
      d2+=num*24*60*60*1000;
      //以d2毫秒数为基础
      var d1=new Date(d2);
      var month=d1.getMonth();
      month= (month>=9) ? month+1 : ("0"+(month+1))
      var date=d1.getDate();
      var week=d1.getDay();
      return [month+"-"+date,week];

    },
    getDayList(){
      for(var i=0;i<7;i++){
        var arr=["今天","明天","后天"]
        if(i<3){
          var arrDay=this.getDay(i);
          var arrTime=arr[i]+arrDay[0]
          this.dayList.push(arrTime);
        }else{
          var arrDay=this.getDay(i);
          var j=arrDay[1];
          var arrTime=this.week[j]+arrDay[0]
          this.dayList.push(arrTime);
        }
      }
      console.log(this.dayList);
    },
    // 获取mid的函数    //通过这个函数获取到mid的值  this.$router.push({  })传过来的mid
    routeMid(){
      this.mid = this.$route.query.mid    
    },
    //ajax请求
    load(){
      var url="cinema/v1/find_cinema";
      var obj={city_id:this.city_id,mid:this.mid};
      console.log(obj)
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==0){
          console.log(res.data.msg);
          this.isNone=false;
        }else{
          this.list=res.data.data;
          console.log(this.list)
        }
      })
    }
  },
  created(){
    // 在组件创建成功时，获取mid
    // console.log(this.$route.query);
    this.routeMid();
    this.load();
    this.getDay();
    this.getDayList();
  },
  components:{
    findCinemaItem,
  }
}
</script>
<style>
  /* @import url('../../assets/css/findCinema.css'); */
  #find_cinema .today{
    font-size:1.3rem;
    line-height: 30px;
    color:#999999;
    background-color:#f5f5f5;
    padding:1px 0 0 4vw;
  }
  #find_cinema .van-tabs__wrap{
    position:fixed;
    /* top:60px;  */
    z-index:1;
  }
  #find_cinema .placeholder{
    height:44px;
  }
  #find_cinema .noMovie{
    font-size:1.5rem;
    padding:20px;
    text-align: center;
    color:#999999;
  }
  .d-none{
    display: none;
  }
</style>