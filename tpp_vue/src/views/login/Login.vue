<template>
    <div class="app-login">
        <!-- 1：头像 -->
        <div class="imgstyle">
            <img :src="imgurl" >
        </div>
        <div class="am-list">
            <!-- 2：用户名输入框（手机号）  -->
            <mt-field :placeholder="unameholder" v-model="uphone" class="am-list-item"></mt-field>
            <!-- 3：密码输入框 -->
            <mt-field :placeholder="upwdholder" v-model="upwd" class="am-list-item"></mt-field>
            <!-- 4：登录按钮 -->
            <div class="btnstyle">
                <mt-button @click="login">登 录</mt-button>
            </div>
            <!-- 5:免费注册 -->
            <router-link to="/reguser" class="fontstyle">没有账号?免费注册</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgurl:"http://127.0.0.1:5050/01.png",
            unameholder:"请输入您的手机号",
            upwdholder:"请输入您的密码",
            uphone:"",
            upwd:""
        }
    },
    // 使用路由钩子在页面里获取跳转过来的路径
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            console.log("打印出从哪个页面跳转过来",from.fullPath);
            //判断，是否为 /reguser false，将其保存
            if(from.path!="/reguser"){
                vm.$store.commit("changeToLoginPath",from.fullPath)
            }
            next();  //允许跳转      
        })
    },
    computed:{
        toLoginPath(){ return this.$store.state.toLoginPath;},  //获取从哪个页面跳转到登录页面
        cid(){return this.$store.state.cid; },
        mid(){return this.$store.state.mid; },
    },
    methods:{
        login(){
            //完成用户登录操作
            //1：获取用户输入号码
            var u=this.uphone;
            //2：获取用户输入密码
            var p=this.upwd;
            // console.log(u+":"+p)测试
            //3:创建正则表达式验证用户名和密码
            var ureg=/^1[3-9][0-9]{9}$/;
            var preg=/^\w{6}$/;
            // 4：用户名验证失败，提示短消息
            if(!ureg.test(u)){
                this.$toast("用户名格式不正确");
                return;
            }
            // 5：密码验证失败，提示短消息
            if(!preg.test(p)){
                this.$toast("密码格式不正确");
                return;
            }
            // 6：发送ajax请求 axios
            var url="user/v1/login";
            var obj={uphone:u,upwd:p}
            this.axios.get(url,{params:obj}).then(res=>{
                // 7：获取服务器返回结果
                // console.log(res);
                // 7.1登录失败  提示  17816899467
                if(res.data.code==-1){
                    console.log(1);
                    this.$toast("用户名或密码错误")
                }else{
                    //登录成功，先保存一下uid;
                    this.$store.commit("changeUid",res.data.data);
                    //登录时，在这里进行判断  /  /findCinema  /cinema 一共三种情况
                        var path=this.$store.getters.getToLoginPath;
                        //1 /
                        if(path=="/"){
                            //  先设置主页面的active=movie  跳转到首页组件
                            // window.history.go(0); 该方法不可用，
                            //刷新页面，会清除掉前面改变过得vuex 
                            this.$store.commit("changeActive",'movie');  
                            // this.$router.push("/")     
                            this.$router.go(-1);
                        }else{
                            // this.$router.push(path);
                            this.$router.go(-1);         //不会刷新页面，返回history上一页
                            // location.replace(path);   //跳转时，会刷新页面，导致vuex数据丢失

                        }
                    }
                }
            )
        }
    }
}
</script>
<style scoped>
    /* 图片样式 */
    .imgstyle{
        width:5rem;height: 5rem;
        margin: 3rem auto;
    }
    .imgstyle>img{border-radius: 5rem}
    /* 输入框样式 */
    .am-list-item{
        width:20rem;
        border: 0;
        border-bottom: 1px solid #ff2e62;
        margin: 1.8rem auto;
        font-size: .1rem;
    }
    /* 按钮样式 */
    .btnstyle{
        width:20rem; height: 2.8rem;
        margin: 2rem auto;
        margin-bottom: 1rem;
    }
    .btnstyle>button{
        width: 100%;height: 100%;
        background: linear-gradient(45deg,#ff47a8,#ff2e62);
        border-radius: 2rem;
        font-size: 1.1rem;
        color: #ffffff;
    }
    /* 注册文字样式 */
    .fontstyle{
        display: inline-block;
        width: 20rem;
        font-size:.8rem;
        text-align: center;
        color: #333333;
    }
</style>