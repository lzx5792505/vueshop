<template>
  <div>
      <nav-bar>
        <template v-slot:default>个人中心</template>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'Profile',

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
