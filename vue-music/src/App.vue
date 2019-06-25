<template>
  <div id="app">
    <m-header></m-header>
    <!-- <MHeader></MHeader>这样写也可以,但是不推荐，应尽量符合代码规范 -->
    <tab></tab>
    <transition>
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from "components/m-header/m-header";
import Tab from "./components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
// 实现路由切换动画效果
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>


