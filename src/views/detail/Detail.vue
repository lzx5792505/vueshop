<template>
  <div>
      <nav-bar>
        <template v-slot:default>商品详情{{ ids }}</template>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
export default {
  name: 'Detail',
  components:{
    NavBar
  },

  setup() {
    let route = useRoute();
    let ids = ref(0);
    ids.value = route.query.ids;
    //返回数据
    return {
      ids
    }
  },
}
</script>

<style scoped lang="scss">
</style>
