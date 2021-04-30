<template>
  <div>
    <nav-bar>
      <template v-slot:default>
        购物车(<span style="color:red"> {{ $store.state.cartCount }} </span>)
      </template>
    </nav-bar>
    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group ref="checkboxGroup">
          <van-swipe-cell :right-width="50">
            <div class="good-item">
              <van-checkbox name="" />
              <div class="good-img"><img src="~assets/images/demo.jpg" alt="" srcset=""></div>
              <div class="good-desc">
                <div class="good-title">
                  <span>细说PHP</span>
                  <span>x100</span>
                </div>
                <div class="good-btn">
                  <div class="price"><small>$</small>999.00</div>
                  <van-stepper integer :min="1" :max="10" :model-value="5" name="10" async-change />
                </div>
              </div>
            </div>
            <template #right>
              <van-button 
                square
                icon="delete"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar class="submit-all" :price="999" button-text="结算">
        <van-checkbox>全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar';
import { getCart } from 'services/cart';
// import { useRouter } from 'vue-router';
// import { useStore } from 'vuex';

export default {
  name: 'ShopCart',

  components:{
    NavBar
  },

  setup() {
    // let router = useRouter();
    // let store = useStore();

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
