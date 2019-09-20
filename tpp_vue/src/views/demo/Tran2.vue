
<template>
    <div>
        <h3>
               <router-link to="/tran">tran1</router-link>   
        </h3>
                <hr>
                <button @click="c1">点击1</button>
                <button @click="c2">点击2</button>
                <button @click="c3">点击3</button>
                <hr>
            <h4>你好</h4>
            <h4>{{list[0]}}---{{list[1]}}---{{list[2]}}</h4>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!riores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!riores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!riores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!riores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!t amet consectetur adipisicing elit. Asperiores perspiciatis, repudiandae dolores eveniet non minima. Similique accusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!
ccusantium eveniet quia minima provident magni aliquam obcaecati ipsum facilis distinctio, itaque maiores veritatis!aiores veritatis!
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[111,2222,33333],
            i:1,
        }
    },
    methods:{
        c1(){
            this.$set(this.list,0,this.list[0]+1)
            // this.list[0]++;
        },
        c2(){
            this.list[1]++;
        },
        c3(){
            this.i++;
            console.log(this.i);
            console.log(this.list);
        },
    }
}
</script>
<style scoped>
/*  通过设置最外层div ： 高100vh,宽100vh, 使得里面的内容和定位不会在组件过渡时变乱*/
h4{
    width:100%;
    position: fixed;
    bottom:0;
    background:red;
}
    div{
        /* position:relative; */
        background-color:#ccc;
        overflow: scroll;
        /* 设置高度，否则在过渡是fixed 定位会变为absolute页面变乱 */
        height:100vh;         
        /* transition:absolute; */
    }
</style>