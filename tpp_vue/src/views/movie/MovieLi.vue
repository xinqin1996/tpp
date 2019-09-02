<template>
    <div data-mid="elem.mid" class="rootstyle">
        <!-- 左侧电影详情 -->
        <div class="imgandtxt">
            <!-- 电影图片 -->
            <img :src="imgurl" class="imgstyle">
            <!-- 电影标题详情 -->
            <div class="txtstyle">
                <div class="title">
                    <span @click="goMovieDetails" class="mname">{{mname}}</span>
                    <span class="d23">{{d23}}</span>
                    <span class="screen">{{screen}}</span>
                </div>
                <div class="score">
                    淘票票评分：
                    <span>{{score}}</span>
                </div>
                <div class="auteur">导演：{{auteur}}</div>
                <div class="performer">演员：{{performer}}</div>
            </div>
        </div>
        <!-- 右侧 购买 --> 
        <div class="btnandtxt">
            <button @click="find_cinema" class="btntyle">购票</button>
            <span>特惠</span>
        </div>
    </div>
</template>
<script>
export default {//声明接收父元素传递的数据
    data(){
        return{    
        }
    },
    props:{//声明接收父元素传递的数据
        d23:{default:""},
        screen:{default:""},
        imgurl:{default:""},
        mname:{default:""},
        score:{default:""},
        auteur:{default:""},
        performer:{default:""},
        elem:{default:""},
    },
    methods:{
        goMovieDetails(){
            this.$router.push(`/movieDetail/${this.elem.mid}`)
        },
        find_cinema(){
            //把mid的值传给findCinema;
            // this.$router.push({
            //     path:'/findCinema',
            //     query:{mid:this.elem.mid},
            // })

            //把mid的值传给findCinema;
            this.$router.push({
                path:'/findCinema',
                query:{mid:this.elem.mid},
            })
            //  this.$store.commit("selectCity",this.cityInfor);
            // --------------------保存mid的值，重要部分-----------------
            this.$store.commit("changeMid",this.elem.mid)
            this.$store.commit("changeMname",this.elem.mname)
            // this.$router.push("/findCinema")
        },
    }
}
</script>
<style scoped>
    .rootstyle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 2rem 1.2rem;
    }
   .imgandtxt{
       display: flex;
   }
   .imgstyle{
       width:5.4rem;
   }
   .txtstyle{
       display: flex;
       flex-direction: column;
       justify-content: center;
       margin-left:1rem;
   }
    .title{
    max-width: 17rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    line-height: 1.5;
    }
  .mname{
      display: inline-block;
      font-size:16px;
      color: #000000;
      margin-right:.3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;  
      max-width: 100%;            
    }
  .d23{
    display:inline-block;
    font-size: 12px;
    color: #fff;
    /* border:.1rem solid #afafaf; */
    background-color: #afafaf;
    padding: 0 .3rem;
  }
  .screen{
    display:inline-block;
    font-size: 12px;
    /* border:.1rem solid #afafaf; */
    padding: 0 .3rem;
    color: #afafaf;
    white-space: nowrap;
  }
  .score,.auteur,.performer{
    color: #666;
    font-size: 13px;
    margin-top: .3rem;
  }
  .score>span{
      color: #ff9c1c;
  }
  .btnandtxt{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .btntyle{
    width:4.3rem;height: 2.5rem;
    background: linear-gradient(45deg,#ff47a8,#ff2e62);
    border: 0;
    border-radius: 2rem;
    font-size:12px;
    color: #ffffff;
    margin-bottom: .5rem;
  }
  .btnandtxt{
    color: #999;
    font-size:12px;
  }
</style> 