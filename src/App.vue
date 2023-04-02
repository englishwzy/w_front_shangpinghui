<template>
  <div>
    <Myheader />
    <router-view></router-view>
    <Myfooter v-show="$route.meta.show" />
  </div>
</template>

<script>
import Myheader from "./components/Header/index.vue";
import Myfooter from "./components/Footer/index.vue";
export default {
  name: "App",
  components: {
    Myheader,
    Myfooter,
  },
  mounted() {
    this.$store.dispatch("homeAbout/categoryList");
  },
};
</script>

<style>
</style>
