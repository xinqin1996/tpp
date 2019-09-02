<template>
	<div>
		<!-- {{active}} -->
		<mt-tab-container v-model="active">
			<mt-tab-container-item id="movie">
				<div class="cityAndShow cf">
					<my-city class="city"></my-city>
					<!-- 这里再次进行分屏切换
					<van-tabs class="show">
  						<van-tab title="正在热映" @click.native="activeTwo_now">
							  <movie-list :is_show="1"></movie-list>
						</van-tab>
  						<van-tab title="即将上映" @click="activeTwo_soon">
								<movie-list :is_show="0"></movie-list>
						</van-tab>
					</van-tabs> -->
					<div class="changeh">
						<h2 @click="activeTwo_now" class="h2" id="now">正在热映</h2>
						<h2 @click="activeTwo_soon" class="h2" id="soon">即将上映</h2>			
					</div>					
				</div>
				<van-swipe :autoplay="3000">
					<van-swipe-item v-for="(item,i) of list" :key="i" class="carouselImg">
     					<img :src="`http://127.0.0.1:5050/${item.img_url}`" alt="">
					</van-swipe-item>
				</van-swipe> 
				<mt-tab-container v-model="activeTwo">
					<mt-tab-container-item id="now">      
					<!-- 这里是正在热映的内容 -->
						<movie-list :is_show="1"></movie-list>
					</mt-tab-container-item>
					<mt-tab-container-item id="soon">
						<!-- 这里是即将上映的内容 -->
						<movie-list :is_show="0"></movie-list>
					</mt-tab-container-item>
				</mt-tab-container>
			</mt-tab-container-item>
			<mt-tab-container-item id="cinema">
				<my-city></my-city>
				<div style="width:100vw;height:100vh">
					<img style="width:25%;height:25%" src="http://127.0.0.1:5050/active_cinema.svg" alt="">
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="my">
				<my-home></my-home>
			</mt-tab-container-item>
		</mt-tab-container>
		<mt-tabbar v-model="active" fixed>
			<mt-tab-item id="movie" data-cid="movie" @click.native="changeState(0);changeActive()">
				<tabaricon
				:selectedImage="require('../../public/img/电影active.png')"
                :normalImage="require('../../public/img/电影.png')"
                :focused="active=='movie'"></tabaricon>
				热映</mt-tab-item>
			<mt-tab-item id="cinema" data-cid="cinema" @click.native="changeState(1);changeActive()">
				<tabaricon
				:selectedImage="require('../../public/img/影院active.png')"
                :normalImage="require('../../public/img/影院.png')"
                :focused="active=='cinema'"></tabaricon>
				影院
			</mt-tab-item>
			<mt-tab-item id="my" data-cid="my" @click.native="changeState(2);changeActive()">
				<tabaricon
				:selectedImage="require('../../public/img/我的active.png')"
                :normalImage="require('../../public/img/我的.png')"
                :focused="active=='my'"></tabaricon>
				我的
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
//导入一个axios.js
import obj from '../assets/api/axios.js'
//对导入的对象解构
var {movieCarousel,hello} = obj;
import myHome from "./my/MyHome.vue"
import movieList from "./movie/MovieList";
//1.2引入底部导航条的图片切换组件
import TabarIcon from "./movie/TabarIcon.vue"

export default {
	data(){
		return{
			//active保存的是一个字符串：子面板id
            active:"movie",
            //在data添加属性 currentIndex
            //集中保存按钮状态
            currentIndex:[
                {isSelect:true},//0保存第一个按钮的状态
                {isSelect:false},//1保存第一个按钮的状态
                {isSelect:false},//2保存第一个按钮的状态
            ],
			list:[],
			activeTwo:"soon",
			carouselimg:"http:127.0.0.1:5050"
			// showList:[],
			// notShowList:[],
		}
	},
	mounted(){
		var act=this.getActiveTwo;
		var doc=document.getElementById(act);
		doc.style.borderBottom='2px solid #ff2e62';
	},
	methods:{
		    changeState(idx){
            // 功能：指定当前按钮状态修改true
            //          其他按钮状态修改false
            console.log(idx)
            // 1：创建循环遍历状态数组
            for(var i=0;i<this.currentIndex.length;i++){
            // 2：获取用户点击下标
                var ui=idx;
            //   与当前下标比较
                if(ui==i){
            // 3.如果两个值相等当前状态true
                this.currentIndex[i].isSelect=true
                }else{
            // 4:其他元素状态false
                this.currentIndex[i].isSelect=false 
                }
            }
        },
		//轮播图
        onload(){
            var url="movie/v1/carousel"
            this.axios.get(url).then(res=>{
                if(res.data.code==1){
                    this.list=res.data.data;
                }
            })
        },
		// 改变vuex的active
		changeActive(){
			console.log("打印出当前页面的active:",this.active);
			this.$store.commit("changeActive",this.active);
		},
		//切换（正在热映）-（即将上映） 在这里保存住activeTwo的信息，在城市选择页面跳转过来时，可以回到原位置
		activeTwo_now(e){
			this.activeTwo="now";
			e.target.style.borderBottom='2px solid #ff2e62';
			var sib=e.target.nextElementSibling
			sib.style.borderBottom='none';
			this.$store.commit("changeActiveTwo",this.activeTwo)
		},
		activeTwo_soon(e){
			this.activeTwo="soon";
			e.target.style.borderBottom='2px solid #ff2e62';
			var sib=e.target.previousElementSibling
			sib.style.borderBottom='none';
			this.$store.commit("changeActiveTwo",this.activeTwo)
		},
		// loadList(is_show){
		// 	var arr=[this.notShowList,this.showList]
		// 	var url="movie/v1/movie_is_show";
		// 	var obj={is_show};
		// 	console.log(obj);
		// 	this.axios.get(url,{params:obj}).then(res=>{
		// 		if(res.data.code==-1){
		// 			console.log("没有电影")
		// 		}else{
		// 			arr[is_show]=res.data.data;
		// 		}
		// 	})
		// }
	},
	created(){
		//使用promise 导入外部的js代码，异步向服务器发起请求；
		movieCarousel().then((res)=>{
			this.list=res;
			console.log("在home.vue中import这个axios，并且使用promise来调用它")
			console.log(res)
		}).catch(e=>{
			console.log(e);
		})
		//组件刷新，获取vuex里的active；
		this.active=this.getActive;
		this.activeTwo=this.getActiveTwo;
		// //创建时运行loadList;
		// this.loadList(0);
		// this.loadList(1);
	},
	computed:{
		//计算属性，获取vuex里的active；
		getActive(){
			return this.$store.state.active;
		},
		//计算属性，获取vuex里的activeTwo；
		getActiveTwo(){
			return this.$store.state.activeTwo;
		},
	},
	components:{
		//注册子组件
		movieList,
		"tabaricon":TabarIcon,
		myHome,
	}
	// methods:{
	// 	getActive(val){
	// 		this.active=val;
	// 	}
	// }
}
</script>	
<style scoped>	
	.city{
		float:left;
	}
	.changeh{
		float:right;
		/* position:fixed; */
		/* top:13px;right:28px; */
		width:160px;
		z-index:20;
		margin-left:80px;
		background-color:#fff;
		height:44px;
		line-height: 44px;
		display: flex;
		border-radius: 5px
	}
	.h2{
		font-size:15px;
		padding:2px 0px;
		margin:0px 6px;	
		cursor: pointer;
		/* border-bottom:2px solid #ff2e62; */
	}
	tabbarTwo{
		float:right;
	}
	.carouselImg img{
		width:100%;
	}
	.cityAndShow{
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem;
	}
	.mint-tabbar>.mint-tab-item{
    color: #2c2c2c;
}
	/* 4.修改组件默选中样式 */
	.mint-tabbar>.mint-tab-item.is-selected{
    background-color: transparent;
    color: #ff4d64;
}
</style>
