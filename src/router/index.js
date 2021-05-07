import { createRouter, createWebHistory } from 'vue-router'
import { Toast } from 'vant';
import  store  from '../store';
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Detail = () => import('../views/detail/Detail');
const Profile = () => import('../views/profile/Profile');
const ShopCart = () => import('../views/shopcart/ShopCart');
const Register = () => import('../views/profile/Register');
const Login = () => import('../views/profile/Login');
const Address = () => import('../views/profile/Address');
const Addedit = () => import('../views/profile/Addressedit');
const Orders = () => import('../views/orders/Orders');


const routes = [
  {
    path: '',
    name: 'DefaultHome',
    component: Home,
    meta:{
      title:'图书商城'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'图书商城'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      title:'图书商城-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta:{
      title:'图书商城-商品详情'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'图书商城-个人中心',
      isAuthrequired:true
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta:{
      title:'图书商城-购物车',
      isAuthrequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:'图书商城-注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'图书商城-登录'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta:{
      title:'图书商城-地址管理'
    }
  },
  {
    path: '/addedit',
    name: 'Addedit',
    component: Addedit,
    meta:{
      title:'图书商城-地址编辑'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta:{
      title:'图书商城-订单管理'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  //没有登录 到login
  if(to.meta.isAuthrequired && store.state.user.isLogin === false){
    Toast.success('请登录');
    return next('/login');
  }else{
    next();
  }
  document.title = to.meta.title;
});

export default router
