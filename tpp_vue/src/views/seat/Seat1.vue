<template>
  <div class="root" id="seat">
    <div class="content">
      <div class="dy-list-item">
        <div class="cinema-info">
          <div class="dy-list-title">哪吒之魔童降世</div>
          <div class="dy-list-brief">今天 08-20 20:05~21:55(国语 3D)</div>
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
            <span :data-j="elem.j" :data-i="elem.i" :data-show="elem.show" :class="{'is_show':elem.show==0}"></span>          
          </div>
        </div>
      </div>     
    </div>
    <div class="choose_main">
      <ul>
        <li class="choose_item" v-for="(elem,i) of buyList" :data-seat="elem" :key="i" @click="del">
          <h3>{{elem}}</h3>
          <h4>72.7元</h4>
        </li>        
      </ul>
    </div>
    <div class="jus" :class="{show:buyList.length>0}">
      <span class="tpp-btn">请选座位</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      list:[],      //座位列表  这种形式  [ {i:7,j:3},{i:7,j:4} ]   全部的座位列表
      soldList:[ {i:8,j:5},{i:8,j:3},{i:8,j:4},{i:6,j:5},{i:7,j:3},{i:7,j:4} ],  //已售位置
      buyList:[],   //${el.dataset.j}排${el.dataset.i}座  这种形式的名字 ,显示在底部
    }
  },
  created(){
    this.createList();
  },
  methods:{
    //删除一个座位
    delSeat(str){
      for(var i=0;i<this.buyList.length;i++){
        if(this.buyList[i]==str){
          this.buyList.splice(i,1);
        }
      }
    },
    // 删除座位编号
    del(e){ 
      console.log(e.currentTarget);
      var str=e.currentTarget.dataset.seat;
      this.delSeat(str);
      var arr=str.split(/[排座]/)
      //找到对应的元素 删除class
      var slist=document.getElementsByClassName("seat_list")[0];
      var elems=slist.querySelectorAll("[data-i]");
      for(var i=0;i<elems.length;i++){
        if(elems[i].dataset.j==arr[0] && elems[i].dataset.i==arr[1]){
          elems[i].className="";
        }
      }
    },
    //选座位
    choose(e){
      var el=e.target;
      if(el.nodeName=="SPAN"){ 
        var s=el.dataset.show;
        var str=`${el.dataset.j}排${el.dataset.i}座`;
        if(s!=0){
          var style=getComputedStyle(el);
          if(el.className!="green"){
            el.className="green";
            this.buyList.push(str);        
          }else{
            el.className="";  //清空class
            this.delSeat(str);
          }
          // console.log(e.target)
          // var j=e.target.dataset.j;
          // var i=e.target.dataset.i;
          // console.log(j);            
        }
      } 
    },
    //创建座位，随机生产已售位置
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
            var obj={i:b+1,j:a+1,show:0} 
          }else{
            var obj={i:b+1,j:a+1,show:1} 
          }
          li[b]=obj;
        }
        list[a]=li;
      }
      this.list=list;
    },
  }
}
</script>
<style>
    @import url("../../assets/css/seat.css");
</style>