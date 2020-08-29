<template>
  <section class="panel">
    <h4>{{title}}</h4>
    <slot />
  </section>
</template>

<script>
export default {
  name: "Panel",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  position: relative;
  background: #fff;
  padding: 0;
  margin: 0;
  > h4 {
    padding: 12px 0;
    text-align: left;
    color: rgba(40, 40, 40, 1);
    font-size: 16px;
    border-bottom: 1px solid rgba(178, 178, 178, 0.3);
  }
}
</style>
