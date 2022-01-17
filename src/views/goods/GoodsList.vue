<template>
  <div>
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
    />
    <van-tabs v-model="active">
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>

export default {
  name: 'GoodsList',

  setup() {
    
    //返回数据
    return {
      
    }
  },
}
</script>

<style scoped lang="scss">
  
  
</style>
