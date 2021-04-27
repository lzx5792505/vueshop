<template>
  <div class="goods flex flex-wrap justify-around">
      <goods-item v-for="item in goods" :product="item" :key="item"></goods-item>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'
export default {
  name: 'GoodsList',
  props:{
    goods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  components: {
    GoodsItem,
  },
  setup() {
    //返回数据
    return {  
    }
  },
}
</script>

<style scoped lang="scss">
    .goods{
      padding: 10px;
      margin-bottom: 25px;
    }
</style>
