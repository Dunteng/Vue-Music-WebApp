<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted() {
      //延迟20毫秒再初始化,以确保DOM在初始化之前渲染完毕
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },
      enable() {
        this.scroll && this.scroll.enable()/* better-scroll的api，启用 better-scroll, 默认 开启 */
      },
      disable() {
        this.scroll && this.scroll.disable()/* better-scroll的api，禁用 better-scroll，DOM 事件（如 touchstart、touchmove、touchend）的回调函数不再响应。 */
      },
      refresh() {
        this.scroll && this.scroll.refresh()/* 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。 */
      }
    },
    watch: {
      data() {  /* 监听数据改变立即刷新 */
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>