<template>
    <div>
        <div class="imgstyle">
            <img :src="imgurl">
        </div>
        <mt-field :placeholder="unameholder" v-model="uname" class="am-list-item"></mt-field>
        <mt-field :placeholder="uphoneholder" v-model="uphone" class="am-list-item"></mt-field>
        <mt-field :placeholder="upwdholder" v-model="upwd" class="am-list-item"></mt-field>
        <div class="btnstyle">
            <mt-button size="large" @click="reguser" >注册</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imgurl:"http://127.0.0.1:5050/01.png",
            unameholder:"请输入您的姓名",
            uphoneholder:"请输入您的电话",
            upwdholder:"请输入您的密码",
            uname:"",
            uphone:"",
            upwd:""
        }
    },
    methods:{
        reguser(){
            //完成用户注册操作
            //1：获取姓名、用户名、密码
            var un=this.uname;
            var uph=this.uphone;
            var upw=this.upwd;
            // console.log(un+":"+uph+":"+upw)
            //2:创建正则表达式
            var unreg=/^[\u2E80-\u9FFF]{2,4}$/;
            var ureg=/^1[3-9][0-9]{9}$/;
            var preg=/^\w{6}$/;
            //3：验证失败提示短消息
            if(!unreg.test(un)){
                this.$toast("姓名格式不正确");
                return;
            }
            if(!ureg.test(uph)){
                this.$toast("手机号格式不正确");
                return;
            }
            if(!preg.test(upw)){
                this.$toast("密码格式不正确");
                return;
            }
            //4：发送ajax请求 axios
            var url="user/v1/reg";
            var obj={uname:un,uphone:uph,upwd:upw}
            this.axios.get(url,{params:obj}).then(res=>{
                // console.log(res)
                if(res.data.code==0){
                    "注册失败"
                }else{
                    // this.$router.push("/login")
                    this.$router.go(-1);
                    // this.$store.commit("changeActive",'my'); 
                    // this.$router.push("/")
                } 
            })
        }
    }
}
</script>
<style scoped>
    .imgstyle{
        width:5rem;height: 5rem;
        margin: 3rem auto;
    }
    .am-list-item{
        width:20rem;
        border: 0;
        border-bottom: 1px solid #ff2e62;
        margin: 1.3rem auto;
        font-size: .1rem;
    }
    .btnstyle{
        width:20rem; height: 2.8rem;
        margin: 1.3rem auto;
    }
    .btnstyle>button{
        width: 100%;height: 100%;
        background: linear-gradient(45deg,#ff47a8,#ff2e62);
        border-radius: 2rem;
        font-size: 1.1rem;
        color: #ffffff;
    }
</style>