<template>
  <div id="app">
    <span class="v-console" @click="showConsole"></span>
    <div class="main-box">
      <router-view class="main" id="mainBox"></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      num: 0
    }
  },
  mounted () {
  
  },
  methods: {
    showConsole () {
      this.num++
      const dom = document.querySelector('#__vconsole')
      if (dom && this.num === 5) {
        dom.style.display = 'block'
      }
    }
  }

}
</script>
<style lang="scss">
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
// 弹窗提示
/deep/ .van-dialog__message {
  font-size: 16px;
  font-weight: 700;
}
.v-console{
  position: fixed;
  top: 0;
  left: 0;
  width: 10px;
  height: 20px;
  z-index: 99999;
}
// ios微信h5,横屏切换回竖屏时字体大小不能恢复问题
.body {
  text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust:100%;
  -webkit-text-size-adjust: 100%;
}
.main-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main {
  height: 100%;
  overflow: auto;
}
</style>
