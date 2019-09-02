<template>
  <!-- 头部导航栏部分，为其搭建一个组件 -->
  <div id="headerNav">
    <!-- 占位的空div -->
    <div class="placeholder"></div>
    <div class="header_nav">
      <div class="change_city">
        <my-city></my-city>
      </div>
      <div class="change_area">
        <van-dropdown-menu active-color="#ff2e62">
          <van-dropdown-item v-model="areaValue" :options="areaOption"></van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="change_sort">
        <van-dropdown-menu active-color="#ff2e62">
          <van-dropdown-item v-model="sortValue" :options="sortOption" @change="sortChange"></van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="change_char">
        <van-dropdown-menu active-color="#ff2e62">
          <van-dropdown-item v-model="charValue" :options="charOption" title="特色"></van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <div class="search">
        <my-header-search></my-header-search>
      </div>
    </div>
  </div>
</template>
<script>
import myHeaderSearch from "./HeaderSearch";
export default {
  data(){
    return {
      areaValue:0,
      sortValue: 0,
      charValue: 0,
      areaOption:[
        {text:'全城',value:0},
        {text:'滨江区',value:1},
        {text:'淳安县',value:2},
        {text:'富阳区',value:3},
        {text:'拱墅区',value:4},
        {text:'建德市',value:5},
        {text:'江干区',value:6},
        {text:'临安区',value:7},
        {text:'上城区',value:8},
        {text:'桐庐县',value:9},
        {text:'上城区',value:10},
        {text:'萧山区',value:11},
        {text:'下沙经济区',value:12},
        {text:'西湖区',value:13},
        {text:'余杭区',value:14}
      ],
      sortOption: [
        { text: '综合排序', value: 0 },
        { text: '离我最近(定位失败)', value: 1 },
        { text: '价格最低', value: 2 }
      ],
      charOption:[
        {text:'不限',value:0},
        {text:'退票',value:1},
        {text:'改签',value:2},
        {text:'观影小食',value:3},
        {text:'3D眼睛收费',value:4},
        {text:'IMAX厅',value:4},
        {text:'CGS中国巨幕厅',value:4},
        {text:'杜比影院',value:4}
      ]
    }
  },
  methods:{
    //点击选项导致 value 变化时触发       自动排序
    //自动向value形参中，传入value这个参数
    sortChange(value){
      console.log(value);
      // 
    },
    //van-s自定义菜单内容
    onConfirm() {
      this.$refs.item.toggle();
    },
  },
  components:{
    myHeaderSearch,
  }
}
</script>
<style>
  @import url('../assets/css/headerNav.css');
</style>