<template>
  <div>
      <nav-bar>
        <template v-slot:default>购物车</template>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { getCart } from 'services/cart';

export default {
  name: 'ShopCart',

  components:{
    NavBar
  },

  setup() {
    let cart = () =>{
      getCart().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
    //返回数据
    return {
      cart
    }
  },
}
</script>

<style scoped lang="scss">
</style>
