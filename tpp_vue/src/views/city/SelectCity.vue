<template>
  <div id="select_city">
			<!-- 城市id{{$store.getters.getCity_id}}
			城市name{{$store.getters.getCity}} -->
    <van-nav-bar
      title="选择城市"
      fixed
      right-text="✕"
      @click-right="onClickRight"
    />
    <!-- 占位的div -->
    <div style="height:46px"></div>
    <!-- 城市名称列表 -->
		<div class="index_bar" @click="selectCity">
			<van-index-bar :index-list="indexList" :sticky-offset-top="45" @select="select">
				<van-index-anchor index="当前">当前</van-index-anchor>
        <!-- 获取vuex中的'杭州' -->
				<van-cell :title="$store.getters.getCity" :data-id="$store.getters.getCity_id" />
				<van-index-anchor index="GPS">GPS</van-index-anchor>
				<van-cell title="浏览器定位失败" />
				<!-- <van-cell title="杭州" /> -->
				<van-index-anchor index="热门">热门</van-index-anchor>
				<van-cell title="北京" data-id="1"/>
				<van-cell title="上海" data-id="2"/>
				<van-cell title="深圳" data-id="3"/>
				<van-cell title="广州" data-id="4"/>
				<van-cell title="成都" data-id="5"/>
				<van-cell title="武汉" data-id="6"/>
				<van-cell title="杭州" data-id="7"/>
				<van-cell title="重庆" data-id="8"/>
				<van-index-anchor index="A">A</van-index-anchor>
				<van-cell title="阿坝" />
				<van-cell title="阿克苏" />
				<van-cell title="阿拉善" />
				<van-cell title="安康" />
				<van-cell title="安庆" />
				<van-cell title="鞍山" />
				<van-cell title="安顺" />
				<van-cell title="安阳" />
        <van-index-anchor index="B">B</van-index-anchor>
        <van-cell title="白城"/>
        <van-cell title="百色"/>
        <van-cell title="白山"/>
        <van-cell title="保定"/>
        <van-cell title="宝鸡"/>
        <van-index-anchor index="C">C</van-index-anchor>
        <van-cell title="沧州"/>
        <van-cell title="长春"/>
        <van-cell title="常德"/>
        <van-cell title="昌吉"/>
        <van-cell title="昌江"/>
        <van-index-anchor index="D">D</van-index-anchor>
        <van-cell title="大理"/>
        <van-cell title="大连"/>
        <van-cell title="儋州"/>
        <van-cell title="丹东"/>
        <van-cell title="大庆"/>
        <van-index-anchor index="E">E</van-index-anchor>
        <van-cell title="鄂尔多斯"/>
        <van-cell title="恩斯"/>
        <van-cell title="鄂州"/>
        <van-index-anchor index="F">F</van-index-anchor>
        <van-cell title="防城港"/>
        <van-cell title="佛山"/>
        <van-cell title="抚顺"/>
        <van-cell title="阜新"/>
        <van-cell title="阜阳"/>
        <van-index-anchor index="G">G</van-index-anchor>
        <van-cell title="甘南"/>
        <van-cell title="赣州"/>
        <van-cell title="甘孜"/>
        <van-cell title="巩义市"/>
        <van-index-anchor index="H">H</van-index-anchor>
        <van-cell title="哈尔滨"/> 
        <van-cell title="海东"/>
        <van-cell title="海口"/>
        <van-index-anchor index="J">J</van-index-anchor>
        <van-cell title="佳木斯"/>
        <van-cell title="安吉"/>
        <van-cell title="江门"/>
        <van-index-anchor index="K">K</van-index-anchor>
        <van-cell title="开封"/>
        <van-cell title="克拉玛依"/>
        <van-index-anchor index="L">L</van-index-anchor>
        <van-cell title="来宾"/>
        <van-cell title="廊坊"/>
        <van-index-anchor index="M">M</van-index-anchor>
        <van-cell title="马鞍山"/>
        <van-cell title="茂名"/>
        <van-index-anchor index="N">N</van-index-anchor>
        <van-cell title="南昌"/>
        <van-cell title="南充"/>
        <van-index-anchor index="P">P</van-index-anchor>
        <van-cell title="盘锦"/>
        <van-cell title="攀枝花"/>
        <van-index-anchor index="Q">Q</van-index-anchor>
        <van-cell title="潜江"/>
        <van-cell title="黔南"/>
        <van-index-anchor index="R">R</van-index-anchor>
        <van-cell title="日喀则"/>
        <van-cell title="日照"/>
        <van-index-anchor index="S">S</van-index-anchor>
        <van-cell title="三门峡"/>
        <van-cell title="三明"/>
         <van-index-anchor index="T">T</van-index-anchor>
        <van-cell title="塔城"/>
        <van-cell title="泰安"/>
        <van-index-anchor index="W">W</van-index-anchor>
        <van-cell title="万宁"/>
        <van-cell title="威海"/>
        <van-index-anchor index="X">X</van-index-anchor>
        <van-cell title="厦门"/>
        <van-cell title="西安"/>
        <van-index-anchor index="Y">Y</van-index-anchor>
        <van-cell title="雅安"/>
        <van-cell title="延安"/>
        <van-index-anchor index="Z">Z</van-index-anchor>
        <van-cell title="枣庄"/>
        <van-cell title="张家界"/> 
			</van-index-bar>
		</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      cityInfor:[],
      indexList:['当前','GPS','热门','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
    }
  },
  methods:{
    onClickRight() {
      //关闭当前页面，返回前一个页面
      window.history.go(-1);
    },
    select(index){
      console.log(index)
    },
		//选择城市调回过来的页面，
		selectCity(e){
      // e.stopPropagation;
			if(e.target.className=="van-cell__title"){
         this.cityInfor[0]=e.target.parentNode.dataset.id;//城市id
         if(this.cityInfor[0]==undefined){ 
            if(e.target.firstElementChild.innerHTML=="浏览器定位失败"){
              return;
            }else{
              this.$toast({
                message:'该城市没有合作影院，请重新选择',
                duration:1500,
                iconClass:"iconfont icon-bucunzai",
                'font-size':'36px',
              })
              return;
            } 
         }
				this.cityInfor[1]=e.target.firstElementChild.innerHTML;//城市name
        this.$store.commit("selectCity",this.cityInfor);
        console.log(this.cityInfor);   //打桩操作
				// this.$router.push("/home");
        //返回前一个页面
				window.history.go(-1);
			}
		}
	},
	//接受从home 传过来的active;
	// props:{
  //   active:{default:""},
  // }
}
</script>
<style >
  /* 击穿span元素，点击到.van-cell__title */
  #select_city .van-cell__title span{
    pointer-events: none !important;
  }
  @import url('../../assets/css/selectCity.css');
</style>