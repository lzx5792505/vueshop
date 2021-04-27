<template>
    <van-swipe v-if="banner.length" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item , i) in banner"  :key="i">
            <img v-lazy="item.img_url" :alt="item.title" srcset="">
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props:{
      banner:Array,
      default(){
          return [];
      }
  }
}
</script>

<style scoped lang="scss">
    img{
        width: 100%;
        height: auto;
    }
</style>
