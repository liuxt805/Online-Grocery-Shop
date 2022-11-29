<template>
    <div class="cart">
        <div class="empty" v-if="cartProducts.length == 0">
            <span>The cart is empty!</span>
        </div>
    
        <div v-else>
            <div class="product-list" v-for="p in cartProducts">
                <img :src="p.imgUrl">

                <p>{{p.name}} ( {{p.code}} )</p>
                
                <el-input-number                 
                    size="small"
                    v-model="p.num" 
                    @change="changeNum($event, p.code)"
                    :min="1">
                </el-input-number>

                <div v-if="p.num * p.price > p.total">
                    <span style="text-decoration: line-through ;color: #666666;">
                        ${{$mulNum(p.num, p.price)}}
                    </span>
                    <span style="color: red;">${{p.total}}</span>
                </div>
                <div v-else>
                    <span>${{$mulNum(p.num, p.price)}}</span>
                </div>

                <el-button type="text" icon="el-icon-delete" @click="onDelete(p.code)"></el-button>
            </div>
            <el-divider></el-divider>
            <div class="total">
                Total Price: ${{totalPrice}}
                <el-button type="success">CHECKOUT</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
        
    }
  },
  created() {
    console.log(this.$store.state.cart)
  },
  methods: {
    changeNum(value, code) {
        let data = {
            code: code,
            value: value
        }
        this.$store.commit('changeProductNum', data);
    },
    onDelete(code) {
        this.$store.commit('deleteProductFromCart', code);
    }
  },
  computed: {
    cartProducts() {
        this.$store.state.cart = JSON.parse(localStorage.getItem('cart'))
        return this.$store.state.cart
    },
    totalPrice() {
        return this.$store.getters.totalPrice;
    }
  }
}
</script>


<style lang="less" scoped>
.cart {
    margin: 60px 60px;
    width: 800px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .empty{
        padding: 20px;
        text-align: center;
    }
    .product-list {
        width: 800px;
        overflow: hidden;
        display: grid;
        grid-template-columns: 20% 20% 25% 20% 10%;
        justify-items: center;
        align-items: center;
        img {
            width: 80px;
        }
    }
    .total {
        display: grid;
        grid-template-columns: 80% 20%;
        grid-template-rows: 50px;
        align-items: center;
        margin: 10px 20px;
    }
}
</style>