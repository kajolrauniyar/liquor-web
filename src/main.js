import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import {fb}   from './firebase'
import VueFirestore from 'vue-firestore';
import Swal from 'sweetalert2'
import 'popper.js';
import 'bootstrap';
require ('firebase/firebase');
import VueCarousel from 'vue-carousel';
import Vue2Filters from 'vue2-filters';

import store from './store';

import './assets/app.scss';

Vue.use(VueFirestore, {
  key: 'id',         
  enumerable: true  
})

Vue.use(VueFirestore);
Vue.use(VueCarousel);
Vue.use(Vue2Filters);


window.$ = window.jQuery = jQuery;
window.Swal = Swal;


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);


Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function(user) {

  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
    
  }


});





