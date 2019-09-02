<template>
    <div id="header_search">
      <!--1 放大镜 -->
      <div class="magnifier" @click="changeActive">
        <img src="../../public/img/header_search.svg" alt="">
      </div>
      <!--2 弹出的搜索页面 -->
      <div class="search_input" :class="{'d-none':isActive}">
        <!-- 搜索头部 -->
        <div class="input_top">
          <form action="/">
            <van-search
              v-model="inputValue"
              placeholder="影院名称或地址"
              show-action
              @search="onSearch" 
              @cancel="changeActive"
            />
          </form>
        </div>
        <!-- 功能分析，要保存好电影的mid,和影院的cid -->
        <!-- 3 搜索到的东西的内容展示 -->
        <!-- 给这个元素设置高度，使其产生scroll效果 -->
        <div class="input_content">
          <!-- <div class="input_main"> -->
            <div v-for="(item,i) of searchList" :key="i" class="input_block" >
              <div class="cover"  :data-cid="item.cid" @click="goCinema"></div>
              <div class="cname"  >
                <!-- {{item.cid}} -->
                <span v-for="(elem,i) of item.cname" :key="i" :class="{red:elem==inputValue}">{{elem}}</span>
              </div>
              <div class="caddress">
                <span v-for="(elem,i) of item.caddress"  :key="i" :class="{red:elem==inputValue}">{{elem}}</span>              
              </div>
              <div class="tag">
                <div class="tag_icon" v-for="(elem,i) of strSplit(item.tag)" :key="i">{{elem}}</div>
              </div>
              <div class="lowest">{{item.lowest}}元起</div>
            </div>            
          <!-- </div> -->
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return {  
      isActive:true,
      inputValue:'',
      searchList:[]
    }
  },
  watch:{
    //监听input框的输入内容
    inputValue(){
      // console.log(this.inputValue);
      this.cinemaSearch();
    }
  },
  methods:{
    //---------跳转到影院界面,同时把cid,cname,保存到vuex---------
    goCinema(e){
      var cid=e.target.dataset.cid;
      // var cid=e.target.dataset.cid;
      // var cname=e.target.dataset.cname;
      console.log(cid);
      // console.log(cname);
      //--vuex--
      // this.$store.commit("changeMname",this.elem.mname)
      this.$store.commit("changeCid",cid)
      // this.$store.commit("changeCname",cname)
      this.$router.push("/cinema");
    },  
    //split函数，用于切割字符串形成数组
    strSplit(str){
      var arr=str.split("，");
      // console.log(arr)
      return arr;
    },
    //搜索功能
    cinemaSearch(){
      // http://127.0.0.1:5050/cinema/v1/search_cinema?sel=0
      var url="cinema/v1/search_cinema"
      var obj={sel:this.inputValue};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==0){
          console.log("没有查询到数据");
          this.searchList=[];
        }else{
          var list=res.data.data;
          
          //下面到底部是，搜索框对应文字变色功能
          var str=this.inputValue;
          //不等于0 才切割
          if(str!==""){
            //1对名字的验证
            for(var i=0;i<list.length;i++){
              //拼接数据
              if(list[i].cname.indexOf(str)>=0){
                // console.log(str);
                var arr=list[i].cname.split(str);
                arr.splice(1,0,str);
                list[i].cname=arr;
              }else{
              list[i].cname=[list[i].cname];
              }
            }
            //2 对地址的验证
            for(var i=0;i<list.length;i++){
              //拼接数据
              if(list[i].caddress.indexOf(str)>=0){
                var arr=list[i].caddress.split(str);
                arr.splice(1,0,str);
                list[i].caddress=arr;
              }else{
                list[i].caddress=[list[i].caddress];
              }
            }            
          }else{
            for(var i=0;i<list.length;i++){
              list[i].cname=[list[i].cname];
              list[i].caddress=[list[i].caddress];
            }
          }
          // console.log(list);
          this.searchList=list;
          console.log(this.searchList)
        }
      })        
    },
    // 用户点击时触发
    onSearch(){
      console.log(1);
    },
    //切换input页面的显示隐藏
    changeActive(){
      this.isActive=!this.isActive;
    },
  }
}
</script>
<style>
  #header_search .input_block{
    position: relative;;
  }
  #header_search .input_block .cover{
    width:100%;height:100%;
    position:absolute;
    top:0;left:0;
  }
  @import url('../assets/css/headerSearch.css');
</style>