<template>
  <div class="mian-page">
    <img :src="logo" alt="" class="logo">
    <h4>销售云移动端脚手架</h4>
  </div>
</template>

<script>

export default {
  data() {
    return {
     logo:require('../../../images/logo.png')
    };
  },
  created() {
   
  },
  mounted() {},
  methods: {

  }
};
</script>
<style lang="scss" scoped>

.mian-page{
  text-align: center;
  font-size: 16px;
  .logo{
    width: 6rem;
    margin: 0.2rem 0;
  }
}
</style>
