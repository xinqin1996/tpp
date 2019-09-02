<template>
<div>
    <transition>
      <button v-if="isEditing" key="save">
        Save
      </button>
      <button v-else key="edit">
        Edit
      </button>
    </transition> 

    <transition>
      <button v-bind:key="isEditing">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
    </transition>

    <transition>
      <button v-bind:key="docState">
        {{ buttonMessage }}
      </button>
    </transition>

</div>

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
#example-4{
  height:400px;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
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