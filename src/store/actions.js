import { getCart } from 'services/cart'

const actions = {
    updateCart({ commit }){
        getCart().then(res=>{
            commit('setCartCount',{ count:res.data.length || 0 })
        });
    }
}

export default actions;