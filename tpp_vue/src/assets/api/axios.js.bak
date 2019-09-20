import axios from "axios";
// import qs from "qs"   //qs库作用-->格式化数据
// 6：配置axios 基础路径
axios.defaults.baseURL="http://127.0.0.1:5050/";

function movieCarousel(){
  return new Promise(
    function(resolve,reject){
      var url="movie/v1/carousel"
      axios.get(url).then(res=>{
        if(res.data.code==1){
            console.log("在axios.js中导出一个axios函数")
            resolve(res.data.data)
          }else{
            reject("error")
          }
      })
    }
  )
}
function hello(){
  console.log("hello")
}

//导出一个对象
export default {movieCarousel,hello};

		// //轮播图
    //         onload(){
    //               var url="movie/v1/carousel"
    //               this.axios.get(url).then(res=>{
    //                   if(res.data.code==1){
    //                       this.list=res.data.data;
    //                   }
    //               })
    //           },