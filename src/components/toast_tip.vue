<template>
    <div>
        <div class="bgColor" v-show="isShow">
            <div class="bgColor_toast">{{ title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:'敬请期待'
        },
        isShow:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 780px) {
    $design-width:750; //设计稿width
    @function pxttrem($px) {
      @return $px/$design-width*20.06817+rem;//23.4375
    }
    .bgColor{
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        top: 0;
        &_toast{    
            position: absolute;
            width: pxttrem(259);
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
            min-height: pxttrem(96);
            line-height: pxttrem(96);
            text-align: center;
            padding: pxttrem(10);
            background: rgba(23,2,31,0.9);
            color: #ffffff;
            border-radius: pxttrem(16);
            font-size: pxttrem(32);
        }
    }
}
</style>