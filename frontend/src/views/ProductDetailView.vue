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
          <span style="font-size: 20px; font-weight: bold;">{{product.name}}</span>
          <el-divider></el-divider>
          <span>{{product.code}}</span>
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
      product: {}
    }
  },
  mounted() {
    let str = decodeURIComponent(this.$route.query.product)
    this.product = JSON.parse(str);
  },
  methods: {
    goBack() {
      this.$router.push('/home/shopList')
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
  height: 500px;
  // display: grid;
  // grid-template-columns: 40% 50%;
  img {
    width: 250px;
    height: 250px;
  }
}
</style>