<template>
  <div class="order-detail-box">
    <nav-bar class="nav-bar">
      <template v-slot:default>
        定单详情
      </template>
    </nav-bar>
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ statusString }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.order_no }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.created_at }}</span>
      </div>

      <van-button v-if="detail.status == 1" @click="showPayFn" style="margin-bottom: 10px" color="#1baeae" block>去支付</van-button>
      <van-button v-if="detail.status == 3" @click="handConfirmOrders"  block>确认订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ total + '.00'}}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>

    <van-card
      v-for="item in detail.orderDetails.data" :key="item.id"
      :num="item.num"
      :price="item.price+'.00'"
      desc="全场包邮"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />

    <div style="width:100%;height:50px;"></div>
    <van-popup
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
    >

      <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-grid :border="false" :column-num="2">
          <van-grid-item  text="支付宝">
            支付宝二维码<br>
            <van-image width="150" height="150" :src="payUrl" />
          </van-grid-item>
          <van-grid-item text="微信支付">
            微信二维码<br>
            <van-image width="150" height="150" :src="weChatUrl" />
          </van-grid-item>
        </van-grid>

      </div>
    </van-popup>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import { getOrdersInfo, payOrders,payOrderStatus,confirmOrders } from 'services/orders';
  import { computed, onMounted, reactive, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
import { Dialog, Toast } from 'vant';
  export default {
    name: 'Orderdetail',

    components: {
      NavBar
    },

    setup() {
      let route = useRoute();
      let router = useRouter();
      let data = reactive({
        orderNo:'',  //订单id
        detail:{
          orderDetails:{
            data:[]
          },
          status:0
        },
        showPay:false,
        payUrl:'',
        weChatUrl:''
      });

      let initData = () =>{
        let { id } = route.query;
        data.orderNo = id;
        getOrdersInfo(data.orderNo).then(res => {
          data.detail =  res;
        })
      }

      onMounted(() => {
        Toast.loading({message:'加载中...',forbidClick:true});
        initData();
        Toast.clear();
      });

      //订单状态
      let statusString = computed(() => {
        let status = ['','已下单','已支付','待发货','确认收货','已过去'];
        return status[data.detail.status]
      });
      
      //订单价格
      let total = computed(() =>{
        let sum = 0;
        data.detail.orderDetails.data.forEach(item => {
          sum += parseInt(item.num) * parseFloat(item.price);
        });
        return sum;
      });

      let showPayFn = () =>{
        data.showPay = true;
        payOrders(data.orderNo,{type:'aliyun'}).then(res => {
            data.payUrl = res.qr_code_url;
            data.weChatUrl = res.qr_code_url;
        });
        //支付成功，轮询查看
        let timer = setInterval(() => {
            payOrderStatus(data.orderNo).then(res => {
              if(res == '2'){
                  clearInterval(timer);
                  data.showPay = false;
                  router.push({path:'/orderdetail',query:{id:data.orderNo}});
              }
            });
        }, 1500);
      }

      //确认订单
      let handConfirmOrders = () =>{
        Dialog.confirm({
          title:'是否确认订单'
        }).then(() => {
          confirmOrders(data.orderNo).then(function() {
            Toast.success('确认成功');
            initData();
          });
        }).catch(err => {
          console.log(err);
        });
      }

      //关闭
      let close = () => {
        Dialog.close();
      }
      
      return {
        close,
        total,
        showPayFn,
        statusString,
        ...toRefs(data),
        handConfirmOrders
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-detail-box {
    text-align: left;
    background: #f7f7f7;
    .order-status {
      background: #fff;
      margin-top: 44px;
      padding: 20px;
      font-size: 15px;
      .status-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
      }
    }
    .order-price {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .price-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
      }
    }
    .van-card {
      margin-top: 0;
    }
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
