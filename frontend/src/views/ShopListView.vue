<template>
    <div class="shopping">
        <div class="search-bar">
            <el-input v-model="input" 
            prefix-icon="el-icon-search" 
            @blur="searchProducts"
            clearable>
        </el-input>
        </div>
    
        <div class="product-list">
            <div class="product"
            v-for="product in showProducts"
            @click="Onclick(product)"
            >
                <el-image :src="product.imgUrl" lazy> </el-image>
                <div class="title">
                    <div>{{product.name}}</div>
                    <div>${{product.price}}</div>
                </div>    
            </div>
            
        </div>
        
    </div>
</template>

<script>
export default {
  name: 'ShopListView',
  data() {
    return {
        input: '',
        showProducts: [],
        products: []
    }
  },
  methods: {
    searchProducts() {
        if(this.input == '')
        this.showProducts = this.products;
        else{
            this.showProducts = [];
            this.products.forEach((product) => {
                var lowercaseName = product.name.toLowerCase();
                var lowercaseInput = this.input.toLowerCase();
                if(lowercaseName.search(lowercaseInput) != -1){
                    this.showProducts.push(product);
                }
            })
        }
    },
    Onclick(product) {
        const data = JSON.stringify(product)
        this.$router.push({
            path: 'productDetail',
            query:{
                product: encodeURIComponent(data)
            }
        })
    }
  },
  created() {
    this.products = this.$store.state.products;
    this.showProducts = this.products;
    console.log(this.$store.state.cart)
  }
}
</script>

<style lang="less" scoped>
.shopping {
    padding: 60px 100px;
    .search-bar {
        margin-bottom: 30px;
    }
}
.product-list {
    
    display: grid;
    grid-row-gap: 30px;
    grid-column-gap: 50px;
    grid-template-columns: 180px 180px 180px;
    .product {
        width: 150px;
        height: 200px;
        padding: 10px 10px;
        border: 1px solid #e5e5e5;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
        img {
            width: 150px;
            height: 150px;
            margin-bottom: 10px;
            
        }
        .title {
            display: grid;
            padding: 5px;
            grid-template-columns: 70% 20%;
        }
    }
}
</style>