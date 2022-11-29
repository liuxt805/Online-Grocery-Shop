import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$addNum = function (num1, num2) {
  var sq1,sq2,m;
  try {
      sq1 = num1.toString().split(".")[1].length;
  }
  catch (e) {
      sq1 = 0;
  }
  try {
      sq2 = num2.toString().split(".")[1].length;
  }
  catch (e) {
      sq2 = 0;
  }
  m = Math.pow(10,Math.max(sq1, sq2));
  return (num1 * m + num2 * m) / m;
}

Vue.prototype.$mulNum = function (arg1,arg2){  
  var m=0,s1=arg1.toString(),
  s2=arg2.toString();  
  try{
  m+=s1.split(".")[1].length}catch(e){}  
  try{
  m+=s2.split(".")[1].length}catch(e){}  
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}