import Vue from 'vue'
import Vuex from 'vuex'
import CommonFunction from '../common/common.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:
    [
      {
        code: 'CE',
        name: 'Cheese',
        imgUrl: 'https://cdn.shopify.com/s/files/1/0206/9470/products/82302-done_1024x1024.jpg?v=1605910613',
        price: '5.95',
        description: 'Cheesexxxxxx',
        packagingOptions: [
          {
            optionNum: '3', 
            optionPrice: '14.95'
          }, 
          {
            optionNum: '5', 
            optionPrice: '20.95'
          }
        ]
    },
    {
        code: 'HM',
        name: 'Ham',
        imgUrl: 'https://wintulichs.com/wp-content/uploads/2018/10/Wintulichs-Smallgoods_0000_leg-ham.jpg',
        price: '7.95',
        description: 'Cheesexxxxxx',
        packagingOptions: [
          {
            optionNum: '2', 
            optionPrice: '13.95'
          },
          {
            optionNum: '5', 
            optionPrice: '29.95'
          },
          {
            optionNum: '8', 
            optionPrice: '40.95'
          }]
    },
    {
        code: 'SS',
        name: 'Soy Sauce',
        imgUrl: 'https://cdn0.woolworths.media/content/wowproductimages/large/004840.jpg',
        price: 11.95,
        description: 'Cheesexxxxxx',
        packagingOptions: []
    },
    {
        code: 'AP',
        name: 'Apple',
        imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996.jpg?crop=1.00xw:0.923xh;0,0.0486xh&resize=768:*',
        price: 3.95,
        description: 'Cheesexxxxxx',
        packagingOptions: []
    },
    ],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  },
  getters: {
    totalPrice(state) {
      var totalPrice = 0.00;
      for(var i=0; i < state.cart.length; i++){
        totalPrice = CommonFunction.addNum(totalPrice, state.cart[i]['total']);
      }
      return totalPrice;
    }
  },
  mutations: {
    calculateProductTotal(state, productCode){
      var cartProduct = state.cart.find(item => {return item.code == productCode});
      var totalPrice = 0.00, n = cartProduct.num;

      for(var i = cartProduct.packagingOptions.length - 1; i >= 0; i--) {
        var packagingNum = cartProduct.packagingOptions[i].optionNum;
        var packagingPrice = cartProduct.packagingOptions[i].optionPrice;
        if(n >= packagingNum){
          totalPrice = CommonFunction.addNum(totalPrice, CommonFunction.mulNum(Math.floor(n / packagingNum), packagingPrice));
          n %= packagingNum;
        }
      }
      totalPrice = CommonFunction.addNum(totalPrice, CommonFunction.mulNum(n, cartProduct.price));
      cartProduct['total'] = totalPrice.toFixed(2);
    },

    addProductToCart(state, data){
      let p = data.product;
      let cartProduct = state.cart.find(item => {return item.code == data.product.code});
      //product number
      if(cartProduct === undefined){
        p['num'] = data.num;
        state.cart.push(p);
      } else{
        var n = cartProduct['num'];
        cartProduct['num'] = n + data.num;
      }
      //update product total price
      this.commit('calculateProductTotal',data.product.code)

      localStorage.setItem('cart', JSON.stringify(state.cart)) 
      console.log(state.cart)
    },

    changeProductNum(state, data) {
      let cartProduct = state.cart.find(item => {return item.code == data.code});
      cartProduct['num'] = data.value;

      //update product total price
      this.commit('calculateProductTotal',data.code)

      localStorage.setItem('cart', JSON.stringify(state.cart))
      console.log(state.cart)
    },

    deleteProductFromCart(state, code) {
      let len = state.cart.length;
      for(var i = 0; i < len; i++){
        if(state.cart[i].code == code){
          state.cart.splice(i,1);
          break;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    createNewProduct(state, data) {
      let newProduct = JSON.parse(data);
      var index = state.products.findIndex((item) => {
        return item.code == newProduct.code
      })
      if(index != -1)
      state.products[index] = newProduct;
      else
      state.products.push(newProduct);
    },
    deleteProduct(state, code){
      var index = state.products.findIndex((item) => {
        return item.code == code
      })
      state.products.splice(index,1)
      console.log(index)
    }
  },
  actions: {
  },
  modules: {
  }
})
