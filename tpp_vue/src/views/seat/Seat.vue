<template>
  <div class="root" id="seat">
    <div class="content">
      <div class="dy-list-item">
        <div class="cinema-info">
          <div class="dy-list-title" v-cloak>{{detail.cname}}</div>
          <div class="dy-list-brief" v-cloak>今天 {{detail.time_start}}~{{detail.time_end}} ({{detail.d23}})</div>
        </div>
      </div>
      <div id="J_xseat">
        <div class="seat-legend">
          <ul>
            <li>
              <i class="tpp-i i-normal core"></i>可选
            </li>
            <li>
              <i class="tpp-i i-sold core"></i>已售
            </li>
            <li>
              <i class="tpp-i i-best-area"></i>最佳观影区
            </li>
          </ul>
        </div>
        <div class="hall-name">
          <p class="i-screen">彩虹厅 银幕</p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="list_bg">
      <div class="seat_list" @click="choose">
        <div class="row" v-for="(item,index) of list" :key="index">
          <div class="col" v-for="(elem,index2) of item" :key="index2">
            <!-- show==0 代表座位已经出售，显示为红色   -->
            <span :data-j="elem.j" :data-i="elem.i" :data-show="elem.show" :data-choose="elem.choose" :class="{'is_show':elem.show==0,green:elem.choose==1}"></span>          
          </div>
        </div>
      </div>     
    </div>
    <div class="choose_main">
      <ul>
        <li class="choose_item" v-for="(elem,i) of buyList" :data-j="elem.j" :data-i="elem.i" :key="i" @click="del">
          <h3>{{elem.j+1}}排{{elem.i+1}}座</h3>
          <h4>72.7元</h4>
        </li>        
      </ul>
    </div>
    <div class="jus" :class="{show:buyList.length>0}" @click="toPayment">
      <span class="tpp-btn">请选座位</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      num:0,
      detail:[],     //保存了这部电影时间价格影院
      cname:'',
      id:[1,3,4,6],
      list:[],      //座位列表  这种形式  [ {i:7,j:3},{i:7,j:4} ]   全部的座位列表
      soldList:[ {i:8,j:5},{i:8,j:3},{i:8,j:4},{i:6,j:5},{i:7,j:3},{i:7,j:4} ],  //已售位置
    }
  },
  created(){
    this.load();
    this.createList();
  },
  computed:{   
    cmid(){
      return this.$store.state.cmid;
    },
    //使用计算属性，计算出一个数组，里面包含了，choose==1的对象，可以（强行监听数组 list=[] 的变化）
    buyList(){  
      var list=[];
      for(var j=0;j<this.list.length;j++){
        for(var i=0;i<this.list[j].length;i++){
          if(this.list[j][i].choose==1){
            list[list.length]=this.list[j][i];
          }
        }
      }
      return list;
    },
  },  
  methods:{
    toPayment(){
      if(this.buyList.length>0){
          // 路由传参对象，接受页面一刷新，数据就会变为
          // {buyList: Array(4), detail: "[object Object]", cname: "[object Object]"}
          var obj={buyList:this.buyList,detail:this.detail,cname:this.cname}
          // console.log(obj);
          // this.$router.push({
          //   path:"/payment",
          //   query:obj
          // })      
        //  vuex
        this.$store.commit("changeSeatObj",obj);
        this.$router.push('/payment')
      }else{
        this.$toast({
          message:"请先选择座位",
          duration:1000
        })
      }

    },
    //删除位置
    del(e){ 
      // console.log(e.currentTarget);
      var el=e.currentTarget;
      var j=el.dataset.j;
      var i=el.dataset.i;
      //找到对应的元素 删除      
      this.list[j][i].choose=0;
      this.num--;
    },
    //选座位
    choose(e){
      var el=e.target;
      if(el.nodeName=="SPAN"){ 
        var s=el.dataset.show;
        if(this.num>=6){
          this.$toast({
            message:"最多可选6个座位",
            duration:1000
          })
          return;
        }
        if(s!=0){         //在s!=0 是操作
          // var list=this.list;
          var j=el.dataset.j;
          var i=el.dataset.i;      
          if(el.dataset.choose==0){   //没有选中，让其选中
            this.list[j][i].choose=1;  
            this.num++;   
          }else{                           //否则让其不选中
            this.list[j][i].choose=0;
            this.num--;
          }      
        }
      } 
    },
    //创建座位list，
    createList(){
      var soldList=this.soldList;
      var list = [];
      for(var a=0;a<9;a++){
        var li=[]
        for(var b=0;b<14;b++){
          var num=0;
          for(var z=0;z<soldList.length;z++){
            if((soldList[z].i==b) && (soldList[z].j==a)){
              num++;
            }
          }
          if(num>0){
            var obj={i:b,j:a,show:0,choose:0}  //show:0 位置出售    
          }else{
            var obj={i:b,j:a,show:1,choose:0}  //show:1 位置未出售
          }
          li[b]=obj;
        }
        list[a]=li;
      }
      this.list=list;
    },
    //load
    load(){
      var url="cinema/v1/seat"
      var cmid=this.cmid;
      var obj={cmid};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==0){
          console.log(res.data.msg)
        }else{
          this.detail=res.data.data.detail;
          this.cname=res.data.data.cname;
        }
      })
    },
  }
}
</script>
<style>
    @import url("../../assets/css/seat.css");
</style>