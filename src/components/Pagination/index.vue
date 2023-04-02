<template>
  <div class="pagination">
    <h1>{{ startEnd.start }}----{{ startEnd.end }}</h1>
    <button :disabled="pageNo == 1" @click="changePageNo(pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startEnd.start != 1"
      @click="changePageNo(1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startEnd.start > 2">···</button>
    <button
      v-for="(number, index) in startEnd.end"
      :key="index"
      v-show="number >= startEnd.start"
      @click="changePageNo(number)"
      :class="{ active: pageNo == number }"
    >
      {{ number }}
    </button>
    <button v-if="startEnd.end < totalPage - 1">···</button>
    <button
      v-if="startEnd.end != totalPage"
      @click="changePageNo(totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="changePageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "continue", "total"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startEnd() {
      //7 8 9 10 11
      let start = this.pageNo - parseInt(this.continue / 2);
      let end = this.pageNo + parseInt(this.continue / 2);
      // :pageNo="10" :pageSize="10" :continue="5" :total="101"
      if (start <= 1) {
        start = 1;
        end = this.continue;
      }
      if (end > this.totalPage) {
        end = this.totalPage;
        if (end < this.continue) {
          start = 1;
        } else {
          start = this.totalPage - this.continue + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    changePageNo(pageNo) {
      this.$emit("changePage", pageNo);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
