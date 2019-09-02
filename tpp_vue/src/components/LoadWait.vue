<template>
  <div class="wait" id="wait">
    <div class="wait_icon">
      <img :src="url+'cinema/load_wait.svg'" alt="">
    </div>
    <div class="wait_font animated rollln">
      正在加载,么么哒~
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  mounted(){
    this.waitNone()
  },
  computed:{
    url(){
      return this.$store.state.url;
    }
  },
  methods:{
    waitNone(){
      var wait=document.getElementById("wait");
      setTimeout(()=>{
        wait.style.display="none";
      },1000)
    },
  }
}
</script>
<style scope>
  @keyframes scroll{
    0%{transform:rotate(0deg);}
    10%{transform:rotate(36deg);}
    20%{transform:rotate(72deg);}
    30%{transform:rotate(108deg);}
    40%{transform:rotate(144deg);}
    50%{transform:rotate(180deg);}
    60%{transform:rotate(216deg);}
    70%{transform:rotate(252deg);}
    80%{transform:rotate(288deg);}
    90%{transform:rotate(324deg);}
    100%{transform:rotate(360deg);}
  }
  #wait{
    position:absolute;
    z-index:50;
    width:100%;
    background-color:#efefee;
    height:100%;
  }
  #wait  .wait_icon{
    animation-name:scroll;
    animation-duration:1.5s;
    animation-iteration-count: infinite;
    width:15vw;
    height:15vw;
    position:absolute;
    top:50%;left:50%;
    margin:-7.5vw 0 0 -7.5vw;      
  }
  #wait .wait_icon img{width:100%;}
  #wait .wait_font{
      position:absolute;
      top:58%;left:50%;
      font-size:1.6rem;
      margin-left:-62.9px;
  }
</style>