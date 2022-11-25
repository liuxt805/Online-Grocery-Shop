<!-- eslint-disable no-trailing-spaces -->
<template>
    <div class="side-bar">
        <div class="nav">
                <div class="nav-item"
                v-for="(item, index) in navList"
                :key="index"
                :class="{ activeNav: $route.name == item.routerName }"
                @click="tabNav(item)">
                    <img
                    v-if="$route.name == item.routerName"
                    :src="item.iconActive"
                    alt=""
                    srcset=""
                    />
                    <img v-else :src="item.icon" alt="" srcset=""/>

                    <span>{{ item.text }}</span>
            </div>          
        </div>
    </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      navList: [
        {
          routerName: 'ShopList',
          path: '/home',
          text: 'Shop',
          icon: require('../assets/icons/nav/bag.svg'),
          iconActive: require('../assets/icons/nav/bag.svg')
        },
        {
          routerName: 'Cart',
          path: '/home/cart',
          text: 'My Cart',
          icon: require('../assets/icons/nav/cart.svg'),
          iconActive: require('../assets/icons/nav/cart.svg')
        }
      ]
    }
  },
  methods: {
    tabNav (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  width: 256px;
  height: 1086px;
  border-right: 1px solid #e5e5e5;
  
}
.nav {
    padding: 10px;
    .nav-item {
      height: 30px;
      font-size: 15px;
      padding: 10px;
      cursor: pointer;
      img {
        width:24px; 
        height:24px;
        margin-right: 35px;
        vertical-align: middle;
      }
    }
}

.activeNav {
  color: #2329D6; 
  background: #DDEBFD;
  border-radius: 4px;
}
</style>
