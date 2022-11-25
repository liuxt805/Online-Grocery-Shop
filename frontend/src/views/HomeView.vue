<template>
  <div>
    <TopBar></TopBar>
    <div class="flex">
      <SideBar></SideBar>
      <div class="flex-1">
        <!-- content -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
export default {
  name: 'HomeView',
  components: {
    SideBar,
    TopBar
  }
}
</script>

<style scoped>
/* nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
} */

.flex{
  display: flex;
}
</style>
