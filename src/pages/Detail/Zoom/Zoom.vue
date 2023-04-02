<template>
  <div class="spec-preview">
    <img :src="skuImageObj.imgUrl" />
    <div class="event" @mousemove="mouseMove" ref="event"></div>
    <div class="big">
      <img :src="skuImageObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      index: 0,
    };
  },
  props: ["skuImageList"],
  mounted() {
    this.$bus.$on("GetImgIndex", (curIndex) => {
      // console.log(curIndex);
      this.index = curIndex;
    });
  },
  computed: {
    skuImageObj() {
      return this.skuImageList[this.index] || {};
    },
  },

  methods: {
    mouseMove(e) {
      let mask = this.$refs.mask;
      let event = this.$refs.event;
      let maskLeft = e.offsetX - mask.offsetWidth / 2;
      let maskTop = e.offsetY - mask.offsetHeight / 2;
      if (maskLeft < 0) {
        maskLeft = 0;
      }
      if (maskTop < 0) {
        maskTop = 0;
      }
      if (maskLeft > event.offsetWidth - mask.offsetWidth) {
        maskLeft = event.offsetWidth - mask.offsetWidth;
      }
      if (maskTop > event.offsetHeight - mask.offsetHeight) {
        maskTop = event.offsetHeight - mask.offsetHeight;
      }
      mask.style.left = maskLeft + "px"; //不要忘记加px
      mask.style.top = maskTop + "px";

      // 大图移动的方向与小图相反，并且距离是小图的两倍
      let big = this.$refs.big;
      // console.log(big);
      big.style.left = maskLeft * -2 + "px";
      big.style.top = maskTop * -2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>