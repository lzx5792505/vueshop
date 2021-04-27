<template>
  <div>
      <nav-bar>
        <template v-slot:default>购物车</template>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'ShopCart',

  components:{
    NavBar
  },

  setup() {
    
    //返回数据
    return {
    }
  },
}
</script>

<style scoped lang="scss">
</style>
