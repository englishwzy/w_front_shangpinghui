<template>
  <div>
    <!--导航组件 -->
    <Typenav />
    <!-- 列表 -->
    <ListContainer />

    <!--今日推荐-->
    <Recommand />

    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />

    <!--楼层-->
    <Floor v-for="flist in floorList" :key="flist.id" :floorobj="flist" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import Recommand from "@/pages/Home/Recommand";
import Like from "@/pages/Home/Like";
import Rank from "@/pages/Home/Rank";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  mounted() {
    this.$store.dispatch("homeAbout/acquireFloorList");

    // 获取用户信息
    this.$store.dispatch("loginAbout/getUserInfo");
  },
  computed: {
    ...mapState("homeAbout", ["floorList"]),
  },
  components: {
    ListContainer,
    Recommand,
    Like,
    Rank,
    Floor,
    Brand,
  },
};
</script>

<style scoped lang='less'>
</style>