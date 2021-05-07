<template>
    <div>
        <nav-bar>
            <template v-slot:default>订单管理</template>
        </nav-bar>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'Orders',
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
