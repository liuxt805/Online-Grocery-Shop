<template>
  <div>
    <el-page-header @back="goBack" title="New Product">
    </el-page-header>
  
  <div class="product-detail">
    <el-form ref="form" label-position="left" :rules="formRules"
      :model="form" class="demo-dynamic" label-width="160px">
        <el-form-item label="Product Name" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Product Code" prop="code">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="Product Description" prop="description">
            <el-input v-model="form.description" type="textarea" :rows="2">
            </el-input>
        </el-form-item>
        <el-form-item label="Product Price ($)" prop="price">
            <el-input v-model="form.price" type="number"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(option, index) in form.packagingOptions"
          :label="'Packaging Option ' + index"
          :key="option.key"
          :prop="'packagingOptions[' + index + ']'"
        >
        <el-input style="width: 220px;" v-model="option.optionNum" 
        placeholder="packaging option number" 
        type="number"
        >
        </el-input>
        <el-input style="width: 220px;" v-model="option.optionPrice" 
        placeholder="packaging option price ($)"
        
        type="number">
        </el-input>
        <el-button type="text" style="margin-left: 10px;" icon="el-icon-delete" 
          @click.prevent="removeOption(option)">
        </el-button>
        </el-form-item>
        <el-form-item>
          <div class="buttons">
          
          <!--confirmation for submit button-->
          <el-popconfirm
            confirm-button-text='Submit'
            cancel-button-text='Cancel'
            title="Are you sure to submit?"
            @confirm="submitForm"
          >
            <el-button type="primary" slot="reference">Submit</el-button>
          </el-popconfirm>

          <el-button style="margin-left: 10px; margin-right: 10px;" @click="addOption">Add New Packaging Option</el-button>

          <!--confirmation for reset button-->
          <el-popconfirm
            confirm-button-text='Reset'
            cancel-button-text='Cancel'
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure to reset?"
            @confirm="resetForm"
          >
            <el-button type="danger" slot="reference">Reset</el-button>
          </el-popconfirm>
        </div>
        </el-form-item>
    </el-form>
  </div>   
  </div>
</template>

<script>
export default {
  name: 'AdminProductDetail',
  data() {
    const isPriceVlidator = (rule, value, callback) => {
        var pattern = /^\d+.?\d{0,2}$/;
        if(!value){
          return callback(new Error('Please enter product price!'))
        }else if(value > 214748){
          return callback(new Error('Price is too large!'))
        }else if (value <= 214748 && !pattern.test(value)) {
          return callback(new Error('Please enter number with up to 2 decimal places!'))
        }else return callback()
      }
    return {
        form: {},
        formRules: {
          name: [
            {required: true, message: 'Please enter product name', trigger: 'blur' }
          ],
          code: [
            {required: true, message: 'Please enter product code', trigger: 'blur' }
          ],
          description: [
            {required: true, message: 'Please enter product description', trigger: 'blur' }
          ],
          price: [
            {required: true},
            { validator: isPriceVlidator, trigger: 'blur' }
          ]
        }
    }
  },
  created() {
    if(this.$route.query.product === undefined){
      this.form = {
          name: '',
          code: '',
          description: '',
          price: '',
          packagingOptions: [{
            optionNum: '',
            optionPrice: ''
          }]
        }
    }else {
      let str = decodeURIComponent(this.$route.query.product)
      this.form = JSON.parse(str);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/home/shopList')
    },
    removeOption(option){
      var index = this.form.packagingOptions.indexOf(option)
        if (index !== -1) {
          this.form.packagingOptions.splice(index, 1)
        }
    },
    submitForm() {
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let newProduct = {
              name: this.form.name,
              code: this.form.code,
              description: this.form.description,
              price: this.form.price,
              imgUrl: '',
              packagingOptions: this.form.packagingOptions
            }
            this.$store.commit('createNewProduct', JSON.stringify(newProduct))
            this.$message.success('New product has been created!')
            this.goBack();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    addOption() {
      this.form.packagingOptions.push({
          optionNum: '',
          optionPrice: '',
          key: Date.now()
      });
    },
    resetForm() {
      this.$refs['form'].resetFields();
      this.form.packagingOptions = [{
        optionNum: '',
        optionPrice: ''
      }]
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
.product-detail {
  margin: 60px 60px;
  width: 800px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>