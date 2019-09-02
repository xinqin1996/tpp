<template>
  <div id="my_home">
    <!-- 1：背景 -->
    <div class="bg"></div>
    <!-- 2：头部 -->
    <div class="header">
      <div class="header_img">
        <img :src="url+'01.png'" alt="" v-dir2>
      </div>
      <div class="header_name" v-show="uname!=''">{{uname}}</div>
      <div class="header_name" @click="login" v-show=" uname=='' ">立即登录</div>
      <div class="icon1">
        <img :src="url+'myHome/naozhong.svg'" alt="">
      </div>
      <div class="icon2">
        <img :src="url+'myHome/shezhi.svg'"  alt="">
      </div>
    </div>
    <!-- 3：内容 -->
    <div class="main">
      <div class="main_content">
        <div class="block1 br">
          <van-grid :border="false" :column-num="3">
            <van-grid-item  @click="goMyTicket" text="电影票" :icon="url+'myHome/dianying.svg'">
            </van-grid-item>
            <van-grid-item text="小食" :icon="url+'myHome/xiaoshi.svg'">
            </van-grid-item>
            <van-grid-item text="演出票" :icon="url+'myHome/yanchu.svg'">
            </van-grid-item>
          </van-grid>          
        </div>
        <div class="block2 br"> 
          <div class="block_title">我的优惠</div>
          <van-grid :border="false" :column-num="3">
            <div class="span_font1 span_font" v-show="uname!='' ">共0张</div>     
            <div class="span_font2 span_font">开卡购票更优惠</div>     
            <van-grid-item text="优惠券" :icon="url+'myHome/youhuiquan.svg'">
            </van-grid-item>
            <van-grid-item text="权益卡" :icon="url+'myHome/quanyika.svg'">
            </van-grid-item>
            <van-grid-item text="乐影卡" :icon="url+'myHome/leyingka.svg'">
            </van-grid-item>
          </van-grid>          
        </div>
        <div class="block3 br">
          <div class="block_title">我的记录</div>
          <div class="content">
            <div class="ct">
              <div>
                <img :src="url+'myHome/xiangkan.svg'" alt="">                
              </div>
              <div>
                <div>想看</div>
                <div  v-show="uname==''">登录后查看</div>
                <div  v-show="uname!=''">共0部</div>
              </div>
            </div>
            <div class="ct">
              <div>
                <img :src="url+'myHome/kanguo.svg'" alt="">                
              </div>
              <div>
                <div>看过</div>
                <div v-show="uname==''">登录后查看</div>
                <div v-show="uname!='' ">共0部</div>                
              </div>
            </div>
          </div>         
        </div>
        <div class="block4 br">
          <div class="block_title">我的服务</div>
          <van-grid :border="false" :column-num="4">   
            <van-grid-item text="我的小剧场"  :icon="url+'myHome/serve1.svg'">
            </van-grid-item>
            <van-grid-item text="发起的讨论" :icon="url+'myHome/serve2.svg'">
            </van-grid-item>
            <van-grid-item text="播放记录" :icon="url+'myHome/serve3.svg'">
            </van-grid-item>
            <van-grid-item text="银行特惠" :icon="url+'myHome/serve4.svg'">
            </van-grid-item>
            <van-grid-item text="阿里鱼众筹" :icon="url+'myHome/serve5.svg'">
            </van-grid-item>
            <van-grid-item text="娱乐室" :icon="url+'myHome/serve6.svg'">
            </van-grid-item>
            <van-grid-item text="3小时公益" :icon="url+'myHome/serve7.svg'">
            </van-grid-item>
            <van-grid-item text="我的客服" :icon="url+'myHome/serve8.svg'">
            </van-grid-item>
            <van-grid-item text="满意度调查" :icon="url+'myHome/serve9.svg'">
            </van-grid-item>
          </van-grid>          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // url:"http://127.0.0.1:5050/",
      uname:"",
    }
  },
    //创建自定义组件       <img :src="url+'01.png'" alt="" v-dir1>
    // directives: {
    //     // 指令名称
    //     dir1: {
    //         inserted(el) {
    //             // 指令中第一个参数是当前使用指令的DOM
    //             console.log(el);
    //             console.log(arguments);
    //             // 对DOM进行操作
    //             el.style.width = '200px';
    //             el.style.height = '200px';
    //             el.style.background = '#000';
    //         }
    //     }
    // },
  methods:{
    //跳转到电影票页面
    goMyTicket(){
      if(this.uname==""){
        this.$toast({
          message:"请先登录再查看电影票",
          duration:1000
        })
      }else{
        this.$router.push("/myticket")
      }
    },
    //2 判断是否登录
    isLogin(){
      var url="user/v1/isLogin";
      this.axios.get(url).then(res=>{
        if(res.data.code==-1){
          console.log(res.data.msg);
        }else{
          //登录成功，保存住uname;
          this.$store.commit("changeUid",res.data.data2)
          console.log("打印用户登录信息",res.data.data[0],"用户已在线");
          this.uname=res.data.data[0].uname;
        }
      })
    },
    //1 跳转到登录界面
    login(){
      this.$router.push('/login')
    },
  },
  computed:{
    //把网页的路径定义在了vuex中
    // url:"http://127.0.0.1:5050/",
    url(){
      return this.$store.state.url
    }
  },
  created(){
    this.isLogin();
  },
}
</script>
<style>
  @import url("../../assets/css/myHome.css");
</style>