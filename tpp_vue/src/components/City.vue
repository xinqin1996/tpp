<template>
  <!-- 这是一个width：28vw的弹性容器，可以把它放到其他页面的div中，来实现组件的调用 -->
  <div id="select_city">
    <div class="sel_img">
      <img src="../../public/img/theme_icon.svg" alt="">
    </div>
    <div  class="sel_city" @click="selectCity">{{cityName}}</div>
    <div class="sel_icon">
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
      return {

      }
  },
  computed:{
      //获取vuex中的城市名字
      cityName(){
          return this.$store.state.city;
      }
  },
  methods:{
    //跳转到城市选择页面
    selectCity(){
      this.$router.push("/selectCity")
    }
  },
}
</script>
<style scoped>
  #select_city{
    display:flex;
    width:28vw;
  }
  #select_city .sel_img{
    width:40%;
    height:100%;
    text-align:center;
  }
  #select_city .sel_img img{
    width:4.5vh;
    margin-top:1.1vh;
  }
  #select_city .sel_city{
    font-size:14px;
    line-height: 6.3vh;
  } 
  #select_city .sel_icon{
    width:20%;
    position:relative;
  }
  #select_city .sel_icon>div{
    width:1.33vw;
    height:1.33vw;
    border-left:1px solid #000;
    border-bottom:1px solid #000;
    position:absolute;
    transform:rotate(-45deg);
    top:40%;
    left:25%;
  }
  .notFound{
    font-size:32px;
  }
</style>