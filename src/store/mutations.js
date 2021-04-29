const mutations = {
    setIsLogin(state,payload) {
        state.user.isLogin = payload;
    },
    setCartCount(state,payload){
        state.cartCount = payload.count;
    }
}

export default mutations;