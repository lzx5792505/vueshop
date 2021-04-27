<template>
  <div class="back-top" @click="backTop"></div>
</template>

<script>


export default {
  name: 'BackTop',

  setup(props,context) {
    
    //返回数据
    return {
        backTop:()=>{
            context.emit('topBok')
        }
    }
  },
}
</script>

<style scoped lang="scss">
    .back-top{
        width: 32px;
        height: 32px;
        position: fixed;
        bottom: 80px;
        right: 30px;
        box-shadow:5px 5px 5px #888;
        border-radius: 50%;
        z-index: 20;
        background-color: #fcfcfc;
    }
</style>
