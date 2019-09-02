const express = require("express");
const router = express.Router();
const pool=require("../pool");

router.get("/v1/seat",(req,res)=>{
  var data={
    detail:[],
    cname:"",
  }
  var cmid=req.query.cmid;
  var sql = "SELECT * FROM tpp_cinema_movies WHERE cmid = ?";
  pool.query(sql,[cmid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:0,msg:"没有查询到数据"})
    }else{
      data.detail=result[0];
      //获取影城的名字
      var cid=result[0].cid;
      var sql="SELECT cname FROM tpp_cinema WHERE cid= ?"
      pool.query(sql,[cid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
          res.send({code:0,msg:"没有查询到数据"})
        }else{
          data.cname=result[0];
          res.send({code:1,msg:"查询成功",data:data})          
        }
      })

    }
  })
})

//影院搜索
router.get("/v1/search_cinema",(req,res)=>{
  var sel=req.query.sel;
    // sel=[`%${sel}%`];  //把sel写成数组形式
  sel=`%${sel}%`;
  // select * from emp where ename like '%q%';
  var sql="SELECT * FROM tpp_cinema WHERE cname LIKE ? OR caddress LIKE ?";
  // SELECT * FROM tpp_cinema WHERE cname LIKE '%杭%'
  pool.query(sql,[sel,sel],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:0,msg:"没有查询的任何信息",data:result});
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  })
})

//查询影院的详情
router.get("/v1/cinema_detail",(req,res)=>{
  var cid=req.query.cid;
  var sql="SELECT * FROM tpp_cinema WHERE cid = ?"
  pool.query(sql,[cid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:0,msg:"查询出错任"});
    }else{
      res.send({code:1,msg:"查询成功",data:result});
    }
  })
})

//查询  通过城市city_id 和 mid 查找影院,并把影院显示在页面上，
//先选择电影，在选择影城时，展示所有影城的信息
router.get("/v1/find_cinema",(req,res)=>{
  var data={
//    city:{},
    cinema:[],
    movie:[],
  };
  var city_id=req.query.city_id;         
  var mid=req.query.mid;  
//  console.log(city_id);
//  console.log(1);
//  console.log(mid);
  //查询到在这个城市，这部电影，有哪几个影院有这部电影在播放  
  var sql="SELECT * FROM tpp_cinema_hasmovies WHERE city_id = ? AND mid = ?";
  pool.query(sql,[city_id,mid],(err,result)=>{
    if(err) throw err;
	if(result.length==0){
		res.send({code:0,msg:"该城市没有影院在播放该电影"})
	}else{
		//data.city=result;
		//使用电影院cid  和  电影的编号向 tpp_cinema_movies发起请求
		var i=0;
		var max_i=result.length;
		// console.log(cid);
		var get_movie=function(){
		  var cid=result[i].cid;
		  //这里获取影院的信息，
		  var sql="SELECT * FROM tpp_cinema WHERE cid=? "
		  pool.query(sql,[cid],(err,result)=>{
			if(err) throw err;
			data.cinema[i]=result[0];
			//这里获取影院里，该电影的播放信息；
			var sql="SELECT cmid,time_start,d23,price_e FROM tpp_cinema_movies WHERE cid = ? AND mid = ?"
			pool.query(sql,[cid,mid],(err,result)=>{
			  if(err) throw err;
			  // console.log(result);
			  data.movie[i]=result;
			  // console.log(result);
			  // data.movie.push(result);
			  i++;
			  if(i<max_i){
				  get_movie();
			  }else{
				// console.log(data.movie);
				res.send({code:1,msg:"查询成功",data:data});
			  }
			})  
		  })
		}      
		// 调用get_movie();
		get_movie();
	}
  })
})


// 查询影院的电影
//1先查询有哪些电影
//2获取每个电影的信息，放入数组
//3获取每部电影的播放时间，放入数组
router.get("/v1/cinema_hasmovies",(req,res)=>{
  var data={
    // movies:[],
    infors:[],
    times:[],
  };
  var movies;
  var cid=req.query.cid;         
  var sql="SELECT * FROM tpp_cinema_hasmovies WHERE cid = ?";
  pool.query(sql,[cid],(err,result)=>{
    if(err) throw err;
    // res.send({code:1,msg:"查询成功",data:result});
    // movies=result;
    var i=0;
    var max_i=result.length;
    // console.log(cid);
    var get_infor=function(){
      var mid=result[i].mid;
      var sql="SELECT mid,mname,pic,is_show,score,wish,infor FROM tpp_movie WHERE mid = ?"
      pool.query(sql,[mid],(err,result)=>{
        if(err) throw err;
        // console.log(result);
        //这里把查询到的电影信息，按照顺序放到里面
        data.infors[i]=result[0];
        //咋这里发起查询，用mid和cid
        var sql="SELECT * FROM tpp_cinema_movies WHERE cid = ? AND mid = ?"
        pool.query(sql,[cid,mid],(err,result)=>{
          if(err) throw err;
          data.times[i]=result;
          //在一整套流程结束时,再次调用;
          i++;
          if(i<max_i){
              get_infor();
          }else{
            
            // console.log(data.movie);
            res.send({code:1,msg:"查询成功",data:data});
          }
        })
      })        
    }
    get_infor();
  })
})

module.exports=router;
