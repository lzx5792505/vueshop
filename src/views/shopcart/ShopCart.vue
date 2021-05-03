<template>
  <div>
    <nav-bar>
      <template v-slot:default>
        购物车(<span style="color:red"> {{ $store.state.cartCount }} </span>)
      </template>
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup" @change="groupChange" v-model="result">
          <van-swipe-cell :right-width="50" v-for="(item,i) in list" :key="i">
            <div class="good-item">
              <van-checkbox :name="item.id" />
              <div class="good-img"><img src="~assets/images/demo.jpg" alt="" srcset=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.goods.title }}</span>
                  <span>x {{ item.goods.stock }}</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>$</small>{{ item.goods.price + '.00' }}</div>
                  <van-stepper integer :min="1" :max="item.goods.stock" :model-value="item.num" :name="item.id" async-change  @change="onChange"/>
                </div>
              </div>
            </div>
            <template #right>
              <van-button 
                square
                icon="delete"
                type="danger"
                class="delete-button"
                @click="delCarts(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="total * 100" @submit="onSubmit" button-text="结算">
        <van-checkbox @click="allCheck" v-model:checked="checkAll">全选</van-checkbox>
      </van-submit-bar>

      <div class="empty" v-if="!list.length">
        <img class="empty-cart" src="~assets/images/demo.jpg" alt="空购物车" srcset="">
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="goToCart()">前往选购</van-button>
      </div> 


    </div>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { getCart, editCart, ckeckCart,delCart } from 'services/cart';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRefs } from 'vue';
import { Toast } from 'vant';

export default {
  name: 'ShopCart',

  components:{
    NavBar
  },

  setup() {
    let router = useRouter();
    let store = useStore();
    //购物车数据，状态
    let datas = reactive({
      list:[],
      result:[],
      checkAll:true
    });
    //初始化数据
    let ininCart = () =>{
      Toast.loading({
        message:'加载中......',
        forbidClick:true
      });
      getCart('include=goods').then(res => {
        datas.list = res.data;
        datas.result = res.data.filter(n => n.is_checked == 1).map(item => item.id);
        Toast.clear();
      }).catch(err => {
        console.log(err);
      });
    }

    onMounted(()=>{
      ininCart()
    });

    //改变购物车数量
    let onChange = (v,detail)=>{
      Toast.loading({message:'修改中......',forbidClick:true});
      editCart(detail.name,{num:v}).then(function() {
        //改变list
        datas.list.forEach(item => {
          console.log(item);
          if(item.id == detail.name){
            item.num = v;
          }
        });
        Toast.clear();
      }).catch(err => {
        console.log(err);
      });
    };

    //复选框改变
    let groupChange = (result) =>{
      if(result.length == datas.list.length){
        datas.checkAll = true;
      }else{
        datas.checkAll = false;
      }
      datas.result = result;
      ckeckCart({cart_ids:result});
    }
     
    let allCheck = () =>{
      if(!datas.checkAll){
        datas.result = datas.list.map(item => item.id);
        datas.checkAll = true;
      }else{
        datas.result = [];
        datas.checkAll = false;
      }
    }

    //没有商品去选购商品
    let goToCart = () =>{
      router.push({path:'/home'});
    }

    //删除商品
    let  delCarts = (id) =>{
      delCart(id).then(function(){
        ininCart(); //重新初始化
        store.dispatch('updateCart'); //更新vuex购物车数据
      });
    }

    //计算总价
    let total = computed(() => {
      let sum = 0;
      datas.list.filter(item => datas.result.includes(item.id)).forEach(
        item => {
          sum += parseInt(item.num) * parseFloat(item.goods.price);
        }
      );
      return sum;
    });

    //提交订单
    let onSubmit = () => {
      if(datas.result.length == 0){
        Toast.fail('请选择商品');
        return;
      }else{
        router.push({path:'/orders'});
      }
    }

    //返回数据
    return {
      total,
      allCheck,
      goToCart,
      onChange,
      delCarts,
      onSubmit,
      groupChange,
      ...toRefs(datas)
    }
  },
}
</script>

<style scoped lang="scss">
  .cart-body{
    margin: 60px 0 100px 0;
    padding-left: 10px;
  }

  .good-item{
    display: flex;
  }

  .good-img{
    img{
      width: 100px;
      height: auto;
    }
  }

  .good-desc{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    padding: 20px;
  }

  .good-title{
    display: flex;
    justify-content: space-between;
  }

  .good-btn{
    display: flex;
    justify-content: space-between;
  }

  .price{
    font-size: 16px;
    color: red;
    line-height: 28px;
  }

  .van-icon-delete{
    font-size: 20px;
    margin-top: 4px;
  }

  .delete-button{
    width: 50px;
    height: 100%;
  }

  .submit-all{
    margin-bottom: 50px;
  }

  .van-checkbox{
    margin-left: 0px;
    padding-right: 10px;
  }

  .van-submit-bar_text{
    margin-right: 10px;
  }

  .van-submit-bar_button{
    background:red;
  }

  .van-checkbox__icon--checked .van-icon{
    background-color: res;
    border-color: res;
  }
</style>
