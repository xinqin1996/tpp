<template>
  <div id="myticket">
      <h1 class="header">我的电影票
        <div class="return">
          <img @click="goHome" :src="url+'myHome/return.svg'" alt="">
        </div>
      </h1>
      <div class="watch" v-show="list.length==0">
        <img :src="url+'myHome/watch_movie.svg'" alt="">
        <h3>去看场电影吧~</h3>
      </div>
      <div class="contain">
        <div class="con_one" v-for="(item,i) of list" :key="i">
          <div class="left_name">
            {{item.mname}}
          </div>
          <div class="right_detail">
            <div class="r1">{{item.tdate}} ({{item.d23}})</div>
            <div class="r2">{{item.cname}}</div>
            <div class="r3">{{item.seat}}</div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      list:[],
    }
  },
  computed:{
    url(){
      return this.$store.state.url;
    }
  },
  created(){
    this.load()
  },
  methods:{
    goHome(){
      this.$router.go(-1);
    },
    load(){
      var url="user/v1/get_ticket";
      this.axios.get(url).then(res=>{
        this.list=res.data.data;
        console.log(res.data)
        console.log(this.list);
      })
    }    
  }
}
</script>
<style scoped>
  #myticket{
    background-color:#eee;
    height:100vh;
    overflow-y:scroll;
  }
  .header{
    width:100%;
    position:fixed;
    font-size:4.5vw;
    line-height: 12vw;
    background-color:#fff;
  }
  .header .return{
    width:6vw;
    height:6vw;
    position:absolute;
    left:3vw;
    top:3vw;

  }
   .header .return img {
      width:100%;
      display: block;
   }
  .watch{
    position:absolute;
    top:0;left:0;right:0;bottom:0;
    width:50vw;
    height:70vw;
    margin: auto;
  }
  .watch img{
    width:100%;

  }
  .watch h3{
    color:#222;
    font-size:4vw;
    letter-spacing:0.5vw;
  }
  .contain{
    padding-top:12vw;
  }
  .contain .con_one{
    padding:3vw;
    background-color:#fff;
    border-radius:15px;
    border:1px solid #ccc;
    margin-bottom:1vw;
    display: flex;
    align-items: center;
  }
  .contain .con_one .left_name{
    width:40%;
    font-size:5vw;
  }
  .contain .con_one .right_detail{
    font-size:4vw;
  }
</style>