<template>
  <div>
    <el-page-header @back="goBack" title="Product Detail">
    </el-page-header>

    <el-card v-if="product">
      <el-row>
        <el-col :span="11">
          <img :src="product.imgUrl">
        </el-col>
        <el-col :span="12" style="padding: 5px">
          <div>
            <!--product name-->
            <span style="font-size: 20px; font-weight: bold;">{{product.name}}</span>
            <el-divider></el-divider>

            <!--product code-->
            <div class="label">
              <p>Code</p>
              <span>{{product.code}}</span>
            </div>

            <!--product price-->
            <div class="label">
              <p>Price</p>
              <span>1 for ${{product.price}}</span>
            </div>

            <!--Ddescription-->
            <p>Description</p>
            <span>{{product.description}}</span>

            <!--product packaging options-->
            <div v-if="showPackagingOption">
              <p>Packaging Options</p>
              <div v-for="item in product.packagingOptions">
                {{item[0]}} for ${{item[1]}}
              </div>
            </div>

            
            
            <!--add to cart buttons-->
            <div class="buttons">
              <el-input-number 
                style="width: 150px;"
                v-model="num" 
                :min="1">
              </el-input-number>
              <el-button style="width: 150px;" type="primary" 
                @click="addToCart"
                icon="el-icon-shopping-cart-full">Add To Cart
              </el-button>
            </div>
            
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      num: 1,
      showPackagingOption: true
    }
  },
  mounted() {
    let str = decodeURIComponent(this.$route.query.product)
    this.product = JSON.parse(str);
    if(this.product.packagingOptions.length == 0)
    this.showPackagingOption = false

    console.log(this.$store.state)
  },
  methods: {
    goBack() {
      this.$router.push('/home/shopList')
    },
    async addToCart() {
      console.log(localStorage.getItem('cart'))
      let data = {
        product: this.product,
        num: this.num
      }
      this.$store.commit("addProductToCart", data);

      console.log(this.$store.state.cart)
      this.$message({
          message: 'Products have been added to cart!',
          type: 'success'
        })
    }
  }
  
}
</script>

<style lang="less" scoped>
.el-page-header{
  height: 40px;
  background-color: #DDEBFD; 
  color: #5A9CF8;
  
}
.el-card {
  margin: 60px 100px;
  width: 700px;
  overflow: hidden;
  // display: grid;
  // grid-template-columns: 40% 50%;
  img {
    width: 250px;
    height: 250px;
  }
  p {
    font-weight: bold;
  }
  .label {
    display: grid; 
    grid-column-gap: 15px; 
    grid-template-columns: 50% 50%; 
    grid-template-rows: 40px;
    align-items: center;
  }
  .buttons{
    margin-top: 50px;
    display: grid;
    grid-column-gap: 15px;
    grid-template-columns: 50% 50%;
  }
}
</style>