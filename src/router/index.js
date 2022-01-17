import { createRouter, createWebHistory } from 'vue-router'
import { Toast } from 'vant';
import store from '../store';
const Home = () =>
    import ('../views/home/Home');
const Category = () =>
    import ('../views/category/Category');
const Detail = () =>
    import ('../views/detail/Detail');
const GoodsList = () =>
    import ('../views/goods/GoodsList');
const Profile = () =>
    import ('../views/profile/Profile');
const ShopCart = () =>
    import ('../views/shopcart/ShopCart');
const Register = () =>
    import ('../views/profile/Register');
const Login = () =>
    import ('../views/profile/Login');
const Address = () =>
    import ('../views/profile/Address');
const Addedit = () =>
    import ('../views/profile/Addressedit');
const Orders = () =>
    import ('../views/orders/Orders');
const Orderlist = () =>
    import ('../views/orders/Orderlist');
const Orderdetail = () =>
    import ('../views/orders/Orderdetail');


const routes = [{
        path: '',
        name: 'DefaultHome',
        component: Home,
        meta: {
            title: '5i杂志'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            title: '5i杂志'
        }
    },
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {
            title: '5i杂志-商品分类'
        }
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail,
        meta: {
            title: '5i杂志-商品详情'
        }
    },
    {
        path: '/goodsList',
        name: 'GoodsList',
        component: GoodsList,
        meta: {
            title: '5i杂志-商品列表'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: '5i杂志-个人中心',
            isAuthrequired: true
        }
    },
    {
        path: '/shopcart',
        name: 'ShopCart',
        component: ShopCart,
        meta: {
            title: '5i杂志-购物车',
            isAuthrequired: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '5i杂志-注册'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '5i杂志-登录'
        }
    },
    {
        path: '/address',
        name: 'Address',
        component: Address,
        meta: {
            title: '5i杂志-地址管理'
        }
    },
    {
        path: '/addedit',
        name: 'Addedit',
        component: Addedit,
        meta: {
            title: '5i杂志-地址编辑'
        }
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders,
        meta: {
            title: '5i杂志-订单管理'
        }
    },
    {
        path: '/orderlist',
        name: 'Orderlist',
        component: Orderlist,
        meta: {
            title: '5i杂志-订单列表'
        }
    },
    {
        path: '/orderdetail',
        name: 'Orderdetail',
        component: Orderdetail,
        meta: {
            title: '5i杂志-订单详情'
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    //没有登录 到login
    if (to.meta.isAuthrequired && store.state.user.isLogin === false) {
        Toast.success('请登录');
        return next('/login');
    } else {
        next();
    }
    document.title = to.meta.title;
});

export default router