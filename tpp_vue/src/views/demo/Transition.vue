<template>
<div class="d2">
  <div class="d4">
      <transition name="fade">
        <button v-if="show" class="d1"  @click="show=!show" key="on">on</button>
        <button v-if="!show" class="d1"  @click="show=!show" key="off">off</button>
      </transition>
  </div>
  <div>
    <button @click="show=!show">点击切换</button>
    <router-link to="/tran2">tran2</router-link>
  </div>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.
Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente est voluptatum eos possimus, ullam dignissimos, maiores minima consectetur repudiandae quaerat nulla labore ad vel nisi magni quae exercitationem sunt.</div>

</template>
<script>
export default {
  data(){
    return {
      isEditing:false,
      show: false,
      docState:'save1',
    }
  },
  computed:{
    buttonMessage(){
      switch(this.docState){
        case "save":return "Edit";
        case "save1":return "Save";
        case "save2":return "Cancel";
      }
    }
  },
  methods:{
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }
  }
}
</script>
<style scoped>
.d2{
  
  /* top:0;
  height:100%; */
  /* width:100%;
  height:100%; */
  background-color:#fff;
  /* position:absolute; */
}
/* .d4{
height:100px;
width:200px;
margin:0 auto;
position:relative;
}
  .d1{
    position:absolute;
    top:0;
    left:0;

  } */
  .fade-enter-active,.fade-leave-active{
    transition: 1s;
  }
  .fade-enter{
    transform:translate(30px,0);
    opacity:0;
  }
  .fade-leave-to{
    transform:translate(-30px,0);
     opacity: 0;
  }

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>