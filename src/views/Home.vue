<template>
  <div class="home">
      <Navbar></Navbar>
      <login/>
      <Hero/>
      <products-list></products-list>
      <mini-cart></mini-cart>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import login from '@/components/login.vue';

export default {
  name: "home",
  components: {
    Hero,
    login
  }
};
</script>

<style>

</style>

