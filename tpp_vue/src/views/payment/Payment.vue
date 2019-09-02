<template>
    <div class="d1" id="payment">
        <div class="d2">
            <div class="i-title">
                <span class="f-name">{{detail.cname}}</span>
                <span class="count">{{buyList.length}}张</span>
            </div>
            <div class="brief">今天 {{time}} {{detail.time_start}}~{{detail.time_end}} ({{detail.d23}})</div>
            <div class="brief">{{cname}}</div>
            <div class="brief">
                {{detail.room}} 
                <span style="padding:0px 2px" v-for="(item,i) of buyList" :key="i">{{item.j+1}}排{{item.i+1}}座</span> 
            </div>
        </div>
        <div class="tpp-remark"></div>
        <div class="d3">
            <div class="dy-list-item">
                <div class="dy-list-label">兑换券</div>
                <div class="dy-list-extra">无兑换券</div>
            </div>
            <div class="dy-list-item">
                    <div class="dy-list-label">电影优惠券</div>
                    <div class="dy-list-extra" style="font-size: 13px;">无优惠券</div>
            </div>
            <div class="dy-list-item" style="border-top:1px solid rgba(0,0,0,.1)">
                    <div class="dy-list-label">票价总计</div>
                    <div class="dy-list-extra">
                        <span style="color: #ff2e62;">{{(detail.price_e*buyList.length).toFixed(1)}}元</span>
                    </div>
            </div>
            <div class="dy-whitespace"></div>
        </div>
        <div class="d4">
                <div class="dy-list-item">
                    <div class="dy-list-label">选购小食</div>
                    <div class="dy-list-extra" style="font-size:13px; right: 68px;">边吃边看更爽哦</div>
                    <div class="dy-list-thumbs">
                            <img :src="url+'payment/xiaoshi1.png'" alt="">
                    </div>
                </div>
                <div class="dy-list-items">
                    <div class="dy-list-thumb">
                        <div class="div-list-poster">
                            <img style="width:100%;height:100%" :src="url+'payment/shuangren.jpg'" alt="">
                        </div>
                    </div>
                    <div class="dy-list-content">
                        <div class="dy-list-content-line">
                            <div class="dy-list-tag">多人</div>
                            <div class="dy-list-brief sales-desc">爆米花大桶×1桶、大杯汽水（可乐/雪碧/芬达）×3杯</div>
                        </div>
                        <div class="dy-list-content-lines">
                            <div class="sales-price">
                                <span class="price red">49.5元</span>
                                <span class="stdPrice">54元</span>
                            </div>
                            <div class="dy-list-value">
                                <div class="number-spinner-action">
                                    <a class="number-decrease">
                                        <img :src="url+'payment/jian.svg'" alt="">    
                                    </a> 
                                </div>
                                <div class="number-picker-wrapper">0</div>
                                <div class="number-spinner-action">
                                    <a class="number-increase">
                                        <img :src="url+'payment/increa.svg'" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dy-list-items">
                        <div class="dy-list-thumb">
                            <div class="div-list-posters">
                                <img style="width:100%;height:100%" :src="url+'payment/danren.jpg'" alt="">
                            </div>
                        </div>
                        <div class="dy-list-content">
                            <div class="dy-list-content-line">
                                <div class="dy-list-tag">单人</div>
                                <div class="dy-list-brief sales-desc">爆米花小桶×1桶、大杯汽水（可乐/雪碧/芬达）×1杯</div>
                            </div>
                            <div class="dy-list-content-lines">
                                <div class="sales-price">
                                    <span class="price red">23.1元</span>
                                    <span class="stdPrice">25.2元</span>
                                </div>
                                <div class="dy-list-value">
                                    <div class="number-spinner-action">
                                        <a class="number-decrease">
                                            <img :src="url+'payment/jian.svg'" alt="">
                                        </a>
                                    </div>
                                    <div class="number-picker-wrapper">0</div>
                                    <div class="number-spinner-action">
                                        <a class="number-increase">
                                            <img :src="url+'payment/increa.svg'" alt="">
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="dy-list-item" style="border-top:1px solid rgba(0,0,0,.1)">
                        <div class="dy-list-label">小食总计</div>
                        <div class="dy-list-extra">
                            <span style="color: #ff2e62;">0元</span>
                        </div>
                </div>
                <div class="dy-whitespace"></div>
            </div>
            <div>
                <div class="dy-list-item">
                    <div >购票须知</div>
                </div>
                <div>
                    <div class="d6"><div class="dy-list-brief">1.请确认场次和时间无误，购买成功后将不予退换
2.由于设备故障等不可抗力因素，存在少量场次取消的情况，会进行退票退款
3.由于影院系统不稳定等因素，存在出票失败的情况，会进行退款
4.取票码不再通过短信发送，可在“支付宝-卡券”或“淘票票-我的-电影票”中查看
5.下单即代表你同意《淘票票用户服务协议》
                    </div></div>
                    
                </div>
            </div>
            <div class="pay-bar">
                <div class="pay-tip">
                    <div class="lefts">不支持退票、改签</div>
                    <div class="rights">
                        <span class="action">应付</span>
                        <span class="amount">{{(detail.price_e*buyList.length).toFixed(1)}}</span>
                        <span class="yuan">元</span>
                    </div>
                </div>
                <div class="pay-btn">
                    <span style="color: #fff; font-size: 18px;" @click="showPopup">立即付款</span>
                </div>
                <van-popup v-model="show">
                    <div class="pay_cover" @click="paymoney">
                       <img :src="url+'weixin.jpg'" alt="">   
                       <h3>请扫码付款</h3>                  
                    </div>
                </van-popup>
            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            show:false, //弹出层
            time:"",
            cname:"",
            buyList:[],
            detail:{},
        }
    },
    computed:{
        url(){
            return this.$store.state.url
        },    
    },
    created(){
        this.getData();
        this.getTime();
    },
    methods:{
        //向后台发请请求，把电影票的信息，添加到数据表中
        paymoney(){
            var mname=this.detail.cname;
            var tdate=`${this.time} ${this.detail.time_start}~${this.detail.time_end}`
            var d23=this.detail.d23;
            var cname=this.cname;
            var seat=[];
            //遍历产生数组
            for (var i=0;i<this.buyList.length;i++){  
                seat.push(`${this.buyList[i].j+1}排${this.buyList[i].i+1}座`)
            }
            console.log(seat);
            var obj={ mname,tdate,d23,cname,seat };
            // return ;
            this.axios({
                method:"post",
                 url:"user/v1/ticket",
                 data:obj
            }).then(res=>{
                if(res.data.code==1){
                    console.log("购买电影票成功")
                    //购买成功，跳转到ticket页面
                    this.$router.push("/myticket")
                }else{
                    console.log("购买电影票失败")
                }
            })
        },
        showPopup(){    //弹出层显示
            this.show=true;
        },
        //获取上个页面的数据
        getData(){
            // var detail=this.$route.query;
            var obj=this.$store.getters.getSeatObj;
            // console.log(detail)
            this.cname=obj.cname.cname;
            this.buyList=obj.buyList;
            this.detail=obj.detail;  
            console.log(this.buyList)                      
        },
        //计算今天的时间
        getTime(){
            var d=new Date();
            var month=d.getMonth();
            if(month+1<10){
                month++;
                month="0"+month
            }
            var date=d.getDate();
            if(date<10){
                date="0"+date;
            }
            this.time= `${month}-${date}`
        }
    }
    


}
</script>
<style>
     @import url('../../assets/css/payment.css');
</style>