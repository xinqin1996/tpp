<template>
  <div id="cinema_show" v-cloak>
    <!-- load-wait 组件 -->
    <my-load-wait></my-load-wait>
    <!--1 头部 ： 影院详情 -->
    <div class="cinema_top">
      <div class="title">{{cinema.cname}}</div>
      <div class="address">{{cinema.caddress}}}</div>
      <div class="icons cf">
        <div class="icon" v-for="(elem,i) of tag" :key="i">{{elem}}</div>
        <!-- <div class="icon">观影小食</div>
        <div class="icon">可停车</div> -->
      </div>
      <div class="prefe">
        <span>联合优惠专区</span> <br>
        <span>银行、运营商特惠</span>
      </div>
      <div class="icon_abs">
        <img class="map" src="http://127.0.0.1:5050/icon/dingwei.svg" alt="">
        <img class="collect" src="http://127.0.0.1:5050/icon/collect.svg" alt="">
      </div>

    </div>
    <!--2 头部 ： 电影图片 -->
    <div class="cinema_middle_img" @touchstart="ontouchstart" @touchmove="ontouchmove" @touchend="ontouchend">
      <div class="img_blur">
        <img :src="imgUrls" alt="">
      </div>
      <div class="ul_cover"></div>
      <ul class="img_ul cf" :style="{marginLeft:marginLeft+'px',width:ulWidth}">
        <li class="img_li" v-for="(item,index) of movie" :key="index"> 
          <div class="img_block" :class="{activeImg:index==i,noActive:index!=i}">
            <img   :src="`http://127.0.0.1:5050/${item.pic}`" alt="">
            <router-link :to="'/movieDetail/'+item.mid"></router-link>
            <!-- <a href=""></a> -->
            <div class="cover" :data-index="index" :class="{active:index==i}" @click="changeI" ></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 简介部分 -->
    <div class="cinema_middle_title" v-for="(item,index) of movie" :key="index" :class="{'d-none':index!=i}">
      <span class="title">{{item.mname}}</span>
      <span class="show" :class="{'d-none':item.is_show==0}">
        <span class="ping">淘票票评分</span>
        <span class="score">{{item.score}}</span>
      </span>
      <span class="show"  :class="{'d-none':item.is_show==1}">
        <span class="people">{{item.wish}}</span>
        <span class="want">人想看</span>
      </span>
      <br>
      <span class="infor">{{item.infor}}</span>
    </div>
    <!--3 头部 ： 电影播放时间 -->
    <div class="cinema_bottom" >
      <van-tabs v-model="active" line-width='5.3vw' color="#ff2e62" line-height="2px" title-active-color="#ff2e62" v-for="(item,index) of time" :key="index" v-show="index==i">
        <van-tab :title="'今天'+getDay(0)">
          <div class="noPlay" v-show="item[0].room==''">今天{{getDay(0)}}暂无场次</div>
          <div class="time_item" v-show="item[0].room!=''" v-for="(elem,j) of item" :key="j">
            <div class="item1">
              <div>{{elem.time_start}}</div>
              <div>{{elem.time_end}}散场</div>
            </div>
            <div class="item2">
              <div>{{elem.d23}}</div>
              <div>{{elem.room}}</div>
            </div>
            <div class="item3">
              <div><span>{{elem.price_e}}</span><span> 元</span></div>
              <div>{{elem.price_s}}元</div>
            </div>
            <div class="item4">
              <div @click="goSeat" :data-cmid="elem.cmid">购票</div>
            </div>
          </div>
        </van-tab>
        <van-tab :title="'明天'+getDay(1)">
          <div class="noPlay" v-show="item[0].room==''">明天{{getDay(1)}}暂无场次</div>
          <div class="time_item" v-show="item[0].room!=''" v-for="(elem,j) of item" :key="j">
            <div class="item1">
              <div>{{elem.time_start}}</div>
              <div>{{elem.time_end}}散场</div>
            </div>
            <div class="item2">
              <div>{{elem.d23}}</div>
              <div>{{elem.room}}</div>
            </div>
            <div class="item3">
              <div><span>{{elem.price_e}}</span><span> 元</span></div>
              <div>{{elem.price_s}}元</div>
            </div>
            <div class="item4">
              <div @click="goSeat" :data-cmid="elem.cmid">购票</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 4 尾部 ： 淘票票图标 -->
    <div class="cinema_floor">
      <img :src="url+'cinema/moive_floor.svg'" alt="">
    </div>
    <!-- 5 为登录弹框 -->
    <div class="cinema_login" v-show="uname==''" @click="toLogin">
      <div>请先登录再购买电影票</div>
      <div>登录</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      uname:'',
      active: 2,
      iTem:0,     //临时保存i的值
      i:0,        //那张图片变大
      marginLeft:window.innerWidth*0.39,  // 22vw一个位移 ,保存了ul的margin-left值
      xStart:"",  //保存了初始手指位置
      mlStart:"", //保存ul初始位置
      movie:[],
      time:[],
      ulWidth:'400vw',
      wiw:window.innerWidth,
      cinema:[],
      tag:[],
    }
  },
  watch:{
    //监听i;
    // i(){
    //   this.iCenter();
    // },
    //监听marginLeft;
    marginLeft(){
      //2 对marginLeft进行控制
      var mlEnd=this.marginLeft;    //3 获取移动结束的margin-left值
      //4 下面动态改变i的值      
      var ml=this.marginLeft;
      //
      ml=window.innerWidth*0.50-ml; //用来计算向左移动多少margin-left
      var i=parseInt(ml/(window.innerWidth*0.22)) ;
      // console.log(ml);
      if(i>this.movie.length-1){
        i=this.movie.length-1
      }
      if(i<0){ i=0; }
      this.i=i;
      // console.log(i);
      //5 ml当前的margin-left;中心的margin-left;
      var mlCenter=-window.innerWidth*0.22*(this.i)+window.innerWidth*0.39;  //i图片中心的margin-left;
      // 6 获取最大的abs差值
      var wiw=this.wiw;
      var absMax=wiw*0.11;
      var absWid=Math.abs(mlEnd-mlCenter)
      //7 比例
      var scale=1-absWid/absMax;
      // console.log(scale);
      var imgBlock=document.getElementsByClassName("activeImg")[0]
      var imgBlockNo=document.getElementsByClassName("noActive");
      //使其他归位
      for(var item of imgBlockNo){
        item.style.width='';
        item.style.height='';
        item.style.left='10%';
      }
      imgBlock.style.width=(17.6+3.3*scale)*wiw*0.01+'px';
      imgBlock.style.height=(24.3+4.5*scale)*wiw*0.01+'px';
      imgBlock.style.left=(2.5+7.5*(1-scale))+'%';
    },
  },
  computed:{
    url(){
      return this.$store.state.url;
    },
    //使用计算属性，动态返回图片的路径
    imgUrls(){
      if(this.movie.length==0){ 
        return null;   //页面刷新时返回null
      }else{
        return  `http://127.0.0.1:5050/${this.movie[this.i].pic}`
      }
    },
    //ul的宽度
    cid(){ return this.$store.state.cid;  },  //获取cid
    mid(){ return this.$store.state.mid;  }  , //获取mid
    // mname(){ return this.$store.state.mname; }   //获取mid
  },
  created(){
    //调用axios函数
    console.log(this.$route.path)
    console.log(window.location.href)
    this.loadCinema();
    this.isLogin();
  },
  mounted(){      
    this.loadMore();   
    this.wait();
  },
  methods:{
    //跳转到seat.vue
    goSeat(e){
      var cmid=e.currentTarget.dataset.cmid;
      var uid=this.$store.getters.getUid;
      //1 如果登录了，跳转到seat.vue
      if(uid!=""){
        this.$store.commit("changeCmid",cmid);
        this.$router.push(`/seat`);
      }else{
        //2 如果没登录,先登录，在跳转
        this.$messagebox.confirm("是否立即登录")
        .then(action=>{
          this.$router.push('/login')
        })
        .catch(err=>{return;})
      }
    },
    //1 跳转到登录页，保存住当前页面的地址
    toLogin(){
      this.$router.push("/login")
    },
    //2 判断是否登录
    isLogin(){
      var url="user/v1/isLogin";
      this.axios.get(url).then(res=>{
        if(res.data.code==-1){
          console.log(res.data.msg);
        }else{
          //登录成功，保存住uname;
          console.log("打印用户登录信息",res.data.data[0]);
          this.uname=res.data.data[0].uname;
        }
      })
    },
    //获取今天的时间和明天的时间
    getDay(num){
      var d2=new Date();
      d2=d2.getTime();
      d2+=num*24*60*60*1000;
      //以d2毫秒数为基础
      var d1=new Date(d2);
      var month=d1.getMonth();
      month= (month>=9) ? month+1 : ("0"+(month+1))
      var date=d1.getDate();
      date=(date>=10) ? date : ('0'+date);
      return month+"-"+date;
    },
    //1 动态计算那部电影会居中显示
    showI(){
      for(var i=0;i<this.movie.length;i++){
        if(this.movie[i].mid==this.mid){
          this.iTem=i;  //获取真实的mid对应的下标
          return;
        }
      }      
    },
    //页面刷新，等待500执行
    wait(){
      setTimeout(()=>{
        this.i=this.iTem;
        setTimeout(()=>{
          this.iCenter();          
        },100)

      },300)
    },
    //i位置的图片居中函数
    iCenter(){
      var ml=-window.innerWidth*0.22*(this.i)+window.innerWidth*0.39;
      this.marginLeft=ml; 
      var wiw=this.wiw;
      var imgBlock=document.getElementsByClassName("activeImg")[0]
      imgBlock.style.width=20.9*wiw*0.01+'px';
      imgBlock.style.height=28.8*wiw*0.01+'px';
      imgBlock.style.left='2.5%';
    },
    //切割字符串的icon的函数
    strSplit(str){
      var arr=str.split("，");
      // console.log(arr)
      return arr;
    },
    //点击图片时移动,改变i值和margin-left值
    changeI(e){
      var i=e.target.dataset.index;
      var ml=-window.innerWidth*0.22*i+window.innerWidth*0.39;
      this.i=i;
      this.marginLeft=ml;
      var wiw=this.wiw;
      //设置定时器，在i值改变时，50ms后准确的捕捉到元素   
      setTimeout(()=>{     
        var imgBlockNo=document.getElementsByClassName("noActive");
        // console.log(imgBlockNo)
        for(var item of imgBlockNo){
          item.style.width=17.6*wiw*0.01+'px';;
          item.style.height=24.3*wiw*0.01+'px';;
          item.style.left='10%';
        }     
        //使点击的图片居中
        var imgBlock=e.target.parentNode;
        // var imgBlock=document.getElementsByClassName("activeImg")[0]
        imgBlock.style.width=20.9*wiw*0.01+'px';
        imgBlock.style.height=28.8*wiw*0.01+'px';
        imgBlock.style.left="2.5%";
        //使其他图片归位
      },50)
    },
    //鼠标松开时，使下标i的图片居中
    ontouchend(){
      this.iCenter();
      // var ml=-window.innerWidth*0.22*(this.i)+window.innerWidth*0.39;
      // this.marginLeft=ml; 
      // var wiw=this.wiw;
      // var imgBlock=document.getElementsByClassName("activeImg")[0]
      // imgBlock.style.width=20.9*wiw*0.01+'px';
      // imgBlock.style.height=28.8*wiw*0.01+'px';
      // imgBlock.style.left='2.5%';
    },
    //点击时保存鼠标初始位置，和ul的起始位置
    ontouchstart(e){
      var t1 = e.targetTouches[0];
      this.xStart=t1.pageX;   
      this.mlStart=this.marginLeft;  
    },
    //鼠标移动时，改变ul的margin-left;
    ontouchmove(e){
      var t2 = e.targetTouches[0];
      var xMove=t2.pageX;                 //鼠标移动后的位置
      var move=xMove-this.xStart;         //鼠标移动的距离=ul移动的距离        ;
      var marginLeft=this.mlStart+move;
      //1 防止到最右边和最左边
      var widthMin=window.innerWidth*0.39;
      if(marginLeft>=widthMin){
        marginLeft=widthMin;
      }
      var widthMax=window.innerWidth*0.39-window.innerWidth*0.22*(this.movie.length-1)
      if(marginLeft<=widthMax){
        marginLeft=widthMax;
      }
      this.marginLeft=marginLeft;      
    },
    //ajax函数   参数cid
    loadMore(){ 
      var url="cinema/v1/cinema_hasmovies";
      var obj={cid:this.cid};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==1){
          console.log(res.data.data)
          this.movie=res.data.data.infors;
          this.time=res.data.data.times;
          //后台传回mid
          // var mid=this.$store.getMid();
          // console.log(this.mname);
          console.log(this.movie);
          this.showI();
          this.ulWidth=this.movie.length*window.innerWidth*0.22+'px'
          // console.log("axios查询成功")
        }else{
          console.log("axios查询失败1")
        }
      })
    },
    loadCinema(){ 
      var url="cinema/v1/cinema_detail";
      var obj={cid:this.cid};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==1){
          console.log(res.data.data[0])
          this.cinema=res.data.data[0];
          this.tag=this.strSplit(this.cinema.tag);
          // console.log("axios查询成功")
        }else{
          console.log("axios查询失败2")
        }
      })
    },
  }
}
</script>
<style>
    @import url('../../assets/css/findCinemaItem.css');
    @import url('../../assets/css/cinema.css')
</style>
