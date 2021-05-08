<template>
  <div class="order-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        定单列表
      </template>
    </nav-bar>

    <van-tabs ref="tabs" @click="onChangeTab"  class="order-tab">
      <van-tab title="全部"></van-tab>
      <van-tab title="待付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="content">
       <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div @click="goTo( item.id )" class="order-item-box" v-for="( item, index ) in list" :key="index">
            <div class="order-item-header">
              <span style="line-height:30px;">订单号：{{ item.order_no }} <br> 创建时间：{{ item.created_at }}</span>
            </div>
            <van-card
              v-for="sub in item.orderDetails.data"
              :key="sub.id"
              :num="sub.num"
              :price="sub.goods.price"
              desc="全场包邮"
              :title="sub.goods.title"
              :thumb="sub.goods.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh> 
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { onMounted, reactive, ref, toRefs } from 'vue';
import { getOrdersList } from 'services/orders';
import { useRouter } from 'vue-router';
export default {
  name: 'Orderlist',

  components: {
    NavBar
  },
  setup() {
    let router = useRouter();
    let tabs = ref(null);
    let data = reactive({
      loading: false,
      finished: false,
      refreshing: false,
      list:[],
      page:1,
      totalPage:0,
      status:0,
    });

    onMounted(() =>{
      onRefresh();
    });

    let onRefresh = () => {
      // 是否处于加载状态，加载过程中不触发load事件
      data.refreshing = true
      // 清空列表数据
      data.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      data.loading = true
      //分页
      data.page = 1;

      onLoad();
    }

    let onLoad =  () => {
      //分页
      if(!data.refreshing && data.page < data.totalPage) {
        data.page = data.page + 1;
      }
      //重新加载
      if(data.refreshing){
        data.list = [];
        data.refreshing = false;
      }

      loadData();
    }

    let loadData = () => {
      getOrdersList({ page:data.page, status:data.status, include:'orderDetails.goods' }).then(res => {
        data.list = data.list.concat(res.data);
        data.loading =  false;
        //总页数
        data.totalPage = res.meta.pagination.total_pages;
        if(data.page >=  data.totalPage){
          data.finished = true;
        }
      });
    }

    let onChangeTab = (name) =>{
      data.status = name;
      onRefresh();
    }

    let goTo = (id)=>{
       router.push({path:'/orderdetail', query:{id}});
    }

    return {
      goTo,
      tabs,
      onLoad,
      loadData,
      onRefresh,
      onChangeTab,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-box {
    text-align: left;
    .order-header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
      width:100%;
      height:44px;
      line-height: 44px;
      padding: 0 10px;
      color: #252525;
      background: #fff;
      border-bottom: 1px solid #dcdcdc;
      .order-name {
        font-size: 14px;
      }
    }
    .order-tab {
      margin-top: 44px;
      position: fixed;
      left: 0;
      z-index: 1000;
      width: 100%;
      border-bottom: 1px solid #e9e9e9;
    }
    .content {
      height:100vh;
      overflow: hidden;
      overflow-y: scroll; 
      padding-top: 100px;

    }
    .order-list-refresh {
      .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .van-pull-refresh__head {
        background: #f9f9f9;
      }
      .order-item-box {
        margin: 20px 10px;
        background-color: #FAFAFA;
        .order-item-header {
          padding: 10px 20px 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .van-card {
          background-color: #FFFFFF;
          border-radius: 3px;
          margin-top: 10px;
        }
      }
    }
  }
</style>
