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
        products: [
            {
                code: 'CE',
                name: 'Cheese',
                imgUrl: 'https://cdn.shopify.com/s/files/1/0206/9470/products/82302-done_1024x1024.jpg?v=1605910613',
                price: 5.95
            },
            {
                code: 'HM',
                name: 'Ham',
                imgUrl: 'https://wintulichs.com/wp-content/uploads/2018/10/Wintulichs-Smallgoods_0000_leg-ham.jpg',
                price: 7.95
            },
            {
                code: 'SS',
                name: 'Soy Sauce',
                imgUrl: 'https://cdn0.woolworths.media/content/wowproductimages/large/004840.jpg',
                price: 11.95
            },
            {
                code: 'AP',
                name: 'Apple',
                imgUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996.jpg?crop=1.00xw:0.923xh;0,0.0486xh&resize=768:*',
                price: 3.95
            },
        ]
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
        console.log(data);
        this.$router.push({
            path: 'productDetail',
            query:{
                product: encodeURIComponent(data)
            }
        })
    }
  },
  mounted() {
    this.showProducts = this.products;
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