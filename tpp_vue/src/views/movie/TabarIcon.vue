<template>
    <div>
        <img :src="focused?selectedImage:normalImage" class="imgstyle">
    </div>
</template>
<script>
export default {
    props:{
        focused:false,//默认状态
        selectedImage:{default:""},//选中图片
        normalImage:{default:""}
    }
}
</script>
<style scoped>
    .imgstyle{
        width:2.5rem
    }
</style>